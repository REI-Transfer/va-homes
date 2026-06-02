interface SiteFooterProps {
  companyName: string
  phoneDisplay: string
  phoneHref: string
  marketName: string
}

export default function SiteFooter({ companyName, phoneDisplay, phoneHref, marketName }: SiteFooterProps) {
  return (
    <footer
      className="text-white pt-14 pb-28 px-4"
      style={{ backgroundColor: "var(--hpg-black)", borderTop: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="hpg-container text-center">
        <div
          className="inline-flex rounded-xl px-4 py-3 mb-5"
          style={{ backgroundColor: "var(--hpg-charcoal)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="font-display font-black uppercase tracking-tight text-white text-[15px]">
            {companyName}
          </span>
        </div>
        <p className="text-[15px] text-white/85 max-w-md mx-auto mb-2 font-medium">
          Family-owned cash home buyer serving {marketName} homeowners. Local Virginia team. Family operated.
        </p>
        <p className="text-[13px] font-bold mb-6" style={{ color: "var(--hpg-gold)" }}>
          Real cash. Real numbers. Real fast.
        </p>

        <a
          href={`tel:${phoneHref}`}
          className="inline-flex items-center gap-2 text-white font-display font-black text-xl mb-6 transition-colors hover:text-[var(--hpg-gold)]"
        >
          <span aria-hidden>📞</span>
          {phoneDisplay}
        </a>

        <p className="text-[10px] italic text-white/55 max-w-xl mx-auto leading-relaxed mb-5">
          Cash offers subject to property eligibility and clear title. Closing timelines depend on title work and seller readiness. No fees, no commissions, no obligation to accept any offer.
        </p>

        <div className="flex justify-center gap-5 flex-wrap mb-4 text-[11px] font-bold uppercase tracking-wider text-white/70">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/advertorial" className="hover:text-white">Read Our Story</a>
        </div>

        <p className="text-[11px] text-white/55 leading-relaxed">
          © {new Date().getFullYear()} {companyName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
