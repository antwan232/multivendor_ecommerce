export interface CompareColor {
	name: string;
	value: string;
}

export interface CompareProduct {
	id: string;
	slug: string;
	name: string;
	href: string;
	image: string | null;
	price: number;
	oldPrice: number | null;
	discountPercent: number;
	rating: number;
	numReviews: number;
	category: string;
	brand: string;
	colors: CompareColor[];
	sizes: string[];
	stock: number;
}

