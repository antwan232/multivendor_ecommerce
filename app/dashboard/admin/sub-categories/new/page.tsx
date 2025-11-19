import { getCategories } from "@/actions/category";
import SubCategoryDetails from "@/components/dashboard/forms/subCategory-details";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NewSubCategoryAdminPage() {
	// Protect the route
	const user = await currentUser();
	if (user?.privateMetadata.role !== "ADMIN") redirect("/");

	const categories = await getCategories();

	return <SubCategoryDetails categories={categories} />;
}
