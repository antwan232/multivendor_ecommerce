"use server";

// Prisma
import { ShippingRate, Store } from "@/lib/generated/prisma/client";

import prisma from "@/lib/prisma";
import { StoreDefaultShippingType } from "@/lib/types";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { cacheLife, cacheTag, updateTag } from "next/cache";

/**
 * @function upsertStoreAction
 * @description Upserts store details into the database, ensuring uniqueness of name,url, email, and phone number.
 * @protected @access Seller Only
 * @param store Partial store object containing details of the store to be upserted.
 * @returns Updated or newly created store details.
 */
export const upsertStoreAction = async (store: Partial<Store>) => {
	try {
		// 1) AHUTHENTICATOIN & AUTHORIZATION
		const user = await currentUser();
		if (!user) throw new Error("Unauthenticated");
		if (user.privateMetadata.role !== "SELLER")
			throw new Error("Unauthorized Access: Seller Previleges Required for Entry.");

		// 2) Ensure store data is provided
		if (!store) throw new Error("Please provide store data.");

		// 3) Ensure that store name or url or email or phone is unique
		const existingStore = await prisma.store.findFirst({
			where: {
				AND: [
					{
						OR: [
							{ name: store.name },
							{ url: store.url },
							{ email: store.email },
							{ phone: store.phone },
						],
					},
					{
						NOT: {
							id: store.id,
						},
					},
				],
			},
		});

		if (existingStore) {
			let errorMessage;
			if (existingStore.name === store.name)
				errorMessage = "A store with the same name already exists";
			if (existingStore.url === store.url)
				errorMessage = "A store with the same URL already exists";
			if (existingStore.email === store.email)
				errorMessage = "A store with the same email already exists";
			if (existingStore.phone === store.phone)
				errorMessage = "A store with the same phone already exists";

			throw new Error(errorMessage);
		}

		const storeDetails = await prisma.store.upsert({
			where: {
				id: store.id,
			},
			// @ts-expect-error: ###
			create: {
				...store,
				user: {
					connect: {
						id: user.id,
					},
				},
			},
			update: store,
		});

		updateTag(`stores-${user.id}}`);

		return storeDetails;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * @function getAllStores
 * @param id The id of current user who own his stores
 * @description using this action to cache all stores who have the same userId as a key to caching in nextjs
 * @returns cached stores for specific user
 */
export const getAllStores = async (id: string) => {
	"use cache";
	cacheTag(`stores-${id}`);

	return await prisma.store.findMany({
		where: {
			userId: id,
		},
	});
};

export const getStores = async () => {
	try {
		// 1) AHUTHENTICATOIN & AUTHORIZATION
		const user = await currentUser();
		if (!user) throw new Error("Unauthenticated");
		if (user.privateMetadata.role !== "SELLER")
			throw new Error("Unauthorized Access: Seller Previleges Required.");

		const stores = await getAllStores(user.id);

		return stores;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * @function getStoreDefaultShippingDetails
 * @description Fetches the default shipping details for a store based on the store URL.
 * @param storeUrl The URL of the store to fetch default shipping details for.
 * @returns An object containing default shipping details, including shipping service, fees, delivery times, and return policy. */
export const getStoreDefaultShippingDetails = async (storeUrl: string) => {
	"use cache";
	cacheTag(`storeDefault-${storeUrl}`);

	try {
		if (!storeUrl) throw new Error("Store URL is required.");

		const store = await prisma.store.findUnique({
			where: {
				url: storeUrl,
			},
			select: {
				defaultShippingService: true,
				defaultShippingFeePerItem: true,
				defaultShippingFeeForAdditionalItem: true,
				defaultShippingFeePerKg: true,
				defaultShippingFeeFixed: true,
				defaultDeliveryTimeMin: true,
				defaultDeliveryTimeMax: true,
				returnPolicy: true,
				id: true,
			},
		});

		if (!store) throw new Error("Store not found.");

		return store;
	} catch (error) {
		throw error;
	}
};

export const getStore = async (userId: string, storeUrl: string) => {
	"use cache";
	cacheTag(`stores-${userId}`);

	return await prisma.store.findUnique({
		where: {
			userId,
			url: storeUrl,
		},
	});
};

/**
 * @function updateStoreDefaultShippingDetails
 * @description Updates the default shipping details for a store based on the store URL.
 * @param storeUrl The URL of the store to update.
 * @param details An object containing the new shipping details (shipping service, fees, delivery times, and return policy).
 * @protected @access seller
 * @returns The updated store object with the new default shipping details.
 */
export const updateStoreDefaultShippingDetails = async (
	storeUrl: string,
	details: Partial<StoreDefaultShippingType>,
) => {
	try {
		// Get current user
		const user = await currentUser();

		// Ensure user is authenticated
		if (!user) throw new Error("Unauthenticated.");

		// Verify seller permission
		if (user.privateMetadata.role !== "SELLER")
			throw new Error("Unauthorized Access: Seller Privileges Required for Entry.");

		// Ensure the store URL is provided
		if (!storeUrl) throw new Error("Store URL is required.");

		// Ensure at least one detail is provided for update
		if (!details) {
			throw new Error("No shipping details provided to update.");
		}
		// Make sure seller is updating their own store
		const check_ownership = await getStore(user.id, storeUrl);

		if (!check_ownership)
			throw new Error("Make sure you have the permissions to update this store");

		// Find and update the store based on storeUrl
		const updatedStore = await prisma.store.update({
			where: {
				url: storeUrl,
				userId: user.id,
			},
			data: details,
		});

		updateTag(`storeDefault-${storeUrl}`);

		return updatedStore;
	} catch (error) {
		throw error;
	}
};

/**
 * @function getStoreShippingRates
 * @description Retrieves all countries and their shipping rates for a specific store If a country does not have a shipping rate, it is still included in the result with a null shippingRate.
 * @param
 * @returns Array of objects where each object contains a country and its associated shippingRate, sorted by country name.
 */
export const getStoreShippingRates = async (storeUrl: string) => {
	try {
		// Get current user
		const user = await currentUser();

		// Ensure user is authenticated
		if (!user) throw new Error("Unauthenticated.");

		// Verify seller permission
		if (user.privateMetadata.role !== "SELLER")
			throw new Error("Unauthorized Access: Seller Privileges Required for Entry.");

		// Ensure the store URL is provided
		if (!storeUrl) throw new Error("Store URL is required.");

		// Make sure seller is updating their own store
		const check_ownership = await getStore(user.id, storeUrl);

		if (!check_ownership)
			throw new Error("Make sure you have the permissions to update this store");

		// Get store details
		const store = await getStore(user.id, storeUrl);

		if (!store) throw new Error("Store could not be found.");

		// Retrieve all countries
		const countries = await getCountries();

		// Retrieve all shipping rates for the specified store
		const shippingRates = await getShippingRatesFromStore(store.id);

		// Create a map for quick lookup of shipping rates by country ID
		const rateMap = new Map();
		shippingRates.forEach((rate) => {
			rateMap.set(rate.countryId, rate);
		});

		// Map countries to their shipping rates
		const result = countries.map((country) => ({
			countryId: country.id,
			countryName: country.name,
			shippingRate: rateMap.get(country.id) || null,
		}));

		return result;
	} catch (error) {
		throw error;
	}
};

/**
 * @function getCountries
 * @description retrieve all the countries ASC
 * @returns countries
 */
export const getCountries = async () => {
	"use cache";
	cacheTag("countries");
	cacheLife("weeks");

	return await prisma.country.findMany({
		orderBy: {
			name: "asc",
		},
	});
};

/**
 * @function getShippingRatesFromStore
 * @description retireve shippingRaates from specific store
 * @return array of shippingRates
 */
export const getShippingRatesFromStore = async (id: string) => {
	"use cache";
	cacheTag(`shippingRate-${id}`);

	return await prisma.shippingRate.findMany({
		where: {
			storeId: id,
		},
	});
};

/**
 * @function upsertShippingRate
 * @description Upserts a shipping rate for a specific country, updating if it exists or creating a new one if not.
 * @protected
 * @access Seller
 * @param storeUrl Url of the store you are trying to update.
 * @param shippingRate object containing the details of the shipping rate to be upserted.
 * @returns Updated or newly created shipping rate details.
 */
export const upsertShippingRate = async (storeUrl: string, shippingRate: ShippingRate) => {
	try {
		// Get current user
		const user = await currentUser();

		// Ensure user is authenticated
		if (!user) throw new Error("Unauthenticated.");

		// Verify seller permission
		if (user.privateMetadata.role !== "SELLER")
			throw new Error("Unauthorized Access: Seller Privileges Required for Entry.");

		// Make sure seller is updating their own store
		const check_ownership = await getStore(user.id, storeUrl);

		if (!check_ownership)
			throw new Error("Make sure you have the permissions to update this store");

		// Ensure shipping rate data is provided
		if (!shippingRate) throw new Error("Please provide shipping rate data.");

		// Ensure countryId is provided
		if (!shippingRate.countryId) throw new Error("Please provide a valid country ID.");

		// Get store id
		const store = await getStore(user.id, storeUrl);
		if (!store) throw new Error("Please provide a valid store URL.");

		// Upsert the shipping rate into the database
		const shippingRateDetails = await prisma.shippingRate.upsert({
			where: {
				id: shippingRate.id,
			},
			update: { ...shippingRate, storeId: store.id },
			create: { ...shippingRate, storeId: store.id },
		});

		updateTag(`shippingRate-${store.id}`);

		return shippingRateDetails;
	} catch (error) {
		// Log and re-throw any errors
		throw error;
	}
};
