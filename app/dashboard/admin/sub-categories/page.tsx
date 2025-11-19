import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SubCategoriesAdminPage() {
	// Protect the route
	const user = await currentUser();
	if (user?.privateMetadata.role !== "ADMIN") redirect("/");

	return <div>SubCategories</div>;
}
