// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Next.js
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const user = await currentUser();

	// Redirect based on the user's role stored in Clerk metadata
	const role = user?.privateMetadata.role;

	if (role === "ADMIN") redirect("/dashboard/admin");
	if (role === "SELLER") redirect("/dashboard/seller");

	// Default redirect for users without a specific role
	redirect("/");
}
