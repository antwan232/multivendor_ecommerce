"use client";

// React, Next.js
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

// Icons
import { icons } from "@/constants/icons";

// Utils
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Types
import { DashboardSidebarMenuInterface } from "@/lib/types";
import { useEffect, useState } from "react";
import { getStores } from "@/actions/store";
import { Store } from "@/lib/generated/prisma/client";

export default function NavLinks({ menuLinks }: { menuLinks: DashboardSidebarMenuInterface[] }) {
	const [stores, setStores] = useState<Store[]>([]);

	useEffect(() => {
		const getAllStores = async () => {
			const allStores = await getStores();
			console.log("allStores: ", allStores);
			setStores(allStores);
		};
		getAllStores();
	}, []);

	const { storeSegment } = useParams();
	const pathname = usePathname();
	const storeUrlPath = pathname.includes(`${storeSegment}/`) && pathname?.split(`/${storeSegment}/`)[1].slice(0);

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
							"bg-accent text-accent-foreground": storeSegment ? (pathname.includes(`${storeSegment}/`) ? link.link === storeUrlPath : link.link === "") : link.link === pathname,
						})}>
						<Link
							href={pathname.includes(`${storeSegment}/`) ? `/dashboard/seller/stores/${storeSegment}/${link.link}` : pathname.includes("stores") ? (stores.length > 0 ? `/dashboard/seller/stores/${stores[0].url}/settings` : `/dashboard/seller/stores/new`) : link.link}
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
