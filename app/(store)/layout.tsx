// Components
import CategoriesHeader from "@/components/store/layout/categories-header/categories-header";
import Footer from "@/components/store/layout/footer/footer";
import Header from "@/components/store/layout/header/header";

// React
import { PropsWithChildren } from "react";

export default async function StoreLayout({
	children,
	params,
}: PropsWithChildren<{ params: Promise<{ storeSegment: string }> }>) {
	const { storeSegment } = await params;

	return (
		<div>
			<div>
				<Header />
				<CategoriesHeader storeUrl={storeSegment} />
			</div>
			<div> {children}</div>
			<Footer />
		</div>
	);
}
