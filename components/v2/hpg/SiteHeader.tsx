"use client"

interface SiteHeaderProps {
  companyName: string
  phoneDisplay: string
  phoneHref: string
  logoUrl?: string
}

export default function SiteHeader({ companyName, phoneDisplay, phoneHref, logoUrl }: SiteHeaderProps) {
  const tel = `tel:${phoneHref}`
  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-black/35 backdrop-blur-sm border-b border-white/10">
      <div className="hpg-container px-3 sm:px-6 h-20 sm:h-24 flex items-center justify-between gap-3">
        <a
          href="/"
          className="flex items-center shrink-0 bg-[#FAF8F2] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-md ring-1 ring-black/10"
          aria-label={companyName}
        >
          {logoUrl ? (
            <img src={logoUrl} alt={companyName} className="h-14 sm:h-16 w-auto" />
          ) : (
            <span
              className="font-display font-black uppercase tracking-tight text-[15px] sm:text-[17px]"
              style={{ color: "var(--hpg-black)" }}
            >
              {companyName}
            </span>
          )}
        </a>
        <a
          href={tel}
          className="hidden sm:inline-flex items-center gap-2 text-white font-display font-black text-[15px] tracking-wide transition-colors hover:text-[var(--hpg-gold)]"
          aria-label={`Call ${phoneDisplay}`}
        >
          <span aria-hidden>📞</span>
          {phoneDisplay}
        </a>
        <a
          href={tel}
          className="sm:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-display font-black text-[13px] uppercase tracking-wide shadow-md"
          style={{ backgroundColor: "var(--hpg-cta)" }}
          aria-label={`Call ${phoneDisplay}`}
        >
          <span aria-hidden>📞</span>
          Call Now
        </a>
      </div>
    </header>
  )
}
