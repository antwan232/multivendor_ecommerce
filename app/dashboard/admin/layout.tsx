// Components
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { currentUser } from "@clerk/nextjs/server";

// Types
import { ReactNode } from "react";

export default async function AdminDashbaordLayout({ children }: { children: ReactNode }) {
	const user = await currentUser();
	const isAdmin = user?.privateMetadata?.role === "ADMIN";

	return (
		<div className="w-full h-full">
			<Sidebar isAdmin={isAdmin} />
			<div className="w-full ml-40">
				<Header />
				<div className="w-full mt-10 p-4">{children}</div>
			</div>
		</div>
	);
}
