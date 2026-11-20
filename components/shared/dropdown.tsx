"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useId,
  useRef,
} from "react";
import { AnimatePresence, motion, Variant } from "motion/react";

import { cn } from "@/lib/utils";

type DropdownPosition = "x" | "y";
type TriggerType = "click" | "hover";

interface DropdownType {
  icon?: ReactNode;
  trigger: ReactNode;
  content: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
  position?: DropdownPosition;
  isScroll?: boolean;
  triggerType?: TriggerType;
}

export const dropdownVariants: {
  close: Variant;
  open: Variant;
  exit: Variant;
} = {
  close: { opacity: 0, y: -5 },
  open: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 5 },
};

export const arrowVariants: {
  close: Variant;
  open: Variant;
} = {
  close: { rotate: 0 },
  open: { rotate: 180 },
};

export default function Dropdown({
  icon,
  trigger,
  content,
  setIsOpen,
  isOpen,
  className,
  contentClassName,
  ariaLabel,
  position = "y",
  isScroll = false,
  triggerType = "click",
}: DropdownType) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentId = useId();

  // Handle outside clicks
  useEffect(() => {
    if (triggerType !== "click" || !isOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen, triggerType, setIsOpen]);

  const triggerClassName = cn(
    "group relative flex cursor-pointer items-center gap-2",
    className,
  );

  return (
    <motion.div
      ref={dropdownRef}
      onHoverStart={
        triggerType === "hover" ? () => setIsOpen(true) : undefined
      }
      onHoverEnd={
        triggerType === "hover" ? () => setIsOpen(false) : undefined
      }
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) setIsOpen(false);
      }}
      className="relative flex cursor-pointer items-center justify-center gap-3"
    >
      {/* Trigger */}
      {triggerType === "click" ? (
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={contentId}
          className={triggerClassName}
        >
          {icon}
          {trigger}
        </motion.button>
      ) : (
        <motion.div
          onFocus={() => setIsOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setIsOpen(false);
            }
          }}
          className={triggerClassName}
        >
          {icon}
          {trigger}
        </motion.div>
      )}

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={contentId}
            aria-label={ariaLabel}
            variants={dropdownVariants}
            initial="close"
            animate="open"
            exit="exit"
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className={cn(
              "absolute z-50 flex flex-col gap-4 rounded-lg bg-white shadow-lg",
              position === "y" && "no-scrollbar top-full left-0",
              position === "x" && "-top-3 left-full w-64",
              isScroll && "overflow-y-scroll",
              contentClassName,
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
