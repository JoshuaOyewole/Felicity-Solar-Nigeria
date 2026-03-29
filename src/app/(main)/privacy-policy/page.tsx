import Navbar from '@/components/layouts/navbar/Navbar'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Felicity Solar Nigeria',
  description: 'Read the Felicity Solar Nigeria privacy policy. Learn how we collect, use, and protect your personal data when you visit our website.',
  openGraph: {
    title: 'Privacy Policy | Felicity Solar Nigeria',
    description: 'Learn how Felicity Solar Nigeria collects, uses, and protects your personal data.',
    url: '/privacy-policy',
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <main className='font-[family-name:var(--font-inter)]'>
      <Navbar
        linkClassName='text-grey-800 font-semibold'
        className='hidden lg:flex bg-white text-black border-b border-grey-100'
        variant='primary'
      />

      <section className='mt-12 lg:mt-0 py-16 mx-auto w-[90%] 2xl:w-[75%]'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-3xl lg:text-4xl font-bold text-grey-900 mb-2'>Privacy Policy</h1>
          <p className='text-sm text-grey-500 mb-10'>Last updated: March 29, 2026</p>

          <div className='flex flex-col gap-y-8 text-grey-700 leading-relaxed'>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>1. Introduction</h2>
              <p>
                Felicity Solar Nigeria (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{' '}
                <Link href='https://www.felicitysolar.ng' className='text-primary underline'>
                  www.felicitysolar.ng
                </Link>{' '}
                (the &quot;Site&quot;). We are committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site.
              </p>
              <p className='mt-2'>
                Please read this policy carefully. If you disagree with its terms, please discontinue use of our Site.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>2. Information We Collect</h2>
              <p className='mb-2'>We may collect the following types of information:</p>
              <ul className='list-disc pl-6 flex flex-col gap-y-2'>
                <li>
                  <strong>Personal information you provide:</strong> name, email address, phone number, and message when you fill our contact or quote request forms.
                </li>
                <li>
                  <strong>Usage data:</strong> pages visited, time spent on pages, browser type, device type, IP address, and referring URLs — collected automatically via Google Analytics.
                </li>
                <li>
                  <strong>Cookie data:</strong> small text files placed on your device to improve your experience and enable advertising (see Section 5).
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>3. How We Use Your Information</h2>
              <p className='mb-2'>We use the information we collect to:</p>
              <ul className='list-disc pl-6 flex flex-col gap-y-2'>
                <li>Respond to your enquiries and quote requests</li>
                <li>Improve and personalise your experience on our Site</li>
                <li>Analyse Site traffic and usage trends (via Google Analytics)</li>
                <li>Display relevant advertisements (via Google AdSense)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>4. Sharing Your Information</h2>
              <p className='mb-2'>
                We do not sell, trade, or rent your personal information to third parties. We may share your data only with:
              </p>
              <ul className='list-disc pl-6 flex flex-col gap-y-2'>
                <li>
                  <strong>Google LLC</strong> — for analytics (Google Analytics 4) and advertising (Google AdSense). Google&apos;s privacy policy is available at{' '}
                  <Link href='https://policies.google.com/privacy' target='_blank' rel='noopener noreferrer' className='text-primary underline'>
                    policies.google.com/privacy
                  </Link>.
                </li>
                <li>
                  <strong>Cloudinary</strong> — for image storage and delivery. Their privacy policy is at{' '}
                  <Link href='https://cloudinary.com/privacy' target='_blank' rel='noopener noreferrer' className='text-primary underline'>
                    cloudinary.com/privacy
                  </Link>.
                </li>
                <li>
                  <strong>Vercel</strong> — our hosting provider. Their privacy policy is at{' '}
                  <Link href='https://vercel.com/legal/privacy-policy' target='_blank' rel='noopener noreferrer' className='text-primary underline'>
                    vercel.com/legal/privacy-policy
                  </Link>.
                </li>
                <li>Law enforcement or regulatory authorities where required by applicable law.</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>5. Cookies &amp; Advertising</h2>
              <p className='mb-2'>
                Our Site uses cookies to function properly, analyse traffic, and serve personalised advertisements through Google AdSense. Cookies are small text files stored on your device.
              </p>
              <p className='mb-2'>The types of cookies we use include:</p>
              <ul className='list-disc pl-6 flex flex-col gap-y-2'>
                <li><strong>Strictly necessary cookies:</strong> required for authentication and core site functionality.</li>
                <li><strong>Analytics cookies:</strong> help us understand how visitors use our Site (Google Analytics).</li>
                <li><strong>Advertising cookies:</strong> used by Google AdSense to serve relevant ads based on your interests.</li>
              </ul>
              <p className='mt-3'>
                You can manage or withdraw your cookie consent at any time by clicking <strong>&quot;Cookie Settings&quot;</strong> in the footer. You can also manage cookies through your browser settings. Note that disabling certain cookies may affect your experience on the Site.
              </p>
              <p className='mt-2'>
                For more information about how Google uses data when you use our Site, visit{' '}
                <Link href='https://policies.google.com/technologies/partner-sites' target='_blank' rel='noopener noreferrer' className='text-primary underline'>
                  Google&apos;s Partner Site Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>6. Data Retention</h2>
              <p>
                We retain personal data you submit via forms for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Analytics and advertising data is subject to the retention policies of Google.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>7. Your Rights</h2>
              <p className='mb-2'>Depending on your location, you may have the right to:</p>
              <ul className='list-disc pl-6 flex flex-col gap-y-2'>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing (including cookies)</li>
                <li>Object to the processing of your personal data</li>
              </ul>
              <p className='mt-3'>
                To exercise any of these rights, contact us at the details in Section 9.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>8. Children&apos;s Privacy</h2>
              <p>
                Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>9. Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
              <div className='mt-3 flex flex-col gap-y-1'>
                <p><strong>Felicity Solar Nigeria</strong></p>
                <p>Email: <Link href='mailto:info@felicitysolar.ng' className='text-primary underline'>info@felicitysolar.ng</Link></p>
                <p>Website: <Link href='/contact-us' className='text-primary underline'>felicitysolar.ng/contact-us</Link></p>
              </div>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-grey-900 mb-3'>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page will reflect any changes. Continued use of the Site after any changes constitutes your acceptance of the new policy.
              </p>
            </section>

          </div>
        </div>
      </section>
    </main>
  )
}
