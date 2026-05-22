"use client";

// React & Next.js
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// React datetime-picker
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { DateTimePicker } from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

// Prisma models
import { Category, OfferTag, SubCategory } from "@/lib/generated/prisma/client";

// Form handling utilities
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

// Schema
import { ProductFormSchema } from "@/lib/schemas";

// UI Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Custom Components
import ImageUpload from "../shared/image-upload";
import ImagesPreviewGrid from "../shared/images-preview-grid";
import ClickToAdd from "./click-to-add";

// libs
import { format } from "date-fns";
import JoditEditor from "jodit-react";
import { WithOutContext as ReactTags, Tag } from "react-tag-input";
import { toast } from "sonner";
import { v4 } from "uuid";

// Server actions
import { upsertProductAction } from "@/actions/products";
import { getAllSubCategoriesOfCategory } from "@/actions/subcategory";

// Types
import { ProductWithVariantType } from "@/lib/types";
interface ProductDetailsProps {
	data?: Partial<ProductWithVariantType>;
	storeSegment: string;
	categories: Category[];
	offerTags: OfferTag[];
}

type Sizes = {
	size: string;
	price: number;
	quantity: number;
	discount: number;
};

type ProductFormValues = z.input<typeof ProductFormSchema>;

export default function ProductDetails({
	data,
	categories,
	storeSegment,
	offerTags,
}: ProductDetailsProps) {
	// RCC Hooks
	const [isCreated, setIsCreated] = useState(false);
	const pathname = usePathname();

	// Refs for Jodit editor
	const productDecEditor = useRef(null);
	const productVariantDecEditor = useRef(null);

	// States
	const [keywords, setKeywords] = useState<string[]>([]);
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
	const [tempImages, setTempImages] = useState<{ url: string }[]>([]);

	// ClickToAdd states
	// 1) colors
	const [colors, setColors] = useState<{ color: string }[]>([{ color: "" }]);

	// 2) sizes
	const [sizes, setSizes] = useState<Sizes[]>([
		{ size: "", price: 0.01, quantity: 1, discount: 0 },
	]);

	// 3) product | variant Specs
	const [productSpecs, setProductSpecs] = useState<{ name: string; value: string }[]>(
		data?.product_specs ?? [{ name: "", value: "" }],
	);
	const [variantSpecs, setVariantSpecs] = useState<{ name: string; value: string }[]>(
		data?.variant_specs ?? [{ name: "", value: "" }],
	);

	// 4) Questions
	const [questions, setQuestions] = useState<{ question: string; answer: string }[]>(
		data?.questions ?? [{ question: "", answer: "" }],
	);

	const [productId] = useState(v4());
	const [variantId] = useState(v4());

	// Handler Functions
	const handleAddKeyword = (tag: Tag) => {
		if (keywords.length === 10) return;
		setKeywords((prevKeywords) => [...prevKeywords, tag.text]);
	};

	const handleDeleteKeyword = (index: number) => {
		const filteredKeywords = keywords.filter((keyword, i) => i !== index);
		setKeywords(filteredKeywords);
	};

	// Form hook for managing controlled form state and validation
	const form = useForm<ProductFormValues>({
		mode: "onChange",
		reValidateMode: "onChange",
		resolver: zodResolver(ProductFormSchema),
		defaultValues: {
			name: data?.name ?? "",
			description: data?.description ?? "",
			variantName: data?.variantName ?? "",
			variantDescription: data?.variantDescription ?? "",
			images: data?.images ?? [],
			variantImage: data?.variantImage ? [{ url: data.variantImage }] : [],
			categoryId: data?.categoryId ?? "",
			subCategoryId: data?.subCategoryId ?? "",
			brand: data?.brand ?? "",
			sku: data?.sku ?? "",
			colors: data?.colors ?? [],
			sizes: data?.sizes || [],
			keywords: data?.keywords ?? [],
			questions: data?.questions ?? [],
			isSale: data?.isSale ?? false,
			saleEndDate: data?.saleEndDate || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
			weight: data?.weight ?? 0.01,
			freeShippingForAllCountries: data?.freeShippingForAllCountries ?? false,
			freeShippingCountriesIds: data?.freeShippingCountriesIds ?? [],
			shippingFeeMethod: data?.shippingFeeMethod ?? "FIXED",
			offerTagId: data?.offerTagId,
		},
	});

	const categoryId = form.getValues().categoryId;

	// useEffect for get all subcategories when user pick/change a category
	useEffect(() => {
		if (!categoryId) return;
		const getSubcategories = async () => {
			const res = await getAllSubCategoriesOfCategory(categoryId);
			setSubCategories(res);
		};
		getSubcategories();
	}, [categoryId]);

	const isFieldsNotUpdated = Object.values(form.formState.dirtyFields).length === 0;

	const {
		formState: { isSubmitting },
	} = form;

	const isVariant =
		data?.productId &&
		pathname
			.split("/")
			.filter((word) => word === "variants")
			?.join().length
			? true
			: false;

	const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
		try {
			const response = await upsertProductAction(
				{
					productId: data?.productId ? data.productId : productId,
					variantId: data?.variantId ? data.variantId : variantId,
					name: values.name,
					description: values.description,
					variantName: values.variantName,
					variantDescription: values.variantDescription || "",
					variantImage: values?.variantImage ? values.variantImage[0].url : "",
					categoryId: values.categoryId,
					subCategoryId: values.subCategoryId,
					images: values.images,
					isSale: values.isSale || false,
					brand: values.brand,
					sku: values.sku,
					colors: values.colors,
					sizes: values.sizes.map((size) => ({
						...size,
						discount: size.discount ?? 0,
					})),
					keywords: values.keywords,
					questions: values.questions,
					freeShippingCountriesIds: values.freeShippingCountriesIds || [],
					freeShippingForAllCountries: values.freeShippingForAllCountries || false,
					shippingFeeMethod: values.shippingFeeMethod || "FIXED",
					weight: values.weight || 0.01,
					saleEndDate: values.saleEndDate,
					offerTagId: values.offerTagId || "",
					product_specs: values?.product_specs ?? null,
					variant_specs: values?.variant_specs ?? null,
				},
				storeSegment,
			);
			toast.success(
				data?.productId || data?.variantId
					? "Product has been updated."
					: `Congratulations! '${response?.slug}' Product is now created.`,
			);

			form.reset({ ...values });

			if (!data?.productId) setIsCreated(true);
		} catch (error: any) {
			toast.error("Oops!", { description: error.toString() });
		}
	};

	return (
		<AlertDialog>
			<Card className="text-start">
				<CardHeader>
					<CardTitle>Product information</CardTitle>
					<CardDescription>
						{data?.productId && data?.variantId
							? `Update ${data.name} product information.`
							: "lets create a Product, You can edit product later from the store settings page."}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="upsert-store-form"
						className="overflow-hidden"
						onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							{/* Product Image */}
							<div className="flex flex-col gap-y-6 xl:flex-row w-fit gap-x-10">
								<Controller
									name="images"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field
											orientation="horizontal"
											data-invalid={fieldState.invalid}>
											<div>
												<ImagesPreviewGrid
													colors={colors}
													setColors={setColors}
													images={form.getValues("images")}
													alt={"product grid images"}
													onRemove={(url) => {
														const updatedImages = tempImages.filter((image) => image.url !== url);
														setTempImages(updatedImages);
														field.onChange(updatedImages);
													}}
												/>
												{fieldState.invalid && (
													<FieldError
														className="mt-4"
														errors={[fieldState.error]}
													/>
												)}
												<ImageUpload
													dontShowPreview
													type="standard"
													value={field.value?.map((img) => img.url) ?? []}
													disabled={isSubmitting}
													isInvalid={fieldState.invalid}
													onChange={(url) => {
														setTempImages((prevImages) => {
															const updatedImages = [...prevImages, { url }];
															field.onChange(updatedImages);
															return updatedImages;
														});
													}}
													onRemove={(url) =>
														field.onChange([...field.value.filter((image) => image.url !== url)])
													}
												/>
											</div>
										</Field>
									)}
								/>
								{/* Add or Remove Color picker */}
								<div className="flex flex-col gap-y-3 xl:pl-5">
									<ClickToAdd
										colorPicker
										details={data?.colors || colors}
										setDetails={setColors}
										title="Colors"
										initialDetail={{ color: "" }}
									/>

									<FieldError errors={[form.formState.errors.colors]} />
								</div>
							</div>
							{/* Name | VaraintName inputs */}
							<div className="flex flex-col lg:flex-row gap-4">
								<Controller
									name="name"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Product name</FieldLabel>
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
									name="variantName"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Variant name</FieldLabel>
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
							</div>

							{/* Description | Variant Description TABS */}
							<Tabs defaultValue="product">
								<TabsList className="w-full">
									<TabsTrigger value="product">Product Description</TabsTrigger>
									<TabsTrigger value="variant">Variant Description</TabsTrigger>
								</TabsList>
								<TabsContent value="product">
									<Controller
										name="description"
										control={form.control}
										render={({ fieldState, field }) => (
											<Field data-invalid={fieldState.invalid}>
												<JoditEditor
													ref={productDecEditor}
													value={form.getValues().description}
													onChange={(content) => {
														field.onChange(content);
													}}
												/>
												<FieldError errors={[fieldState.error]} />
											</Field>
										)}
									/>{" "}
								</TabsContent>
								<TabsContent value="variant">
									<Controller
										name="variantDescription"
										control={form.control}
										render={({ fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<JoditEditor
													ref={productVariantDecEditor}
													value={form.getValues().variantDescription}
													onChange={(content) => {
														form.setValue("variantDescription", content);
													}}
												/>
												<FieldError errors={[fieldState.error]} />
											</Field>
										)}
									/>{" "}
								</TabsContent>
							</Tabs>

							{/* Category | Sub-Category | Offer-Tag Select Inputs */}
							<div className="flex gap-4">
								<Controller
									name="categoryId"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Product Category</FieldLabel>
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
											<FieldError errors={[fieldState.error]} />
										</Field>
									)}
								/>
								{categoryId && (
									<Controller
										name="subCategoryId"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor={field.name}>Product sub-category</FieldLabel>
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
															placeholder="Select a sub-category"
														/>
													</SelectTrigger>
													<SelectContent>
														{subCategories.map((subCategory) => (
															<SelectItem
																value={subCategory.id}
																key={subCategory.id}>
																{subCategory.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FieldError errors={[fieldState.error]} />
											</Field>
										)}
									/>
								)}
								{/* Offer Tag */}
								<Controller
									disabled={isSubmitting}
									control={form.control}
									name="offerTagId"
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Product OfferTag</FieldLabel>
											<Select
												disabled={isSubmitting || categories.length == 0}
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}>
												<Field>
													<SelectTrigger>
														<SelectValue
															defaultValue={field.value}
															placeholder="Select an offer"
														/>
													</SelectTrigger>
												</Field>
												<SelectContent>
													{offerTags &&
														offerTags.map((offer) => (
															<SelectItem
																key={offer.id}
																value={offer.id}>
																{offer.name}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
											<FieldError errors={[fieldState.error]} />
										</Field>
									)}
								/>
							</div>

							{/* Brand | SKU inputs */}
							<div className="flex flex-col lg:flex-row gap-4">
								<Controller
									name="brand"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Brand</FieldLabel>
											<Input
												placeholder="Brand"
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
									name="sku"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Sku</FieldLabel>
											<Input
												placeholder="Sku"
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
							</div>
							{/* Variant-Image | Keywords */}
							<div className="space-y-3 flex justify-between items-center gap-8 py-14">
								{/* Variant-Image */}
								<div className="flex flex-col gap-y-6 xl:flex-row w-fit gap-x-10">
									<Controller
										name="variantImage"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field
												className="flex-col border-r-2 pr-10"
												orientation="horizontal"
												data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor={field.name}>Variant Image</FieldLabel>
												<ImageUpload
													dontShowPreview
													className=""
													type="profile"
													value={field.value?.map((img) => img.url) ?? []}
													disabled={isSubmitting}
													isInvalid={fieldState.invalid}
													onChange={(url) => field.onChange([{ url }])}
													onRemove={(url) =>
														field.onChange([...field.value.filter((image) => image.url !== url)])
													}
												/>

												{fieldState.invalid && (
													<FieldError
														className="mt-4"
														errors={[fieldState.error]}
													/>
												)}
											</Field>
										)}
									/>
								</div>

								{/* Keywords */}
								<div className="space-y-4 w-full">
									<Controller
										name="keywords"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor={field.name}>Product Keywords</FieldLabel>
												<ReactTags
													handleDelete={() => {}}
													handleAddition={handleAddKeyword}
													placeholder="Keywords (e.g., winter jacket, warm, stylish)"
													classNames={{
														tagInputField:
															"dark:bg-[#192134] border rounded-md p-2 w-full focus:outline-none",
													}}
												/>
												<FieldError errors={[fieldState.error]} />
											</Field>
										)}
									/>
									<div className="flex flex-wrap gap-2">
										{keywords.map((keyword, i) => (
											<div
												key={keyword + i}
												className="text-xs inline-flex items-center px-3 py-1 bg-blue-200 text-blue-700 rounded-full gap-x-2">
												<span>{keyword}</span>
												<span
													className="cursor-pointer"
													onClick={() => handleDeleteKeyword(i)}>
													X
												</span>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Sizes inputs */}
							<div className="flex flex-col gap-y-3">
								<ClickToAdd
									details={sizes}
									setDetails={setSizes}
									title="Sizes, Quantities, Prices, Discounts"
									initialDetail={{
										size: "",
										price: 0.01,
										quantity: 1,
										discount: 0,
									}}
								/>
								<FieldError errors={[form.formState.errors.sizes]} />
							</div>

							{/* Product | Variant Specs */}
							<Tabs defaultValue="productSpecs">
								<TabsList className="w-full">
									<TabsTrigger value="productSpecs">Product specifications</TabsTrigger>
									<TabsTrigger value="variantSpecs">Variant specifications</TabsTrigger>
								</TabsList>
								<TabsContent value="productSpecs">
									<Controller
										name="product_specs"
										control={form.control}
										render={({ fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<ClickToAdd
													details={productSpecs}
													setDetails={setProductSpecs}
													title="Add Or Remove Product specifications right here."
													initialDetail={{
														name: "",
														value: "",
													}}
												/>
												<FieldError errors={[fieldState.error]} />
											</Field>
										)}
									/>
								</TabsContent>
								<TabsContent value="variantSpecs">
									<Controller
										name="variantDescription"
										control={form.control}
										render={({ fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<ClickToAdd
													details={variantSpecs}
													setDetails={setVariantSpecs}
													title="Add Or Remove Product-Variant specifications right here."
													initialDetail={{
														name: "",
														value: "",
													}}
												/>
												<FieldError errors={[fieldState.error]} />
											</Field>
										)}
									/>
								</TabsContent>
							</Tabs>

							{/* Questions inputs */}
							<div className="flex flex-col gap-y-3">
								<ClickToAdd
									details={questions}
									setDetails={setQuestions}
									title="Questions & Answers"
									initialDetail={{
										question: "",
										answer: "",
									}}
								/>
								<FieldError errors={[form.formState.errors.questions]} />
							</div>

							{/* isSale checkbox */}
							<div className="flex border rounded-md p-4">
								<Controller
									name="isSale"
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
												<FieldLabel>On Sale</FieldLabel>
											</div>
											<FieldDescription>Is this product on sale?</FieldDescription>
										</Field>
									)}
								/>

								{form.getValues().isSale && (
									<Controller
										name="saleEndDate"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field
												data-invalid={fieldState.invalid}
												orientation="vertical">
												<DateTimePicker
													onChange={(date) => {
														field.onChange(date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : "");
													}}
													value={field.value ? new Date(field.value) : null}
												/>
											</Field>
										)}
									/>
								)}
							</div>

							<Button
								className="flex justify-start w-fit"
								type="submit"
								disabled={
									data?.productId || isCreated
										? isFieldsNotUpdated
											? true
											: isSubmitting
										: isSubmitting
								}>
								{isSubmitting
									? data?.productId
										? "updating..."
										: "creating..."
									: data?.productId || isCreated
										? "Save products information"
										: "Create products"}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
}
