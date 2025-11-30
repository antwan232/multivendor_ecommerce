// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Components
import LogoImg from "../../ui/shared/logo-img";
import UserInfo from "./../user-info";
import { PropsWithChildren } from "react";

export default async function Sidebar({ children }: PropsWithChildren) {
	const user = await currentUser();

	return (
		<aside className="w-75 border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0 z-50">
			<LogoImg
				width="100%"
				height="100px"
			/>
			<span className="mt-3" />

			<UserInfo user={user} />
			{children}
		</aside>
	);
}
