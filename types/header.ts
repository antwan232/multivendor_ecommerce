import type { CategoryWithSubCategoryType, ProductType } from "@/types/types";
import type { OfferTag } from "@/lib/generated/prisma/client";

export interface HeaderCartItem {
  src: string;
  title: string;
  available: number;
  price: number;
  quantity: number;
  total: number;
}

export interface HeaderData {
  products: ProductType[];
  categories: CategoryWithSubCategoryType[];
  offerTags: OfferTag[];
}

export interface HeaderLink {
  label: string;
  href: string;
}

