import { ContactForm } from '@/components/sections/ContactForm';
import { company } from '@/config/company';
import { generatePageMetadata } from '@/lib/metadata';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import { Mail, Phone, MapPin, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Contact & Commercial Trading Desk | Apex Mineral Ventures',
  description: 'Initiate formal precious metals trading inquiries, mining advisory requests, and export due diligence with Apex Mineral Ventures in Kampala, Uganda.',
  path: '/contact',
  image: `${company.siteUrl}/images/trading-desk.jpg`,
  keywords: [
    'contact gold dealer Uganda',
    'mineral trading desk Kampala',
    'gold export inquiry Uganda',
    'mining advisory consultation',
  ],
});

export default function ContactPage() {
  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <PageMasthead
        eyebrow="Commercial Inquiries & Advisory"
        icon={<MessageSquare className="w-4 h-4 text-blue-500" />}
        title="Connect with Our Trading Desk"
        description="Whether structuring high-purity gold purchases, requesting mining due diligence, or coordinating export logistics, our team in Kampala responds within 1 business day."
      />

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-8">
              <FadeIn>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Headquarters & Registry
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
                  Direct Communications
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  All commercial discussions are handled under strict professional confidentiality.
                </p>
              </FadeIn>

              <div className="space-y-4">
                <FadeIn delay={0.05}>
                  <HoverCard className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4 hover:border-blue-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Corporate Email Desk</div>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors block mt-0.5"
                      >
                        {company.email}
                      </a>
                      <p className="text-[11px] text-slate-500 mt-0.5">Encrypted commercial communications</p>
                    </div>
                  </HoverCard>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <HoverCard className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4 hover:border-blue-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Primary WhatsApp Desk
                      </div>
                      <a
                        href={`https://wa.me/${company.whatsapp}`}
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors block mt-0.5"
                      >
                        {company.whatsappDisplay}
                      </a>
                      <p className="text-[11px] text-slate-500 mt-0.5">{company.timezone} operational hours</p>
                    </div>
                  </HoverCard>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <HoverCard className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4 hover:border-blue-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Physical Jurisdiction</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{company.locationDetails}</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Republic of Uganda</p>
                    </div>
                  </HoverCard>
                </FadeIn>
              </div>

              <FadeIn delay={0.2}>
                <div className="p-6 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                    <Clock className="w-4 h-4" />
                    <span>Trading & Analytical Hours</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1 font-medium">
                    <p>
                      <strong>Monday – Friday:</strong> 08:00 – 17:00 EAT (UTC+3)
                    </p>
                    <p>
                      <strong>Saturday:</strong> By Pre-Scheduled Appointment
                    </p>
                    <p>
                      <strong>Sunday & Public Holidays:</strong> Closed
                    </p>
                  </div>
                  <div className="pt-2 border-t border-blue-200/60 text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Physical visits require prior security clearance.</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.08} className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Secure Intake</span>
                  <h2 className="text-2xl font-extrabold text-slate-950 mt-1 tracking-tight">
                    Commercial Transaction Inquiry
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Provide transaction parameters, required volumes, or advisory scope to initiate formal due diligence.
                  </p>
                </div>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
