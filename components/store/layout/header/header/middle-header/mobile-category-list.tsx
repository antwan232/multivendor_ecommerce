"use client";

import { arrowVariants } from "@/components/shared/dropdown";
import type { CategoryWithSubCategoryType } from "@/types/types";
import { useState } from "react";

import { MotionChevronDownIcon } from "../motion-icons";

export default function MobileCategoryList({
  categories,
}: {
  categories: CategoryWithSubCategoryType[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const featured = categories.filter((category) => category.featured);

  return (
    <ul className="flex flex-col">
      {featured.map((category) => {
        const isOpen = openId === category.id;
        return (
          <li key={category.id} className="border-b border-gray-100">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : category.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 py-3 text-left focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span className="text-sm font-semibold text-slate-900">
                {category.name}
              </span>
              <MotionChevronDownIcon
                variants={arrowVariants}
                animate={isOpen ? "open" : "close"}
                className="size-4 text-gray-400"
              />
            </button>
            {isOpen && category.subCategories.length > 0 ? (
              <ul className="flex flex-col gap-y-1 pb-3 pl-4">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id} className="text-sm text-gray-500">
                    {subCategory.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

