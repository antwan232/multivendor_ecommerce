// Server actions
import { getAllStores } from "@/actions/store";
import { currentUser } from "@clerk/nextjs/server";

// Next.js
import { redirect, RedirectType } from "next/navigation";

export default async function SellerDashboard() {
	const user = await currentUser();

	// Retrieve all the stores associated with the authenticated user
	const stores = await getAllStores(user!.id);

	if (stores.length < 1) {
		redirect("seller/stores/new", RedirectType.push);
	} else {
		redirect(`seller/stores/${stores[0].url}`, RedirectType.push);
	}
}
