// Clerk
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Next.js
import { redirect, RedirectType } from "next/navigation";

export default async function SellerDashboard() {
	const user = await currentUser();

	// Retrieve all the stores associated with the authenticated user
	const stores = await prisma.store.findMany({
		where: {
			userId: user!.id,
		},
	});

	if (stores.length < 1) {
		redirect("seller/stores/new", RedirectType.push);
	} else {
		redirect(`seller/stores/${stores[0].url}`, RedirectType.push);
	}
}
