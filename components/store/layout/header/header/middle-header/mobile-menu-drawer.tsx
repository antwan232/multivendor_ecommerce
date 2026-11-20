"use client";

import type { CategoryWithSubCategoryType, Country } from "@/types/types";
import type { OfferTag } from "@/lib/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import logoImage from "@/public/assets/images/logo.png";
import { cn } from "@/lib/utils";

import SupportButton from "../bottom-header/support-button";
import { topLinks } from "@/constants/store";
import CountrySelector from "../top-header/country-selector";
import LanguageSelector from "../top-header/language-selector";
import MobileCategoryList from "./mobile-category-list";

const drawerEase: [number, number, number, number] = [0.4, 0, 0.2, 1];
const drawerTween = {
  type: "tween" as const,
  duration: 0.5,
  ease: drawerEase,
};

export default function MobileMenuDrawer({
  id,
  categories,
  offerTags,
  userCountry,
  onClose,
}: {
  id: string;
  categories: CategoryWithSubCategoryType[];
  offerTags: OfferTag[];
  userCountry: Country;
  onClose: () => void;
}) {
  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      className="fixed inset-0 z-[99999]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-[#161C247A]"
      />

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={drawerTween}
        className="fixed top-0 left-0 z-[100000] h-screen w-[350px] max-w-[85vw] overflow-y-auto bg-white px-4 py-6 shadow-xl"
      >
        <div className="relative pb-6">
          <Link href="/" onClick={onClose} aria-label="Sellzy home">
            <Image
              src={logoImage}
              alt="logo image"
              width={180}
              height={180}
              className="h-auto w-[100px]"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close menu"
            className="absolute top-0 right-0 inline-flex size-7 items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] text-slate-600 transition-colors hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-y-6 pb-6"
        >
          <section>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
              Menu
            </p>
            <ul className="flex flex-col">
              {topLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
              Categories
            </p>
            <MobileCategoryList categories={categories} />
          </section>

          <section>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
              Offers
            </p>
            <ul className="flex flex-col">
              {offerTags.map((tag, index) => (
                <li key={tag.id}>
                  <Link
                    href={`/browse?offer=${tag.url}`}
                    onClick={onClose}
                    className={cn(
                      "block py-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary",
                      index === 0 && "font-bold text-black",
                    )}
                  >
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
              Support
            </p>
            <SupportButton
              align="start"
              onActivate={onClose}
              textSize="drawer"
            />
          </section>

          <section>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
              Region &amp; language
            </p>
            <div className="flex flex-col items-start gap-3 text-sm">
              <CountrySelector userCountry={userCountry} />
              <LanguageSelector />
            </div>
          </section>
        </nav>
      </motion.div>
    </div>
  );
}

