// React
import { PropsWithChildren } from "react";

// Components
import UserInfo from "./../user-info";

// IMG
import LogoImg from "../../ui/shared/logo-img";

export default async function Sidebar({ children }: PropsWithChildren) {
	return (
		<aside className="w-75 border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0 z-50">
			<LogoImg
				width="100%"
				height="100px"
			/>
			<span className="mt-3" />
			<UserInfo />
			{children}
		</aside>
	);
}
