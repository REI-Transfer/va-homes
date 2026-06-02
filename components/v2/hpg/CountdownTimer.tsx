"use client"

import { useEffect, useState } from "react"

// 72-hour rolling window per visitor (stored in localStorage so refresh
// doesn't reset the urgency). Mirrors DirectBuyer's CountdownTimer.
const STORAGE_KEY = "va_homes_offer_deadline_v1"
const WINDOW_MS = 72 * 60 * 60 * 1000 // 72 hours

function readDeadline(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const n = parseInt(raw, 10)
      if (Number.isFinite(n) && n > Date.now()) return n
    }
  } catch {}
  const fresh = Date.now() + WINDOW_MS
  try {
    localStorage.setItem(STORAGE_KEY, String(fresh))
  } catch {}
  return fresh
}

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

export default function CountdownTimer({
  size = "lg",
}: {
  size?: "sm" | "lg"
}) {
  const [parts, setParts] = useState<{ d: string; h: string; m: string; s: string } | null>(null)

  useEffect(() => {
    const deadline = readDeadline()
    function tick() {
      const diff = Math.max(0, deadline - Date.now())
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setParts({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!parts) {
    return <div className="h-14" aria-hidden suppressHydrationWarning />
  }

  return (
    <div className={`inline-flex items-center ${size === "lg" ? "gap-3" : "gap-2"}`} suppressHydrationWarning>
      <Block num={parts.d} unit="Days" size={size} />
      <Block num={parts.h} unit="Hrs" size={size} />
      <Block num={parts.m} unit="Min" size={size} />
      <Block num={parts.s} unit="Sec" size={size} />
    </div>
  )
}

function Block({ num, unit, size }: { num: string; unit: string; size: "sm" | "lg" }) {
  const isLg = size === "lg"
  return (
    <div
      className={`rounded-lg text-center border ${isLg ? "px-4 py-2.5 min-w-[64px]" : "px-3 py-1.5 min-w-[48px]"}`}
      style={{ backgroundColor: "#F5F2E9", borderColor: "var(--hpg-border)" }}
    >
      <div
        className={`font-black leading-none tabular-nums ${isLg ? "text-2xl" : "text-lg"}`}
        style={{ color: "var(--hpg-black)" }}
      >
        {num}
      </div>
      <div
        className={`uppercase tracking-widest mt-1 ${isLg ? "text-[10px]" : "text-[9px]"}`}
        style={{ color: "var(--hpg-muted)" }}
      >
        {unit}
      </div>
    </div>
  )
}
