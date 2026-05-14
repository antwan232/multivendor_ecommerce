import Link from "next/link";
import UserMenu from "./user-menu/user-menu";
import Cart from "./cart";
import DownloadApp from "./download-app";
import Search from "./search/search";
import { cookies } from "next/headers";
import { Country } from "@/lib/types";
import CountryLanguageCurrencySelector from "./country-lang-curr-selector";
import { Badge } from "@/components/ui/badge";

export default async function Header() {
	const storedCookies = await cookies();
	let userCountry: Country = JSON.parse(storedCookies.get("userCountry")!.value);

	if (!userCountry)
		userCountry = {
			name: "United States",
			code: "US",
			city: "",
			continent: "",
		};

	return (
		<header className="bg-linear-to-r from-slate-500 to-slate-800">
			<div className="h-full w-full lg:flex text-white px-4 lg:px-12">
				<div className="flex lg:w-full lg:flex-1 flex-col lg:flex-row gap-3 py-3">
					<div className="flex items-center justify-between">
						<Link href="/">
							<h1 className="font-extrabold text-3xl flex justify-center items-center gap-3 font-mono">
								<Badge variant="secondary" className="rounded-sm font-bold">TN</Badge> ShopNova
							</h1>
						</Link>
						<div className="flex lg:hidden">
							<UserMenu />
							<Cart />
						</div>
					</div>
					<Search />
				</div>
				<div className="hidden lg:flex w-full lg:w-fit lg:mt-2 justify-between mt-1.5 pl-6">
					<div className="lg:flex">
						<DownloadApp />
					</div>
					<CountryLanguageCurrencySelector userCountry={userCountry} />
					<UserMenu />
					<Cart />
				</div>
			</div>
		</header>
	);
}
