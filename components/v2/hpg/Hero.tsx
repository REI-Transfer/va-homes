"use client"

import Image from "next/image"
import QuizCard from "./QuizCard"

const HERO_BULLETS = [
  "No fees taken out. No commissions. No surprises at closing.",
  "Local Virginia team. Family operated. Real people, real cash.",
  "The number we quote is the number that hits your account.",
]

interface HeroProps {
  marketName: string
  /**
   * H1 string. Comes from the override table (scent-matched) or DEFAULT_HEADLINE
   * fallback. Always plain text, never raw UTM, never user input. The override
   * table is the whitelist (XSS guard).
   */
  h1: string
  /** Sub-headline string. Same source as h1. */
  sub: string
}

export default function Hero({ marketName, h1, sub }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/images/adv-home-exterior.jpg"
          alt={`Cash home buyer serving ${marketName}`}
          fill
          className="object-cover opacity-50"
          priority
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90" aria-hidden />
      <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-black/55 to-transparent pointer-events-none" aria-hidden />

      <div className="relative z-10 hpg-container px-4 sm:px-6 pt-32 pb-6 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-start">
          <div className="lg:col-span-7 hpg-fadein text-center lg:text-left">
            {/*
              H1 + sub come from app/v2/page.tsx (server-rendered).
              Dynamic-headline scent: lib/headline-overrides.ts matched against
              sanitized utm_content. Falls back to DEFAULT_HEADLINE.
              Plain text only. See feedback_ad-name-scent-contract.md
            */}
            <h1
              data-headline="dynamic"
              className="font-display text-[1.5rem] sm:text-[2.6rem] lg:text-[3.4rem] font-black leading-[1.05] uppercase mb-2 sm:mb-4"
              style={{ color: "#FFF6DD" }}
            >
              {h1}
            </h1>
            <p className="text-[14px] sm:text-[18px] text-white leading-snug mb-3 sm:mb-5 font-medium">
              {sub}
            </p>
            <ul className="space-y-1 sm:space-y-2.5 inline-block lg:block text-left">
              {HERO_BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-white text-[13px] sm:text-[16px] leading-tight font-medium"
                >
                  <span aria-hidden className="shrink-0 font-black text-sm sm:text-base" style={{ color: "var(--hpg-gold)" }}>
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <QuizCard marketName={marketName} />
          </div>
        </div>
      </div>
    </section>
  )
}
