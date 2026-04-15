"use server";

// Prisma
import { SubCategory } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { cacheTag, updateTag } from "next/cache";

export const upsertSubCategoryAction = async (subcategory: SubCategory) => {
	try {
		// 1) AHUTHENTICATOIN & AUTHORIZATION
		const user = await currentUser();
		if (!user) throw new Error("Unauthenticated");
		if (user.privateMetadata.role !== "ADMIN")
			throw new Error("Unauthorized Access: Admin Previleges Required for Entry.");

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
			if (existingSubCategory.name === subcategory.name)
				errorMessage = "A subcategory with the same name already exists";
			if (existingSubCategory.url === subcategory.url)
				errorMessage = "A subcategory with the same URL already exists";

			throw new Error(errorMessage);
		}

		const subCategoryDetails = await prisma.subCategory.upsert({
			where: {
				id: subcategory.id,
			},
			create: subcategory,
			update: subcategory,
		});

		updateTag("subCategories");
		updateTag("categories");
		return subCategoryDetails;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * @function getSubcategories
 * @description Retrieves subcategories from the database, with options for limiting results and random selection.
 * @param limit Number indicating the maximum number of subcategories to retrieve.
 * @param random Boolean indicating whether to return random subcategories.
 * @readonly
 * @returns List of subcategories based on the provided options. */
export const getSubCategories = async () => {
	"use cache";
	cacheTag("cats");

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

/**
 * @function deleteSubCategory
 * @description Deletes a SubCategory from the database.
 * @protected @access Admin only
 * @param SubCategoryId The ID of the SubCategory to be deleted.
 * @returns Response indicating success or failure of the deletion operation. */
export const deleteSubCategory = async (subCategoryId: string) => {
	// Check if the user is AHUTHENTICATED
	const user = await currentUser();
	if (!user) throw new Error("Unauthenticated.");

	// Check for AUTHORIZATION
	if (user.privateMetadata.role !== "ADMIN")
		throw new Error("Unauthorized Access: Admin Privileges Required for Entry.");

	// Ensure category ID is provided
	if (!subCategoryId) throw new Error("Please provide subcategory ID.");

	// Delete category from the database
	const response = await prisma.subCategory.delete({
		where: {
			id: subCategoryId,
		},
	});

	updateTag("cats");
	return response;
};

/**
 * @function getSubCategory
 * @description Retrieves a specific SubCategory from the database.
 * @readonly
 * @param SubCategoryId The ID of the SubCategory to be retrieved.
 * @returns Details of the requested SubCategory. */
export const getSubCategory = async (subCategoryId: string) => {
	"use cache";
	cacheTag("cats");

	// Ensure category ID is provided
	if (!subCategoryId) throw new Error("Please provide category ID.");

	const subCategory = await prisma.subCategory.findFirst({
		where: {
			id: subCategoryId,
		},
	});

	return subCategory;
};

export const getAllSubCategoriesOfCategory = async (categoryId: string) => {
	"use cache";
	cacheTag("cats");

	// Ensure category ID is provided
	if (!categoryId) throw new Error("Please provide category ID.");

	const subCategory = await prisma.subCategory.findMany({
		where: {
			categoryId,
		},
	});

	return subCategory;
};
