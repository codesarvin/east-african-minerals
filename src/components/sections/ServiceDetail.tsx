import Link from 'next/link';
import { Service } from '@/types';
import { generateServiceJsonLd, generateBreadcrumbJsonLd } from '@/lib/structured-data';
import { company } from '@/config/company';
import { getServiceMedia } from '@/data/media';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { MediaFrame } from '@/components/media/MediaFrame';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import { ContactChoiceButton } from '@/components/ui/ContactChoiceButton';
import { ArrowLeft, CheckCircle2, ArrowRight, HelpCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const media = getServiceMedia(service.slug);

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateServiceJsonLd({
              name: service.title,
              description: service.shortDescription,
              url: `${company.siteUrl}/services/${service.slug}`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: 'Home', item: company.siteUrl },
              { name: 'Services', item: `${company.siteUrl}/services` },
              { name: service.title, item: `${company.siteUrl}/services/${service.slug}` },
            ])
          ),
        }}
      />
      {service.faqs && service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: service.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      <PageMasthead
        eyebrow="Service Overview"
        icon={<Sparkles className="w-4 h-4 text-blue-500" />}
        title={service.title}
        description={service.shortDescription}
        lead={
          <Link
            href="/services"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 inline-flex items-center gap-1.5 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>All Services</span>
          </Link>
        }
      />

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-8">
              <FadeIn>
                <MediaFrame
                  media={media}
                  kicker="Verified Sourcing & Execution"
                  caption={service.title}
                  heightClassName="h-64 sm:h-80"
                />
              </FadeIn>
              <FadeIn delay={0.08} className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">About This Service</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">How We Can Help</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal pt-1">{service.description}</p>
              </FadeIn>
            </div>

            <FadeIn delay={0.12} className="lg:sticky lg:top-28">
              <div className="card-3d bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 border border-blue-200/90 rounded-3xl p-6 space-y-5 shadow-[0_16px_36px_-8px_rgba(30,58,138,0.14),0_4px_12px_rgba(15,23,42,0.06)]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700">Request this service</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Speak with the Kampala desk about availability, assay, and export timing for {service.title.toLowerCase()}.
                </p>
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-blue-100 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Structured under Uganda Mining Act 2022</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-blue-100 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Independent laboratory assays</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-blue-100 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Protected bank escrow options</span>
                  </div>
                </div>
                <ContactChoiceButton
                  label="Talk to Our Team"
                  variant="primary"
                  fullWidth
                  className="[&>button]:py-3.5"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Why Work With Us</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Key Benefits & Capabilities
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {service.benefits.map((benefit, index) => (
              <FadeIn key={benefit} delay={index * 0.05}>
                <div className="card-3d flex items-start gap-3 bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all h-full">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{benefit}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn className="max-w-2xl mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Step-by-Step Procedure</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 mt-2 tracking-tight">How the Process Works</h2>
          </FadeIn>
          <div className="space-y-4 sm:space-y-6">
            {service.process.map((step, index) => (
              <FadeIn key={step.order} delay={index * 0.05}>
                <HoverCard className="card-3d flex items-start gap-4 sm:gap-5 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25">
                      {step.order}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-950">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{step.description}</p>
                  </div>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container max-w-5xl">
            <FadeIn className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Frequently Asked Questions</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 mt-2 tracking-tight">
                Common Questions About {service.title}
              </h2>
            </FadeIn>
            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <FadeIn key={faq.question} delay={index * 0.05}>
                  <div className="card-3d bg-white border border-slate-200/90 rounded-2xl p-6 space-y-2 hover:border-blue-300 transition-all shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
                    <h3 className="text-sm sm:text-base font-bold text-slate-950 flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed font-normal">{faq.answer}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-white text-center">
        <div className="container max-w-2xl space-y-6">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Ready to Get Started with {service.title}?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal mt-3">
              Speak directly with our team in Kampala to discuss your requirements, check availability, or request a quote.
            </p>
            <div className="pt-6">
              <ContactChoiceButton
                label="Talk to Our Team"
                variant="primary"
                className="[&>button]:px-8 [&>button]:py-4 [&>button]:text-sm"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
