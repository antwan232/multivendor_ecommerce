"use client";

import { motion } from "motion/react";
import { useState } from "react";

import Dropdown from "@/components/shared/dropdown";
import type { CategoryWithSubCategoryType } from "@/types/types";

import { categoryArrowVariants, categoryTriggerVariants } from "@/motion/motion-values";
import CategoryMenuItem from "./category-menu-item";

export default function CategoriesMenu({
  categories,
}: {
  categories: CategoryWithSubCategoryType[];
}) {
  const [catIsOpen, setCatIsOpen] = useState(false);

  return (
    <Dropdown
      triggerType="hover"
      position="y"
      className="pr-0"
      isOpen={catIsOpen}
      setIsOpen={setCatIsOpen}
      trigger={
        <motion.button
          variants={categoryTriggerVariants}
          whileHover="hover"
          className="text-md bg-primary relative flex w-68 cursor-pointer items-center justify-center gap-2 rounded-lg py-4 font-semibold text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
            aria-hidden="true"
          >
            <rect width={7} height={7} x={3} y={3} rx={1} />
            <rect width={7} height={7} x={14} y={3} rx={1} />
            <rect width={7} height={7} x={14} y={14} rx={1} />
            <rect width={7} height={7} x={3} y={14} rx={1} />
          </svg>
          Explore All Categories
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            variants={categoryArrowVariants}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </motion.button>
      }
      content={
        <ul className="h-fit">
          {categories
            .filter((category) => category.featured)
            .map((category) => (
              <CategoryMenuItem key={category.id} category={category} />
            ))}
        </ul>
      }
    />
  );
}

