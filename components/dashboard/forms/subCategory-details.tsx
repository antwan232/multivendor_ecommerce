"use client";

// Next.js
import { useRouter } from "next/navigation";

// Prisma models
import { SubCategory } from "@/lib/generated/prisma/browser";

// Form handling utilities
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// Schema
import { SubCategoryFormSchema } from "@/lib/schemas";

// Server actions
import { upsertSubCategoryAction } from "@/actions/subcategory";

// Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload";
import { v4 } from "uuid";
import { toast } from "sonner";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Category } from "@/lib/generated/prisma/client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
interface SubCategoryDetailsProps {
	data?: SubCategory;
	categories: Category[];
}

export default function SubCategoryDetails({ data, categories }: SubCategoryDetailsProps) {
	const router = useRouter();

	// Form hook for managing controlled form state and validation
	const form = useForm<z.infer<typeof SubCategoryFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(SubCategoryFormSchema),
		defaultValues: {
			name: data?.name ?? "",
			featured: data?.featured ?? false,
			image: data?.image ? [{ url: data.image }] : [],
			url: data?.url ?? "",
			categoryId: data?.categoryId,
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (values: z.infer<typeof SubCategoryFormSchema>) => {
		try {
			// Upserting category data
			const response = await upsertSubCategoryAction({
				id: data?.id ? data.id : v4(),
				name: values.name,
				image: data?.image ?? values.image[0].url,
				url: values.url,
				featured: values.featured,
				createdAt: new Date(),
				updatedAt: new Date(),
				categoryId: values.categoryId,
			});

			// Displaying success message
			toast.success(
				data?.id
					? "Sub-Category has been updated."
					: `Congratulations! '${response?.name}' is now created.`
			);

			// Redirect or Refresh data
			if (data?.id) {
				router.refresh();
			} else {
				router.push("/dashboard/admin/sub-categories");
			}
		} catch (error: any) {
			// Handling form submission errors from the backend
			toast.error("Oops!", { description: error.toString() });
		}
	};

	// const subCategoryId = data?.id ?? v4();

	// const relatedCategory = categories.filter((cat) => cat.id === subCategoryId);

	return (
		<AlertDialog>
			<Card className="text-start">
				<CardHeader>
					<CardTitle>Sub-Category information</CardTitle>
					<CardDescription>
						{data?.id
							? `Update ${data.name} sub-category information.`
							: "lets create a sub-category, You can edit sub-category later from the categories table or sub-category page."}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="upsert-sub-category-form"
						onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="image"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										orientation="horizontal"
										className="flex flex-col items-start"
										data-invalid={fieldState.invalid}>
										<ImageUpload
											type="profile"
											value={field.value?.map((img) => img.url) ?? []}
											disabled={isSubmitting}
											onChange={(url) => field.onChange([{ url }])}
											onRemove={(url) =>
												field.onChange([...field.value.filter((image) => image.url !== url)])
											}
										/>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Sub-Category name</FieldLabel>
										<Input
											placeholder="Name"
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											disabled={isSubmitting}
											aria-disabled={isSubmitting}
										/>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>

							<Controller
								name="url"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Sub-Category url</FieldLabel>
										<Input
											placeholder="URL"
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											disabled={isSubmitting}
											aria-disabled={isSubmitting}
										/>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>
							<Controller
								name="categoryId"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Choose a Category</FieldLabel>
										<Select
											{...field}
											aria-invalid={fieldState.invalid}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
											disabled={isSubmitting || categories.length === 0}
											aria-disabled={isSubmitting || categories.length === 0}>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a Category"
												/>
											</SelectTrigger>
											<SelectContent>
												{categories.map((category) => (
													<SelectItem
														value={category.id}
														key={category.id}>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>
							<Controller
								name="featured"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										orientation="horizontal">
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled={isSubmitting}
											aria-disabled={isSubmitting}
										/>
										<div className="space-y-1 leading-none">
											<FieldLabel>Featured</FieldLabel>
											<FieldDescription>
												This Sub-Category will appear on the home page
											</FieldDescription>
										</div>
									</Field>
								)}
							/>
							<Button
								className="flex justify-start w-fit"
								type="submit"
								disabled={isSubmitting}>
								{isSubmitting
									? data?.id
										? "updating..."
										: "creating..."
									: data?.id
									? "Save sub-category information"
									: "Create sub-category"}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
}
