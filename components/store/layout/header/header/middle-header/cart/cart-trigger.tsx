"use client";

import type { RefObject } from "react";

import CartIcon from "./cart-icon";

export default function CartTrigger({
  quantity,
  isOpen,
  controls,
  onOpen,
  buttonRef,
  compact,
}: {
  quantity: number;
  isOpen: boolean;
  controls: string;
  onOpen: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
  compact?: boolean;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={`Open cart, ${quantity} items`}
      className={
        compact
          ? "group flex cursor-pointer items-center justify-center rounded-xl bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          : "group flex cursor-pointer items-center justify-center gap-3 bg-transparent text-left"
      }
    >
      <span
        className={
          compact
            ? "relative flex cursor-pointer items-center"
            : "relative flex cursor-pointer items-center gap-2 sm:py-2 lg:flex"
        }
      >
        <CartIcon quantity={quantity} compact={compact} />
        {compact ? null : (
          <span className="hidden lg:block">
            <span className="block text-xs font-semibold text-gray-400">
              Cart
            </span>
            <span className="block font-bold">{quantity}-Items</span>
          </span>
        )}
      </span>
    </button>
  );
}

