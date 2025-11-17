"use client";

// Prisma models
import { Category } from "@/lib/generated/prisma/browser";

// Form handling utilities
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Schema
import { CategoryFormSchema } from "@/lib/schemas";

// React
import { useEffect } from "react";

// Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload";

interface CategoryDetailsProps {
	data?: Category;
	preset: string;
}

export default function CategoryDetails({ data, preset }: CategoryDetailsProps) {
	// Form hook for managing controlled form state and validation
	const form = useForm<z.infer<typeof CategoryFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(CategoryFormSchema),
		defaultValues: {
			name: data?.url ?? "",
			featured: data?.featured ?? false,
			image: data?.image ? [{ url: data.image }] : [],
			url: data?.url ?? "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	// Update from default data when data has changed
	useEffect(() => {
		if (data)
			form.reset({
				name: data?.url,
				featured: data?.featured,
				image: data?.image ? [{ url: data.image }] : [],
				url: data?.url,
			});
	}, [data, form]);

	const handleSubmit = function (values: z.infer<typeof CategoryFormSchema>) {};

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
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-4">
							<FormField
								disabled={isSubmitting}
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem className="flex-1 justify-center">
										<FormControl>
											<ImageUpload
												type="profile"
												preset={preset}
												value={field.value.map((img) => img.url)}
												disabled={isSubmitting}
												onChange={(url) => field.onChange([{ url }])}
												onRemove={(url) =>
													field.onChange([...field.value.filter((image) => image.url !== url)])
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								disabled={isSubmitting}
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Category name</FormLabel>
										<FormControl>
											<Input
												placeholder="Name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								disabled={isSubmitting}
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Category url</FormLabel>
										<FormControl>
											<Input
												placeholder="/category-url"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="featured"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Featured</FormLabel>
											<FormDescription>This Category will appear on the home page</FormDescription>
										</div>
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								disabled={isSubmitting}>
								{isSubmitting
									? "loading..."
									: data?.id
									? "Save category information"
									: "Create category"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
}
