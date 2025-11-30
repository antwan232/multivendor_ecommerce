// Server actions
import { getCategories } from "@/actions/category";
<<<<<<< HEAD
import CategoryDetails from "@/components/dashboard/forms/category-details.client";
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "../../../../components/dashboard/columns/categories-columns.client";
=======
import CategoryDetails from "@/components/dashboard/forms/category-details";
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
>>>>>>> c52035117beed7f4df833a846c63805707eb97f7

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
