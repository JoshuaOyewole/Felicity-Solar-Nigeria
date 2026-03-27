import { Metadata } from 'next'
import AboutPageContent from '@/components/about/AboutPageContent'

export const metadata: Metadata = {
  title: 'About Felicity Solar Nigeria | Authorised Distributor',
  description: 'Felicity Solar Nigeria — the authorised distributor of Felicity Solar products. Bringing affordable, quality solar energy solutions to Nigerian homes and businesses since inception.',
  keywords: ['felicity solar nigeria', 'felicity solar official website', 'about felicity solar', 'felicity solar distributor nigeria'],
  openGraph: {
    title: 'About Felicity Solar Nigeria',
    description: 'The authorised Felicity Solar distributor in Nigeria. Affordable, quality solar energy for homes and businesses.',
    url: '/about-us',
    images: [{ url: '/assets/images/solar_street_light.jpg', alt: 'About Felicity Solar Nigeria' }],
  },
}

export default function AboutPage() {
    return <AboutPageContent />;
}
