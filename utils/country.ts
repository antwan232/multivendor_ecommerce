import type { Country } from "@/types/types";

export const DEFAULT_COUNTRY: Country = {
  name: "United States",
  code: "US",
  city: "",
  region: "",
};

export function isCountry(value: unknown): value is Country {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    typeof candidate.code === "string" &&
    candidate.code.trim().length === 2
  );
}

/**
 * Safely reads the `userCountry` cookie value.
 * Falls back to `DEFAULT_COUNTRY` when the cookie is missing or malformed.
 */
export function parseCountryCookie(raw: string | null | undefined): Country {
  if (!raw) return DEFAULT_COUNTRY;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!isCountry(parsed)) return DEFAULT_COUNTRY;

    return {
      ...DEFAULT_COUNTRY,
      ...parsed,
      name: parsed.name.trim(),
      code: parsed.code.trim().toUpperCase(),
      city: typeof parsed.city === "string" ? parsed.city : "",
      region: typeof parsed.region === "string" ? parsed.region : "",
    };
  } catch {
    return DEFAULT_COUNTRY;
  }
}
