import { getAllStoreProducts } from "@/actions/products";
import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { Plus } from "lucide-react";
import ProductDetails from "@/components/dashboard/forms/products-details.client";
import { getCategories } from "@/actions/category";
import { getAllOfferTags } from "@/actions/offerTag";

export default async function SellerProductsPage({
	params,
}: {
	params: Promise<{ storeSegment: string }>;
}) {
	const { storeSegment } = await params;
	const products = await getAllStoreProducts(storeSegment);
	const categories = await getCategories();
	const offerTags = await getAllOfferTags();

	return (
		<DataTable
			actionButtonText={
				<>
					<Plus size={15} />
					Create category
				</>
			}
			modalChildren={
				<ProductDetails
					categories={categories}
					storeSegment={storeSegment}
					offerTags={offerTags}
				/>
			}
			newTabLink={`/dashboard/seller/stores/${storeSegment}/products/new`}
			filterValue="name"
			data={products}
			columns={columns}
			searchPlaceholder="Search product name..."
		/>
	);
} 
