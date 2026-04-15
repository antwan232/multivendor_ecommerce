// Form handling utilities
import * as z from "zod";

// Prisma Models
import { ShippingFeeMethod } from "./generated/prisma/enums";

const emptyMessageError = "You can't leave this field empty.";

// Category form schema
export const CategoryFormSchema = z.object({
	name: z
		.string()
		.min(1, emptyMessageError)
		.min(2, {
			error: (iss) => `Category name must be at least ${iss.minimum} characters long.`,
		})
		.max(50, {
			error: (iss) => `Category name cannot exceed ${iss.maximum} characters.`,
		})
		.regex(
			/^[a-zA-Z0-9\s'&-]+$/,
			"Only letters, numbers, and spaces are allowed in the category name.",
		),

	image: z
		.object({
			url: z.string(),
		})
		.array()
		.length(1, "Choose a Category image."),

	url: z
		.string()
		.min(1, "Category url is required")
		.min(2, { error: (iss) => `Category url must be at least ${iss.minimum} characters long.` })
		.max(50, { error: (iss) => `Category url cannot exceed ${iss.maximum} characters.` })
		.regex(
			/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/,
			"Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		),

	featured: z.boolean(),
});

// SubCategory form schema
export const SubCategoryFormSchema = z.object({
	name: z
		.string()
		.min(1, "Sub-Category is required")
		.min(2, {
			error: (iss) => `Sub-Category name must be at least ${iss.minimum} characters long.`,
		})
		.max(50, {
			error: (iss) => `Sub-Category name cannot exceed ${iss.maximum} characters.`,
		})
		.regex(
			/^[a-zA-Z0-9\s'&-]+$/,
			"Only letters, numbers, and spaces are allowed in the sub-category name.",
		),

	image: z
		.object({
			url: z.string(),
		})
		.array()
		.length(1, "Choose a sub-category image."),

	url: z
		.string()
		.min(1, "Sub-Category url is required.")
		.min(2, {
			error: (iss) => `Sub-Category url must be at least ${iss.minimum}} characters long.`,
		})
		.max(50, { error: (iss) => `Sub-Category url cannot exceed ${iss.maximum} characters.` })
		.regex(
			/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/,
			"Only letters, numbers, hyphen, and underscore are allowed in the sub-category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		),

	featured: z.boolean(),
	categoryId: z.uuid("Sub-Category must have a category."),
});

// Store schema
export const StoreFormSchema = z.object({
	name: z
		.string()
		.min(1, "Store name is required")
		.min(2, { error: (iss) => `Store name must be at least ${iss.minimum} characters long.` })
		.max(50, { error: (iss) => `Store name cannot exceed ${iss.maximum} characters.` })
		.regex(
			/^(?!.*(?:[-_& ]){2,})[a-zA-Z0-9_ &-]+$/,
			"Only letters, numbers, space, hyphen, and underscore are allowed in the store name, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		),
	description: z
		.string()
		.min(1, "Store description is required")
		.min(200, {
			error: (iss) => `Store description must be at least ${iss.minimum} characters long.`,
		}),
	email: z.email({
		error: (iss) =>
			iss.code === "invalid_format"
				? "Invalid email format."
				: `Store Email must be a valid with ${iss.expected}`,
	}),
	phone: z
		.string()
		.min(1, "Store phone number is required")
		.regex(/^\+?\d+$/, "Invalid phone number format."),
	logo: z.object({ url: z.string() }).array().length(1, "Choose a logo image."),
	cover: z.object({ url: z.string() }).array().length(1, "Choose a cover image."),
	url: z
		.string()
		.min(1, "Store url is required")
		.min(2, { error: (iss) => `Store url must be at least ${iss.minimum} characters long.` })
		.max(50, { error: (iss) => `Store url cannot exceed ${iss.maximum} characters.` })
		.regex(
			/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/,
			"Only letters, numbers, hyphen, and underscore are allowed in the store url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		),
	featured: z.boolean().default(false).optional(),
	status: z.string().default("PENDING").optional(),
});

// Product schema
export const ProductFormSchema = z.object({
	name: z
		.string()
		.min(1, "Product name is required")
		.min(2, { error: (iss) => `Product name should be at least ${iss.minimum} characters long.` })
		.max(200, { error: (iss) => `Product name cannot exceed ${iss.maximum} characters.` }),
	description: z
		.string()
		.min(1, "Product description is required")
		.min(200, {
			error: (iss) => `Product description should be at least ${iss.minimum} characters long.`,
		}),

	offerTagId: z
		.uuid({
			error: (iss) =>
				iss.code === "invalid_type"
					? `Product offer tag ID must be a valid with ${iss.expected}`
					: "Invalid tag ID format",
		})
		.min(1, "Product offer tag ID is mandatory")
		.optional(),
	variantName: z
		.string()
		.min(1, "Product variant name is required")
		.min(2, {
			error: (iss) => `Product variant name should be at least ${iss.minimum} characters long.`,
		})
		.max(100, {
			error: (iss) => `Product variant name cannot exceed ${iss.maximum} characters.`,
		}),
	variantDescription: z.string().min(1, "Product variant description is required").optional(),
	images: z
		.object({ url: z.string() })
		.array()
		.min(3, { error: (iss) => `Please upload at least ${iss.minimum} images for the product.` })
		.max(6, { error: (iss) => `You can upload up to ${iss.maximum} images for the product.` }),
	variantImage: z.object({ url: z.string() }).array().length(1, "Choose a product variant image"),
	categoryId: z.uuid("Product category ID is required"),
	subCategoryId: z.uuid({
		error: (iss) =>
			iss.code === "invalid_type"
				? `Product sub-category ID must be a valid with ${iss.expected}`
				: "Invalid sub-category ID format",
	}),
	brand: z
		.string()
		.min(1, "Product brand is required")
		.min(2, {
			error: (iss) => `Product brand should be at least ${iss.minimum} characters long.`,
		})
		.max(50, {
			error: (iss) => `Product brand cannot exceed ${iss.maximum} characters.`,
		}),
	sku: z
		.string()
		.min(1, "Product SKU is required")
		.min(6, {
			error: (iss) => `Product SKU should be at least ${iss.minimum} characters long.`,
		})
		.max(50, {
			error: (iss) => `Product SKU cannot exceed ${iss.maximum} characters.`,
		}),
	weight: z.number().min(0.01, "Please provide a valid product weight."),
	keywords: z
		.string()
		.array()
		.min(1, "Product keywords is required")
		.min(5, {
			error: (iss) => `Please provide at least ${iss.minimum} keywords.`,
		})
		.max(10, {
			error: (iss) => `You can provide up to ${iss.maximum} keywords.`,
		}),
	colors: z
		.object({ color: z.string() })
		.array()
		.min(1, "Please provide at least one color.")
		.refine((colors) => colors.every((c) => c.color), "All color inputs must be filled."),
	sizes: z
		.object({
			size: z.string().length(1, "Size is required"),
			quantity: z.number().min(1, "Quantity must be greater than 0."),
			price: z.number().min(0.01, "Price must be greater than 0."),
			discount: z.number().min(0).default(0),
		})
		.array()
		.min(1, "Please provide at least one size.")
		.refine(
			(sizes) => sizes.every((s) => s.size && s.price && s.quantity),
			"All size inputs must be filled correctly.",
		),
	product_specs: z
		.object({ name: z.string(), value: z.string() })
		.array()
		.min(1, "Please provide at least one product spec.")
		.refine(
			(specs) => specs.every((spec) => spec.name && spec.value),
			"All products specs inputs must be flled correctly.",
		),
	variant_specs: z
		.object({ name: z.string(), value: z.string() })
		.array()
		.min(1, "Please provide at least one product-variant spec.")
		.refine(
			(specs) => specs.every((spec) => spec.name && spec.value),
			"All product-variants specs inputs must be flled correctly.",
		),
	questions: z
		.object({ question: z.string(), answer: z.string() })
		.array()
		.min(1, "please provide at least one question per product.")
		.refine(
			(questions) => questions.every((question) => question.question && question.answer),
			"All question inputs must be filled correctly",
		),
	isSale: z.boolean().default(false),
	saleEndDate: z.string().optional(),
	freeShippingForAllCountries: z.boolean().default(false),
	freeShippingCountriesIds: z
		.object({
			id: z.string().optional(),
			label: z.string(),
			value: z.string(),
		})
		.array()
		.optional()
		.refine(
			(ids) => ids?.every((item) => item.label && item.value),
			"Each country must have a valid name and ID.",
		)
		.default([]),
	shippingFeeMethod: z.enum(ShippingFeeMethod),
});

// OfferTag form schema
export const OfferTagFormSchema = z.object({
	name: z
		.string()
		.min(2, { error: (iss) => `Category name must be at least ${iss.minimum} characters long.` })
		.max(50, { error: (iss) => `Category name cannot exceed ${iss.maximum} characters.` })
		.regex(
			/^[a-zA-Z0-9\s&$.%,']+$/,
			"Only letters, numbers, and spaces are allowed in the category name.",
		),
	url: z
		.string()
		.min(2, { error: (iss) => `Category url must be at least ${iss.minimum} characters long.` })
		.max(50, { error: (iss) => `Category url cannot exceed ${iss.maximum} characters.` })
		.regex(
			/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/,
			"Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		),
});

// Store shipping details
export const StoreShippingFormSchema = z.object({
	defaultShippingService: z
		.string()
		.min(1, "Shipping service name is required.")
		.min(2, {
			error: (iss) => `Shipping service name must be at least ${iss.minimum} characters long.`,
		})
		.max(50, { error: (iss) => `Shipping service name cannot exceed ${iss.maximum} characters.` }),
	defaultShippingFeePerItem: z.number(),
	defaultShippingFeeForAdditionalItem: z.number(),
	defaultShippingFeePerKg: z.number(),
	defaultShippingFeeFixed: z.number(),
	defaultDeliveryTimeMin: z.number(),
	defaultDeliveryTimeMax: z.number(),
	returnPolicy: z.string(),
});

export const ShippingRateFormSchema = z.object({
	shippingService: z
		.string("Shipping service name must be a string.")
		.min(1, "Shipping service name is required.")
		.min(2, "Shipping service name must be at least 2 characters long.")
		.max(50, { message: "Shipping service name cannot exceed 50 characters." }),
	countryId: z.uuid().optional(),
	countryName: z.string().optional(),
	shippingFeePerItem: z.number(),
	shippingFeeForAdditionalItem: z.number(),
	shippingFeePerKg: z.number(),
	shippingFeeFixed: z.number(),
	deliveryTimeMin: z.number(),
	deliveryTimeMax: z.number(),
	returnPolicy: z.string().min(1, "Return policy is required."),
});
