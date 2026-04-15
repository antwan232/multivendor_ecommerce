"use client";

// React
import { FC, useEffect } from "react";

// Form handling utilities
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// Schema
import { ShippingRateFormSchema } from "@/lib/schemas";

// UI Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Actions
import { upsertShippingRate } from "@/actions/store";

// Utils
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { CountryWithShippingRatesType } from "@/lib/types";
import { NumberInput } from "@tremor/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 } from "uuid";

interface ShippingRateDetailsProps {
	data?: CountryWithShippingRatesType;
	storeUrl: string;
}

const ShippingRateDetails: FC<ShippingRateDetailsProps> = ({ data, storeUrl }) => {
	// Initializing necessary hooks
	const router = useRouter(); // Hook for routing

	// Form hook for managing form state and validation
	const form = useForm<z.infer<typeof ShippingRateFormSchema>>({
		mode: "onChange", // Form validation mode
		resolver: zodResolver(ShippingRateFormSchema), // Resolver for form validation
		defaultValues: {
			// Setting default form values from data (if available)
			countryId: data?.countryId,
			countryName: data?.countryName,
			shippingService: data?.shippingRate ? data?.shippingRate.shippingService : "",
			shippingFeePerItem: data?.shippingRate ? data?.shippingRate.shippingFeePerItem : 0,
			shippingFeeForAdditionalItem: data?.shippingRate
				? data?.shippingRate.shippingFeeForAdditionalItem
				: 0,
			shippingFeePerKg: data?.shippingRate ? data?.shippingRate.shippingFeePerKg : 0,
			shippingFeeFixed: data?.shippingRate ? data?.shippingRate.shippingFeeFixed : 0,
			deliveryTimeMin: data?.shippingRate ? data?.shippingRate.deliveryTimeMin : 1,
			deliveryTimeMax: data?.shippingRate ? data?.shippingRate.deliveryTimeMax : 1,
			returnPolicy: data?.shippingRate ? data.shippingRate.returnPolicy : "",
		},
	});

	// Loading status based on form submission
	const isLoading = form.formState.isSubmitting;
	const isFieldsNotUpdated = Object.values(form.formState.dirtyFields).length === 0;

	// Reset form values when data changes
	useEffect(() => {
		if (data) {
			form.reset(data);
		}
	}, [data, form]);

	// Submit handler for form submission
	const handleSubmit = async (values: z.infer<typeof ShippingRateFormSchema>) => {
		try {
			// Upserting category data
			const response = await upsertShippingRate(storeUrl, {
				id: data?.shippingRate ? data.shippingRate.id : v4(),
				countryId: data?.countryId ? data.countryId : "",
				shippingService: values.shippingService,
				shippingFeePerItem: values.shippingFeePerItem,
				shippingFeeForAdditionalItem: values.shippingFeeForAdditionalItem,
				shippingFeePerKg: values.shippingFeePerKg,
				shippingFeeFixed: values.shippingFeeFixed,
				deliveryTimeMin: values.deliveryTimeMin,
				deliveryTimeMax: values.deliveryTimeMax,
				returnPolicy: values.returnPolicy,
				storeId: "",
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			if (response.id) {
				// Displaying success message
				toast("Shipping rates updated sucessfully !");

				form.reset({ ...values });

				// Redirect or Refresh data
				router.refresh();
			}
		} catch (error: any) {
			// Handling form submission errors
			toast.error("Oops!", { description: error.toString() });
		}
	};

	return (
		<AlertDialog>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Shipping Rate</CardTitle>
					<CardDescription>
						Update Shipping rate information for {data?.countryName}.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="upsert-shippingRate-form"
						onSubmit={form.handleSubmit(handleSubmit)}>
						<div className="hidden">
							<Controller
								disabled
								control={form.control}
								name="countryId"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1 ">
										<Input
											aria-invalid={fieldState.invalid}
											{...field}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
						</div>
						<div className="space-y-4">
							<Controller
								disabled
								control={form.control}
								name="countryName"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<Input
											aria-invalid={fieldState.invalid}
											{...field}
										/>
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="shippingService"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											placeholder="Shipping service"
											id={field.name}
										/>

										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="shippingFeePerItem"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<FieldLabel>Shipping fee per item</FieldLabel>
										<NumberInput
											// aria-invalid={fieldState.invalid ? "true" : "false"}
											defaultValue={field.value}
											onValueChange={field.onChange}
											step={0.1}
											min={0}
											className="pl-2 shadow-none! rounded-md"
											placeholder="Shipping fee per item"
										/>

										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="shippingFeeForAdditionalItem"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<FieldLabel>Shipping fee for additional item</FieldLabel>
										<NumberInput
											aria-invalid={fieldState.invalid}
											defaultValue={field.value}
											onValueChange={field.onChange}
											step={0.1}
											min={0}
											className="pl-2 shadow-none! rounded-md"
											placeholder="Shipping fee per item"
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="shippingFeePerKg"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<FieldLabel>Shipping fee per kg</FieldLabel>

										<NumberInput
											aria-invalid={fieldState.invalid}
											defaultValue={field.value}
											onValueChange={field.onChange}
											step={0.1}
											min={0}
											className="pl-2 shadow-none! rounded-md"
											placeholder="Shipping fee per kg"
										/>

										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="shippingFeeFixed"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<FieldLabel>Fixed Shipping fee</FieldLabel>

										<NumberInput
											defaultValue={field.value}
											onValueChange={field.onChange}
											step={0.1}
											aria-invalid={fieldState.invalid}
											min={0}
											className="pl-2 shadow-none! rounded-md"
											placeholder="Fixed shipping fee"
										/>

										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="deliveryTimeMin"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<FieldLabel>Delivery time min </FieldLabel>

										<NumberInput
											aria-invalid={fieldState.invalid}
											defaultValue={field.value}
											onValueChange={field.onChange}
											min={1}
											className="pl-2 shadow-none! rounded-md"
											placeholder="Minimum Delivery time (days)"
										/>

										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="deliveryTimeMax"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<FieldLabel>Delivery time max </FieldLabel>

										<NumberInput
											data-invalid={fieldState.invalid}
											defaultValue={field.value}
											onValueChange={field.onChange}
											min={1}
											className="pl-2 shadow-none! rounded-md"
											placeholder="Maximum Delivery time (days)"
										/>

										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="returnPolicy"
								render={({ field, fieldState }) => (
									<Field
										data-invalid={fieldState.invalid}
										className="flex-1">
										<FieldLabel>Return policy</FieldLabel>

										<Textarea
											{...field}
											aria-invalid={fieldState.invalid}
											placeholder="What's the return policy for your store ?"
											className="p-4"
										/>

										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
						</div>
						<div className="mt-4">
							<Button
								type="submit"
								disabled={
									data?.shippingRate?.id
										? isFieldsNotUpdated
											? true
											: isLoading
										: isFieldsNotUpdated
								}>
								{isLoading ? "updating..." : "Update"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
};

export default ShippingRateDetails;
