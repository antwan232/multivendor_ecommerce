"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useState } from "react";

import Dropdown from "@/components/shared/dropdown";
import type { CategoryWithSubCategoryType } from "@/types/types";

export default function CategoryMenuItem({
  category,
}: {
  category: CategoryWithSubCategoryType;
}) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <li className="group/cat relative flex items-center justify-between gap-1 border-b border-gray-100 px-5 py-2 transition-all ease-out hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center rounded-full border border-gray-300 p-0.5">
          <Image
            src={category.image}
            alt={`${category.name} Category Image`}
            className="rounded-full"
            width={35}
            height={35}
          />
        </span>

        <p className="group-hover/cat:text-primary-dark text-sm text-black transition-all">
          {category.name}
        </p>
      </div>

      {category.subCategories.length > 0 && (
        <Dropdown
          triggerType="hover"
          position="x"
          isOpen={submenuOpen}
          setIsOpen={setSubmenuOpen}
          trigger={
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={24}
              className="text-gray-400 transition-all hover:text-gray-500"
            />
          }
          content={
            <ul className="h-fit">
              {category.subCategories.map((subCategory) => (
                <li
                  className="group/supCat flex items-center justify-between gap-1 border-b border-gray-100 px-5 py-2 transition-all ease-out hover:bg-gray-50"
                  key={subCategory.id}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center rounded-full border border-gray-300 p-0.5">
                      <Image
                        src={subCategory.image}
                        alt={`${subCategory.name} Sub-Category Image`}
                        className="rounded-full"
                        width={35}
                        height={35}
                      />
                    </span>

                    <p className="group-hover/supCat:text-primary-dark text-sm text-black transition-all">
                      {subCategory.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          }
        />
      )}
    </li>
  );
}

