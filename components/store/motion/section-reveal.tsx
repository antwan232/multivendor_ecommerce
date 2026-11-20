import * as motion from "motion/react-client";
import type { ReactNode } from "react";

const spring = {
  type: "spring" as const,
  stiffness: 88,
  damping: 17,
  mass: 0.9,
};

export default function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className} style={{ overflowX: "clip" }}>
      <motion.div
        style={{ transformPerspective: 1400 }}
        initial={{ opacity: 0, y: 46, scale: 0.988, rotateX: 2.4 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: true, amount: 0.08, margin: "0px 0px -60px 0px" }}
        transition={{ ...spring, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
