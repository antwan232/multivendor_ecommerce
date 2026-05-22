// Server actions
import { getCategories } from "@/actions/category";

// Nextjs
import { redirect, RedirectType } from "next/navigation";

// Columns
import { columns } from "@/components/dashboard/columns/categories-columns";

// Components
import CategoryDetails from "@/components/dashboard/forms/category-details";
import DataTable from "@/components/ui/data-table";
import { Plus } from "lucide-react";

export default async function AdminCategoriesPage() {
	const categories = await getCategories();
	if (categories.length < 1) redirect("/new", RedirectType.push);

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
			searchPlaceholder="Search category name..."
			columns={columns}
			data={categories}
			newTabLink="/dashboard/admin/categories/new"
		/>
	);
}
