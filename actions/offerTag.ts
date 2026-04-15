"use server";

import { OfferTag } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { cacheTag, updateTag } from "next/cache";

/**
 * @function getAllOfferTags
 * @param storeUrl
 * @description Retrieves all offer tags from the database.
 * @readonly
 * @returns Array of offer tags sorted by updatedAt date in ascending order.
 */
export const getAllOfferTags = async (storeUrl?: string) => {
	"use cache";
	cacheTag(`offerTags-${storeUrl}`);

	let storeId: string | undefined;

	if (storeUrl) {
		// Retrieve the storeId based on the storeUrl
		const store = await prisma.store.findUnique({
			where: {
				url: storeUrl,
			},
		});

		if (!store) {
			return [];
		}

		storeId = store.id;
	}

	// Retrieve all offer tags from the database
	const offerTgas = await prisma.offerTag.findMany({
		where: storeId
			? {
					products: {
						some: {
							storeId: storeId,
						},
					},
				}
			: {},
		include: {
			products: {
				select: {
					id: true,
				},
			},
		},
		orderBy: {
			products: {
				_count: "desc", // Order by the count of associated products in descending order
			},
		},
	});
	return offerTgas;
};

/**
 * @function upsertOfferTag
 * @description Upserts an offer tag into the database, updating if it exists or creating a new one if not.
 * @protected @access Admin only
 * @param offerTag object containing details of the offer tag to be upserted.
 * @returns Updated or newly created offer tag details.
 */
export const upsertOfferTag = async (offerTag: OfferTag) => {
	try {
		// Get current user
		const user = await currentUser();

		// Ensure user is authenticated
		if (!user) throw new Error("Unauthenticated.");

		// Verify admin permission
		if (user.privateMetadata.role !== "ADMIN")
			throw new Error("Unauthorized Access: Admin Privileges Required for Entry.");

		// Ensure offer tag data is provided
		if (!offerTag) throw new Error("Please provide offer tag data.");

		// Throw error if offer tag with the same name or URL already exists
		const existingOfferTag = await prisma.offerTag.findFirst({
			where: {
				AND: [
					{
						OR: [{ name: offerTag.name }, { url: offerTag.url }],
					},
					{
						NOT: {
							id: offerTag.id,
						},
					},
				],
			},
		});

		const url = existingOfferTag?.url;

		// Throw error if offer tag with the same name or URL already exists
		if (existingOfferTag) {
			let errorMessage = "";
			if (existingOfferTag.name === offerTag.name) {
				errorMessage = "An offer tag with the same name already exists";
			} else if (existingOfferTag.url === offerTag.url) {
				errorMessage = "An offer tag with the same URL already exists";
			}
			throw new Error(errorMessage);
		}

		// Upsert offer tag into the database
		const offerTagDetails = await prisma.offerTag.upsert({
			where: {
				id: offerTag.id,
			},
			update: offerTag,
			create: offerTag,
		});

		updateTag(`offerTags-${url}`);

		return offerTagDetails;
	} catch (error) {
		// Log and re-throw any errors
		throw error;
	}
};

/**
 * @function getOfferTag
 * @description Retrieves a specific OfferTag from the database.
 * @param offerTagId The ID of the OfferTag to be retrieved.
 * @param url of that related offerTag
 * @readonly
 * @returns Details of the requested OfferTag.
 */
export const getOfferTag = async (offerTagId: string, url: string) => {
	"use cache";
	cacheTag(`offerTags-${url}`);

	// Ensure offerTag ID is provided
	if (!offerTagId) throw new Error("Please provide offer tag ID.");

	// Retrieve the offer tag from the database using the provided ID
	const offerTag = await prisma.offerTag.findUnique({
		where: {
			id: offerTagId,
		},
	});

	// Return the retrieved offer tag details
	return offerTag;
};

/**
 * @function deleteOfferTag
 * @description Deletes an offer tag from the database by its ID.
 * @permission Admin only
 * @protected
 * @param offerTagId: The ID of the offer tag to be deleted.
 * @returns A success message if the offer tag is deleted, or an error if it fails. */
export const deleteOfferTag = async (offerTagId: string) => {
	try {
		// Get current user
		const user = await currentUser();

		// Ensure user is authenticated
		if (!user) throw new Error("Unauthenticated.");

		// Verify admin permission
		if (user.privateMetadata.role !== "ADMIN")
			throw new Error("Unauthorized Access: Admin Privileges Required for Entry.");

		// Ensure the offerTagId is provided
		if (!offerTagId) throw new Error("Please provide the offer tag ID.");

		// Delete offer tag from the database
		const response = await prisma.offerTag.delete({
			where: {
				id: offerTagId,
			},
		});
		updateTag(`offerTags-${response.url}`);
		return response;
	} catch (error) {
		// Log and re-throw any errors
		throw error;
	}
};
