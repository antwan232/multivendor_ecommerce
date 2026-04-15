import { Suspense } from "react";

export default async function SellerStoreDashboardPage({
	params,
}: {
	params: Promise<{
		storeSegment: string;
	}>;
}) {
	return (
		<>
			<Suspense fallback="your store name will shown here...">
				<StoreName params={params} />
			</Suspense>
		</>
	);
}

async function StoreName({ params }: { params: Promise<{ storeSegment: string }> }) {
	const { storeSegment } = await params;

	return <div>store: {storeSegment}</div>;
}
