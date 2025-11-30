import { getCategories } from "@/actions/category";
import SubCategoryDetails from "@/components/dashboard/forms/sub-category-details.client";

export default async function NewSubCategoryAdminPage() {
	const categories = await getCategories();

	return <SubCategoryDetails categories={categories} />;
}
