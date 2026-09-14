'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { pipelineStages } from '@/data/pipeline';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { Pipeline } from '@/components/sections/Pipeline';
import { DueDiligenceMatrix } from '@/components/sections/DueDiligenceMatrix';
import { AssayDocumentInspector } from '@/components/tools/AssayDocumentInspector';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import { StaggerContainer, StaggerItem } from '@/components/motion/Reveal';
import { iosSpring } from '@/lib/motion';
import { ContactChoiceButton } from '@/components/ui/ContactChoiceButton';
import {
  ShieldCheck,
  Scale,
  FileCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Building2,
} from 'lucide-react';

export function WhyUsClient() {
  const pillars = [
    {
      title: '1. 100% Legal & Documented',
      desc: 'All mineral purchases operate strictly under Ugandan mining law (Mining Act 2022) and international trade standards.',
      icon: Scale,
    },
    {
      title: '2. Certified Laboratory Testing',
      desc: 'Independent fire assay and spectrometer tests in accredited labs verify the exact purity of every parcel.',
      icon: ShieldCheck,
    },
    {
      title: '3. Official Export Clearances',
      desc: 'We handle all official export permits (Form 10), origin certificates, and customs tax receipts.',
      icon: FileCheck,
    },
    {
      title: '4. Insured Global Shipping',
      desc: 'Fully insured air cargo and armored transport protect your shipments all the way to your destination.',
      icon: Lock,
    },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-500 selection:text-white">
      <PageMasthead
        eyebrow="Buyer Protection & Standards"
        icon={<Sparkles className="w-4 h-4 text-blue-500" />}
        title="Why Work With Apex Mineral Ventures"
        description="Mineral sourcing offers significant opportunities, but buying through unverified intermediaries carries real risks. Here is how our transparent process and official documentation protect your mineral purchases."
      />



      {/* Due Diligence Matrix */}
      <DueDiligenceMatrix />

      {/* Interactive Document & Assay Inspector */}
      <AssayDocumentInspector />

      {/* Custody Chain */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Traceable Custody</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Our 5-Step Sourcing & Delivery Process
            </h2>
          </FadeIn>
          <Pipeline stages={[...pipelineStages]} />
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Guarantees</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Four Pillars of Safe Mineral Trading
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerChildren={0.07}>
            {pillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <StaggerItem key={pillar.title}>
                  <HoverCard className="card-3d bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 flex items-start gap-4 hover:border-blue-400 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.18),0_4px_12px_rgba(15,23,42,0.06)] h-full">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform flex-shrink-0 shadow-xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-slate-950">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{pillar.desc}</p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Regulatory Alignment */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn>
            <div className="p-8 md:p-12 card-3d bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-200/90 rounded-3xl space-y-6 shadow-[0_16px_36px_-8px_rgba(30,58,138,0.12),0_4px_12px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-3 text-blue-700">
                <Building2 className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-widest">Uganda Mining Regulations</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">
                Fully Compliant with Uganda&apos;s Mining Act, 2022
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                Uganda&apos;s mineral regulations require dealer licensing, traceability, and official export permits. We work in full compliance with the Directorate of Geological Survey and Mines (DGSM), ensuring every transaction is completely transparent and legal.
              </p>
              <motion.div whileHover={{ x: 4 }} transition={iosSpring} className="inline-block">
                <Link
                  href="/resources/understanding-uganda-mining-licenses"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>Read Our Guide to Uganda Mining Licenses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container max-w-2xl space-y-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Ready to Purchase Minerals Safely?</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal mt-3">
              Contact our team in Kampala to discuss purchase volumes, schedule laboratory testing, or review sample export permits.
            </p>
            <div className="pt-6">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }} transition={iosSpring} className="inline-block">
                <ContactChoiceButton
                  label="Contact Our Team"
                  variant="primary"
                  className="[&>button]:px-8 [&>button]:py-4 [&>button]:text-sm"
                />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

