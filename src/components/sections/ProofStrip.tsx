'use client';

import { motion } from 'motion/react';
import { FadeIn } from '@/components/motion/FadeIn';
import { CountUp } from '@/components/motion/CountUp';
import { iosSpring } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface ProofStat {
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  display?: string;
}

interface ProofStripProps {
  stats: ProofStat[];
}

export function ProofStrip({ stats }: ProofStripProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-blue-200/80 bg-[#F8FAFC] text-slate-900">
      <div className="container py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.06}>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
                transition={iosSpring}
                className="space-y-1.5 p-5 sm:p-6 rounded-2xl bg-white border border-blue-200 shadow-[0_4px_16px_-2px_rgba(197,160,89,0.08),inset_0_1px_0_rgba(255,255,255,1)] hover:border-blue-400 hover:shadow-[0_12px_28px_-4px_rgba(197,160,89,0.22)] text-center transition-all duration-300 group"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-blue-gradient font-mono drop-shadow-xs">
                  {stat.display ? (
                    stat.display
                  ) : (
                    <CountUp
                      value={stat.value ?? 0}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  )}
                </div>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-700 font-bold leading-tight group-hover:text-blue-900 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
