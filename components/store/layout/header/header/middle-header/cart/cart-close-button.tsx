"use client";

import { motion } from "motion/react";

export default function CartCloseButton({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClose}
      aria-label="Close cart"
      autoFocus
      className="cursor-pointer bg-transparent p-0"
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
        className="lucide lucide-x size-5 text-slate-600 transition-all duration-150 hover:text-slate-800"
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </motion.button>
  );
}

