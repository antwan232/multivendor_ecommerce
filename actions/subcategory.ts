"use server";

// Prisma
import { SubCategory } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

export const upsertSubCategoryAction = async (subcategory: SubCategory) => {
	try {
		// 1) AHUTHENTICATOIN & AUTHORIZATION
		const user = await currentUser();
		if (!user) throw new Error("Unauthenticated");
		if (user.privateMetadata.role !== "ADMIN") throw new Error("Unauthorized Access: Admin Previleges Required for Entry.");

		// 2) Ensure category data is provided
		if (!subcategory) throw new Error("Please provide subcategory data.");

		// 3) Ensure that category name or url is unique
		const existingSubCategory = await prisma.subCategory.findFirst({
			where: {
				AND: [
					{ OR: [{ name: subcategory.name }, { url: subcategory.url }] },
					{
						NOT: {
							id: subcategory.id,
						},
					},
				],
			},
		});

		if (existingSubCategory) {
			let errorMessage;
			if (existingSubCategory.name === subcategory.name) errorMessage = "A subcategory with the same name already exists";
			if (existingSubCategory.url === subcategory.url) errorMessage = "A subcategory with the same URL already exists";

			throw new Error(errorMessage);
		}

		const subCategoryDetails = await prisma.subCategory.upsert({
			where: {
				id: subcategory.id,
			},
			create: subcategory,
			update: subcategory,
		});
		return subCategoryDetails;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getSubCategories = async () => {
	const subcategories = await prisma.subCategory.findMany({
		include: {
			category: true,
		},
		orderBy: {
			updatedAt: "desc",
		},
	});
	return subcategories;
};

export const deleteSubCategory = async (subCategoryId: string) => {
	// Check if the user is AHUTHENTICATED
	const user = await currentUser();
	if (!user) throw new Error("Unauthenticated.");

	// Check for AUTHORIZATION
	if (user.privateMetadata.role !== "ADMIN") throw new Error("Unauthorized Access: Admin Privileges Required for Entry.");

	// Ensure category ID is provided
	if (!subCategoryId) throw new Error("Please provide subcategory ID.");

	// Delete category from the database
	const response = await prisma.subCategory.delete({
		where: {
			id: subCategoryId,
		},
	});
	return response;
};

export const getSubCategory = async (subCategoryId: string) => {
	// Ensure category ID is provided
	if (!subCategoryId) throw new Error("Please provide category ID.");

	const subCategory = await prisma.subCategory.findFirst({
		where: {
			id: subCategoryId,
		},
	});
	if (!subCategory) return;

	return subCategory;
};
