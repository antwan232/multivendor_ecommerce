// Server actions
import { getCategories } from "@/actions/category";
import CategoryDetails from "@/components/dashboard/forms/category-details";
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";

export default async function AdminCategoriesPage() {
	const categories = await getCategories();
	if (categories.length < 1) return;

	return (
		<DataTable
			actionButtonText={
				<>
					<Plus size={15} />
					Create category
				</>
			}
			modalChildren={<CategoryDetails />}
			filterValue="name"
			data={categories}
			searchPlaceholder="Search category name..."
			columns={columns}
			newTabLink="/dashboard/admin/categories/new"
		/>
	);
}
