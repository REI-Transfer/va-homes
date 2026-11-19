import { NextResponse } from "next/server"
import crypto from "crypto"
import { calculateLeadScore, leadQuality } from "@/lib/lead-score"
import { lookupProperty, withPriority, applyConditionRule, legacyAnswers, recordUsable, parseUsAddress, type LookupInput, type LookupResult } from "@/lib/dealmachine"
import { sellerAnswerRule } from "@/lib/form-rules"

const BLOCKED_PHONES = ["7575893801"]
const BLOCKED_EMAILS = ["charlesgaines99@gmail.com"]

// Simple in-memory rate limiter (resets on deploy/restart)
const submissionLog = new Map<string, { count: number; firstSubmit: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 60 * 60 * 1000 // 1 hour
  const maxSubmissions = 3

  const entry = submissionLog.get(ip)
  if (!entry) {
    submissionLog.set(ip, { count: 1, firstSubmit: now })
    return false
  }

  // Reset window if expired
  if (now - entry.firstSubmit > window) {
    submissionLog.set(ip, { count: 1, firstSubmit: now })
    return false
  }

  entry.count++
  return entry.count > maxSubmissions
}

// SHA-256 hash of a normalized PII string. Returns empty string when input
// is missing — Meta CAPI rejects fields hashed from empty strings, so callers
// MUST drop empty fields from the user_data object before sending.
function sha256(value: string): string {
  if (!value) return ""
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

// Extract one cookie's value from the raw Cookie header. Tolerant of
// surrounding whitespace and missing cookies.
function readCookie(cookieHeader: string | null, name: string): string {
  if (!cookieHeader) return ""
  const parts = cookieHeader.split(";")
  for (const p of parts) {
    const [k, ...v] = p.split("=")
    if (k.trim() === name) return decodeURIComponent(v.join("=").trim())
  }
  return ""
}

// Fire-and-await Meta Conversions API Lead event. Pairs with the browser-side
// fbq Lead via shared event_id so Meta dedupes the two and picks the more
// reliable signal. Hashes all PII. Includes IP/UA/fbp/fbc for match-quality.
// Never blocks longer than 3s — failures are logged and silently ignored.
async function sendCapiLead(args: {
  pixelId: string
  token: string
  eventId: string
  eventName: string  // "Lead" or "LeadLowIntent"
  value: number
  eventSourceUrl: string
  clientIp: string
  userAgent: string
  fbp: string
  fbc: string
  email: string
  phone: string
  firstName: string
  lastName: string
  city: string
  state: string
  zip: string
}): Promise<void> {
  const userData: Record<string, unknown> = {}
  if (args.email)     userData.em  = [sha256(args.email)]
  if (args.phone)     userData.ph  = [sha256(args.phone.replace(/\D/g, ""))]
  if (args.firstName) userData.fn  = [sha256(args.firstName)]
  if (args.lastName)  userData.ln  = [sha256(args.lastName)]
  if (args.city)      userData.ct  = [sha256(args.city)]
  if (args.state)     userData.st  = [sha256(args.state)]
  if (args.zip)       userData.zp  = [sha256(args.zip)]
  if (args.clientIp)  userData.client_ip_address = args.clientIp
  if (args.userAgent) userData.client_user_agent = args.userAgent
  if (args.fbp)       userData.fbp = args.fbp
  if (args.fbc)       userData.fbc = args.fbc

  const body = {
    data: [
      {
        event_name: args.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: args.eventId,
        action_source: "website",
        event_source_url: args.eventSourceUrl,
        user_data: userData,
        custom_data: {
          currency: "USD",
          value: args.value,
        },
      },
    ],
  }

  const url = `https://graph.facebook.com/v21.0/${args.pixelId}/events?access_token=${encodeURIComponent(args.token)}`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) {
      const text = await res.text()
      console.error("CAPI non-2xx:", res.status, text.slice(0, 500))
    }
  } catch (e) {
    console.error("CAPI error:", e)
  }
}

