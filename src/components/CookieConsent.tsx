"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const CONSENT_COOKIE = "felicity_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const saved = Cookies.get(CONSENT_COOKIE) as ConsentState | undefined;
        if (!saved) {
            // Slight delay so it doesn't flash immediately on load
            const t = setTimeout(() => setVisible(true), 800);
            return () => clearTimeout(t);
        }
        if (saved === "accepted") enableAnalytics();
    }, []);

    function enableAnalytics() {
        // Unblock GA4 + AdSense by setting consent mode
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                analytics_storage: "granted",
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
            });
        }
    }

    function handleAccept() {
        Cookies.set(CONSENT_COOKIE, "accepted", { expires: 365, sameSite: "Lax" });
        setVisible(false);
        enableAnalytics();
    }

    function handleDecline() {
        Cookies.set(CONSENT_COOKIE, "declined", { expires: 365, sameSite: "Lax" });
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-grey-900 text-white shadow-2xl border-t border-grey-700"
        >
            <div className="mx-auto w-[90%] 2xl:w-[75%] flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <p className="text-sm leading-relaxed flex-1">
                    We use cookies to improve your experience, analyse traffic, and serve personalised ads via Google AdSense.
                    By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
                    <Link href="/privacy-policy" className="text-primary underline hover:opacity-80">
                        Learn more
                    </Link>
                    .
                </p>
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-5 py-2 rounded-full border border-white text-sm font-medium text-white hover:bg-white/10 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Small button rendered in footer to re-open consent settings */
export function CookieSettingsButton() {
    function handleReset() {
        Cookies.remove(CONSENT_COOKIE);
        window.location.reload();
    }

    return (
        <button
            onClick={handleReset}
            className="text-white font-medium text-sm hover:text-primary transition-colors"
        >
            Manage Cookies
        </button>
    );
}
