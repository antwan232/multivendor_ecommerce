import Link from "next/link";

import { topLinks } from "@/constants/store";

export default function TopNavLinks() {
  return (
    <ul className="hidden items-center gap-3 2xl:flex">
      {topLinks.map((link) => (
        <li key={link.href}>
          <Link
            className="relative hidden cursor-pointer items-center gap-2 pr-6 text-gray-200 transition-all after:absolute after:right-0 after:h-5 after:w-[.5px] after:bg-slate-300 last:after:hidden hover:text-white sm:flex sm:py-2"
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

