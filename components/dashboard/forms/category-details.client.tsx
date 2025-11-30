"use client";

// Next.js
import { useRouter } from "next/navigation";

// Prisma models
import { Category } from "@/lib/generated/prisma/browser";

// Form handling utilities
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// Schema
import { CategoryFormSchema } from "@/lib/schemas";

// Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload.client";
import { v4 } from "uuid";
import { toast } from "sonner";
import { upsertCategoryAction } from "@/actions/category";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

interface CategoryDetailsProps {
	data?: Category;
}

export default function CategoryDetails({ data }: CategoryDetailsProps) {
	const router = useRouter();

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

	const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
		try {
			// Upserting category data
			const response = await upsertCategoryAction({
				id: data?.id ? data.id : v4(),
				name: values.name,
				image: data?.image ?? values.image[0].url,
				url: values.url,
				featured: values.featured,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			// Displaying success message
			toast.success(
				data?.id
					? "Category has been updated."
					: `Congratulations! '${response?.name}' is now created.`
			);

			// Redirect or Refresh data
			if (data?.id) {
				router.refresh();
			} else {
				router.push("/dashboard/admin/categories");
			}
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
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
								disabled={isSubmitting}>
								{isSubmitting
									? data?.id
										? "updating..."
										: "creating..."
									: data?.id
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
