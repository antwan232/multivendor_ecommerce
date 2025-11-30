import StoreDetails from "@/components/dashboard/forms/store-details.client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SellerStoreSettingsPage({
	params,
}: {
	params: Promise<{
		storeSegment: string;
	}>;
}) {
	const { storeSegment } = await params;
	const storeDetails = await prisma.store.findUnique({
		where: {
			url: storeSegment,
		},
	});
  
  if (!storeDetails) redirect("/dashboard");
  
	return <StoreDetails data={storeDetails} />;
}
