"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import type { ProductType } from "@/types/types";

import {
  searchResultsExit,
  searchResultsMotion,
  searchResultsTransition,
} from "@/motion/motion-values";

export default function SearchResults({
  products,
  open,
}: {
  products: ProductType[];
  open: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          transition={searchResultsTransition}
          animate={searchResultsMotion}
          exit={searchResultsExit}
          className="absolute top-8.5 z-[70] container flex max-h-120 max-w-281.5 items-end rounded-xl border bg-white"
        >
          <div className="max-h-115 w-full overflow-y-auto px-4 py-8">
            <div className="space-y-4">
              <h1 className="font-semibold text-slate-800">Recent Searches</h1>
              <p className="text-sm text-gray-400">No recent searches</p>
            </div>
            <h1 className="my-4 font-semibold">Recommended For You</h1>
            <ul>
              {products.map((product) => {
                const image =
                  product.variantImages[1]?.image ??
                  product.variantImages[0]?.image;

                return (
                  <li
                    key={product.id}
                    className="hover:text-primary-dark flex cursor-pointer items-center gap-5 rounded-md p-3 transition-all duration-300 hover:bg-gray-50/80"
                  >
                    <div className="flex size-17 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                      {image ? (
                        <Image src={image} width={45} height={45} alt="" />
                      ) : null}
                    </div>
                    <span className="font-semibold">{product.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

