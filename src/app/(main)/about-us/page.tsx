import { Metadata } from 'next'
import AboutPageContent from '@/components/about/AboutPageContent'

export const metadata: Metadata = {
    title: 'About us - Felicity Solar',
    description: 'We have the best Solar products in town. Hybrid inverter, MPPT controller, Solar lithium battery, Gel battery, Solar all in one street light',
}

export default function AboutPage() {
    return <AboutPageContent />;
}
