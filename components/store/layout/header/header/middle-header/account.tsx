"use client";

import { DropdownItem } from "@/components/ui/shared/dropdown-item";
import { motion } from "motion/react";

import Dropdown from "@/components/shared/dropdown";
import { useState } from "react";

export default function Account() {
  const [open, setOpen] = useState(false);
  return (
    <div className="ms-auto hidden items-center justify-start px-8 py-4 xl:flex">
      <Dropdown
        isOpen={open}
        setIsOpen={setOpen}
        trigger={
          <div className="flex items-center gap-x-3">
            <div className="bg-warning group-hover:bg-primary-darker shadow-primary-darker flex items-center justify-center rounded-xl p-3 text-slate-900 transition-all duration-300 group-hover:text-white group-hover:shadow-md">
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
                className="lucide lucide-user size-6"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs leading-tight font-medium text-light-disabled-foreground">
                Account
              </span>
              <div className="flex items-center gap-x-1">
                <span className="line-clamp-1 max-w-[100px] text-[15px] leading-tight font-bold text-light-primary-foreground">
                  Log in
                </span>

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
                  className="lucide lucide-chevron-down size-4 text-light-disabled-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        }
        content={
          <div className="space-y-3 px-3 py-4">
            {/* TODO(auth): point these at the real Clerk session actions. */}
            <DropdownItem
              icon={
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-in group-hover/dropdownItem:text-primary-foreground size-4 text-slate-800 transition-all duration-150"
                  aria-hidden="true"
                >
                  <path d="m10 17 5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                </motion.svg>
              }
            >
              <span className="group-hover/dropdownItem:text-primary-foreground transition-all duration-150 group-hover/dropdownItem:font-bold">
                Log in
              </span>
            </DropdownItem>
            <DropdownItem
              icon={
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
                  className="lucide lucide-log-in group-hover/dropdownItem:text-primary-foreground size-4 text-slate-800 transition-all duration-150"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <line x1={19} x2={19} y1={8} y2={14} />
                  <line x1={22} x2={16} y1={11} y2={11} />
                </svg>
              }
            >
              <span className="group-hover/dropdownItem:text-primary-foreground transition-all duration-150 group-hover/dropdownItem:font-bold">
                Register
              </span>
            </DropdownItem>
          </div>
        }
      />
    </div>
  );
}

