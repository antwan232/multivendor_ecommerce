// Components
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Types
import { ReactNode } from "react";

export default async function AdminDashbaordLayout({ children }: { children: ReactNode }) {
	const user = await currentUser();
	const isAdmin = user?.privateMetadata?.role === "ADMIN";

	return (
		<>
			<Sidebar isAdmin={isAdmin} />
			<div className="ml-75">
				<Header />
				<div className="max-w-7xl p-5 mt-20">{children}</div>
			</div>
		</>
	);
}
