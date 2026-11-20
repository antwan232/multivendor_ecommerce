"use client";

import { CustomerSupportIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { supportIconMotion } from "@/motion/motion-values";
import { MotionHugeiconsIcon } from "../motion-icons";

export default function SupportCall() {
  return (
    <div className="hidden items-center gap-2 xl:flex">
      <MotionHugeiconsIcon
        animate={supportIconMotion}
        icon={CustomerSupportIcon}
        aria-hidden="true"
      />
      Need Support ? Call Us
      <Badge variant="warning" className="font-extralight" asChild>
        <Link href="tel:4505550103">(450) 555-0103</Link>
      </Badge>
    </div>
  );
}

