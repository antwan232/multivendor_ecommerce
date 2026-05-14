"use client";

// React, Nextjs
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Images
import noImage from "@/public/assets/images/no_image.png";

// Utils
import { cn, getDominantColors, getGridClassName } from "@/lib/utils";

// Icons
import { Trash } from "lucide-react";
import ColorPalette from "./color-palette";

interface ImagesPreviewGridProps {
	images: { url: string }[];
	alt: string;
	colors?: { color: string }[];
	setColors: Dispatch<SetStateAction<{color:string}[]>>;
	onRemove: (value: string) => void;
}

export default function ImagesPreviewGrid({
	images,
	onRemove,
	alt,
	colors,
	setColors,
}: ImagesPreviewGridProps) {
	const gridClassName = getGridClassName(images.length);

	const [colorsPalettes, setColorsPalettes] = useState<string[][]>([]);

	useEffect(() => {
		const fetchColors = async () => {
			try {
				const colors = await Promise.all(
					images.map(async (img) => await getDominantColors(img.url))
				);
				setColorsPalettes(colors);
			} catch {
				setColorsPalettes([]);
			}
		};

		if (images.length > 0) fetchColors();
	}, [images]);

	if (images?.length === 0)
		return (
			<div>
				<Image
					src={noImage}
					alt="no image provided"
					className=" rounded-md"
					width={500}
					height={600}
				/>
			</div>
		);

	return (
		<div className="max-w-4xl">
			<div
				className={cn(
					"grid h-[800px] overflow-hidden bg-white rounded-md",
					gridClassName
				)}>
				{images.map((img, i) => (
					<div
						key={img.url}
						className={cn(
							"relative group size-full border border-gray-300",
							`grid_${images.length}_image_${i + 1}`,
							{ "h-[266.66px]": images.length === 6 }
						)}>
						<div
							className={cn(
								"absolute inset-0 bg-white/55 cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center flex-col gap-y-3 duration-500 transition-all",
								{ "!pb-[40%]": images.length === 1 }
							)}>
							<ColorPalette
								colors={colors}
								setColors={setColors}
								extractedColors={colorsPalettes[i]}
							/>
							<button
								className="btn"
								type="button"
								onClick={() => onRemove(img.url)}>
								<div className="sign">
									<Trash size={18} />
								</div>
								<div className="text">Delete</div>
							</button>
						</div>
						<Image
							src={img.url}
							alt={alt}
							width={800}
							height={800}
							className="size-full object-cover object-top"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
