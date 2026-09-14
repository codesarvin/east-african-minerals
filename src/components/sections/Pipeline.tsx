'use client';

import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { FadeIn } from '@/components/motion/FadeIn';
import { iosSpring } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface PipelineStage {
  step: string;
  title: string;
  description: string;
}

interface PipelineProps {
  stages: PipelineStage[];
}

export function Pipeline({ stages }: PipelineProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { threshold: 0.55, rootMargin: '-12% 0px -35% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [stages.length]);

  return (
    <div className="relative">
      {/* Desktop horizontal timeline line */}
      <div className="hidden md:block absolute top-10 left-[8%] right-[8%] h-px bg-slate-200" />
      
      {/* Mobile vertical timeline line */}
      <div className="md:hidden absolute top-6 bottom-6 left-6 w-0.5 bg-blue-100 -z-0" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 relative z-10">
        {stages.map((stage, index) => {
          const isActive = active === index;
          return (
            <FadeIn key={stage.step} delay={index * 0.05}>
              <motion.div
                ref={(node) => {
                  refs.current[index] = node;
                }}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={iosSpring}
                className={`relative cursor-pointer bg-slate-50/90 border rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[190px] sm:min-h-[220px] transition-all duration-300 ${
                  isActive
                    ? 'border-blue-500 bg-white shadow-xl shadow-blue-500/15 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-md'
                }`}
              >
                {/* Desktop node */}
                <div
                  className={`hidden md:block absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-white transition-colors duration-300 ${
                    isActive ? 'bg-blue-600 scale-125' : 'bg-slate-300'
                  }`}
                />

                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className={`text-xl sm:text-2xl font-mono font-bold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                      {stage.step}
                    </span>
                    <span className={`md:hidden px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200/70 text-slate-500'
                    }`}>
                      Step {index + 1} of 5
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 leading-snug">{stage.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{stage.description}</p>
                </div>
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <ShieldCheck className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`font-semibold ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>
                    Verified step
                  </span>
                </div>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
