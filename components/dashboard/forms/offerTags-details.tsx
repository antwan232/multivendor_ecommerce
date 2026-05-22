"use client";

// React & Next
import { FC, useState } from "react";

// Prisma model
import { OfferTag } from "@/lib/generated/prisma/client";

// Form handling utilities
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// Schema
import { OfferTagFormSchema } from "@/lib/schemas";

// UI Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Server Actions
import { upsertOfferTag } from "@/actions/offerTag";

// Utils
import { toast } from "sonner";
import { v4 } from "uuid";

interface OfferTagDetailsProps {
	data?: OfferTag;
}

const OfferTagDetails: FC<OfferTagDetailsProps> = ({ data }) => {
	const [isCreated, setIsCreated] = useState(false);
	const [id] = useState(v4());


	const form = useForm<z.infer<typeof OfferTagFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(OfferTagFormSchema),
		defaultValues: {
			name: data?.name,
			url: data?.url,
		},
	});

	const {
		formState: { isSubmitting },
	} = form;
	const isFieldsNotUpdated = Object.values(form.formState.dirtyFields).length === 0;

	// Submit handler for form submission
	const handleSubmit = async (values: z.infer<typeof OfferTagFormSchema>) => {
		try {
			// Upserting category data
			const response = await upsertOfferTag({
				id: data?.id ? data.id : id,
				name: values.name,
				url: values.url,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			form.reset({ ...values });

			// Displaying success message
			toast(
				data?.id
					? "Offer tag has been updated."
					: `Congratulations! '${response?.name}' is now created.`,
			);

			if (!data?.id) setIsCreated(true);
		} catch (error: any) {
			// Handling form submission errors from the backend
			toast.error("Oops!", { description: error.toString() });
		}
	};

	return (
		<AlertDialog>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Offer Tag Information</CardTitle>
					<CardDescription>
						{data?.id
							? `Update ${data?.name} offer tag information.`
							: " Lets create an offer tag. You can edit offer tag later from the offer tags table or the offer tag page."}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="upsert-offertag-form"
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4">
						<FieldGroup>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="flex-1"
										data-invalid={fieldState.invalid}>
										<Input
											placeholder="Name"
											{...field}
										/>
										<FieldError errors={[fieldState.error]} />
									</Field>
								)}
							/>
							<Controller
								name="url"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="flex-1"
										data-invalid={fieldState.invalid}>
										<Input
											placeholder="/offer-tag-url"
											{...field}
										/>
										<FieldError errors={[fieldState.error]} />
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
										? "Save offer-tag information"
										: "Create offer-tag"}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AlertDialog>
	);
};

export default OfferTagDetails;
