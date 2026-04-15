import ProductDetails from "@/components/dashboard/forms/products-details.client";

// Server actions
import { getCategories } from "@/actions/category";
import { getAllOfferTags, getMainProductInfo } from "@/actions/products";

export default async function SellerNewProductVariantPage({
	params,
}: {
	params: Promise<{ storeSegment: string; productId: string }>;
}) {
	const { productId, storeSegment } = await params;

	const categories = await getCategories();
	const product = await getMainProductInfo(productId);
	const offerTags = await getAllOfferTags(storeSegment);

	if (!product) return;

	return (
		<ProductDetails
			categories={categories}
			storeSegment={storeSegment}
			data={product}
			offerTags={offerTags}
		/>
	);
}
