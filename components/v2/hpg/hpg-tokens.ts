// HPG-pattern brand tokens, adapted to VA Home Offer's navy + gold palette.
// Used as inline style values in v2/hpg components so the /v2 page renders
// in the VA palette without polluting the global theme. Mirrors the structure
// of DirectBuyer's hpg-tokens.ts (cream/black/orange) but maps to Virginia
// (navy/cream/gold) colors that complement the existing --accent-brand blue.
export const HPG = {
  // Primary brand color (Virginia navy). Used for headings, CTAs, footer bg.
  primary: "#0F2A4F",
  primaryDark: "#081A33",
  // Gold accent — used for highlights, trust badges, hover states.
  gold: "#C9A961",
  goldDark: "#A88840",
  // Text + surface neutrals
  black: "#0F1D2F",
  charcoal: "#2A3A4D",
  cream: "#FAF8F2",
  paper: "#FFFFFF",
  border: "#E5E1D6",
  muted: "#5A6B7D",
  accentLight: "#FFF6DD",
  // CTA red — kept for parity with HPG urgency pattern (pulse button + banner).
  cta: "#E63946",
  ctaDark: "#B82B36",
} as const

// Scoped style block, injected once per v2 page render. Defines the utility
// classes the v2/hpg components reference (animations, container, tap target).
// Scoped to `[data-hpg-page]` so it does not leak into the homepage / articles.
export const HPG_STYLE_BLOCK = `
[data-hpg-page] {
  --hpg-primary: ${HPG.primary};
  --hpg-primary-dark: ${HPG.primaryDark};
  --hpg-gold: ${HPG.gold};
  --hpg-gold-dark: ${HPG.goldDark};
  --hpg-black: ${HPG.black};
  --hpg-charcoal: ${HPG.charcoal};
  --hpg-cream: ${HPG.cream};
  --hpg-border: ${HPG.border};
  --hpg-muted: ${HPG.muted};
  --hpg-accent-light: ${HPG.accentLight};
  --hpg-cta: ${HPG.cta};
  --hpg-cta-dark: ${HPG.ctaDark};
}
[data-hpg-page] {
  font-family: var(--font-hpg-sans, "Inter", system-ui, sans-serif);
  font-size: 17px;
  line-height: 1.55;
}
[data-hpg-page] .hpg-container { max-width: 1100px; margin: 0 auto; width: 100%; }
[data-hpg-page] .font-display,
[data-hpg-page] h1, [data-hpg-page] h2, [data-hpg-page] h3, [data-hpg-page] h4, [data-hpg-page] h5 {
  font-family: var(--font-hpg-display, "Figtree", "Inter", system-ui, sans-serif);
  letter-spacing: -0.01em;
}
@keyframes hpg-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 8px 28px rgba(230, 57, 70, 0.32); }
  50% { transform: scale(1.018); box-shadow: 0 14px 42px rgba(230, 57, 70, 0.5); }
}
@keyframes hpg-fadein {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
[data-hpg-page] .hpg-pulse-cta { animation: hpg-pulse 2.2s ease-in-out infinite; will-change: transform; }
[data-hpg-page] .hpg-fadein { animation: hpg-fadein 0.5s ease both; }
`
