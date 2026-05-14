// Server Actions
import { getAllStoreProducts } from "@/actions/products";
import { getCategories } from "@/actions/category";
import { getAllOfferTags } from "@/actions/offerTag";

// Components
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/columns/products-columns";
import ProductDetails from "@/components/dashboard/forms/products-details";

// Lucide
import { Plus } from "lucide-react";

export default async function SellerProductsPage({
	params,
}: {
	params: Promise<{ storeSegment: string }>;
}) {
	const { storeSegment } = await params;
	const products = await getAllStoreProducts(storeSegment);
	const categories = await getCategories();
	const offerTags = await getAllOfferTags(storeSegment);

	return (
		<DataTable
			actionButtonText={
				<>
					<Plus size={15} />
					Create product
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
