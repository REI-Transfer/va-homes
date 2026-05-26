import type { Metadata } from "next"
import { AdvertorialPage } from "@/components/advertorial/advertorial-page"
import { getConfig } from "@/lib/config"

const c = getConfig()
const market = c.serviceArea && c.serviceArea !== "Your Area" ? c.serviceArea.split(",")[0].trim() : "Your Area"

export const metadata: Metadata = {
  title: `Why More ${market} Homeowners Are Selling Their Homes For Cash | ${c.companyName}`,
  description:
    "A simpler way longtime Virginia homeowners are selling as-is. No repairs, no open houses, no agent fees taken out of the price. See if your home qualifies.",
}

export default function AdvertorialRoute() {
  const cfg = getConfig()
  const m = cfg.serviceArea && cfg.serviceArea !== "Your Area" ? cfg.serviceArea.split(",")[0].trim() : ""
  return (
    <main className="relative min-h-screen bg-white">
      <AdvertorialPage
        companyName={cfg.companyName}
        phoneDisplay={cfg.phoneDisplay}
        phoneHref={cfg.phoneHref}
        marketName={m}
        accentColor={cfg.accentColor}
        serviceBounds={cfg.serviceBounds || undefined}
        ownerName={cfg.ownerName}
      />
    </main>
  )
}
