/**
 * VA Home Offer — Virginia
 * Dynamic-headline override table for / and /v2 landing pages.
 *
 * Each entry's `match` regex is tested against the sanitized `utm_content`
 * (= ad.name per locked URL params convention). First match wins.
 *
 * Naming contract: {ConceptCode}-{ConceptName}-{CopyVariant}-{Geo}
 * Full rules: ~/.claude/projects/-Users-williamyu/memory/feedback_ad-name-scent-contract.md
 *
 * 🚫 NEVER add B-prefix entries here. Concept B (Mailroom) is RETIRED.
 */

export type HeadlineOverride = {
  match: RegExp
  h1: string
  sub: string
}

export const HEADLINE_OVERRIDES: HeadlineOverride[] = [
  // A1 — CashRush
  {
    match: /^A1-CashRush-/i,
    h1: "Lock In Your Cash Offer Before The Market Cools",
    sub: "homeowners 55+ are getting cash in 24 hours. Same price at closing.",
  },
  // A2 — Pre2000Inspect
  {
    match: /^A2-Pre2000Inspect-/i,
    h1: "Skip The Inspection. We Buy Pre-2000 Houses As-Is.",
    sub: "Built before 2000? Doesn't have to pass anything. Cash offer in 24 hours.",
  },
  // A3 — RepairCost10K (figure updated to $20,400)
  {
    match: /^A3-RepairCost10K-/i,
    h1: "Don't Pay The $20,400 Repair Bill. Walk Away With Cash.",
    sub: "Average repair cost just hit $20,400. We buy as-is. You pick the date.",
  },
  // A4 — 55EquityRecord
  {
    match: /^A4-55EquityRecord-/i,
    h1: "Sitting On Record Equity? See What Your Home Is Actually Worth.",
    sub: "Most owners 55+ don't know. Free cash offer in 24 hours.",
  },
  // A5 — SalesFallApart
  {
    match: /^A5-SalesFallApart-/i,
    h1: "1 In 4 Home Sales Fall Apart. Ours Don't.",
    sub: "sellers 55+ are skipping the listing process. 14-day cash close.",
  },
  // A6 — VacantHouse
  {
    match: /^A6-VacantHouse-/i,
    h1: "Vacant House Sitting Empty? We'll Buy It In 14 Days.",
    sub: "Long-term owners 45+ are getting cash without lifting a finger.",
  },
  // C1 — YearBuilt
  {
    match: /^C1-YearBuilt-/i,
    h1: "Pre-2014 Home? See What It's Actually Worth.",
    sub: "Long-built homes are sitting on record equity. 14-day cash close, no repairs.",
  },
  // C2 — YearsOwned
  {
    match: /^C2-YearsOwned-/i,
    h1: "Owned Your Home 10+ Years? See Your Number Today.",
    sub: "Long-term owners are sitting on the strongest equity in years. As-is, 14-day cash close.",
  },
  // D2 — AgentVsCash
  {
    match: /^D2-AgentVsCash-/i,
    h1: "Would You Rather Wait 60 Days Or Get Cash In 14?",
    sub: "Most owners 45+ are skipping the listing. Same price at closing, no commissions.",
  },

  // ===== Condition-distressed motivated-seller relaunch (2026-06-09) =====
  // E-series = condition angles. J-series = Jenkins formats.
  // E1 — WrongNumber
  {
    match: /^E1-WrongNumber-/i,
    h1: "Your House Isn't Worthless. You're Wrong About The Number.",
    sub: "Rough condition lowers the number. It doesn't make it zero. See yours in 24 hours.",
  },
  // E2 — NumberHolds
  {
    match: /^E2-NumberHolds-/i,
    h1: "The Number We Put In Writing Is The Number You Get.",
    sub: "No surprise inspection, no re-trade. A written cash offer that holds to closing.",
  },
  // E3 — OfferCaves
  {
    match: /^E3-OfferCaves-/i,
    h1: "Most Cash Offers Drop After You Say Yes. Ours Doesn't.",
    sub: "We price the condition up front and put it in writing. See a number that holds.",
  },
  // E4 — NotPermission
  {
    match: /^E4-NotPermission-/i,
    h1: "A Rough House Isn't Permission To Steal Your Equity.",
    sub: "Get a real written number for your home, exactly as it sits. No lowball.",
  },
  // E5 — AsItSits
  {
    match: /^E5-AsItSits-/i,
    h1: "Sell Your House Exactly As It Sits.",
    sub: "No repairs. No cleanout. No showings. Nothing out of pocket. 14-day cash close.",
  },
  // E6 — NoJudgment
  {
    match: /^E6-NoJudgment-/i,
    h1: "Embarrassed By The Condition? No Judgment. Just A Way Out.",
    sub: "We've bought worse. Sell your house as-is, privately, for cash.",
  },
  // E7 — WontPassInspect
  {
    match: /^E7-WontPassInspect-/i,
    h1: "Won't Pass Inspection? That's Exactly Why We're A Fit.",
    sub: "No loan, no appraisal to fail. We buy houses as-is and close in 14 days.",
  },
  // E8 — Inherited
  {
    match: /^E8-Inherited-/i,
    h1: "Inherited A House You Can't Face? Hand Us The Keys.",
    sub: "No cleanout, no repairs, no trips back. We buy it as-is, with everything still inside.",
  },
  // E9 — Foreclosure
  {
    match: /^E9-Foreclosure-/i,
    h1: "Behind On Payments? Walk Away With Something, Not Nothing.",
    sub: "There's still a window. Sell your house fast, clear the bank, keep your equity.",
  },
  // E10 — AnyCondition
  {
    match: /^E10-AnyCondition-/i,
    h1: "Fire, Flood, Foundation, Mold, Hoard. We'll Buy It.",
    sub: "We buy houses in any condition, with everything still attached. Cash in 14 days.",
  },
  // E11 — WeightOff
  {
    match: /^E11-WeightOff-/i,
    h1: "The Day It's Sold Is The Day The Weight Comes Off.",
    sub: "Sell your house as-is, for cash, and finally set it down. 14-day close.",
  },
  // J1 — TwoPaths
  {
    match: /^J1-TwoPaths-/i,
    h1: "Two Paths To The Same Sale. One Costs You Thousands First.",
    sub: "Skip the repairs and the 60-day wait. Our cash offer won't change.",
  },
  // J2 — PollCard
  {
    match: /^J2-PollCard-/i,
    h1: "Does Your House Need Work You Can't Afford? You Have Options.",
    sub: "Sell your house exactly as it sits. Cash offer in 24 hours, close in 14.",
  },
  // J3 — OneSale
  {
    match: /^J3-OneSale-/i,
    h1: "One Cash Sale Handles The Roof, The Cleanout, The Taxes.",
    sub: "All of it, handled. We buy your house as-is and close in 14 days.",
  },
]

export const DEFAULT_HEADLINE = {
  h1: "Sell Your House For Cash. In 24 Hours.",
  sub: "Fair cash offers, no fees, no commissions. Local team.",
}
