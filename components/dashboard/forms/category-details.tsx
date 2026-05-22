"use client";

// Next.js

// Prisma models
import { Category } from "@/lib/generated/prisma/browser";

// Form handling utilities
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// Schema
import { CategoryFormSchema } from "@/lib/schemas";

// UI
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Custom Components
import ImageUpload from "../shared/image-upload";

// Server Actions
import { upsertCategoryAction } from "@/actions/category";

// libs
import { useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

interface CategoryDetailsProps {
	data?: Category;
}

export default function CategoryDetails({ data }: CategoryDetailsProps) {
	const [isCreated, setIsCreated] = useState(false);
	const [id] = useState(v4());

	// Form hook for managing controlled form state and validation
	const form = useForm<z.infer<typeof CategoryFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(CategoryFormSchema),
		defaultValues: {
			name: data?.name ?? "",
			featured: data?.featured ?? false,
			image: data?.image ? [{ url: data.image }] : [],
			url: data?.url ?? "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const isFieldsNotUpdated = Object.values(form.formState.dirtyFields).length === 0;

	const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
		try {
			const newData = {
				id: data?.id ? data.id : id,
				name: values.name,
				image: values.image ? values.image[0].url : data?.image ? data?.image : "",
				url: values.url,
				featured: values.featured,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			// Upserting category data
			const response = await upsertCategoryAction(newData);

			// Displaying success message
			toast.success(
				data?.id || isCreated
					? "Category has been updated."
					: `Congratulations! '${response.name}' is now created.`,
			);

			if (!data?.id) setIsCreated(true);

			form.reset({ ...values });
		} catch (error: any) {
			// Handling form submission errors from the backend
			toast.error("Oops!", { description: error.toString() });
		}
	};

	return (
		<AlertDialog>
			<Card className="text-start">
				<CardHeader>
					<CardTitle>Category information</CardTitle>
					<CardDescription>
						{data?.id
							? `Update ${data.name} category information.`
							: "lets create a category, You can edit category later from the categories table or category page."}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="upsert-category-form"
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
											isInvalid={fieldState.invalid}
											onChange={(url) => field.onChange([{ url }])}
											onRemove={(url) =>
												field.onChange([...field.value.filter((image) => image.url !== url)])
											}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Category name</FieldLabel>
										<Input
											placeholder="Name"
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											disabled={isSubmitting}
											aria-disabled={isSubmitting}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>

							<Controller
								name="url"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Category url</FieldLabel>
										<Input
											placeholder="URL"
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											disabled={isSubmitting}
											aria-disabled={isSubmitting}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								name="featured"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										orientation="vertical">
										<div className="flex gap-2">
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={isSubmitting}
												aria-disabled={isSubmitting}
											/>
											<FieldLabel>Featured</FieldLabel>
										</div>
										<FieldDescription>This Category will appear on the home page</FieldDescription>
									</Field>
								)}
							/>
							<Button
								className="flex justify-start w-fit"
								type="submit"
								disabled={
									data?.id || isCreated ? (isFieldsNotUpdated ? true : isSubmitting) : isSubmitting
								}>
								{isSubmitting
									? data?.id
										? "updating..."
										: "creating..."
									: data?.id || isCreated
										? "Save category information"
										: "Create category"}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
}
