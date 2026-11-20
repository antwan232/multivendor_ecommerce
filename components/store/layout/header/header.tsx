import Link from "next/link";
import UserMenu from "./user-menu/user-menu";
import Cart from "./cart";
import DownloadApp from "./download-app";
import Search from "./search/search";
import { cookies } from "next/headers";
import { Country } from "@/types/types";
import CountryLanguageCurrencySelector from "./country-lang-curr-selector";
import { Badge } from "@/components/ui/badge";

export default async function Header() {
  const storedCookies = await cookies();
  let userCountry: Country = JSON.parse(
    storedCookies.get("userCountry")!.value,
  );

  if (!userCountry)
    userCountry = {
      name: "United States",
      code: "US",
      city: "",
      region: "",
      continent: "",
    };

  return (
    <div className="h-full w-full space-y-4 gap-x-6 lg:flex">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="flex items-center justify-center gap-3 font-mono text-3xl font-extrabold">
            <Badge variant="secondary" className="rounded-sm font-bold">
              TN
            </Badge>{" "}
            ShopNova
          </h1>
        </Link>
        {/* Drop down !!! */}
      </div>

      <div className="flex w-full flex-col justify-between space-y-4">
        <Search />

        <div className="flex">
          <DownloadApp />
          <CountryLanguageCurrencySelector userCountry={userCountry} />
          <Cart />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

