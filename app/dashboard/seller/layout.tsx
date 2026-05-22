// Server Actions
import { getStores } from "@/actions/store";

// Components
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";

// React
import { PropsWithChildren } from "react";

export default async function StoreDashboardLayout({ children }: PropsWithChildren) {
	const stores = await getStores();

	return (
		<>
			<Sidebar stores={stores} />
			<div className="ml-75">
				<Header />
				<div className="max-w-7xl p-5 mt-20">{children}</div>
			</div>
		</>
	);
}
