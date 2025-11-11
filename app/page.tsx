import ThemeToggle from "@/components/ui/shared/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<main className="flex justify-center items-center gap-x-5 pt-10">
			<ThemeToggle />
			<UserButton />
		</main>
	);
}
