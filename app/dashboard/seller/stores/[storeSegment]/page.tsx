export default async function SellerStoreDashboardPage({
	params,
}: {
	params: Promise<{
		storeSegment: string;
	}>;
}) {
	const { storeSegment } = await params;

	return <div>store: {storeSegment}</div>;
}
