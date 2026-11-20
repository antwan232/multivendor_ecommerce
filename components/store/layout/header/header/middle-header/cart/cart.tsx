"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import type { HeaderCartItem } from "@/types/header";
import CartDrawer from "./cart-drawer";
import CartTrigger from "./cart-trigger";

export default function Cart({
  available,
  price,
  quantity,
  src,
  title,
  total,
  compact,
}: HeaderCartItem & { compact?: boolean }) {
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

  const item: HeaderCartItem = {
    available,
    price,
    quantity,
    src,
    title,
    total,
  };

  return (
    <>
      <CartTrigger
        buttonRef={triggerRef}
        controls={drawerId}
        isOpen={open}
        quantity={quantity}
        compact={compact}
        onOpen={() => setOpen(true)}
      />
      <AnimatePresence>
        {open && (
          <CartDrawer
            id={drawerId}
            item={item}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

