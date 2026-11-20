import type { CategoryWithSubCategoryType, Country, ProductType } from "@/types/types";
import type { OfferTag } from "@/lib/generated/prisma/client";
import ChairImage from "@/public/assets/images/featured/top-rated.jpg";

import Cart from "./cart/cart";
import { Logo } from "./logo";
import MobileMenu from "./mobile-menu-toggle";
import Search from "./search/search";

export default function MobileHeader({
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
    <div className="xl:hidden">
      <div className="mx-auto w-full max-w-[1536px] border border-gray-300 px-4">
        <div className="flex items-center justify-between pt-3 pb-4">
          <MobileMenu
            categories={categories}
            offerTags={offerTags}
            userCountry={userCountry}
          />
          <Logo className="w-[176px] flex-none" />
          <Cart
            compact
            available={3}
            total={500}
            price={99}
            quantity={10}
            title="T-shirt"
            src={ChairImage.src}
          />
        </div>
        <div className="pb-4">
          <Search mobile products={products} />
        </div>
      </div>
    </div>
  );
}

