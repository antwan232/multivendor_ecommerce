// Components
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";

// Options object

// Types
import { ReactNode } from "react";

// Auth utility
import { protectRoute } from "@/actions/user";

export default async function AdminDashbaordLayout({ children }: { children: ReactNode }) {
	await protectRoute("ADMIN");

	return (
		<>
			<Sidebar isAdmin />
			<div className="ml-75">
				<Header />
				<div className="max-w-7xl p-5 mt-20">{children}</div>
			</div>
		</>
	);
}
