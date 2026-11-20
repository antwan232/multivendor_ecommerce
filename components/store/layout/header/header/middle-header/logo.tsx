import logoImage from "@/public/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("z-30 min-w-0 flex-3", className)}>
      <Link
        href="/"
        className="block w-fit max-w-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <Image src={logoImage} alt="logo image" width={180} height={180} />
      </Link>
    </div>
  );
}

