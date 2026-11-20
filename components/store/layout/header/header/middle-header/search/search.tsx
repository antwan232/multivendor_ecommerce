"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ProductType } from "@/types/types";

import SearchInput from "./search-input";
import SearchResults from "./search-results";

export default function Search({
  products,
  mobile,
}: {
  products: ProductType[];
  mobile?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={() => setIsFocused(true)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsFocused(false);
      }}
      className={cn(
        "relative hidden h-12 flex-8 items-center justify-center lg:flex",
        {
          "flex xl:hidden": mobile,
        },
      )}
    >
      <SearchInput
        inputId={inputId}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
      />
      <SearchResults products={products} open={isFocused} />
    </div>
  );
}

