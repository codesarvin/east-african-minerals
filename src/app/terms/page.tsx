import { company } from '@/config/company';
import { generatePageMetadata } from '@/lib/metadata';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { FadeIn } from '@/components/motion/FadeIn';
import { FileText, Scale } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Terms of Commercial Trading & Service | Apex Mineral Ventures',
  description: 'Terms and conditions governing mineral trading, advisory services, and web interactions with Apex Mineral Ventures Limited.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <PageMasthead
        eyebrow="Commercial Terms & Disclaimers"
        icon={<FileText className="w-4 h-4 text-blue-500" />}
        title="Terms of Service"
        description="Last Updated: January 2024 · Governed by the Laws of the Republic of Uganda"
      />

      <section className="py-20 bg-white">
        <FadeIn>
        <div className="container max-w-4xl space-y-10 text-sm text-slate-700 leading-relaxed font-normal">
          <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              1. Acceptance & Corporate Scope
            </h2>
            <p>
              By accessing this digital platform or engaging in commercial correspondence with {company.legalName} (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), you acknowledge and agree to these Terms of Service. If you do not agree to these terms, you must refrain from utilizing this platform.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">2. Informational Disclaimer & Non-Reliance</h2>
            <p>
              The content provided across this platform is compiled for institutional informational and educational purposes only. While every effort is made to accurately cite the Uganda Mining and Minerals Act 2022 and regional export frameworks, digital content does not constitute binding legal, investment, or tax counsel.
            </p>
            <p>
              All physical commodity transactions are governed exclusively by formal, individually negotiated Sales and Purchase Agreements (SPAs) and verified banking escrow contracts.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">3. Commercial Trading & Regulatory Due Diligence</h2>
            <p>
              Precious metals trading involves market price volatility and rigorous compliance hurdles. Apex Mineral Ventures facilitates transactions strictly through documented, licensed channels in compliance with the Ministry of Energy and Mineral Development (MEMD) and Uganda Revenue Authority (URA).
            </p>
            <p>
              We reserve the right to decline or terminate transaction engagement with any counterparty failing Know-Your-Customer (KYC) or Anti-Money Laundering (AML) due diligence checks.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">4. Intellectual Property</h2>
            <p>
              All trade marks, emblems, proprietary guides, and technical graphics published on this site are the intellectual property of {company.legalName}. Unauthorized reproduction or redistribution is prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">5. Limitation of Liability & Governing Law</h2>
            <p>
              To the fullest extent permitted by applicable law, {company.legalName} shall not be held liable for indirect, incidental, or consequential damages resulting from digital platform usage.
            </p>
            <p>
              These Terms and all related commercial interactions are governed by and construed in accordance with the laws of the Republic of Uganda. Any disputes shall be submitted to the competent commercial courts of Kampala, Uganda.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">6. Legal & Regulatory Inquiries</h2>
            <p>
              Direct all inquiries regarding commercial agreements or statutory compliance to:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 text-slate-700">
              <p><strong>Legal Department:</strong> {company.legalName}</p>
              <p><strong>Email:</strong> {company.email}</p>
              <p><strong>Address:</strong> {company.locationDetails}</p>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>
    </div>
  );
}
