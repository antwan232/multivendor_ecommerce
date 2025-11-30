"use server";

// Prisma
import { Store } from "@/lib/generated/prisma/client";

import prisma from "@/lib/prisma";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const upsertStoreAction = async (store: Partial<Store>) => {
	try {
		// 1) AHUTHENTICATOIN & AUTHORIZATION
		const user = await currentUser();
		if (!user) throw new Error("Unauthenticated");
		if (user.privateMetadata.role !== "SELLER") throw new Error("Unauthorized Access: Seller Previleges Required for Entry.");

		// 2) Ensure store data is provided
		if (!store) throw new Error("Please provide store data.");

		// 3) Ensure that store name or url or email or phone is unique
		const existingStore = await prisma.store.findFirst({
			where: {
				AND: [
					{
						OR: [{ name: store.name }, { url: store.url }, { email: store.email }, { phone: store.phone }],
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
			if (existingStore.name === store.name) errorMessage = "A store with the same name already exists";
			if (existingStore.url === store.url) errorMessage = "A store with the same URL already exists";
			if (existingStore.url === store.email) errorMessage = "A store with the same email already exists";
			if (existingStore.url === store.phone) errorMessage = "A store with the same phone already exists";

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

		revalidatePath(`/dashboard/seller/stores/${storeDetails.url}`);

		return storeDetails;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
