"use client";

import { useState } from "react";
import { ArrowRight, ArrowDown, Shield, Clock, DollarSign } from "lucide-react";
import { SurveyCard } from "@/components/v2/survey-card";
import { AddressAutocomplete, type AddressDetails } from "@/components/survey/address-autocomplete";
import { getConfig, zipAllowedForState } from "@/lib/config";

const config = getConfig();

interface HeroSectionProps {
  /** Dynamic H1 from the scent matcher. Falls back to config.headline + config.headlineAccent. */
  h1?: string;
  /** Dynamic subheadline from the scent matcher. Falls back to config.subheadline. */
  sub?: string;
}

export function HeroSection({ h1, sub }: HeroSectionProps = {}) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [initialAddress, setInitialAddress] = useState("");
  const [addressVerified, setAddressVerified] = useState(false);
  const [outsideAreaError, setOutsideAreaError] = useState(false);

  const handleAddressSelect = (address: string, details: AddressDetails) => {
    const state = details.state?.toUpperCase() || "";
    const county = details.county || "";

    // State gate first (unchanged), then the per-state ZIP allowlist (additive).
    const stateOk =
      (config.serviceStates.length === 0 || config.serviceStates.includes(state)) &&
      zipAllowedForState(state, details.postalCode, config.serviceZipsByState);
    

    if (stateOk) {
      setInitialAddress(address);
      setAddressVerified(true);
      setOutsideAreaError(false);
      setShowSurvey(true);
    } else {
      setAddressVerified(false);
      setOutsideAreaError(true);
    }
  };

  return (
    <section id="hero" className="relative bg-white">
      <div className="relative z-10 flex flex-col items-center justify-start md:justify-center min-h-[100dvh] px-4 pt-28 pb-12 md:px-12 md:py-24 lg:px-20">
        {/* Trust badges */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-6 mb-6 animate-reveal-up">
          <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
            <Shield className="h-4 w-4 text-[var(--accent-brand)]" />
            <span>Trusted</span>
          </div>
          <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
            <Clock className="h-4 w-4 text-[var(--accent-brand)]" />
            <span>24-Hour Cash Offers</span>
          </div>
          <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
            <DollarSign className="h-4 w-4 text-[var(--accent-brand)]" />
            <span>No Fees. No Commissions.</span>
          </div>
        </div>

        {/* Main headline — dynamic via /v2 scent matcher; falls back to config */}
        <h1
          data-headline="dynamic"
          className="text-center text-2xl font-bold leading-tight tracking-tight text-[#0F1D2F] md:text-5xl lg:text-6xl max-w-4xl animate-reveal-up animation-delay-100"
        >
          {h1 ? (
            h1
          ) : (
            <>
              {config.headline}{" "}
              <span style={{ color: "var(--accent-brand)" }}>{config.headlineAccent}</span>
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className="mt-2 md:mt-4 text-center text-base md:text-xl text-[#5A6B7D] max-w-2xl leading-relaxed animate-reveal-up animation-delay-200">
          {sub ?? config.subheadline}
        </p>

        {/* Address Input or Survey */}
        <div className="mt-4 md:mt-10 w-full max-w-2xl animate-reveal-up animation-delay-300">
          {!showSurvey ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[var(--accent-brand)] text-base font-medium">Enter your address to start</span>
                <ArrowDown className="h-5 w-5 text-[var(--accent-brand)] animate-bounce" />
              </div>
              <div className="relative">
                <AddressAutocomplete
                  value={initialAddress}
                  onChange={(address) => { setInitialAddress(address); setAddressVerified(false); setOutsideAreaError(false); }}
                  onSelect={handleAddressSelect}
                  placeholder="Enter your property address..."
                  bounds={config.serviceBounds || undefined}
                  className="[&_input]:h-14 [&_input]:text-lg [&_input]:rounded-2xl [&_input]:shadow-lg [&_input]:border-[var(--accent-brand)]/30 [&_input]:bg-white"
                />
              </div>
              <button
                onClick={() => { if (addressVerified) setShowSurvey(true) }}
                className="w-full h-14 bg-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)/90] text-white font-semibold text-xl rounded-2xl transition-all shadow-lg shadow-[var(--accent-secondary)]/20 flex items-center justify-center gap-2"
              >
                Get My Free Cash Offer
                <ArrowRight className="h-6 w-6" />
              </button>
              {outsideAreaError && (
                <p className="text-center text-sm font-medium" style={{ color: "#dc2626" }}>
                  {`Sorry, that address is outside our service area. Please enter a local address.`}
                </p>
              )}
              <p className="text-center text-[#94A3B8] text-sm">
                Takes less than 2 minutes. No obligation.
              </p>
            </div>
          ) : (
            <div className="animate-scale-in">
              <SurveyCard initialAddress={initialAddress} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
