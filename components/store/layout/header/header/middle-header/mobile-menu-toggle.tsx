"use client";

import type { CategoryWithSubCategoryType, Country } from "@/types/types";
import type { OfferTag } from "@/lib/generated/prisma/client";
import { AnimatePresence } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import MobileMenuDrawer from "./mobile-menu-drawer";

export default function MobileMenu({
  categories,
  offerTags,
  userCountry,
}: {
  categories: CategoryWithSubCategoryType[];
  offerTags: OfferTag[];
  userCountry: Country;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const drawerId = useId();

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) triggerRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={drawerId}
        className="inline-flex size-[42px] shrink-0 items-center justify-center rounded-full border border-border p-2 text-slate-800 transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20 12L10 12"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 5L4 5"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 19L4 19"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <MobileMenuDrawer
            id={drawerId}
            categories={categories}
            offerTags={offerTags}
            userCountry={userCountry}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

