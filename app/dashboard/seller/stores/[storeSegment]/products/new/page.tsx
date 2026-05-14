// Server Actions
import { getCategories } from "@/actions/category";
import { getAllOfferTags } from "@/actions/offerTag";

// Components
import ProductDetails from "@/components/dashboard/forms/products-details";

export default async function SellerNewProductPage({
	params,
}: {
	params: Promise<{ storeSegment: string }>;
}) {
	const { storeSegment } = await params;
	const categories = await getCategories();
	const offerTags = await getAllOfferTags(storeSegment);

	return (
		<ProductDetails
			categories={categories}
			storeSegment={storeSegment}
			offerTags={offerTags}
		/>
	);
}
