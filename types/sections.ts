import type { ProductType } from "@/types/types";

export type ShopCategory = {
  id: string;
  name: string;
  url: string;
  image: string;
};

export type TopSellingProduct = {
	id: string;
	name: string;
	href: string;
	image: string;
	rating: number;
	reviews: number;
	sales: number;
	price: number;
	compareAtPrice: number | null;
};

export type TopSellingSectionData = {
	promo: TopSellingProduct;
	topRate: TopSellingProduct[];
	topItems: TopSellingProduct[];
};

export type OurProductsTab = {
	id: string;
	label: string;
};

export type OurProductsSectionData = {
	products: ProductType[];
	tabs: OurProductsTab[];
	tabIdByProductId: Record<string, string>;
};

