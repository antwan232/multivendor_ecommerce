"use client";

// Next.js
import { useRouter } from "next/navigation";

// Form handling utilities
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// Schema
import { StoreShippingFormSchema } from "@/lib/schemas";

// Server Actions
import { updateStoreDefaultShippingDetails } from "@/actions/store";

// Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Types
import { StoreDefaultShippingType } from "@/lib/types";

// Utils
import { NumberInput } from "@tremor/react";
import { toast } from "sonner";

interface StoreDefaultShippingDetailsProps {
	data?: StoreDefaultShippingType;
	storeUrl: string;
}

export default function StoreDefaultShippingDetails({
	data,
	storeUrl,
}: StoreDefaultShippingDetailsProps) {
	const router = useRouter();

	// Form hook for managing controlled form state and validation
	const form = useForm<z.infer<typeof StoreShippingFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(StoreShippingFormSchema),
		defaultValues: {
			defaultShippingService: data?.defaultShippingService,
			defaultShippingFeePerItem: data?.defaultShippingFeePerItem,
			defaultShippingFeeForAdditionalItem: data?.defaultShippingFeeForAdditionalItem,
			defaultShippingFeeFixed: data?.defaultShippingFeeFixed,
			defaultShippingFeePerKg: data?.defaultShippingFeePerKg,
			defaultDeliveryTimeMin: data?.defaultDeliveryTimeMin,
			defaultDeliveryTimeMax: data?.defaultDeliveryTimeMax,
			returnPolicy: data?.returnPolicy,
		},
	});

	const isFieldsNotUpdated = Object.values(form.formState.dirtyFields).length === 0;

	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (values: z.infer<typeof StoreShippingFormSchema>) => {
		const data = {
			defaultShippingService: values.defaultShippingService,
			defaultShippingFeePerItem: values.defaultShippingFeePerItem,
			defaultShippingFeeForAdditionalItem: values.defaultShippingFeeForAdditionalItem,
			defaultShippingFeePerKg: values.defaultShippingFeePerKg,
			defaultDeliveryTimeMin: values.defaultDeliveryTimeMin,
			defaultDeliveryTimeMax: values.defaultDeliveryTimeMax,
			returnPolicy: values.returnPolicy,
		};

		try {
			// Upserting Shipping default data
			const response = await updateStoreDefaultShippingDetails(storeUrl, data);

			if (response.id) {
				// Displaying success message
				toast.success(`${response.name} Store Default shipping details has been updated.`);

				// Refresh form data
				form.reset(data);

				// Refresh data
				router.refresh();
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
					<CardTitle>Store Default Shipping details</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						id="default-shipping-form"
						onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="defaultShippingService"
								control={form.control}
								render={({ fieldState }) => (
									<Field
										orientation="horizontal"
										className="flex flex-col items-start"
										data-invalid={fieldState.invalid}>
										<Controller
											name="defaultShippingService"
											control={form.control}
											render={({ field, fieldState }) => (
												<Field data-invalid={fieldState.invalid}>
													<FieldLabel htmlFor={field.name}>Shipping Service name</FieldLabel>
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
									</Field>
								)}
							/>

							<div className="flex gap-4">
								<Controller
									name="defaultShippingFeePerItem"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Shipping fee per item</FieldLabel>
											<NumberInput
												defaultValue={field.value}
												onValueChange={field.onChange}
												min={0}
												className="shadow-none! rounded-md"
												aria-invalid={fieldState.invalid}
												id={field.name}
												disabled={isSubmitting}
												aria-disabled={isSubmitting}
												step={0.1}
											/>
											<FieldError errors={[fieldState.error]} />
										</Field>
									)}
								/>
								<Controller
									name="defaultShippingFeeForAdditionalItem"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>
												Shipping fee for additional items
											</FieldLabel>
											<NumberInput
												defaultValue={field.value}
												onValueChange={field.onChange}
												min={0}
												step={0.1}
												className="shadow-none! rounded-md"
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
							<div className="flex  gap-4">
								<Controller
									name="defaultShippingFeePerKg"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Shipping fee per kg</FieldLabel>
											<NumberInput
												step={0.1}
												defaultValue={field.value}
												onValueChange={field.onChange}
												min={0}
												className="shadow-none! rounded-md"
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
									name="defaultShippingFeeFixed"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Fixed shipping fee</FieldLabel>
											<NumberInput
												step={0.1}
												defaultValue={field.value}
												onValueChange={field.onChange}
												min={0}
												className="shadow-none! rounded-md"
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
							<div className="flex  gap-4">
								<Controller
									name="defaultDeliveryTimeMin"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Minimum Delivery time (days)</FieldLabel>
											<NumberInput
												defaultValue={field.value}
												onValueChange={field.onChange}
												min={1}
												className="shadow-none! rounded-md"
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
									name="defaultDeliveryTimeMax"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Maximum Delivery time (days)</FieldLabel>
											<NumberInput
												defaultValue={field.value}
												onValueChange={field.onChange}
												min={1}
												className="shadow-none! rounded-md"
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

							<Controller
								name="returnPolicy"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Return policy</FieldLabel>
										<Textarea
											{...field}
											placeholder="what's the return policy for your store ?"
											className="p-4"
											aria-invalid={fieldState.invalid}
											id={field.name}
											disabled={isSubmitting}
											aria-disabled={isSubmitting}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>

							<Button
								className="flex justify-start w-fit"
								type="submit"
								disabled={data?.id ? (isFieldsNotUpdated ? true : isSubmitting) : isSubmitting}>
								{isSubmitting ? "updating..." : "Save changes"}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
}
