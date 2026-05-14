import { clsx, type ClassValue } from "clsx";
import ColorTheif from "colorthief";
import { twMerge } from "tailwind-merge";
import { Country } from "./types";
import countries from "@/data/countries.json";

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

const DEFAULT_COUNTRY: Country = {
	name: "UnitedStates",
	code: "US",
	city: "",
	continent: "",
};

export const getUserCountry = async (): Promise<Country> => {
	let userCountry: Country = DEFAULT_COUNTRY;

	try {
		const response = await fetch(`https://api.ipinfo.io/lite/me?token=${process.env.IPINFO_TOKEN}`);

		if (!response.ok) throw new Error("There is a problem");

		const data = await response.json();

		userCountry = {
			name: data.name,
			code: data.country_code,
			continent: data.continent,
			city: countries.find((c) => c.code === data.country_code)?.city || "",
		};
	} catch (error) {
		console.error(error);
	}

	return userCountry;
};
