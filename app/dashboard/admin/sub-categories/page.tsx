// Nextjs
import { cacheTag } from "next/cache";

// Server actions
import { getCategories } from "@/actions/category";

// Components
import SubCategoryDetails from "@/components/dashboard/forms/sub-category-details";
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "@/components/dashboard/columns/sub-categories-columns";
import { getAllSubCategories } from "@/actions/subcategory";

export default async function SubCategoriesAdminPage() {
	"use cache";
	cacheTag("cats");

	const subCategories = await getAllSubCategories();
	const categories = await getCategories();
	if (subCategories.length === 0 || categories.length === 0) return;

	return (
		<DataTable
			actionButtonText={
				<>
					<Plus size={15} />
					Create Sub-Category
				</>
			}
			modalChildren={<SubCategoryDetails categories={categories} />}
			filterValue="name"
			data={subCategories}
			searchPlaceholder="Search Sub-Category name..."
			columns={columns}
			newTabLink="/dashboard/admin/sub-categories/new"
		/>
	);
}
