// Server Actions
import { getStore } from "@/actions/store";

// Components
import StoreDetails from "@/components/dashboard/forms/store-details";

// Next
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SellerStoreSettingsPage({
	params,
}: {
	params: Promise<{ storeSegment: string }>;
}) {
	const { storeSegment } = await params;
	const user = await currentUser();

	const storeDetails = await getStore(user!.id, storeSegment);

	if (!storeDetails) redirect("/dashboard");

	return <StoreDetails data={storeDetails} />;
}
