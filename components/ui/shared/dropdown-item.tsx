import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";
import { ReactElement, ReactNode } from "react";

type DropdownItem = HTMLMotionProps<"div"> & {
  children: ReactNode;
  icon: ReactElement;
  isSelectedCountry?: boolean;
};

export function DropdownItem({
  children,
  icon,
  isSelectedCountry,
  className,

  ...props
}: DropdownItem) {
  return (
    <motion.div
      className={cn(
        "group/dropdownItem flex cursor-pointer items-center gap-3" +
          ` ${className}`,
        {
          "text-primary-foreground font-bold": isSelectedCountry,
        },
      )}
      {...props}
    >
      <motion.span className="flex size-8 items-center justify-center rounded-full bg-gray-100 transition-all duration-150 group-hover/dropdownItem:bg-[#EBF2F2]">
        {icon}
      </motion.span>
      {children}
    </motion.div>
  );
}
