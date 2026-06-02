const BULLETS = [
  "Locally Owned & Operated",
  "Family Operated, Not a Hedge Fund",
  "Offer Does Not Change at Closing",
  "Close in As Little as 7 Days",
]

interface WhyUsProps {
  companyName: string
  marketName: string
}

export default function WhyUs({ companyName, marketName }: WhyUsProps) {
  return (
    <section
      className="py-14 px-4"
      style={{
        backgroundColor: "var(--hpg-cream)",
        borderBottom: "1px solid var(--hpg-border)",
      }}
    >
      <div className="hpg-container max-w-3xl text-center">
        <p
          className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--hpg-gold-dark)" }}
        >
          Built on Trust
        </p>
        <h2
          className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight"
          style={{ color: "var(--hpg-black)" }}
        >
          The {companyName} Difference
        </h2>
        <p
          className="text-[16px] sm:text-[17px] leading-relaxed mt-4 mb-7"
          style={{ color: "var(--hpg-charcoal)" }}
        >
          We are a local cash home buyer trusted by {marketName} homeowners. Every offer is underwritten personally. The number we quote you is the number that hits your account at closing. No re-trades, no chip jobs, no surprises.
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
          {BULLETS.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-left bg-white rounded-xl px-4 py-3 shadow-sm"
              style={{ border: "1px solid var(--hpg-border)" }}
            >
              <span className="font-black mt-0.5 shrink-0" aria-hidden style={{ color: "var(--hpg-primary)" }}>
                ✓
              </span>
              <span
                className="text-[14px] sm:text-[15px] font-bold leading-tight"
                style={{ color: "var(--hpg-black)" }}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
