"use client"

import { useEffect, useState } from "react"
import { openQuiz } from "./openQuiz"

interface StickyTopBarProps {
  phoneDisplay: string
  phoneHref: string
}

export default function StickyTopBar({ phoneDisplay, phoneHref }: StickyTopBarProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 shadow-2xl px-4 py-3 transition-transform duration-300 ease-out ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        backgroundColor: "white",
        borderBottom: "4px solid var(--hpg-gold)",
      }}
      aria-hidden={!show}
    >
      <div className="hpg-container flex items-center justify-between gap-3">
        <a
          href={`tel:${phoneHref}`}
          className="hidden sm:inline-flex items-center gap-2 font-display font-black text-[14px] tracking-wide"
          style={{ color: "var(--hpg-black)" }}
          aria-label={`Call ${phoneDisplay}`}
        >
          <span aria-hidden>📞</span>
          {phoneDisplay}
        </a>
        <button
          onClick={openQuiz}
          className="ml-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full text-white font-display font-black text-[14px] sm:text-[15px] uppercase tracking-wide shadow-lg hpg-pulse-cta"
          style={{ backgroundColor: "var(--hpg-cta)" }}
        >
          <span>Get My Cash Offer</span>
          <span className="text-sm opacity-80" aria-hidden>→</span>
        </button>
      </div>
    </div>
  )
}
