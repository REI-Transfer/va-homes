import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FacebookPixel } from "@/components/tracking/facebook-pixel"
import { GoFunnelTracking } from "@/components/tracking/gofunnel-tracking"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_META_TITLE || "Sell Your House Fast for Cash",
  description: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Get a fair, no-obligation cash offer on your home within 24 hours.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const accentColor = process.env.NEXT_PUBLIC_ACCENT_COLOR || "#2563eb"
  const secondaryColor = process.env.NEXT_PUBLIC_SECONDARY_COLOR || accentColor
  return (
    <html lang="en" style={{ "--accent-brand": accentColor, "--accent-secondary": secondaryColor } as React.CSSProperties}>
      <body className={`font-sans antialiased ${plusJakartaSans.className}`}>
        <GoFunnelTracking />
        <FacebookPixel />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
