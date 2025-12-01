// Components
import Header from "@/components/dashboard/header";
import NavLinks from "@/components/dashboard/sidebar/navLinks.client";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import SidebarNav from "@/components/dashboard/sidebar/sidebar-nav";
import StoreSwitcher from "@/components/dashboard/sidebar/store-switcher.client";

// Constants
import { sellerDashboardSidebarOptions } from "@/constants/data";

// Prisma
import prisma from "@/lib/prisma";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Types
import { PropsWithChildren } from "react";

export default async function StoreDashboardLayout({ children }: PropsWithChildren) {
	// Protect the route
	const user = await currentUser();
	if (user?.privateMetadata.role !== "SELLER") redirect("/");

	// Retrieve stores with the authenticated user
	const stores = await prisma.store.findMany({
		where: {
			userId: user!.id,
		},
	});

	const isThereStores = stores && stores.length > 0;

	return (
		<>
			<Sidebar>
				<StoreSwitcher className="mb-4" stores={stores} />
				{isThereStores && (
					<SidebarNav>
						<NavLinks menuLinks={sellerDashboardSidebarOptions} />
					</SidebarNav>
				)}
			</Sidebar>
			<div className="ml-75">
				<Header />
				<div className="max-w-7xl p-5 mt-20">{children}</div>
			</div>
		</>
	);
}
