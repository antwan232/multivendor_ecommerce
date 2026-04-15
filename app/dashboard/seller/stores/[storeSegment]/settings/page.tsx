import { getStore } from "@/actions/store";
import StoreDetails from "@/components/dashboard/forms/store-details.client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SellerStoreSettingsPage() {
	const user = await currentUser();
	const storeDetails = await getStore(user!.id);

	if (!storeDetails) redirect("/dashboard");

	return <StoreDetails data={storeDetails} />;
}
