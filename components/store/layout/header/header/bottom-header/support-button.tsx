"use client";

import { Copy, Headset, PhoneCall } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const PHONE = "4505550103";
const PHONE_LABEL = "450-555-0103";

export default function SupportButton({
  onActivate,
  align = "end",
  textSize = "default",
}: {
  onActivate?: () => void;
  align?: "start" | "end";
  textSize?: "default" | "drawer";
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    firstItemRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PHONE);
    } catch {
      // Clipboard access can be unavailable; no visual failure required.
    }
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="24/7 support options"
        onClick={() => setOpen((current) => !current)}
        className="group flex cursor-pointer items-center gap-x-4 rounded-xl py-0 select-none outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-full border border-transparent bg-muted shadow-sm transition-colors group-hover:border-warning/30 group-hover:bg-warning/20",
            open && "border-warning/30 bg-warning/20",
          )}
        >
          <Headset className="size-6 text-primary" aria-hidden="true" />
        </span>
        <span className="flex flex-col items-start pr-2 leading-tight">
          <span
            className={cn(
              "text-light-disabled-foreground transition-colors group-hover:text-primary",
              textSize === "drawer" ? "text-sm" : "text-xs",
            )}
          >
            24/7 Support
          </span>
          <span
            className={cn(
              "font-bold tracking-tight text-slate-900 transition-colors group-hover:text-primary",
              textSize === "drawer" ? "text-sm" : "text-base",
            )}
          >
            {PHONE_LABEL}
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Support options"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={cn(
              "absolute top-full z-50 mt-2 w-[220px] overflow-hidden rounded-[10px] border border-border bg-white p-0 shadow-md",
              align === "end"
                ? "right-0 origin-top-right"
                : "left-0 origin-top-left",
            )}
          >
            <a
              ref={firstItemRef}
              href={`tel:${PHONE}`}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onActivate?.();
              }}
              className="group/item flex items-center gap-x-3 border-b border-border/50 px-5 py-3.5 text-[15px] font-semibold text-foreground/90 transition-colors hover:bg-muted hover:text-primary focus-visible:bg-muted focus-visible:text-primary focus-visible:outline-none"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 p-2 transition-colors group-hover/item:bg-primary/20 group-focus-visible/item:bg-primary/20">
                <PhoneCall className="size-4" aria-hidden="true" />
              </span>
              Make a Call
            </a>
            <button
              type="button"
              role="menuitem"
              onClick={copyNumber}
              className="group/item flex w-full items-center gap-x-3 px-5 py-3.5 text-left text-[15px] font-semibold text-foreground/90 transition-colors hover:bg-muted hover:text-primary focus-visible:bg-muted focus-visible:text-primary focus-visible:outline-none"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 p-2 transition-colors group-hover/item:bg-primary/20 group-focus-visible/item:bg-primary/20">
                <Copy className="size-4" aria-hidden="true" />
              </span>
              Copy Number
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

