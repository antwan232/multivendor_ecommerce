"use server";

// Prisma
import { Category } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { cacheTag, updateTag } from "next/cache";

/**
 * @function upsertCategory
 * @param {Category} category Category object containing details of the category to be upserted.
 * @description Upserts a category into the database, updating if it exists or creating a new one if not.
 * @protected
 * @access Admin only
 * @returns Updated or newly created category details
 */
export const upsertCategoryAction = async (category: Category) => {
	try {
		// 1) AHUTHENTICATOIN & AUTHORIZATION
		const user = await currentUser();
		if (!user) throw new Error("Unauthenticated");
		if (user.privateMetadata.role !== "ADMIN")
			throw new Error("Unauthorized Access: Admin Previleges Required for Entry.");

		// 2) Ensure category data is provided
		if (!category) throw new Error("Please provide category data.");

		// 3) Ensure that category name or url is unique
		const existingCategory = await prisma.category.findFirst({
			where: {
				AND: [
					{ OR: [{ name: category.name }, { url: category.url }] },
					{
						NOT: {
							id: category.id,
						},
					},
				],
			},
		});

		if (existingCategory) {
			let errorMessage;
			if (existingCategory.name === category.name)
				errorMessage = "A category with the same name already exists";
			if (existingCategory.url === category.url)
				errorMessage = "A category with the same URL already exists";

			throw new Error(errorMessage);
		}

		const categoryDetails = await prisma.category.upsert({
			where: {
				id: category.id,
			},
			create: category,
			update: category,
		});

		return categoryDetails;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * @function getCategories
 * @description Retrieves all categories from the database.
 * @public @readonly
 * @nextCache cache fetched data
 * @cacheTag cats
 * @returns Array of categories sorted by updatedAt date in descending order.
 */
export const getCategories = async () => {
	"use cache";
	cacheTag("cats");

	const categories = await prisma.category.findMany({
		orderBy: {
			updatedAt: "desc",
		},
	});
	return categories;
};

/**
 * @function deleteCategory
 * @description Deletes a category from the database.
 * @protected
 * @access Admin only
 * @param categoryId The ID of the category to be deleted.
 * @returns Response indicating success or failure of the deletion operation.
 */
export const deleteCategory = async (categoryId: string) => {
	// Check if the user is AHUTHENTICATED
	const user = await currentUser();
	if (!user) throw new Error("Unauthenticated.");

	// Check for AUTHORIZATION
	if (user.privateMetadata.role !== "ADMIN")
		throw new Error("Unauthorized Access: Admin Privileges Required for Entry.");

	// Ensure category ID is provided
	if (!categoryId) throw new Error("Please provide category ID.");

	// Delete category from the database
	const response = await prisma.category.delete({
		where: {
			id: categoryId,
		},
	});

	updateTag("cats");
	return response;
};

/**
 * @function getCategory
 * @param categoryId The ID of the category to be retrieved.
 * @description Retrieves a specific category from the database.
 * @public @readonly
 * @nextCache cache fetched data
 * @cacheTag cats
 * @returns Details of the requested category.
 */
export const getCategory = async (categoryId: string) => {
	"use cache";
	cacheTag("cats");

	// Ensure category ID is provided
	if (!categoryId) throw new Error("Please provide category ID.");

	const category = await prisma.category.findUnique({
		where: {
			id: categoryId,
		},
	});
	if (!category) return;

	return category;
};
