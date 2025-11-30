import { getSubCategories } from "@/actions/subcategory";
import { PromiseReturnType } from "@prisma/client";

export interface DashboardSidebarMenuInterface {
	label: string;
	icon: string;
	link: string;
}

export type SubCategoryWithCategoryType = PromiseReturnType<typeof getSubCategories>[0];
