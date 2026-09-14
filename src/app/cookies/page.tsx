import { company } from '@/config/company';
import { generatePageMetadata } from '@/lib/metadata';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { FadeIn } from '@/components/motion/FadeIn';
import { Cookie, ShieldCheck } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Cookie Policy | Apex Mineral Ventures',
  description: 'Learn how technical and session cookies are utilized on the Apex Mineral Ventures platform.',
  path: '/cookies',
});

export default function CookiesPage() {
  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <PageMasthead
        eyebrow="Browser Storage & Preferences"
        icon={<Cookie className="w-4 h-4 text-blue-500" />}
        title="Cookie Policy"
        description="Last Updated: January 2024 · Technical & Operational Transparency"
      />

      <section className="py-20 bg-white">
        <FadeIn>
        <div className="container max-w-4xl space-y-10 text-sm text-slate-700 leading-relaxed font-normal">
          <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              1. What Are Cookies
            </h2>
            <p>
              Cookies and local browser storage are small text elements stored on your device to maintain session states, consent preferences, and security tokens while navigating the {company.name} platform.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">2. Categories of Storage Utilized</h2>
            <ul className="list-disc pl-5 space-y-3 text-slate-700">
              <li>
                <strong>Essential Technical Cookies:</strong> Strictly necessary for site routing, CSRF mitigation, and rendering performance. These cannot be disabled as core functions depend on them.
              </li>
              <li>
                <strong>Consent State Storage:</strong> Remembers your privacy and cookie acceptance preferences across visits via standard local browser storage.
              </li>
              <li>
                <strong>Anonymized Diagnostics:</strong> Aggregated, privacy-preserving performance metrics used to identify latency or layout defects. No personal tracking or cross-site ad profiling is conducted.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">3. Managing Your Browser Preferences</h2>
            <p>
              You may configure your browser to reject all non-essential cookies or alert you when a cookie is placed. Most browsers provide cookie management settings within their Privacy or Security preference panels.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">4. Inquiries</h2>
            <p>
              For questions regarding our technical storage practices, contact our technical desk:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 text-slate-700">
              <p><strong>Desk:</strong> Technical Infrastructure & Compliance</p>
              <p><strong>Email:</strong> {company.email}</p>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>
    </div>
  );
}
