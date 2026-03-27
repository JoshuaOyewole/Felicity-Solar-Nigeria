import AOSInitializer from "@/components/AOSInitializer";
import type { Metadata } from "next";
import "./globals.css"
import { Inter } from "next/font/google";
import ReactQueryProvider from "./provider";
import { ToastContainer } from 'react-toastify';
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import I18nProvider from "@/components/I18nProvider";
//import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.felicitysolar.ng"),
  title: "Felicity Solar Nigeria — Official Website",
  description: "Official Felicity Solar Nigeria website. Buy hybrid inverters, lithium batteries, solar panels, MPPT charge controllers and solar street lights. View price list and get a free quote.",
  openGraph: {
    siteName: "Felicity Solar Nigeria",
    type: "website",
    locale: "en_NG",
    images: [{ url: "/assets/images/solar_street_light.jpg", width: 1200, height: 630, alt: "Felicity Solar Nigeria — Solar Inverters, Batteries & Panels" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9169195841154004"
          crossOrigin="anonymous"
        ></script>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9169195841154004"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TTYZVHR9NE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TTYZVHR9NE');
          `}
        </Script>

        <AOSInitializer />
        <I18nProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </I18nProvider>
        <ToastContainer />
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
