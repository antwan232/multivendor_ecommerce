// Server Actions
import { getAllStores } from "@/actions/store";
import { protectRoute } from "@/actions/user";

// Components
import Header from "@/components/dashboard/header";
import NavLinks from "@/components/dashboard/sidebar/navLinks";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import SidebarNav from "@/components/dashboard/sidebar/sidebar-nav";
import StoreSwitcher from "@/components/dashboard/sidebar/store-switcher";

// Constants
import { sellerDashboardSidebarOptions } from "@/constants/data";

// React
import { PropsWithChildren, Suspense } from "react";

export default async function StoreDashboardLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Sidebar>
				<Suspense fallback="Switcher Loading...">
					<StoreSwitcherDynamic />
				</Suspense>
				<SidebarNav>
					<NavLinks menuLinks={sellerDashboardSidebarOptions} />
				</SidebarNav>
			</Sidebar>
			<div className="ml-75">
				<Header />
				<div className="max-w-7xl p-5 mt-20">{children}</div>
			</div>
		</>
	);
}

async function StoreSwitcherDynamic() {
	// Protect the route
	const user = await protectRoute("SELLER");

	// Retrieve stores with the authenticated user
	const stores = await getAllStores(user!.id);
	return (
		<StoreSwitcher
			className="mb-4"
			stores={stores}
		/>
	);
}
