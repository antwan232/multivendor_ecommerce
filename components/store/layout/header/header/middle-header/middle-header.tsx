import type { CategoryWithSubCategoryType, Country, ProductType } from "@/types/types";
import type { OfferTag } from "@/lib/generated/prisma/client";
import ChairImage from "@/public/assets/images/featured/top-rated.jpg";

import Account from "./account";
import Cart from "./cart/cart";
import { Logo } from "./logo";
import MobileHeader from "./mobile-header";
import Search from "./search/search";

export default function MiddleHeader({
  products,
  categories,
  offerTags,
  userCountry,
}: {
  products: ProductType[];
  categories: CategoryWithSubCategoryType[];
  offerTags: OfferTag[];
  userCountry: Country;
}) {
  return (
    <header>
      <MobileHeader
        products={products}
        categories={categories}
        offerTags={offerTags}
        userCountry={userCountry}
      />

      {/* Approved desktop middle row: unchanged spacing, gated at xl. */}
      <div className="hidden border-b border-gray-200 px-8 py-4 xl:block xl:border-none">
        <div className="mb-4 flex min-w-0 items-center justify-start gap-8">
          <div />
          <Logo />
          <Search products={products} />

          <div className="flex items-center justify-center gap-4 text-nowrap">
            <Account />
            <Cart
              available={3}
              total={500}
              price={99}
              quantity={10}
              title="T-shirt"
              src={ChairImage.src}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

