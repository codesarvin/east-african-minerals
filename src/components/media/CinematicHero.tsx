'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, Scale, ShieldCheck, Award } from 'lucide-react';
import { TextReveal } from '@/components/motion/TextReveal';
import { FadeIn } from '@/components/motion/FadeIn';
import type { MediaAsset } from '@/data/media';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { iosSpring } from '@/lib/motion';

interface CinematicHeroProps {
  media: MediaAsset;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  trustItems?: string[];
  proofCard?: { kicker: string; meta: string; body: string };
}

export function CinematicHero({
  media,
  eyebrow,
  title,
  titleAccent,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  trustItems = [],
  proofCard,
}: CinematicHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-gradient-to-b from-blue-50/80 via-[#FFFFFF] to-blue-50/40 border-b border-blue-200/80 py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background Subtle Pattern & Soft Gold Glow */}
      <div className="absolute inset-0 bg-topo-pattern opacity-30 pointer-events-none" />
      <motion.div
        animate={reduceMotion ? undefined : { x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-400/12 blur-3xl pointer-events-none rounded-full"
      />
      <motion.div
        animate={reduceMotion ? undefined : { x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-blue-500/10 blur-3xl pointer-events-none rounded-full"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <FadeIn direction="down" delay={0.05}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/90 border border-blue-300 text-xs font-bold uppercase tracking-widest text-blue-900 shadow-xs">
                <span className={`w-2 h-2 rounded-full bg-blue-600 ${reduceMotion ? '' : 'animate-pulse'}`} />
                <span>{eyebrow}</span>
              </div>
            </FadeIn>

            <div className="space-y-2">
              <TextReveal
                text={title}
                delay={0.12}
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]"
              />
              {titleAccent ? (
                <TextReveal
                  text={titleAccent}
                  delay={0.28}
                  className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-blue-gradient leading-[1.12]"
                />
              ) : null}
            </div>

            <FadeIn delay={0.35}>
              <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl leading-relaxed font-normal">
                {description}
              </p>
            </FadeIn>

            <FadeIn delay={0.42}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.025, y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  transition={iosSpring}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href={primaryHref}
                    className="btn-3d-primary cta-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200"
                  >
                    <span>{primaryLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.025, y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  transition={iosSpring}
                  className="w-full sm:w-auto"
                >
                  <a
                    href={secondaryHref || '#valuation-calculator'}
                    className="btn-3d-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 bg-white hover:bg-blue-50/80 border border-blue-200 rounded-xl active:scale-[0.98] transition-all duration-200"
                  >
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span>{secondaryLabel || 'Interactive Lot Calculator'}</span>
                  </a>
                </motion.div>
              </div>
            </FadeIn>

            {trustItems.length > 0 ? (
              <FadeIn delay={0.5}>
                <div className="pt-6 border-t border-blue-200/80 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 text-xs text-slate-700 font-semibold">
                  {trustItems.map((item) => (
                    <div key={item} className="flex items-center gap-2 bg-white/90 border border-blue-200/80 shadow-xs px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ) : null}
          </div>

          {/* Right Column: High-Prestige Media & Floating Proof Card */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.2} className="relative">
              {/* Media Frame with 3D Depth and Gold Metallic Rim */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-3xl overflow-hidden border-2 border-blue-200/90 shadow-[0_20px_50px_-12px_rgba(197,160,89,0.22),0_4px_12px_rgba(15,23,42,0.08)] bg-white group">
                <motion.div
                  className="w-full h-full"
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />
                
                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-blue-400/40 text-[11px] font-bold uppercase tracking-wider text-blue-300 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Uganda DGSM Verified</span>
                </div>

                {/* Bottom Ingot Stamp Overlay */}
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/85 border border-blue-500/30 text-[10px] font-mono font-bold text-blue-300 backdrop-blur-md">
                  <Award className="w-3 h-3 text-blue-400" />
                  <span>AU 999.9 BULLION GRADE</span>
                </div>
              </div>

              {/* Floating Proof Badge Card with Gold Luxury Card style */}
              {proofCard ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, ...iosSpring }}
                  whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
                  className="mt-4 sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 max-w-sm p-5 card-3d bg-white/98 backdrop-blur-xl border border-blue-300/90 rounded-2xl text-xs space-y-2.5 shadow-[0_16px_36px_-8px_rgba(197,160,89,0.22),0_4px_12px_rgba(15,23,42,0.08)] z-20"
                >
                  <div className="flex items-center justify-between text-blue-800 font-bold uppercase tracking-wider text-[10px]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>{proofCard.kicker}</span>
                    </span>
                    <span className="font-mono text-slate-800 bg-blue-100/90 px-2.5 py-0.5 rounded-md border border-blue-200 font-bold shadow-inner">
                      {proofCard.meta}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">
                    {proofCard.body}
                  </p>
                </motion.div>
              ) : null}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
