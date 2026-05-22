"use server";

// Prisma
import prisma from "@/lib/prisma";

// Types
import { PrismaModelMap, ProductWithVariantType } from "@/lib/types";
import { PrismaClient } from "@prisma/client";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Next
import { cacheTag, updateTag } from "next/cache";

// Lib
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
			offerTag: true,
			productVariants: {
				include: {
					images: { orderBy: { createdAt: "asc" } },
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

/**
 * @function getProducts
 * @description Retrieves products based on various filters and returns only variants that match the filters. Supports pagination.
 * @access Public
 * @param filters An object containing filter options (category, subCategory, offerTag, size, onSale, onDiscount, brand, color).
 * @param sortBy Sort the filtered results (Most popular, New Arivals, Top Rated...).
 * @param page The current page number for pagination (default = 1).
 * @param pageSize The number of products per page (default = 10).
 * @returns An object containing paginated products, filtered variants, and pagination metadata (totalPages, currentPage, pageSize, totalCount).
 */

export const getProducts = async (filters = {}, sortBy = "", page = 1, pageSize = 10) => {
	// Default values for page and pageSize
	const currentPage = page;
	const limit = pageSize;
	const skip = (currentPage - 1) * limit;

	// Construct the base query
	const whereClause: any = {
		AND: [],
	};

	// Get all filtered, sorted products
	const products = await prisma.product.findMany({
		where: whereClause,
		take: limit,
		skip,
		include: {
			productVariants: {
				include: {
					sizes: true,
					images: true,
					colors: true,
				},
			},
		},
	});

	// Transform the filtered variants into the VariantSimplified structure
	const productWithFilteredVariants = products.map((product) => {
		// Filter the variants based on the filters
		const filteredVariants = product.productVariants;

		// Transform the filtered variants into the VariantSimplified structure
		const variants = filteredVariants.map((variant) => ({
			variantId: variant.productId,
			variantSlug: variant.slug,
			variantName: variant.variantName,
			images: variant.images,
			sizes: variant.sizes,
		}));

		// Extract variant images for the product
		const variantImages = filteredVariants.map((variant) => ({
			url: `/product/${product.slug}/${variant.slug}`,
			image: variant.variantImage ? variant.variantImage : variant.images[0].url,
		}));

		// Return the product in the ProductCardType structure
		return {
			id: product.id,
			slug: product.slug,
			name: product.name,
			rating: product.rating,
			sales: product.sales,
			numReviews: product.numReviews,
			variants,
			variantImages,
		};
	});

	// Retrieve products matching the filters
	const totalCount = products.length;

	// Calculate total pages
	const totalPages = Math.ceil(totalCount / pageSize);

	// Return the paginated data along with metadata
	return {
		products: productWithFilteredVariants,
		totalPages,
		currentPage,
		pageSize,
		totalCount,
	};
};
