import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "../ui/shared/theme-toggle";

export default function Header() {
	return (
		<header className="fixed z-20 md:left-40 left-0 top-0 right-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b">
			<ul className="flex items-center gap-2 ml-auto">
				<li>
					<UserButton />
				</li>
				<li>
					<ThemeToggle />
				</li>
			</ul>
		</header>
	);
}
