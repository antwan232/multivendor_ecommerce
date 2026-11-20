"use client";

import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDown, CirclePercent, ScanQrCode } from "lucide-react";
import { motion } from "motion/react";

export const MotionHugeiconsIcon = motion.create(HugeiconsIcon, {
  forwardMotionProps: true,
});

export const MotionScanQrCodeIcon = motion.create(ScanQrCode, {
  forwardMotionProps: true,
});

export const MotionChevronDownIcon = motion.create(ChevronDown, {
  forwardMotionProps: true,
});

export const MotionCirclePercentIcon = motion.create(CirclePercent, {
  forwardMotionProps: true,
});

export const MotionBadge = motion.create(Badge, {
  forwardMotionProps: true,
});

