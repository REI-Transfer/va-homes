// Adapter so the advertorial package (articles/CTA/thank-you) reads this repo's config.
import { getConfig } from "@/lib/config"
const c = getConfig()
const market = c.serviceArea && c.serviceArea !== "Your Area" ? c.serviceArea.split(",")[0].trim() : ""
const config = {
  companyName: c.companyName,
  phoneDisplay: c.phoneDisplay,
  phoneHref: c.phoneHref,
  accentColor: c.accentColor,
  ownerName: c.ownerName,
  marketName: market,
  smsKeyword: process.env.NEXT_PUBLIC_SMS_KEYWORD || "OFFER",
} as const
export default config
