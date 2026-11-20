"use client";

import { motion } from "motion/react";

import {
  discountBadgeMotion,
  discountTextMotion,
  discountTodayMotion,
  scanQrMotion,
} from "@/motion/motion-values";
import { MotionBadge, MotionScanQrCodeIcon } from "../motion-icons";

export default function DiscountOffer() {
  return (
    <div className="mx-auto flex items-center gap-2 text-xs sm:py-2 xl:mx-0 xl:text-sm">
      <MotionScanQrCodeIcon
        animate={scanQrMotion}
        className="size-4 xl:size-6"
        aria-hidden="true"
      />
      <motion.span animate={discountTextMotion}>Fashion Category</motion.span>
      <MotionBadge
        animate={discountBadgeMotion}
        variant="warning"
        className="text-[10px] xl:text-xs"
      >
        25% OFF
      </MotionBadge>
      <motion.span animate={discountTodayMotion}>Today</motion.span>
    </div>
  );
}

