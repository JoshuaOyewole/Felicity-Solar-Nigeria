"use client";

import { useEffect, useRef } from "react";

type AdFormat = "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";

interface AdUnitProps {
  adSlot: string;                    // The ad slot ID from your AdSense dashboard
  adFormat?: AdFormat;               // Ad format type
  fullWidthResponsive?: boolean;     // Stretch ad to full width on mobile
  className?: string;                // Optional wrapper class for layout control
  style?: React.CSSProperties;       // Optional inline styles
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Reusable Google AdSense Ad Unit component.
 *
 * Usage:
 *   <AdUnit adSlot="1234567890" adFormat="auto" fullWidthResponsive />
 *
 * Make sure NEXT_PUBLIC_ADSENSE_CLIENT_ID is set in your .env.local
 */
export default function AdUnit({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Avoid double-pushing in React strict mode / hot reload
    if (initialized.current) return;
    initialized.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // Don't render if client ID is missing (e.g. in local dev without .env)
  if (!clientId) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={className}
          style={{
            background: "#f0f0f0",
            border: "2px dashed #ccc",
            borderRadius: 4,
            padding: "1rem",
            textAlign: "center",
            color: "#999",
            fontSize: 12,
            ...style,
          }}
        >
          AdSense placeholder — set NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env.local
        </div>
      );
    }
    return null;
  }

  return (
    <div className={className} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}