import * as motion from "motion/react-client";
import type { ReactNode } from "react";

import { topBarEntrance } from "@/motion/motion-values";

export default function TopBarShell({ children }: { children: ReactNode }) {
  return (
    <motion.header
      animate={topBarEntrance}
      className="bg-primary-foreground relative z-[60] flex min-h-9 justify-center gap-10 px-4 text-sm font-extralight text-white select-none sm:justify-between sm:gap-0 sm:py-0 xl:min-h-12 xl:px-8"
    >
      {children}
    </motion.header>
  );
}
