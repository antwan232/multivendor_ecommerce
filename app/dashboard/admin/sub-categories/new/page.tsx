// Server actions
import { getCategories } from "@/actions/category";

// Components
import SubCategoryDetails from "@/components/dashboard/forms/sub-category-details.client";
import { cacheTag } from "next/cache";

export default async function NewSubCategoryAdminPage() {
	const categories = await getCategories();

	return <SubCategoryDetails categories={categories} />;
}
