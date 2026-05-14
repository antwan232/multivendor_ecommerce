import { getCategories } from "@/actions/category";
import CategoriesHeaderContainer from "./categories-header-container";
import { getAllOfferTags } from "@/actions/offerTag";

export default async function CategoriesHeader({ storeUrl }: { storeUrl: string }) {
	const categories = await getCategories();
	const offerTags = await getAllOfferTags(storeUrl);

	return (
		<div className="w-full pt-2 pb-3 px-0 bg-linear-to-r from-slate-500 to-slate-800">
			<CategoriesHeaderContainer
				categories={categories}
				offerTags={offerTags}
			/>
		</div>
	);
}
