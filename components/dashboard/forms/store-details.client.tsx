"use client";

// Next.js
import { useRouter } from "next/navigation";

// Prisma models
import { Store } from "@/lib/generated/prisma/client";

// Form handling utilities
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// Schema
import { StoreFormSchema } from "@/lib/schemas";

// Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload.client";
import { v4 } from "uuid";
import { toast } from "sonner";
import { upsertStoreAction } from "@/actions/store";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface CategoryDetailsProps {
	data?: Store;
}

export default function StoreDetails({ data }: CategoryDetailsProps) {
	const router = useRouter();

	// Form hook for managing controlled form state and validation
	const form = useForm<z.infer<typeof StoreFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(StoreFormSchema),
		defaultValues: {
			name: data?.name ?? "",
			description: data?.description ?? "",
			email: data?.email ?? "",
			phone: data?.phone ?? "",
			featured: data?.featured ?? false,
			logo: data?.logo ? [{ url: data.logo }] : [],
			cover: data?.cover ? [{ url: data.cover }] : [],
			url: data?.url ?? "",
			status: data?.status.toString() ?? "",
		},
	});
	const isFieldsNotUpdated = Object.values(form.formState.dirtyFields).length === 0;
	
	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (values: z.infer<typeof StoreFormSchema>) => {
		console.log("clicked");

		try {
			// Upserting category data
			const response = await upsertStoreAction({
				id: data?.id ? data.id : v4(),
				name: values.name,
				description: values.description,
				email: values.email,
				phone: values.phone,
				logo: values.logo[0].url,
				cover: values.cover[0].url,
				url: values.url,
				featured: values.featured,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			// Displaying success message
			toast.success(data?.id ? "Store has been updated." : `Congratulations! '${response?.name}' Store is now created.`);
			// Redirect or Refresh data
			router.push(`/dashboard/seller/stores/${values.url}`);
		} catch (error: any) {
			// Handling form submission errors from the backend
			toast.error("Oops!", { description: error.toString() });
		}
	};

	return (
		<AlertDialog>
			<Card className="text-start">
				<CardHeader>
					<CardTitle>Store information</CardTitle>
					<CardDescription>{data?.id ? `Update ${data.name} store information.` : "lets create a category, You can edit store later from the store settings page."}</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="upsert-store-form"
						className="overflow-hidden"
						onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<div className="relative py-2 mb-24">
								<Controller
									name="logo"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field
											orientation="horizontal"
											className="absolute z-10 -bottom-15 left-48 w-fit"
											data-invalid={fieldState.invalid}>
											<div className="relative justify-center items-center flex">
												<ImageUpload
													type="profile"
													value={field.value?.map((logo) => logo.url) ?? []}
													disabled={isSubmitting}
													isInvalid={fieldState.invalid}
													onChange={(url) => field.onChange([{ url }])}
													onRemove={(url) => field.onChange([...field.value.filter((image) => image.url !== url)])}
												/>
												{fieldState.invalid && (
													<FieldError
														className="absolute font-bold text-md"
														errors={[fieldState.error]}
													/>
												)}
											</div>
										</Field>
									)}
								/>
								<Controller
									name="cover"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field
											orientation="horizontal"
											className="h-96 relative"
											data-invalid={fieldState.invalid}>
											<ImageUpload
												type="cover"
												className="absolute inset-0"
												value={field.value?.map((logo) => logo.url) ?? []}
												disabled={isSubmitting}
												isInvalid={fieldState.invalid}
												onChange={(url) => field.onChange([{ url }])}
												onRemove={(url) => field.onChange([...field.value.filter((image) => image.url !== url)])}
											/>
											{fieldState.invalid && (
												<FieldError
													className="absolute right-5 top-5 text-xl font-bold"
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
							</div>

							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Store name</FieldLabel>
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
								name="description"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Store description</FieldLabel>
										<Textarea
											placeholder="description"
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
							<div className="flex flex-col gap-6 md:flex-row">
								<Controller
									name="email"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Store email</FieldLabel>
											<Input
												placeholder="Email"
												{...field}
												aria-invalid={fieldState.invalid}
												id={field.name}
												disabled={isSubmitting}
												type="email"
												aria-disabled={isSubmitting}
											/>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
								<Controller
									name="phone"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Store phone</FieldLabel>
											<Input
												placeholder="Phone"
												{...field}
												aria-invalid={fieldState.invalid}
												id={field.name}
												disabled={isSubmitting}
												type="tel"
												aria-disabled={isSubmitting}
											/>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</div>
							<Controller
								name="url"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Store url</FieldLabel>

										<Input
											placeholder="/store-url"
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											disabled={isSubmitting}
											type="text"
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
										<FieldDescription>This Store will appear on the home page</FieldDescription>
									</Field>
								)}
							/>
							<Button
								className="flex justify-start w-fit"
								type="submit"
								disabled={data?.id ? (isFieldsNotUpdated ? true : isSubmitting) : isSubmitting}>
								{isSubmitting ? (data?.id ? "updating..." : "creating...") : data?.id ? "Save store information" : "Create store"}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
}
