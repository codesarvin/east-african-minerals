'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface PageMastheadProps {
  eyebrow: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  lead?: ReactNode;
  children?: ReactNode;
}

export function PageMasthead({ eyebrow, icon, title, description, lead, children }: PageMastheadProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-16 sm:pt-24 pb-10 sm:pb-16 bg-gradient-to-b from-blue-100/70 via-[#FFFFFF] to-[#FFFFFF] border-b border-blue-200/80 overflow-hidden">
      <div className="absolute inset-0 bg-topo-pattern opacity-30 pointer-events-none" />
      <motion.div
        animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 right-0 w-[420px] h-[280px] bg-blue-400/12 blur-3xl pointer-events-none rounded-full"
      />
      <div className="container relative z-10 max-w-4xl">
        {lead ? <div className="mb-4 sm:mb-6">{lead}</div> : null}
        <FadeIn direction="down">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-100 px-3 py-1 rounded-full border border-blue-300/80 mb-2 sm:mb-3 shadow-xs">
            {icon}
            <span>{eyebrow}</span>
          </div>
        </FadeIn>
        <TextReveal
          text={title}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.18]"
          delay={0.08}
        />
        {description ? (
          <FadeIn delay={0.2}>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 mt-3 sm:mt-4 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>
          </FadeIn>
        ) : null}
        {children ? <div className="mt-4 sm:mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
