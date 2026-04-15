// Components
import Header from "@/components/dashboard/header";
import NavLinks from "@/components/dashboard/sidebar/navLinks.client";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import SidebarNav from "@/components/dashboard/sidebar/sidebar-nav";

// Options object
import { adminDashboardSidebarOptions } from "@/constants/data";

// Types
import { ReactNode } from "react";

// Auth utility
import { protectRoute } from "@/actions/user";

export default async function AdminDashbaordLayout({ children }: { children: ReactNode }) {
	await protectRoute("ADMIN");

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
