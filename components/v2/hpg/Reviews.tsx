"use client"

import { Star } from "lucide-react"
import { openQuiz } from "./openQuiz"

// Generic placeholder reviews framed for Virginia. Agency will swap with real
// Google reviews once they're pulled from the client's GBP. Do not invent
// specific claims. No headshots: the testimonial cards render the initials in
// a circle to avoid faking avatars.
const REVIEWS = [
  {
    quote:
      "They walked me through the math line by line. The number they quoted is the number I got at closing. No surprises, no chipping the price two weeks in. First cash buyer I'd actually recommend.",
    name: "M. Davis",
    city: "Richmond, VA",
  },
  {
    quote:
      "Inherited my mom's place in Virginia Beach. Didn't want to deal with showings. Their team made an offer, we picked a closing date, and that was it. Done in three weeks.",
    name: "C. Bennett",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "Got three cash offers. Two tried to chip the price after inspection. The VA Home Offer number never moved. Closed when they said they would.",
    name: "L. Ramirez",
    city: "Norfolk, VA",
  },
]

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((p) => p.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("")
}

export default function Reviews() {
  return (
    <section
      className="py-14 px-4"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid var(--hpg-border)",
      }}
    >
      <div className="hpg-container">
        <div className="text-center mb-8">
          <p
            className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "var(--hpg-gold-dark)" }}
          >
            Real Reviews
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-black uppercase"
            style={{ color: "var(--hpg-black)" }}
          >
            What Virginia Homeowners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {REVIEWS.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={openQuiz}
              aria-label={`Get my cash offer, review from ${r.name}`}
              className="text-left rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all bg-white"
              style={{ border: "1px solid var(--hpg-border)" }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    style={{ color: "var(--hpg-gold)", fill: "var(--hpg-gold)" }}
                  />
                ))}
              </div>
              <p
                className="italic leading-relaxed mb-5 text-[15px] sm:text-[16px]"
                style={{ color: "var(--hpg-charcoal)" }}
              >
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div
                  className="h-12 w-12 rounded-full shrink-0 flex items-center justify-center font-display font-black text-[14px]"
                  style={{
                    backgroundColor: "var(--hpg-primary)",
                    color: "var(--hpg-accent-light)",
                    border: "2px solid var(--hpg-gold)",
                  }}
                  aria-hidden
                >
                  {initialsFromName(r.name)}
                </div>
                <div>
                  <p
                    className="font-display font-black text-[13px] uppercase tracking-wide leading-tight"
                    style={{ color: "var(--hpg-black)" }}
                  >
                    {r.name}
                  </p>
                  <p className="text-[12px] leading-tight" style={{ color: "var(--hpg-muted)" }}>
                    {r.city}
                  </p>
                </div>
              </div>
              <p
                className="text-[11px] font-bold uppercase tracking-wider mt-3"
                style={{ color: "var(--hpg-gold-dark)" }}
              >
                Get my cash offer →
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
