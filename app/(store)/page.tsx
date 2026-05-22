"use client";

// Theme provider component
import ThemeToggle from "@/components/ui/shared/theme-toggle";
import dynamic from "next/dynamic";

// Clerk
const UserButton = dynamic(() => import("@clerk/nextjs").then((mod) => mod.UserButton), {
	ssr: false,
});

export default function Home() {
	return (
		<main className="flex justify-center items-center gap-x-5 pt-10">
			<ThemeToggle />
			<UserButton />
		</main>
	);
}
