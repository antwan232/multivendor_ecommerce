// React, Next.js
import { FC } from "react";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Custom Ui Components
import Logo from "@/components/shared/logo";
import UserInfo from "./user-info";
import SidebarNavAdmin from "./nav-admin";
import SidebarNavSeller from "./nav-seller";
import StoreSwitcher from "./store-switcher";

// Menu links
import { sellerDashboardSidebarOptions, adminDashboardSidebarOptions } from "@/constants/data";

// Prisma models
import { Store } from "@/lib/generated/prisma/client";

interface SidebarProps {
	isAdmin?: boolean;
	stores?: Store[];
}

const Sidebar: FC<SidebarProps> = async ({ isAdmin, stores }) => {
	const user = await currentUser();
	return (
		<div className="w-80 border-r p-4 flex flex-col fixed top-0 left-0 bottom-0">
			<Logo
				width="100%"
				height="180px"
			/>
			<span className="mt-3" />
			{user && <UserInfo user={user} />}
			{!isAdmin && stores && <StoreSwitcher stores={stores} />}
			{isAdmin ? (
				<SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />
			) : (
				<SidebarNavSeller menuLinks={sellerDashboardSidebarOptions} />
			)}
		</div>
	);
};

export default Sidebar;
