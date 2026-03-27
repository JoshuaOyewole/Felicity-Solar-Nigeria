import AOSInitializer from "@/components/AOSInitializer";
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

export const metadata = {
  title: "Felicity Solar",
  description: "Solar energy solutions",
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
