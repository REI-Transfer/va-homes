// ── ZIP allowlist, scoped per state (additive to the state gate) ──────────────
// NEXT_PUBLIC_SERVICE_ZIPS_BY_STATE is a JSON object keyed by 2-letter state code,
// e.g. {"VA":["23320","23321"]}. It NEVER widens the state gate; it only narrows a
// state that has an entry. A malformed / unset / empty value degrades to {} (no ZIP
// gate) so behaviour is byte-identical to no variable at all — that is the rollback.
export function parseZipsByState(raw: string | undefined): Record<string, string[]> {
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
    const out: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (!Array.isArray(v)) continue;
      const zips = v.map((z) => String(z).replace(/[^0-9]/g, "").slice(0, 5)).filter((z) => z.length === 5);
      if (zips.length) out[String(k).trim().toUpperCase()] = zips;
    }
    return out;
  } catch {
    return {};
  }
}

// The per-state ZIP decision, run AFTER the state gate has already passed:
//   - the state has no ZIP list           -> accept (keeps CA / NJ exactly as today)
//   - the state has a list, ZIP present    -> must be in the list, else reject
//   - postal_code missing / not 5 digits   -> FAIL OPEN (accept). Google omits it for
//                                             imprecise picks and failing closed would
//                                             throw away real leads. Still strictly
//                                             tighter than today's state-only gate.
export function zipAllowedForState(
  state: string | undefined,
  postalCode: string | undefined,
  byState: Record<string, string[]>,
): boolean {
  const list = byState[(state || "").toUpperCase()];
  if (!list || list.length === 0) return true; // no ZIP gate for this state
  const zip = String(postalCode || "").replace(/[^0-9]/g, "").slice(0, 5);
  if (zip.length !== 5) return true; // fail open on a missing / imprecise ZIP
  return list.includes(zip);
}

export function getConfig() {
  const parseJSON = (val: string | undefined, fallback: unknown) => {
    if (!val) return fallback;
    try { return JSON.parse(val); } catch { return fallback; }
  };

  return {
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Your Company Name",
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(555) 000-0000",
    phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF || "5550000000",
    companyDomain: process.env.NEXT_PUBLIC_COMPANY_DOMAIN || "example.com",
    ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || "Our Team",
    serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA || "Your Area",
    serviceStates: (process.env.NEXT_PUBLIC_SERVICE_STATES || "").split(",").filter(Boolean),
    // Per-state ZIP allowlist (additive). Empty {} = no ZIP gate = today's behaviour.
    serviceZipsByState: parseZipsByState(process.env.NEXT_PUBLIC_SERVICE_ZIPS_BY_STATE),
    serviceBounds: parseJSON(process.env.NEXT_PUBLIC_SERVICE_BOUNDS, null) as { south: number; north: number; west: number; east: number } | null,
    accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || "#2563eb",
    logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || "/placeholder-logo.svg",
    headline: process.env.NEXT_PUBLIC_HEADLINE || "Sell Your House Fast for Cash.",
    headlineAccent: process.env.NEXT_PUBLIC_HEADLINE_ACCENT || "No Repairs. No Fees.",
    subheadline: process.env.NEXT_PUBLIC_SUBHEADLINE || "Get a fair cash offer within 24 hours. We help homeowners sell their homes fast for cash.",
    metaTitle: process.env.NEXT_PUBLIC_META_TITLE || "Sell Your House Fast for Cash",
    metaDescription: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Get a fair, no-obligation cash offer on your home within 24 hours.",
    stat1Value: process.env.NEXT_PUBLIC_STAT_1_VALUE || "500+",
    stat1Label: process.env.NEXT_PUBLIC_STAT_1_LABEL || "Homes Bought",
    stat2Value: process.env.NEXT_PUBLIC_STAT_2_VALUE || "10+",
    stat2Label: process.env.NEXT_PUBLIC_STAT_2_LABEL || "Years Experience",
    stat3Value: process.env.NEXT_PUBLIC_STAT_3_VALUE || "5-Star",
    stat3Label: process.env.NEXT_PUBLIC_STAT_3_LABEL || "Google Rating",
    stat4Value: process.env.NEXT_PUBLIC_STAT_4_VALUE || "A+",
    stat4Label: process.env.NEXT_PUBLIC_STAT_4_LABEL || "BBB Rating",
  };
}
