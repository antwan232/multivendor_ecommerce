// Server Actions
import { getAllOfferTags } from "@/actions/offerTag";

// Components
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/columns/offerTags-columns";
import OfferTagDetails from "@/components/dashboard/forms/offerTags-details";

// Plus icon
import { Plus } from "lucide-react";

export default async function AdminOfferTagsPage({
	params,
}: {
	params: Promise<{ storeSegment: string }>;
}) {
	const { storeSegment } = await params;

	// Fetching offer tags data from the database
	const offerTags = await getAllOfferTags(storeSegment);

	// Checking if no offer tags are found
	if (!offerTags) return null; // If no offer tags found, return null

	return (
		<DataTable
			actionButtonText={
				<>
					<Plus size={15} />
					Create offer tag
				</>
			}
			modalChildren={<OfferTagDetails />}
			filterValue="name"
			data={offerTags}
			searchPlaceholder="Search offer tag name..."
			columns={columns}
		/>
	);
}
