"use client";

import { ArrowDownFreeIcons } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { useState } from "react";

import Dropdown, { arrowVariants } from "@/components/shared/dropdown";
import EnglishIcon from "@/components/store/icons/english";
import { DropdownItem } from "@/components/ui/shared/dropdown-item";

import { MotionHugeiconsIcon } from "../motion-icons";

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      className="w-[125px] shrink-0"
      trigger={
        <>
          <span className="bg-primary rounded-full p-2">
            <EnglishIcon />
          </span>
          English
          <MotionHugeiconsIcon
            icon={ArrowDownFreeIcons}
            variants={arrowVariants}
            animate={open ? "open" : "close"}
          />
        </>
      }
      content={
        <div className="space-y-3 px-3 py-4">
          <DropdownItem
            icon={
              <EnglishIcon className="transition-all duration-150 group-hover/dropdownItem:bg-[#EBF2F2]" />
            }
          >
            <span className="group-hover/dropdownItem:text-primary-foreground font-semibold text-slate-900 transition-all duration-150 group-hover/dropdownItem:font-bold">
              English
            </span>
          </DropdownItem>
          <DropdownItem
            icon={
              <motion.span className="flex size-full items-center justify-center rounded-full font-bold text-slate-900 transition-all duration-150 group-hover/dropdownItem:bg-[#EBF2F2]">
                AR
              </motion.span>
            }
          >
            <span className="group-hover/dropdownItem:text-primary-foreground font-semibold text-slate-900 transition-all duration-150 group-hover/dropdownItem:font-bold">
              Arabic
            </span>
          </DropdownItem>
        </div>
      }
      isOpen={open}
      setIsOpen={setOpen}
    />
  );
}

