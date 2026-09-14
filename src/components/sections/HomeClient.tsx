'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { services } from '@/data/services';
import { resources } from '@/data/resources';
import { mediaAssets, getServiceMedia, getResourceMedia } from '@/data/media';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import { StaggerContainer, StaggerItem } from '@/components/motion/Reveal';
import { CinematicHero } from '@/components/media/CinematicHero';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { TrustMarquee } from '@/components/motion/TrustMarquee';
import { MineralValuationCalculator } from '@/components/tools/MineralValuationCalculator';
import { RegionalHubsMap } from '@/components/tools/RegionalHubsMap';
import { QuickQuoteModal } from '@/components/ui/QuickQuoteModal';
import { ContactChoiceButton } from '@/components/ui/ContactChoiceButton';
import { iosSpring } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import {
  ShieldCheck,
  Scale,
  FileCheck,
  Vault,
  Lock,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Sparkles,
  Layers,
  ArrowUpRight,
  Flame,
} from 'lucide-react';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'precious-metals-trading': Scale,
  'mining-advisory': FileCheck,
  'export-facilitation': ShieldCheck,
  'transaction-security': Lock,
  'secure-storage': Vault,
};

export function HomeClient() {
  const featuredResources = resources.slice(0, 3);
  const reduceMotion = useReducedMotion();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [prefilledSpec, setPrefilledSpec] = useState<{
    metalType?: string;
    weight?: number;
    unit?: string;
    estimatedValue?: number;
    purity?: string;
  } | undefined>(undefined);

  const handleOpenCalculatorQuote = (spec: {
    metalType: string;
    weight: number;
    unit: string;
    estimatedValue: number;
    purity: string;
  }) => {
    setPrefilledSpec(spec);
    setQuoteModalOpen(true);
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* 1. Cinematic Prestige Hero */}
      <CinematicHero
        media={mediaAssets.heroSmelting}
        eyebrow="Licensed Precious Metals & Mineral Trading"
        title="Verified Gold & Minerals"
        titleAccent="Sourced with Integrity"
        description="We help international buyers, jewelers, and refineries purchase certified gold doré and refined minerals with complete confidence. Clear lab testing, official export permits, and insured shipping direct to your destination."
        primaryHref="/services"
        primaryLabel="Explore Our Services"
        secondaryHref="#valuation-calculator"
        secondaryLabel="Calculate Lot Value"
        trustItems={[
          'Uganda Mining Act 2022 Compliant',
          'Independent Laboratory Assays',
          '100% Value-Insured Air Shipping',
        ]}
        proofCard={{
          kicker: 'Kampala Office',
          meta: 'Verified Origin',
          body: 'Every shipment is verified with independent lab tests and backed by official government export permits.',
        }}
      />

      {/* 2. Proof Strip */}
      <ProofStrip
        stats={[
          { value: 5, suffix: '-step', label: 'Verified trade process' },
          { value: 2, suffix: '-phase', label: 'Independent lab assay' },
          { display: '999.9', label: 'Bullion purity standard' },
          { value: 1, suffix: ' day', label: 'Desk response time' },
        ]}
      />

      {/* 2b. Live Trust & Compliance Marquee */}
      <TrustMarquee />

      {/* 3. Core Mineral Capabilities & Services */}
      {/* 4. Core Mineral Capabilities & Services (Asymmetric Bento Grid) */}
      <section className="py-24 bg-[#F8FAFC] border-b border-blue-200/80">
        <div className="container">
          <FadeIn className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-800 mb-3 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-300/80">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Institutional Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Mineral Trading & Export Services
            </h2>
            <p className="text-sm md:text-base text-slate-700 mt-3 leading-relaxed font-normal">
              From mine-site origin checks and accredited laboratory purity assays to customs clearance and insured international shipping.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.07}>
            {services.map((service, index) => {
              const IconComp = serviceIcons[service.slug] || Layers;
              const isLarge = index === 0;
              const media = getServiceMedia(service.slug);

              return (
                <StaggerItem key={service.slug} className={isLarge ? 'md:col-span-2 lg:col-span-2' : ''}>
                  <HoverCard
                    className="card-3d bg-white border border-blue-200 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-blue-400 hover:shadow-[0_20px_40px_-12px_rgba(197,160,89,0.22),0_4px_12px_rgba(15,23,42,0.06)] transition-all h-full"
                  >
                    <div className={`relative overflow-hidden ${isLarge ? 'h-56 md:h-72' : 'h-44'}`}>
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes={isLarge ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
                      
                      {isLarge && (
                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-blue-400/50 text-blue-300 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                          <Flame className="w-3.5 h-3.5 text-blue-400" />
                          <span>Flagship Trading Desk</span>
                        </div>
                      )}
                    </div>

                    <div className={`p-7 sm:p-8 flex flex-col justify-between flex-1 ${isLarge ? 'bg-gradient-to-br from-white via-white to-blue-50/40' : ''}`}>
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300/80 flex items-center justify-center text-blue-800 group-hover:bg-blue-500 group-hover:text-slate-950 group-hover:scale-105 transition-all shadow-xs">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-950 group-hover:text-blue-800 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                            {service.shortDescription}
                          </p>
                        </div>
                        <ul className="space-y-2 pt-2 text-xs text-slate-700">
                          {service.benefits.slice(0, 3).map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-6 mt-6 border-t border-blue-100 flex items-center justify-between">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-xs font-bold uppercase tracking-wider text-blue-800 group-hover:text-blue-900 inline-flex items-center gap-1.5 transition-colors"
                        >
                          <span>View Full Specifications</span>
                          <ArrowRight className="w-3.5 h-3.5 text-blue-700 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. Interactive Regional Sourcing Corridor & Hub Explorer */}
      <RegionalHubsMap />

      {/* 6. Institutional Security & Compliance Teaser (Links to Why Us) */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
        <div className="container relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <FadeIn className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Buyer Protection Guarantee</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Zero Grey-Market Risk. Verified Ugandan Chain of Custody.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Explore our full institutional risk-mitigation framework, interactive assay inspection toolkit, and comparative due diligence matrix.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-4 flex lg:justify-end">
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={iosSpring}
              >
                <Link
                  href="/why-us"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-blue-500 hover:bg-blue-400 px-7 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                >
                  <span>Explore Buyer Protection</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 9. Mineral Intelligence & Guides */}
      <section className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F8FAFC] border-b border-blue-200/80">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-300/80">
                Knowledge & Compliance
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 mt-3 tracking-tight">
                Mineral Sourcing Knowledge Base
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl font-normal">
                Practical guides on Uganda mining regulations, export paperwork, purity testing, and responsible sourcing.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ x: 3 }} transition={iosSpring}>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800 hover:text-blue-900 transition-colors"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="w-4 h-4 text-blue-700" />
                </Link>
              </motion.div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerChildren={0.08}>
            {featuredResources.map((article) => {
              const cover = getResourceMedia(article.slug);
              return (
                <StaggerItem key={article.slug}>
                  <HoverCard className="h-full">
                    <Link
                      href={`/resources/${article.slug}`}
                      className="card-3d bg-white border border-blue-200 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-blue-400 hover:shadow-[0_20px_40px_-12px_rgba(197,160,89,0.2),0_4px_12px_rgba(15,23,42,0.06)] transition-all h-full"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="text-blue-800 font-bold uppercase tracking-wider text-[10px] bg-blue-100 px-2.5 py-0.5 rounded-md border border-blue-300/80 shadow-xs">
                              {article.category.replace('-', ' ')}
                            </span>
                            <span>{article.readingTime || 5} min read</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-800 transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="pt-5 mt-5 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-blue-800 group-hover:text-blue-900">
                          <span>Read Full Guide</span>
                          <ArrowUpRight className="w-4 h-4 text-blue-700" />
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 9. Collapsible Mineral Valuation Calculator */}
      <MineralValuationCalculator onOpenQuote={handleOpenCalculatorQuote} defaultExpanded={false} />

      {/* 10. Call-to-Action */}
      <section className="py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-blue-200/80">
        <div className="absolute inset-0 bg-topo-pattern opacity-30 pointer-events-none" />
        <div className="container relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto card-3d bg-gradient-to-br from-blue-100/70 via-white to-blue-50/60 border border-blue-300 rounded-3xl p-8 sm:p-12 md:p-16 text-center space-y-7 shadow-[0_20px_50px_-12px_rgba(197,160,89,0.2),0_4px_12px_rgba(15,23,42,0.06)]">
              <div className="w-14 h-14 rounded-2xl bg-white border border-blue-300 flex items-center justify-center mx-auto text-blue-700 shadow-[0_4px_12px_rgba(197,160,89,0.18),inset_0_1px_0_rgba(255,255,255,1)]">
                <Globe2 className="w-7 h-7" />
              </div>
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-800">
                  Direct Trade Desk
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Ready to Purchase Verified Minerals?
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                  Whether you need refined gold bullion, gold doré bars, or export paperwork assistance, our team in Kampala is here to help.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={iosSpring}
                  onClick={() => setQuoteModalOpen(true)}
                  className="btn-3d-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl cta-glow transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Request a Quick Quote</span>
                </motion.button>

                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }} transition={iosSpring}>
                  <ContactChoiceButton label="Contact Our Team" variant="secondary" />
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={prefilledSpec}
      />
    </div>
  );
}

