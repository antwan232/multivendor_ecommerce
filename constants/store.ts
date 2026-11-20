export const ALL_PRODUCTS_TAB_ID = "all";
export const OUR_PRODUCTS_TAB_ID_PREFIX = "our-products-tab-";
export const OUR_PRODUCTS_PANEL_ID_PREFIX = "our-products-panel-";

export const CARDS_PER_PAGE = 3;
export const PAGES_PER_PANEL = 5;
export const TOTAL_PANEL_PRODUCTS = CARDS_PER_PAGE * PAGES_PER_PANEL;

import type { HeaderLink } from "@/types/header";

export const topLinks: HeaderLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "My Account", href: "/profile" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Order Tracking", href: "/order" },
];

