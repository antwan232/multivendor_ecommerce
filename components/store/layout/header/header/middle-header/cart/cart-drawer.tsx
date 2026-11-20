"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

import {
  cartDrawerPanelMotion,
  cartOverlayMotion,
  cartOverviewPanelMotion,
  drawerSpring,
} from "@/motion/motion-values";
import type { HeaderCartItem } from "@/types/header";
import CartCloseButton from "./cart-close-button";
import CartLineItem from "./cart-line-item";

export default function CartDrawer({
  id,
  item,
  onClose,
}: {
  id: string;
  item: HeaderCartItem;
  onClose: () => void;
}) {
  const titleId = `${id}-title`;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-99999"
    >
      {/* Overlay background */}
      <motion.div
        initial={cartOverlayMotion.initial}
        animate={cartOverlayMotion.animate}
        exit={cartOverlayMotion.exit}
        onClick={onClose}
        aria-hidden="true"
        className="bg-primary/20 absolute inset-0 overflow-hidden backdrop-blur-sm"
      />

      {/* Drawer header strip */}
      <motion.div
        transition={drawerSpring}
        animate={cartOverviewPanelMotion.animate}
        exit={cartOverviewPanelMotion.exit}
        initial={cartOverviewPanelMotion.initial}
        className="border-primary bg-white/60 fixed top-0 right-0 z-999955 flex w-full items-start justify-between rounded-t-xl border-b pt-4 pr-8 pb-8 pl-6 backdrop-blur-xl lg:w-120"
      >
        <div className="flex w-full items-center justify-between">
          <div className="space-y-2">
            <div id={titleId} className="text-2xl font-bold">
              Shopping Cart
            </div>
            <p className="text-sm text-gray-600">{item.quantity} items</p>
          </div>
          <CartCloseButton onClose={onClose} />
        </div>
      </motion.div>

      {/* Drawer footer strip */}
      <motion.div
        transition={drawerSpring}
        animate={cartOverviewPanelMotion.animate}
        exit={cartOverviewPanelMotion.exit}
        initial={cartOverviewPanelMotion.initial}
        className="border-primary bg-white/60 fixed right-0 bottom-0 z-999955 w-full space-y-6 border-t pt-6 pr-8 pb-4 pl-6 backdrop-blur-xl lg:w-120"
      >
        <div className="flex w-full items-center justify-between text-xl">
          <h1 className="font-semibold">Total</h1>
          <h1 className="font-bold">${item.total}</h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="default"
            className="flex-1 cursor-pointer rounded-full py-6 font-bold text-white transition-all duration-150"
          >
            Proceed to checkout
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 cursor-pointer rounded-full border-slate-400 py-6 font-bold transition-all duration-150"
          >
            View cart{" "}
          </Button>
        </div>
      </motion.div>

      {/* Scrollable drawer body */}
      <motion.div
        transition={drawerSpring}
        animate={cartDrawerPanelMotion.animate}
        exit={cartDrawerPanelMotion.exit}
        initial={cartDrawerPanelMotion.initial}
        className="shadow-primary no-scrollbar fixed top-0 right-0 z-99999 h-screen w-full overflow-y-scroll rounded-l-xl bg-white/40 shadow-lg backdrop-blur-3xl lg:w-120"
      >
        <ul className="space-y-8 p-6">
          <CartLineItem item={item} />
        </ul>
      </motion.div>
    </div>
  );
}