// Best-effort split of a free-text Google Places address into city/state/zip.
// Falls back to empty strings when the format isn't recognized — those fields
// get omitted from the CAPI user_data block.
function splitAddress(full: string): { city: string; state: string; zip: string } {
  const out = { city: "", state: "", zip: "" }
  if (!full) return out
  const parts = full.split(",").map((p) => p.trim())
  // Typical Google Places: "123 Main St, Arlington, VA 22201, USA"
  if (parts.length >= 3) {
    out.city = parts[parts.length - 3] || ""
    const stateZip = parts[parts.length - 2] || ""
    const m = stateZip.match(/^([A-Za-z]{2})\s+(\d{5})/)
    if (m) {
      out.state = m[1]
      out.zip = m[2]
    } else {
      out.state = stateZip
    }
  }
  return out
}

// ── Property-record form (components/v2/record-survey-card.tsx, one-step) ──────
// "123 Main St, Austin, TX 78701, USA" → "123 Main St"
const streetOf = (address: string) => (address || "").split(",")[0].trim()

// Low equity fires LeadLowIntent, an event GoFunnel already handles.
const META_EVENT_FOR: Record<string, string> = { lead: "Lead", low_equity: "LeadLowIntent", low_intent: "LeadLowIntent" }

// Property record fields for n8n. Booleans/numbers as-is, empty = "". Neutral names:
// a client webhook that receives the whole payload must not learn the data vendor.
function dmFields(dm: LookupResult, priority: string, reasonDetails: string) {
  return {
    record_found: dm.matched,
    record_equity_pct: dm.equity_pct ?? "",
    record_equity_band: dm.equity_band,
    record_value: dm.value ?? "",
    record_owed: dm.owed ?? "",
    record_verdict: dm.verdict,
    record_dq_reason: dm.dq_reason ?? "",
    record_listed_now: dm.listed_now,
    record_owner_match: dm.owner_match ?? "",
    record_distress: dm.distress.join("; "),
    record_excellent_bypass: dm.excellent_bypass === true,
    property_summary: withPriority(dm.summary, priority, reasonDetails),
    lookup_credits: dm.credits_used,
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown"

    // Rate limit: max 3 submissions per IP per hour
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      )
    }

    const data = await request.json()

    // Server-side validation
    const phone = (data.phone || "").replace(/\D/g, "").replace(/^1/, "")
    if (phone.length !== 10) {
      return NextResponse.json({ success: false, error: "Invalid phone" }, { status: 400 })
    }

    const email = (data.email || "").trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 })
    }

    // Support both firstName/lastName (new) and name (legacy)
    if (!(data.firstName || data.name || "").trim()) {
      return NextResponse.json({ success: false, error: "Name required" }, { status: 400 })
    }

    if (!(data.address || "").trim()) {
      return NextResponse.json({ success: false, error: "Address required" }, { status: 400 })
    }

    // Blocked spam contact: return the normal success response but do NOT
    // forward to n8n, Meta CAPI, or GoFunnel.
    if (BLOCKED_PHONES.includes(phone) || BLOCKED_EMAILS.includes(email)) {
      return NextResponse.json({ success: true })
    }

    // Add server IP to payload before forwarding to GHL
    const payload: Record<string, unknown> = { ...data, server_ip: ip }

    // ── Property record check (property-record form only) ─────────────────
    // record_check marks its posts (one post, at the end, like the current form; its
    // first check ran on /api/lookup, same house = no new credit). Every other post goes
    // exactly as before and is never looked up.
    const recordCheck = data.record_check === true
    delete payload.record_check
    delete payload.record_mode
    let dm: LookupResult | null = null
    if (recordCheck) {
      // City / state / ZIP come from the address picker; when the address was typed in
      // the hero box they are blank, so read them from the address text instead.
      const parsed = parseUsAddress(typeof data.address === "string" ? data.address : "")
      const input: LookupInput = {
        street: streetOf(data.address), city: data.city || parsed.city, state: data.state || parsed.state,
        zip: data.zip || parsed.zip, lastName: data.lastName || "",
      }
      // Fill the same blanks in what n8n / the CRM receives (only where empty).
      for (const k of ["city", "state", "zip"] as const) {
        if (!(typeof data[k] === "string" && data[k].trim()) && parsed[k]) payload[k] = parsed[k]
      }
      const landOwned = typeof data.landOwned === "string" ? data.landOwned : ""
      dm = await lookupProperty(input, { landOwned })
      dm = applyConditionRule(dm, typeof data.condition === "string" ? data.condition : "")
      // The seller's own answers, by this client's rules (lib/form-rules.ts): an answer the
      // client takes only as low intent turns a record Lead into a low intent lead.
      if (dm.verdict === "lead" || dm.verdict === "low_equity") {
        const own = sellerAnswerRule(data, recordUsable(dm))
        if (own.rule === "low_intent") dm = { ...dm, verdict: "low_intent" }
        else if (own.rule === "dq") dm = { ...dm, verdict: "dq", dq_reason: null }
      }
      Object.assign(payload, dmFields(dm, typeof data.priority === "string" ? data.priority : "",
        typeof data.reasonDetails === "string" ? data.reasonDetails : ""))
      // Same fields, same format: fill the old answer fields the seller wasn't asked,
      // from the record, so the CRM mapping keeps working untouched.
      if (dm.matched) {
        for (const [k, v] of Object.entries(legacyAnswers(dm))) {
          const answered = typeof data[k] === "string" && data[k].trim() !== ""
          if (v && !answered) payload[k] = v
        }
      }
      if (META_EVENT_FOR[dm.verdict]) {
        Object.assign(payload, {
          qualified: dm.verdict === "lead",
          meta_event_name: META_EVENT_FOR[dm.verdict],
          meta_value: dm.verdict === "lead" ? payload.meta_value : 0,
        })
      }
      // Re-score after the record filled the answers the seller was not asked, so
      // lead_score / lead_quality / the Lead value match the current form for the same house.
      const str = (k: string) => (typeof payload[k] === "string" ? (payload[k] as string) : "")
      const score = calculateLeadScore({ timeline: str("timeline"), ownershipLength: str("ownershipLength"), reason: str("reason"), condition: str("condition") })
      payload.lead_score = score
      payload.lead_quality = leadQuality(score)
      // Record says Lead → score x 25. No usable record (current rules) → keep the
      // browser's Lead / no-Lead decision, re-valued with the same score.
      if (dm.verdict === "lead") payload.meta_value = score * 25
      else if (dm.verdict === "fallback" && Number(payload.meta_value) > 0) payload.meta_value = score * 25
      else payload.meta_value = 0
      // Screened out by the record at the very end: not sent anywhere (no n8n, no Meta
      // CAPI, no GoFunnel), the same as the current form's screen-outs, which never send.
      // The seller still sees the normal thank-you page.
      if (dm.verdict === "dq") {
        return NextResponse.json({ success: true, verdict: dm.verdict, dq_reason: dm.dq_reason, lead_score: payload.lead_score })
      }
    }

    // 1) Forward to GHL/LeadConnector webhook
    const webhookUrl = process.env.WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } catch (e) {
        console.error("Webhook forward failed:", e)
      }
    }

    // 2) Fire Meta Conversions API Lead event (server-side, paired with the
    //    pixel-side Lead via shared event_id). This is what makes leads
    //    actually attribute in Ads Manager — pixel-only loses 30-50% to
    //    iOS/Safari/ad blockers without verified domain backing it up.
    const capiToken = process.env.META_CAPI_TOKEN
    const pixelId = process.env.META_PIXEL_ID
    if (capiToken && pixelId && data.meta_event_id) {
      const cookieHeader = request.headers.get("cookie")
      const fbp = readCookie(cookieHeader, "_fbp")
      const fbc = readCookie(cookieHeader, "_fbc")
      const addr = splitAddress(data.address || "")
      const eventSourceUrl = data.landing_page
        || request.headers.get("referer")
        || "https://va-homes.vercel.app/"
      const firstName = (data.firstName || (data.name || "").split(/\s+/)[0] || "").trim()
      const lastName = (data.lastName || (data.name || "").split(/\s+/).slice(1).join(" ") || "").trim()

      await sendCapiLead({
        pixelId,
        token: capiToken,
        eventId: data.meta_event_id,
        eventName: (payload.meta_event_name as string) || "Lead",
        value: typeof payload.meta_value === "number" ? payload.meta_value : 0,
        eventSourceUrl,
        clientIp: ip,
        userAgent: request.headers.get("user-agent") || "",
        fbp,
        fbc,
        email,
        phone,
        firstName,
        lastName,
        city: addr.city,
        state: addr.state,
        zip: addr.zip,
      })
    }

    // --- GoFunnel external webhook: forward the lead for gf_sid attribution ---
    try {
      const GF_CREDENTIAL_ID = process.env.GOFUNNEL_WEBHOOK_CREDENTIAL_ID || "ae1548ee-d418-43a5-9e78-580e69e83cdd"
      const GF_BEARER = process.env.GOFUNNEL_WEBHOOK_SECRET || "69bb80b0-6b1a-4466-88fb-1ead145d52b0"
      if (GF_CREDENTIAL_ID && GF_BEARER) {
        const gfCookie = request.headers.get("cookie") || ""
        const gfMatch = gfCookie.match(/(?:^|; )gf_sid=([^;]*)/)
        const gfSid = (data.gf_sid || (gfMatch ? decodeURIComponent(gfMatch[1]) : "") || "").toString().trim()
        const gfStr = (v: unknown) => (typeof v === "string" && v ? v : undefined)
        const gfName = ((data.name || "") as string).trim().split(/\s+/).filter(Boolean)
        const gfPayload = {
          type: "survey_submitted",
          email: email || undefined,
          phone: phone || undefined,
          firstName: gfStr(data.firstName) || gfName[0] || undefined,
          lastName: gfStr(data.lastName) || (gfName.length > 1 ? gfName.slice(1).join(" ") : undefined),
          sid: gfSid || undefined,
          formId: "va-homes-survey",
          formTitle: "Va Home Offer Survey",
          idempotencyKey: gfStr(data.meta_event_id),
          leadQuestions: {
            is_legal_owner: gfStr(data.isLegalOwner),
            listed_on_market: gfStr(data.listedOnMarket),
            property_type: gfStr(data.propertyType),
            timeline: gfStr(data.timeline),
            asking_price: gfStr(data.askingPrice),
            condition: gfStr(data.condition),
            reason: gfStr(data.reason),
            priority: gfStr(data.priority),
          },
          data: {
            qualified: payload.qualified === true,
            lead_score: payload.lead_score,
            lead_quality: payload.lead_quality,
            meta_event_id: data.meta_event_id,
            meta_event_name: payload.meta_event_name,
            meta_value: payload.meta_value,
            address: data.address,
            state: data.state,
            city: data.city,
            county: data.county,
            utm_source: data.utm_source,
            utm_medium: data.utm_medium,
            utm_campaign: data.utm_campaign,
            utm_content: data.utm_content,
            utm_term: data.utm_term,
            fbclid: data.fbclid,
            gclid: data.gclid,
            msclkid: data.msclkid,
            ttclid: data.ttclid,
            referrer: data.referrer,
            landing_page: data.landing_page,
          },
        }
        await fetch(`https://app.gofunnel.ai/api/v2/webhooks/external?credential_id=${GF_CREDENTIAL_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${GF_BEARER}` },
          body: JSON.stringify(gfPayload),
        }).catch(() => {})
      }
    } catch {}

    return NextResponse.json({ success: true, ...(dm ? { verdict: dm.verdict, dq_reason: dm.dq_reason, lead_score: payload.lead_score } : {}) })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
