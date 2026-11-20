import { getCategories } from "@/actions/category";
import { getAllOfferTags } from "@/actions/offerTag";
import { getProducts } from "@/actions/products";
import type { Country } from "@/types/types";

import StoreMotionConfig from "./header-motion-config";
import BottomHeader from "./header/bottom-header/bottom-header";
import MiddleHeader from "./header/middle-header/middle-header";
import TopHeader from "./header/top-header/top-header";
import type { HeaderData } from "@/types/header";

async function loadHeaderData(): Promise<HeaderData> {
  const [productsResult, categoriesResult, offerTagsResult] =
    await Promise.allSettled([
      getProducts(),
      getCategories(),
      getAllOfferTags(),
    ]);

  if (productsResult.status === "rejected") {
    console.error("Header: failed to load products", productsResult.reason);
  }
  if (categoriesResult.status === "rejected") {
    console.error("Header: failed to load categories", categoriesResult.reason);
  }
  if (offerTagsResult.status === "rejected") {
    console.error("Header: failed to load offer tags", offerTagsResult.reason);
  }

  return {
    products:
      productsResult.status === "fulfilled" ? productsResult.value.products : [],
    categories:
      categoriesResult.status === "fulfilled" ? categoriesResult.value : [],
    offerTags:
      offerTagsResult.status === "fulfilled" ? offerTagsResult.value : [],
  };
}

export default async function Header({
  userCountry,
}: {
  userCountry: Country;
}) {
  const { products, categories, offerTags } = await loadHeaderData();

  return (
    <StoreMotionConfig>
      <TopHeader userCountry={userCountry} />
      <MiddleHeader
        products={products}
        categories={categories}
        offerTags={offerTags}
        userCountry={userCountry}
      />
      <BottomHeader categories={categories} offerTags={offerTags} />
    </StoreMotionConfig>
  );
}

