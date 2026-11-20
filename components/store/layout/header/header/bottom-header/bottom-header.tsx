import type { CategoryWithSubCategoryType } from "@/types/types";
import type { OfferTag } from "@/lib/generated/prisma/client";

import OfferTagsRow from "../offer-tags-row";
import CategoriesMenu from "./categories-menu";
import StickyBottomBar from "./sticky-bottom-bar";
import SupportButton from "./support-button";

export default function BottomHeader({
  categories,
  offerTags,
}: {
  categories: CategoryWithSubCategoryType[];
  offerTags: OfferTag[];
}) {
  return (
    <StickyBottomBar>
      <CategoriesMenu categories={categories} />
      <div className="hidden min-w-0 flex-1 xl:flex">
        <OfferTagsRow offerTags={offerTags} />
      </div>
      <SupportButton />
    </StickyBottomBar>
  );
}

