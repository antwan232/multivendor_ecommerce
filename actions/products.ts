"use server";

import prisma from "@/lib/prisma";
import { PrismaModelMap, ProductWithVariantType } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { cacheTag, updateTag } from "next/cache";
import slugify from "slugify";

/**
 * @function upsertProductAction
 * @param product ProductWithVariant object containing details of the product and its variant.
 * @param storeSegment The URL of the store to which the product belongs.
// Returns: Newly created or updated product with variant details.
 * @description Upserts a product and its variant into the database, ensuring proper association with the store.
 * @protected @access Seller Only
 * @returns Newly created or updated product with variant details.
 */
export const upsertProductAction = async (
	product: ProductWithVariantType,
	storeSegment: string,
) => {
	try {
		// 1) AHUTHENTICATOIN & AUTHORIZATION
		const user = await currentUser();
		if (!user) throw new Error("Unauthenticated");
		if (user.privateMetadata.role !== "SELLER")
			throw new Error("Unauthorized Access: Seller Previleges Required for Entry.");

		// 2) Ensure product data is provided
		if (!product) throw new Error("Please provide product data.");

		const existingProduct = await prisma.product.findUnique({
			where: {
				id: product.productId,
			},
		});

		const store = await prisma.store.findUnique({
			where: {
				url: storeSegment,
			},
		});

		if (!store) throw new Error("Store not found.");

		const productSlug = await generateUniqueSlug(
			slugify(product.name, {
				replacement: "-",
				lower: true,
				trim: true,
			}),
			"product",
		);

		const variantSlug = await generateUniqueSlug(
			slugify(product.variantName, {
				replacement: "-",
				lower: true,
				trim: true,
			}),
			"productVariant",
		);

		const commonProductData = {
			name: product.name,
			description: product.description,
			slug: productSlug,
			brand: product.brand,
			questions: {
				create: product.questions.map((q) => ({
					question: q.question,
					answer: q.answer,
				})),
			},
			specs: {
				create: product.product_specs.map((spec) => ({
					name: spec.name,
					value: spec.value,
				})),
			},
			store: {
				connect: {
					id: store.id,
				},
			},
			category: {
				connect: {
					id: product.categoryId,
				},
			},
			subCategory: {
				connect: {
					id: product.subCategoryId,
				},
			},

			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const commonVariantData = {
			variantName: product.variantName,
			variantDescription: product.variantDescription,
			slug: variantSlug,
			isSale: product.isSale,
			saleEndDate: product.isSale ? product.saleEndDate : "",
			sku: product.sku,
			keywords: product.keywords.join(","),
			specs: {
				create: product.variant_specs.map((spec) => ({
					name: spec.name,
					value: spec.value,
				})),
			},
			images: {
				create: product.images.map((img) => ({
					url: img.url,
					alt: img.url.split("/").pop() || "",
				})),
			},
			variantImage: product.variantImage,
			colors: {
				create: product.colors.map((color) => ({
					name: color.color,
				})),
			},
			sizes: {
				create: product.sizes.map((size) => ({
					size: size.size,
					quantity: size.quantity,
					price: size.price,
					discount: size.discount,
				})),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		if (existingProduct) {
			const variantData = {
				...commonVariantData,
				products: {
					connect: {
						id: product.productId,
					},
				},
			};

			await prisma.productVariant.create({ data: variantData });
		} else {
			const productData = {
				...commonProductData,
				id: product.productId,
				productVariants: {
					create: [
						{
							id: product.variantId,
							...commonVariantData,
						},
					],
				},
			};

			const response = await prisma.product.create({ data: productData });
			updateTag(`products-${storeSegment}`);

			return response;
		}

		updateTag(`products-${storeSegment}`);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * @function generateUniqueSlug
 * @description
 * - generate a unique **slug** with unique **suffix**
 * - check if there already a **slug** with the same **base slug**
 * - generate a unique slug if **slug** is the same with **base slug**
 * - add more `suffix ++`
 * - return the unique **slug**
 * @param baseSlug the default slug to generate from
 * @param model prisma model
 * @param field the column of certain model
 * @param seperator the seperate of the generated slug like '-' symbol
 * @returns
 */
const generateUniqueSlug = async <M extends keyof PrismaModelMap>(
	baseSlug: string,
	model: M,
	field: string = "slug",
	seperator: string = "-",
) => {
	let slug = baseSlug;
	let suffix = 1;

	while (true) {
		const currentRecord = await (prisma as PrismaClient)[model].findUnique({
			where: {
				[field]: slug,
			},
		});

		if (!currentRecord) break;

		slug = `${slug}${seperator}${suffix}`;
		suffix += 1;
	}

	return slug;
};

/**
 * @function getProductMainInfo
 * @description Retrieves the main information of a specific product from the database.
 * @readonly @public
 * @param productId The ID of the product to be retrieved.
 * @cacheTag 'products'
 * @nextCache cache fetched products in the server
 * @returns An object containing the main information of the product or null if the product is not found.
 */
export const getMainProductInfo = async (productId: string, url: string) => {
	"use cache";
	cacheTag(`products-${url}`);

	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});

	if (!product) return;

	const { id, name, description, brand, categoryId, subCategoryId, storeId } = product;

	return {
		productId: id,
		name,
		description,
		brand,
		categoryId,
		subCategoryId,
		storeId,
	};
};

/**
 * @function getAllStoreProducts
 * @description Retrieves all products from a specific store based on the store URL.
 * @readonly @public
 * @param storeSegment The URL of the store whose products are to be retrieved.
 * @returns Array of products from the specified store, including category, subcategory, and variant details.
 */
export const getAllStoreProducts = async (storeSegment: string) => {
	"use cache";
	cacheTag(`products-${storeSegment}`);

	const store = await prisma.store.findUnique({
		where: {
			url: storeSegment,
		},
	});

	if (!store) throw new Error("Please provide a valid store segment.");

	const products = await prisma.product.findMany({
		where: {
			storeId: store.id,
		},
		include: {
			category: true,
			subCategory: true,
			productVariants: {
				include: {
					images: true,
					colors: true,
					sizes: true,
				},
			},
			store: {
				select: {
					id: true,
					url: true,
				},
			},
		},
	});

	return products;
};

/**
 * @function deleteProduct
 * @description Deletes a product from the database.
 * @protected @access Seller only
 * @param productId  The ID of the product to be deleted.
 * @return a success message of that specific deleted product
 */
export const deleteProduct = async (productId: string) => {
	// 1) AHUTHENTICATOIN & AUTHORIZATION
	const user = await currentUser();
	if (!user) throw new Error("Unauthenticated");
	if (user.privateMetadata.role !== "SELLER")
		throw new Error("Unauthorized Access: Seller Previleges Required for Entry.");

	// 2) Ensure product data is provided
	if (!productId) throw new Error("Please provide product id.");

	const response = await prisma.product.delete({
		where: {
			id: productId,
		},
	});

	const store = await prisma.store.findUnique({
		where: {
			id: response.storeId,
		},
	});

	updateTag(`products-${store?.url}`);

	return response;
};
