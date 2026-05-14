// Server Actions
import { getStoreDefaultShippingDetails, getStoreShippingRates } from "@/actions/store";

// Components
import StoreDefaultShippingDetails from "@/components/dashboard/forms/store-default-shipping-details";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/columns/shipping-columns";

// Next
import { redirect } from "next/navigation";

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
