"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];
const duration = 0.38;
const FIXED_SHADOW = "0 10px 30px rgba(15, 23, 42, 0.10)";

export default function StickyBottomBar({ children }: { children: ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFixed(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden xl:block">
      <div className="relative h-[74px]">
        <div
          ref={sentinelRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-px w-px"
        />
        <motion.div
          initial={false}
          animate={fixed ? { y: ["-100%", 0] } : { y: 0 }}
          transition={{ duration, ease }}
          className={cn(
            "z-40 border border-slate-200 border-r-0 bg-white",
            fixed ? "fixed inset-x-0 top-0" : "relative",
          )}
        >
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: fixed ? 1 : 0 }}
            transition={{ duration, ease }}
            style={{ boxShadow: FIXED_SHADOW }}
            className="pointer-events-none absolute inset-0 -z-10"
          />
          <nav className="flex items-center justify-between gap-5 px-8 py-2">
            {children}
          </nav>
        </motion.div>
      </div>
    </div>
  );
}

