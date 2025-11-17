// Form handling utilities
import * as z from "zod";

// Category form schema
export const CategoryFormSchema = z.object({
	name: z
		.string({
			error: (iss) => {
				if (iss.code === "invalid_type") return `Category name must be a ${iss.expected}.`;
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
			url: z
				.string({
					error: (iss) => {
						if (iss.code === "invalid_type") return `Category image must be a ${iss.expected}.`;
						if (!iss.input) return "Category image is required.";
					},
				})
				.length(1, "Choose a category image."),
		})
		.array(),

	url: z
		.string({
			error: (iss) => {
				if (iss.code === "invalid_type") return `Category url must be a ${iss.expected}.`;
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
