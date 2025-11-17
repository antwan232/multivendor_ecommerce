import CategoryDetails from "@/components/dashboard/forms/category-details";

export default function AdminNewCategoryPage() {
	const CLOUDINARY_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
	if (!CLOUDINARY_KEY) return;

	return (
		<div className="w-full text-center">
			<CategoryDetails preset={CLOUDINARY_KEY} />
		</div>
	);
}

