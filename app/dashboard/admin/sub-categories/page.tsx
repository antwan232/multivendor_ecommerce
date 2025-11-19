import { getCategories } from "@/actions/category";
import { getSubCategories } from "@/actions/subcategory";
import SubCategoryDetails from "@/components/dashboard/forms/subCategory-details";
import DataTable from "@/components/ui/data-table";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { columns } from "./columns";

export default async function SubCategoriesAdminPage() {
	// Protect the route
	const user = await currentUser();
	if (user?.privateMetadata.role !== "ADMIN") redirect("/");

	const subCategories = await getSubCategories();
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
		/>
	);
}
