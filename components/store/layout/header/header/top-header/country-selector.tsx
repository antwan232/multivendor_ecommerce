"use client";

import { ArrowDownFreeIcons } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import Dropdown, { arrowVariants } from "@/components/shared/dropdown";
import { DropdownItem } from "@/components/ui/shared/dropdown-item";
import countries from "@/data/countries.json";
import type { Country } from "@/types/types";
import { cn } from "@/lib/utils";

import { MotionHugeiconsIcon } from "../motion-icons";

export default function CountrySelector({
  userCountry,
}: {
  userCountry: Country;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const normalizedQuery = query.trim().toLowerCase();

  const matchRank = (country: (typeof countries)[number]) => {
    const name = country.name.toLowerCase();
    const code = country.code.toLowerCase();

    if (name.startsWith(normalizedQuery) || code.startsWith(normalizedQuery)) {
      return 0;
    }
    if (name.split(/[\s-]+/).some((word) => word.startsWith(normalizedQuery))) {
      return 1;
    }
    return 2;
  };

  const filteredCountries = normalizedQuery
    ? countries
        .map((country) => ({ country, rank: matchRank(country) }))
        .filter(
          ({ country }) =>
            country.name.toLowerCase().includes(normalizedQuery) ||
            country.code.toLowerCase().startsWith(normalizedQuery),
        )
        .sort((a, b) => a.rank - b.rank)
        .map(({ country }) => country)
    : countries;

  const handleCountryClick = async (country: string) => {
    if (isLoading) return;

    const countryData = countries.find((entry) => entry.name === country);
    if (!countryData) return;

    const data: Country = {
      name: countryData.name,
      code: countryData.code,
      city: countryData.city,
      region: countryData.region,
    };

    try {
      setIsLoading(true);
      // Send a POST request to the API endpoint to set the cookie
      const response = await fetch("/api/setUserCountryInCookies", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userCountry: data }),
      });

      if (response.ok) {
        setQuery("");
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dropdown
      isScroll
      position="y"
      setIsOpen={setOpen}
      isOpen={open}
      trigger={
        <>
          <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold">
            <span
              className={`fi flex h-3 w-3 items-center justify-center text-lg font-bold fi-${userCountry.code.toLowerCase()}`}
            ></span>
          </span>
          <div className="flex flex-col items-start gap-1">
            <div>{userCountry.name}</div>
            <div className="text-[.6rem] font-extralight">USD</div>
          </div>
          {isLoading ? (
            <motion.span
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="size-3.5 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            <MotionHugeiconsIcon
              icon={ArrowDownFreeIcons}
              variants={arrowVariants}
              animate={open ? "open" : "close"}
            />
          )}
        </>
      }
      content={
        <div className="relative flex max-h-120 w-52 flex-col text-slate-900">
          <div className="border-light-disabled-foreground/32 border-b focus-within:border-light-disabled-foreground/50 sticky top-0 z-10 bg-white/90 p-2 backdrop-blur-xl">
            <div className="flex items-center bg-white px-4 transition-colors duration-200 w-full h-10  ">
              <input
                type="search"
                name="search"
                autoComplete="off"
                aria-label="Search a country"
                value={query}
                className="text-light-primary-foreground placeholder:text-light-disabled-foreground h-auto w-full rounded-none border-0 bg-transparent p-0 text-base outline-none focus:ring-0"
                placeholder="Search a country"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col gap-4 px-4 py-4",
              isLoading && "pointer-events-none opacity-60",
            )}
          >
            {filteredCountries.length === 0 ? (
              <p className="py-2 text-sm text-gray-500">No countries found</p>
            ) : (
              filteredCountries.map((country) => (
                <DropdownItem
                  key={country.code}
                  className="group-hover/dropdownItem:bg-primary-foreground transition-all duration-150"
                  isSelectedCountry={country.code === userCountry.code}
                  onClick={() => handleCountryClick(country.name)}
                  icon={
                    <span
                      className={`fi flex h-4 w-4 items-center justify-center text-lg font-bold fi-${country.code.toLowerCase()}`}
                    ></span>
                  }
                >
                  <span className="group-hover/dropdownItem:text-primary-dark transition-all duration-150 group-hover/dropdownItem:font-bold">
                    {country.name}
                  </span>
                </DropdownItem>
              ))
            )}
          </div>
        </div>
      }
    />
  );
}
