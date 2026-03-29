import Navbar from '@/components/layouts/navbar/Navbar'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Felicity Solar Nigeria',
  description: 'Read the terms and conditions governing the use of the Felicity Solar Nigeria website and services.',
  openGraph: {
    title: 'Terms of Service | Felicity Solar Nigeria',
    description: 'Terms and conditions governing the use of the Felicity Solar Nigeria website.',
    url: '/terms-of-service',
  },
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <main className='font-[family-name:var(--font-inter)]'>
      <Navbar
        linkClassName='text-grey-800 font-semibold'
        className='hidden lg:flex bg-white text-black border-b border-grey-100'
        variant='primary'
      />

      <section className='mt-12 lg:mt-0 py-16 mx-auto w-[90%] 2xl:w-[75%]'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-3xl lg:text-4xl font-bold text-grey-900 mb-2'>Terms of Service</h1>
          <p className='text-sm text-grey-500 mb-10'>Last updated: March 29, 2026</p>

          <div className='flex flex-col gap-y-8 text-grey-700 leading-relaxed'>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website{' '}
                <Link href='https://www.felicitysolar.ng' className='text-primary underline'>
                  www.felicitysolar.ng
                </Link>{' '}
                (the &quot;Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site.
              </p>
              <p className='mt-2'>
                These Terms apply to all visitors, users, and others who access or use the Site. We reserve the right to update these Terms at any time. Continued use of the Site after changes constitutes your acceptance.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>2. About Felicity Solar Nigeria</h2>
              <p>
                Felicity Solar Nigeria is the Official authorised distributor of Felicity Solar products in Nigeria, offering hybrid inverters, lithium batteries, solar panels, MPPT charge controllers, solar street lights, and related solar energy solutions to homes and businesses across Nigeria.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>3. Use of the Site</h2>
              <p className='mb-2'>You agree to use the Site only for lawful purposes. You must not:</p>
              <ul className='list-disc pl-6 flex flex-col gap-y-2'>
                <li>Use the Site in any way that violates applicable Nigerian or international laws or regulations</li>
                <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
                <li>Attempt to gain unauthorised access to any part of the Site or its related systems</li>
                <li>Reproduce, duplicate, copy, or resell any part of the Site in violation of our intellectual property rights</li>
                <li>Use automated tools to scrape, crawl, or extract data from the Site without prior written consent</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>4. Product Information &amp; Pricing</h2>
              <p>
                We make every effort to ensure that product descriptions, specifications, and pricing on this Site are accurate. However, we reserve the right to correct any errors, inaccuracies, or omissions at any time without prior notice.
              </p>
              <p className='mt-2'>
                Prices displayed on the Site are in Nigerian Naira (₦) and are subject to change without notice. Final pricing will be confirmed at the time of order placement.
              </p>
              <p className='mt-2'>
                Product images are for illustrative purposes only. Actual products may vary slightly from images shown.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>5. Orders &amp; Purchases</h2>
              <p>
                Submitting a quote request or order form on this Site does not constitute a binding contract of sale. All orders are subject to availability and confirmation by our sales team. We reserve the right to refuse or cancel any order at our discretion.
              </p>
              <p className='mt-2'>
                For any queries regarding orders, payment, or delivery, please{' '}
                <Link href='/contact-us' className='text-primary underline'>contact us</Link>.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>6. Intellectual Property</h2>
              <p>
                All content on this Site — including text, graphics, logos, images, product photos, and software — is the property of Felicity Solar Nigeria or its content suppliers and is protected by applicable intellectual property laws.
              </p>
              <p className='mt-2'>
                You may not reproduce, distribute, modify, or create derivative works from any content on this Site without our express written permission.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>7. Third-Party Links</h2>
              <p>
                This Site may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>8. Advertising</h2>
              <p>
                This Site displays advertisements served by Google AdSense. These advertisements are managed by Google and are subject to{' '}
                <Link href='https://policies.google.com/technologies/ads' target='_blank' rel='noopener noreferrer' className='text-primary underline'>
                  Google&apos;s advertising policies
                </Link>. We are not responsible for the content of third-party advertisements.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>9. Disclaimer of Warranties</h2>
              <p>
                This Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>10. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Felicity Solar Nigeria shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) this Site or its content.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>11. Privacy Policy</h2>
              <p>
                Your use of this Site is also governed by our{' '}
                <Link href='/privacy-policy' className='text-primary underline'>Privacy Policy</Link>, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>12. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>13. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
              <div className='mt-3 flex flex-col gap-y-1'>
                <p><strong>Felicity Solar Nigeria</strong></p>
                <p>Email: <Link href='mailto:info@felicitysolar.ng' className='text-primary underline'>info@felicitysolar.ng</Link></p>
                <p>Website: <Link href='/contact-us' className='text-primary underline'>felicitysolar.ng/contact-us</Link></p>
              </div>
            </section>

          </div>
        </div>
      </section>
    </main>
  )
}
