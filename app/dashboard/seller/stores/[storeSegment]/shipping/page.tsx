import { getStoreDefaultShippingDetails, getStoreShippingRates } from "@/actions/store";
import StoreDefaultShippingDetails from "@/components/dashboard/forms/store-default-shipping-details.client";
import DataTable from "@/components/ui/data-table";
import { redirect } from "next/navigation";
import { columns } from "./columns";

export default async function SellerStoreShippingPage({
	params,
}: {
	params: Promise<{
		storeSegment: string;
	}>;
}) {
	const { storeSegment } = await params;

	const shippingDetails = await getStoreDefaultShippingDetails(storeSegment);
	if (!shippingDetails) redirect("/");

	const shippingRates = await getStoreShippingRates(storeSegment);

	return (
		<>
			<StoreDefaultShippingDetails
				data={shippingDetails}
				storeUrl={storeSegment}
			/>
			<DataTable
				heading="Shipping rate"
				filterValue="countryName"
				data={shippingRates}
				columns={columns}
				searchPlaceholder="Search by country name..."
			/>
		</>
	);
}
