"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { searchLabelTransition } from "@/motion/motion-values";

export default function SearchInput({
  inputId,
  isFocused,
  onFocus,
}: {
  inputId: string;
  isFocused: boolean;
  onFocus: () => void;
}) {
  return (
    <>
      {/* Floating label for the placeholder effect */}
      <motion.label
        htmlFor={inputId}
        animate={{
          top: isFocused ? "-15px" : "50%",
          left: isFocused ? "28px" : "5px",
          y: isFocused ? "0%" : "-50%",
          alignItems: isFocused ? "start" : "center",
          scale: isFocused ? 0.8 : 1,
          opacity: isFocused ? 1 : 0,
        }}
        transition={searchLabelTransition(isFocused)}
        className="pointer-events-none absolute left-6 z-[82] origin-left bg-white px-2 text-lg text-gray-400"
      >
        Search for products...
      </motion.label>

      <Input
        id={inputId}
        placeholder="Search for products..."
        onFocus={onFocus}
        className={cn(
          "absolute z-[80] flex cursor-text items-center justify-center rounded-full border-gray-300 bg-white p-6 text-lg! text-gray-600 shadow placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-150 focus:border-gray-300 focus:placeholder:opacity-0",
          {
            "placeholder:opacity-0": isFocused,
          },
        )}
      />
      <HugeiconsIcon
        icon={Search01Icon}
        className="pointer-events-none absolute top-1/2 right-6 z-[81] size-6 -translate-y-1/2 text-gray-400"
      />
    </>
  );
}

