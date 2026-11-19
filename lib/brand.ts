/**
 * lib/brand.ts — the few brand values the property-record form
 * (components/v2/record-survey-card.tsx) and its screens need, read from this site's
 * lib/config.ts (NEXT_PUBLIC_* values, so it works in the browser like the current form).
 */
import { getConfig } from "./config"

export interface Brand {
  companyName: string
  phoneDisplay: string
  phoneHref: string
  /** Area named in the out-of-area screen (NEXT_PUBLIC_SERVICE_AREA). */
  marketName: string
  /** Demo site only (template showroom): always false on this site. */
  showroom: boolean
  /** Screen-out button texts the client (false = calls). NEXT_PUBLIC_PHONE_ACCEPTS_TEXT=0 → "Call Us". */
  phoneAcceptsText: boolean
  /** Property-record form switch and version (NEXT_PUBLIC_RECORD_FORM=one-step). */
  recordForm: boolean
  recordMode: "one-step" | "two-step"
}

const recordFormValue = (process.env.NEXT_PUBLIC_RECORD_FORM ?? "").trim().toLowerCase()

export function clientBrand(): Brand {
  const config = getConfig()
  return {
    companyName: config.companyName,
    phoneDisplay: config.phoneDisplay,
    phoneHref: config.phoneHref,
    marketName: config.serviceArea,
    showroom: false,
    phoneAcceptsText: !["0", "false", "off"].includes((process.env.NEXT_PUBLIC_PHONE_ACCEPTS_TEXT ?? "").trim().toLowerCase()),
    // NEXT_PUBLIC_RECORD_FORM=one-step turns it on. This site's lead handler takes one
    // post per lead (the current form is one-step), so only the one-step version is
    // wired here: any other value keeps the current form. Unset = current form, untouched.
    recordForm: recordFormValue === "one-step",
    recordMode: "one-step",
  }
}

/** The market phrase for copy, e.g. "Virginia" or "your area". */
export function marketPhrase(brand: Brand): string {
  return brand.marketName ? brand.marketName : "your area"
}
