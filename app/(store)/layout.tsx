// (store): layout shell.
import Footer from "@/components/store/layout/footer/footer";
import Header from "@/components/store/layout/header/header-2";
import { parseCountryCookie } from "@/utils/country";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const storedCookies = await cookies();
  const userCountry = parseCountryCookie(
    storedCookies.get("userCountry")?.value,
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header userCountry={userCountry} />

      <main className="w-full flex-1">{children}</main>
      <Footer />
    </div>
  );
}
