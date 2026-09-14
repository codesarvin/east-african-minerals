import { company } from '@/config/company';
import { generatePageMetadata } from '@/lib/metadata';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { FadeIn } from '@/components/motion/FadeIn';
import { ShieldCheck, Lock } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy | Data Protection & Governance | Apex Mineral Ventures',
  description: 'Privacy policy and data governance practices of Apex Mineral Ventures under the Uganda Data Protection and Privacy Act, 2019.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <PageMasthead
        eyebrow="Data Protection & Confidentiality"
        icon={<Lock className="w-4 h-4 text-blue-500" />}
        title="Privacy Policy"
        description="Effective Date: January 2024 · Formulated under the Uganda Data Protection and Privacy Act, 2019"
      />

      {/* Main Content */}
      <section className="py-20 bg-white">
        <FadeIn>
        <div className="container max-w-4xl space-y-10 text-sm text-slate-700 leading-relaxed font-normal">
          <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
            <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              1. Institutional Commitment & Scope
            </h2>
            <p>
              {company.legalName} (&ldquo;Apex Mineral Ventures&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to maintaining strict commercial confidentiality and safeguarding personal and corporate data collected during commercial mineral trading, due diligence, and advisory engagements.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">2. Information Collection</h2>
            <p>
              In executing mineral trading, assay verification, and export facilitation, we collect information submitted directly by trading principals and institutional representatives, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>Representative Identification:</strong> Full legal name, corporate email address, telephone/WhatsApp contact details, and country of jurisdiction.</li>
              <li><strong>Corporate Credentials:</strong> Company name, registered address, tax identification numbers, and authorized signatory credentials.</li>
              <li><strong>KYC & AML Documentation:</strong> Due diligence records required under Ugandan anti-money laundering regulations and international sanctions compliance.</li>
              <li><strong>Technical Metadata:</strong> Non-sensitive technical parameters (IP address, browser type) recorded for security audit logs.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">3. Purposes of Data Processing</h2>
            <p>Collected information is processed exclusively for:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Facilitating precious metals transactions and formal commercial inquiries.</li>
              <li>Executing regulatory filings with the Directorate of Geological Survey and Mines (DGSM) and Uganda Revenue Authority (URA).</li>
              <li>Fulfilling legal and statutory reporting obligations under the Mining and Minerals Act, 2022.</li>
              <li>Mitigating commercial fraud and ensuring counterparty legitimacy.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">4. Confidentiality & Non-Disclosure</h2>
            <p>
              Apex Mineral Ventures does not sell, lease, or monetize client or counterparty data. Information is disclosed solely to authorized regulatory bodies (e.g. MEMD, URA, DGSM), accredited testing laboratories (for assaying), and accredited banking institutions (for escrow settlement) as required to fulfill statutory transactions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">5. Security Safeguards</h2>
            <p>
              We enforce administrative, technical, and physical safeguards designed to protect commercial communications against unauthorized access, alteration, or interception.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">6. Inquiries & Data Rights</h2>
            <p>
              To request clarification regarding data records or exercise statutory rights under the Data Protection and Privacy Act 2019, please contact our compliance desk:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 text-slate-700">
              <p><strong>Compliance Officer:</strong> {company.legalName}</p>
              <p><strong>Email:</strong> {company.email}</p>
              <p><strong>Jurisdiction:</strong> Kampala, Republic of Uganda</p>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>
    </div>
  );
}
