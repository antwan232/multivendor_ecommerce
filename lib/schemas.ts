// Form handling utilities
import * as z from "zod";

// Category form schema
export const CategoryFormSchema = z.object({
	name: z
		.string({
			error: (iss) => {
				if (iss.code === "invalid_type")
					return `Category name must be a ${iss.expected}.`;
				if (!iss.input) return "Category name is required.";
			},
		})
		.min(2, {
			error: (iss) => {
				return `Category name must be at least ${iss.minimum} characters long.`;
			},
		})
		.max(50, {
			error: (iss) => {
				return `Category name cannot exceed ${iss.maximum} characters.`;
			},
		})
		.regex(
			/^[a-zA-Z0-9\s'&-]+$/,
			"Only letters, numbers, and spaces are allowed in the category name."
		),

	image: z
		.object({
			url: z.string({
				error: (iss) => {
					if (iss.code === "invalid_type")
						return `Category image must be a ${iss.expected}.`;
					if (!iss.input) return "Category image is required.";
				},
			}),
		})
		.array()
		.length(1, "Choose a category image."),

	url: z
		.string({
			error: (iss) => {
				if (iss.code === "invalid_type")
					return `Category url must be a ${iss.expected}.`;
				if (!iss.input) return "Category url is required.";
			},
		})
		.min(2, { message: "Category url must be at least 2 characters long." })
		.max(50, { message: "Category url cannot exceed 50 characters." })
		.regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
			message:
				"Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		}),

	featured: z.boolean(),
});

// SubCategory form schema
export const SubCategoryFormSchema = z.object({
	name: z
		.string({
			error: (iss) =>
				iss.code === "invalid_type"
					? `Sub-Category name must be a ${iss.expected}.`
					: "Sub-Category name is required.",
		})
		.min(2, {
			error: (iss) =>
				`Sub-Category name must be at least ${iss.minimum} characters long.`,
		})
		.max(50, {
			error: (iss) =>
				`Sub-Category name cannot exceed ${iss.maximum} characters.`,
		})
		.regex(
			/^[a-zA-Z0-9\s'&-]+$/,
			"Only letters, numbers, and spaces are allowed in the sub-category name."
		),

	image: z
		.object({
			url: z.string({
				error: (iss) =>
					iss.code === "invalid_type"
						? `Sub-Category image must be a ${iss.expected}.`
						: "Sub-Category image is required.",
			}),
		})
		.array()
		.length(1, "Choose a sub-category image."),

	url: z
		.string({
			error: (iss) =>
				iss.code === "invalid_type"
					? `Sub-Category url must be a ${iss.expected}.`
					: "Sub-Category url is required.",
		})
		.min(2, { message: "Sub-Category url must be at least 2 characters long." })
		.max(50, { message: "Sub-Category url cannot exceed 50 characters." })
		.regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
			message:
				"Only letters, numbers, hyphen, and underscore are allowed in the sub-category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		}),

	featured: z.boolean(),
	categoryId: z.uuid("Sub-Category must have a category."),
});

// Store schema
export const StoreFormSchema = z.object({
	name: z
		.string({
			error: (iss) =>
				iss.code === "invalid_type"
					? `Store name must be a ${iss.expected}.`
					: "Store name is required",
		})

		.min(2, { message: "Store name must be at least 2 characters long." })
		.max(50, { message: "Store name cannot exceed 50 characters." })
		.regex(/^(?!.*(?:[-_& ]){2,})[a-zA-Z0-9_ &-]+$/, {
			message:
				"Only letters, numbers, space, hyphen, and underscore are allowed in the store name, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		}),
	description: z
		.string({
			error: (iss) =>
				iss.code === "invalid_type"
					? "Store description is required"
					: `Store description must be a ${iss.expected}`,
		})
		.min(30, {
			message: "Store description must be at least 30 characters long.",
		})
		.max(500, { message: "Store description cannot exceed 500 characters." }),
	email: z.email({
		error: (iss) =>
			iss.code === "invalid_format"
				? "Invalid email format."
				: "Store email is required",
	}),
	phone: z
		.string({
			error: (iss) =>
				iss.code === "invalid_type"
					? `Store phone number must be a ${iss.expected}`
					: "Store phone number is required",
		})
		.regex(/^\+?\d+$/, { message: "Invalid phone number format." }),
	logo: z.object({ url: z.string() }).array().length(1, "Choose a logo image."),
	cover: z
		.object({ url: z.string() })
		.array()
		.length(1, "Choose a cover image."),
	url: z
		.string({
			error: (iss) =>
				iss.code === "invalid_type"
					? `Store url  must be a ${iss.expected}`
					: "Store url is required",
		})
		.min(2, { message: "Store url must be at least 2 characters long." })
		.max(50, { message: "Store url cannot exceed 50 characters." })
		.regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
			message:
				"Only letters, numbers, hyphen, and underscore are allowed in the store url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
		}),
	featured: z.boolean().default(false).optional(),
	status: z.string().default("PENDING").optional(),
});
