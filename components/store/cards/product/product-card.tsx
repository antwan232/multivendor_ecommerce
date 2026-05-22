"use client";

import { ProductType } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Button } from "../../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCardImageSwiper from "./swiper-card-image";

export default function ProductCard({ product }: { product: ProductType }) {
	const { name, slug, rating, sales, variantImages, variants } = product;
	const [variant, setVariant] = useState(variants[0]);
	const { variantSlug, variantName, images, sizes } = variant;

	return (
		<div>
			<div
				className={cn(
					"group w-[190px] min-[480px]:w-[225px] relative transition-all duration-75 bg-white ease-in-out p-4 rounded-t-3xl border border-transparent hover:shadow-xl hover:border-border",
					{
						"": true,
					},
				)}>
				<div className="relative w-full h-full">
					<Link
						href={`/product/${slug}?variant=${variantSlug}`}
						className="w-full relative inline-block overflow-hidden">
						{/* Images Swiper */}
						<ProductCardImageSwiper images={images} />

						{/* Title */}
						<div className="text-sm text-main-primary h-[18px] overflow-hidden overflow-ellipsis line-clamp-1">
							{name} · {variantName}
						</div>
						{/* Rating - Sales */}
						{product.rating > 0 && product.sales > 0 && (
							<div className="flex items-center gap-x-1 h-5">
								<ReactStars
									count={5}
									size={24}
									color="#F5F5F5"
									activeColor="#FFD804"
									value={rating}
									isHalf
									edit={false}
								/>
								<div className="text-xs text-main-secondary">{sales} sold</div>
							</div>
						)}
						{/* Price */}
					</Link>
				</div>
				<div className="hidden group-hover:block absolute -left-px bg-white border border-t-0  w-[calc(100%+2px)] px-4 pb-4 rounded-b-3xl shadow-xl z-30 space-y-2">
					{/* Variant switcher */}

					{/* Action buttons */}
					<div className="flex flex-items gap-x-1">
						<Button>
							<Link href={`/product/${slug}/${variantSlug}`}>Add to cart</Link>
						</Button>
						<Button
							variant="black"
							size="icon"
							onClick={() => {}}>
							<Heart className="w-5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
