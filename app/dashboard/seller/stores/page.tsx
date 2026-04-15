import { cacheTag } from "next/cache";

export default async function StoresPage() {
	"use cache";
	cacheTag("stores");
	return <div>All stores</div>;
}
