import { getAllStoreProducts } from "@/actions/products";
import { getSubCategories } from "@/actions/subcategory";
import { PromiseReturnType } from "@prisma/client";
import { ShippingFeeMethod } from "./generated/prisma/enums";
import { getStoreDefaultShippingDetails } from "@/actions/store";
import {
	Category,
	OfferTag,
	Product,
	ProductVariant,
	ProductVariantImage,
	Question,
	ShippingRate,
	Spec,
	Store,
	SubCategory,
} from "./generated/prisma/client";
import { Color, Size } from "@tremor/react";
import { User } from "@clerk/nextjs/server";

export interface DashboardSidebarMenuInterface {
	label: string;
	icon: string;
	link: string;
}

export type SubCategoryWithCategoryType = PromiseReturnType<typeof getSubCategories>[0];

// Product + variant
export type ProductWithVariantType = {
	productId: string;
	variantId: string;
	name: string;
	description: string;
	variantName: string;
	variantDescription: string;
	images: { id?: string; url: string }[];
	variantImage: string;
	categoryId: string;
	subCategoryId: string;
	isSale: boolean;
	saleEndDate?: string;
	brand: string;
	sku: string;
	weight: number;
	colors: { id?: string; color: string }[];
	sizes: {
		id?: string;
		size: string;
		quantity: number;
		price: number;
		discount: number;
	}[];
	product_specs: {
		name: string;
		value: string;
	}[];
	variant_specs: {
		name: string;
		value: string;
	}[];
	keywords: string[];
	questions: { question: string; answer: string }[];
	freeShippingForAllCountries: boolean;
	freeShippingCountriesIds: { id?: string; label: string; value: string }[];
	shippingFeeMethod: ShippingFeeMethod;
	offerTagId: string;
};

// Store product
export type StoreProductType = PromiseReturnType<typeof getAllStoreProducts>[0];

// Store product
export type StoreDefaultShippingType = PromiseReturnType<typeof getStoreDefaultShippingDetails>;

export type PrismaModelMap = {
	category: Category;
	color: Color;
	offerTag: OfferTag;
	product: Product;
	productVariant: ProductVariant;
	productVariantImage: ProductVariantImage;
	question: Question;
	size: Size;
	spec: Spec;
	store: Store;
	subCategory: SubCategory;
	user: User;
};

export type CountryWithShippingRatesType = {
	countryId: string;
	countryName: string;
	shippingRate: ShippingRate;
};
