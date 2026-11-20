import "flag-icons/css/flag-icons.min.css";

import type { Country } from "@/types/types";

import CountrySelector from "./country-selector";
import DiscountOffer from "./discount-offer";
import LanguageSelector from "./language-selector";
import SupportCall from "./support-call";
import TopBarShell from "./top-bar-shell";
import TopNavLinks from "./top-nav-links";

export default function TopHeader({ userCountry }: { userCountry: Country }) {
  return (
    <TopBarShell>
      <SupportCall />
      <DiscountOffer />
      <TopNavLinks />
      <div className="hidden justify-center gap-7 xl:flex">
        <CountrySelector userCountry={userCountry} />
        <LanguageSelector />
      </div>
    </TopBarShell>
  );
}

