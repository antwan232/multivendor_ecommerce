import { User } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx";
import ColorTheif from "colorthief";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getGridClassName = (length: number) => {
	switch (length) {
		case 2:
		case 6:
			return "grid-cols-2";

		case 3:
			return "grid-cols-2 grid-rows-2";

		case 4:
			return "grid-cols-2 grid-rows-1";

		case 5:
			return "grid-cols-2 grid-rows-6";

		default:
			return "";
	}
};

export const getDominantColors = (imgUrl: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = imgUrl;
		img.onload = () => {
			try {
				const colorThief = new ColorTheif();
				const colors = colorThief.getPalette(img, 4).map((color) => {
					// Convert RGB array to hex string
					return `#${((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2])
						.toString(16)
						.slice(1)
						.toUpperCase()}`;
				});
				resolve(colors);
			} catch (error) {
				reject(error);
			}
		};
		img.onerror = () => {
			reject(new Error("Failed to load image"));
		};
	});
};
