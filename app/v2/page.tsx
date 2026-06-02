import { Figtree, Inter } from "next/font/google";
import SiteHeader from "@/components/v2/hpg/SiteHeader";
import Hero from "@/components/v2/hpg/Hero";
import WhyUs from "@/components/v2/hpg/WhyUs";
import Reviews from "@/components/v2/hpg/Reviews";
import SiteFooter from "@/components/v2/hpg/SiteFooter";
import StickyTopBar from "@/components/v2/hpg/StickyTopBar";
import { HPG_STYLE_BLOCK } from "@/components/v2/hpg/hpg-tokens";
import { getConfig } from "@/lib/config";
import { HEADLINE_OVERRIDES, DEFAULT_HEADLINE } from "@/lib/headline-overrides";

// Force dynamic rendering so searchParams is read on every request and Vercel
// never serves a stale cached variant with the wrong headline. Server-rendered,
// no flash, no client hydration cost.
export const dynamic = "force-dynamic";

// Match HPG: Figtree for display, Inter for body. Loaded only on /v2.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-hpg-display",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hpg-sans",
  display: "swap",
});

/**
 * Sanitize the raw utm_content for safe matching.
 * - Strip anything outside [A-Za-z0-9_-]
 * - Cap to 100 chars
 * XSS guard: we never render the raw UTM. We only match it against a regex
 * ladder and read the H1/sub from the whitelist. See:
 * ~/.claude/projects/-Users-williamyu/memory/feedback_ad-name-scent-contract.md
 */
function sanitizeUtm(raw: string | undefined): string {
  if (!raw) return "";
  return raw.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 100);
}

// Next.js 16 made searchParams ASYNC (a Promise). Server components must
// await it before accessing properties. Sync access silently returns undefined
// and breaks the scent matcher. See:
// ~/.claude/projects/-Users-williamyu/memory/feedback_next16-searchparams-async.md
export default async function V2Page({
  searchParams,
}: {
  searchParams: Promise<{ utm_content?: string }>;
}) {
  const params = await searchParams;
  const utm = sanitizeUtm(params?.utm_content);

  // First match wins. Falls back to DEFAULT_HEADLINE for organic / unmapped.
  const matched = HEADLINE_OVERRIDES.find((row) => row.match.test(utm));
  const heroH1 = matched?.h1 ?? DEFAULT_HEADLINE.h1;
  const heroSub = matched?.sub ?? DEFAULT_HEADLINE.sub;

  const config = getConfig();
  // VA's config has no `marketName` field. Use serviceArea if it's a real
  // value, otherwise default to "Virginia" so the urgency banner reads
  // "June Cash Offer Window for Virginia".
  const marketName =
    config.serviceArea && config.serviceArea !== "Your Area"
      ? config.serviceArea
      : "Virginia";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HPG_STYLE_BLOCK }} />
      <main
        data-hpg-page
        className={`${figtree.variable} ${inter.variable}`}
        style={{ backgroundColor: "var(--hpg-cream)" }}
      >
        <StickyTopBar phoneDisplay={config.phoneDisplay} phoneHref={config.phoneHref} />
        <SiteHeader
          companyName={config.companyName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          logoUrl={config.logoUrl}
        />
        <Hero marketName={marketName} h1={heroH1} sub={heroSub} />
        <WhyUs companyName={config.companyName} marketName={marketName} />
        <Reviews />
        <SiteFooter
          companyName={config.companyName}
          phoneDisplay={config.phoneDisplay}
          phoneHref={config.phoneHref}
          marketName={marketName}
        />
      </main>
    </>
  );
}
