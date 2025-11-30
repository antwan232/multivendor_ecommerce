// Components
import Header from "@/components/dashboard/header";
import NavLinks from "@/components/dashboard/sidebar/navLinks.client";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import SidebarNav from "@/components/dashboard/sidebar/sidebar-nav";
import { adminDashboardSidebarOptions } from "@/constants/data";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Types
import { ReactNode } from "react";

export default async function AdminDashbaordLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Protect the route
	const user = await currentUser();
	if (user?.privateMetadata.role !== "ADMIN") redirect("/");

	return (
		<>
			<Sidebar>
				<SidebarNav>
					<NavLinks menuLinks={adminDashboardSidebarOptions} />
				</SidebarNav>
			</Sidebar>
			<div className="ml-75">
				<Header />
				<div className="max-w-7xl p-5 mt-20">{children}</div>
			</div>
		</>
	);
}
