"use client";

import { useState } from "react";
import CategoriesMenu from "./categories-menu";
import { Category, OfferTag } from "@/lib/generated/prisma/client";
import dynamic from "next/dynamic";

const OfferTagsLinks = dynamic(() => import("./offerTags-links"), {
	ssr: false,
});

export default function CategoriesHeaderContainer({
	categories,
	offerTags,
}: {
	categories: Category[];
	offerTags: OfferTag[];
}) {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div className="w-full px-4 flex items-center gap-x-1">
			{/* Category menu */}
			<CategoriesMenu
				categories={categories}
				open={open}
				setOpen={setOpen}
			/>
			{/* Offer tags links */}
			<OfferTagsLinks
				offerTags={offerTags}
				open={open}
			/>
		</div>
	);
}
