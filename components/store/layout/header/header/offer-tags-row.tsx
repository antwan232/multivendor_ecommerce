import OfferTagsLinks from "@/components/store/layout/categories-header/offerTags-links";
import type { OfferTag } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";

export default function OfferTagsRow({
  offerTags,
  className,
}: {
  offerTags: OfferTag[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "no-scrollbar w-full touch-pan-x overflow-x-auto overscroll-x-contain",
        className,
      )}
    >
      <div className="w-max pr-4 [&>div>div]:flex-nowrap [&_a]:!inline-block">
        <OfferTagsLinks offerTags={offerTags} />
      </div>
    </div>
  );
}

