// Server actions
import { getCategories } from "@/actions/category";

// Nextjs
import { cacheTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

// Columns
import { columns } from "./columns";

// Components
import { Plus } from "lucide-react";
import CategoryDetails from "@/components/dashboard/forms/category-details.client";
import DataTable from "@/components/ui/data-table";

export default async function AdminCategoriesPage() {
	"use cache";
	cacheTag("cats");

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
			data={categories}
			searchPlaceholder="Search category name..."
			columns={columns}
			newTabLink="/dashboard/admin/categories/new"
		/>
	);
}
