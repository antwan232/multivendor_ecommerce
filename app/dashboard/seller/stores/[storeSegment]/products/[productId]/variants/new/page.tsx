import ProductDetails from "@/components/dashboard/forms/products-details";

// Server actions
import { getCategories } from "@/actions/category";
import { getMainProductInfo } from "@/actions/products";
import { getAllOfferTags } from "@/actions/offerTag";

export default async function SellerNewProductVariantPage({
	params,
}: {
	params: Promise<{ storeSegment: string; productId: string }>;
}) {
	const { productId, storeSegment } = await params;

	const categories = await getCategories();
	const product = await getMainProductInfo(productId, storeSegment);
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
