import { getCategories } from "@/actions/category";
import { getAllOfferTags } from "@/actions/products";
import ProductDetails from "@/components/dashboard/forms/products-details.client";

export default async function SellerNewProductPage({
	params,
}: {
	params: Promise<{ storeSegment: string }>;
}) {
	const { storeSegment } = await params;
	const categories = await getCategories();
	const offerTags = await getAllOfferTags();

	return (
		<ProductDetails
			categories={categories}
			storeSegment={storeSegment}
			offerTags={offerTags}
		/>
	);
}
