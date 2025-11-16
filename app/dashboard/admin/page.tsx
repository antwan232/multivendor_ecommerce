// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Next.js
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
	// Protect the route 
	const user = await currentUser();
	if (user?.privateMetadata.role !== "ADMIN") redirect("/");

	return <div></div>;
}
