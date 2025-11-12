// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Next.js
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
	// Retrieve the current user
	const user = await currentUser();

	// Protect the route if user role is not "SELLER" redirect to home
	if (user?.privateMetadata.role !== "ADMIN") redirect("/");

	return <div>Admin dashboard</div>;
}
