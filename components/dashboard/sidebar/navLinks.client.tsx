"use client";

// React, Next.js
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { icons } from "@/constants/icons";

// Utils
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Types
import { DashboardSidebarMenuInterface } from "@/lib/types";

export default function NavLinks({ menuLinks }: { menuLinks: DashboardSidebarMenuInterface[] }) {
	const pathname = usePathname();

	return (
		<>
			{menuLinks.map((link, index) => {
				let icon;
				const iconSearch = icons.find((icon) => icon.value === link.icon);
				if (iconSearch) icon = <iconSearch.path />;
				return (
					<CommandItem
						key={index}
						className={cn("w-full h-12 cursor-pointer mt-1", {
							"bg-accent text-accent-foreground": link.link === pathname,
						})}>
						<Link
							href={link.link}
							className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all w-full">
							{icon}
							<span>{link.label}</span>
						</Link>
					</CommandItem>
				);
			})}
		</>
	);
}
