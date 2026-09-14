'use client';

import { ShieldCheck, Scale, FileCheck, Lock, Sparkles, Building2, Globe2, Vault } from 'lucide-react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

const marqueeItems = [
  { icon: Scale, label: 'Uganda Mining Act 2022 Compliant' },
  { icon: ShieldCheck, label: '999.9 Gold Bullion Standard' },
  { icon: FileCheck, label: 'Independent Lab Assay Testing' },
  { icon: Vault, label: 'Secure Vault Storage' },
  { icon: Lock, label: 'Secure Bank Escrow Payments' },
  { icon: Globe2, label: 'Insured Air Cargo Shipping' },
  { icon: Building2, label: 'Official Government Export Permits' },
  { icon: Sparkles, label: 'Conflict-Free & Ethically Sourced' },
];

export function TrustMarquee({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden border-y border-slate-200 bg-slate-50 py-3.5 text-slate-800 ${className}`}
      aria-label="Institutional Standards and Trade Safeguards"
    >
      {/* Left/Right Edge Gradient Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      <div className={reduceMotion ? 'flex flex-wrap items-center justify-center gap-6 px-4' : 'animate-marquee'}>
        {[...marqueeItems, ...marqueeItems].map((item, index) => {
          const IconComp = item.icon;
          return (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-2.5 px-5 py-1 text-xs font-bold text-slate-700 select-none whitespace-nowrap"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-blue-600 border border-blue-200">
                <IconComp className="h-3.5 w-3.5" />
              </div>
              <span>{item.label}</span>
              <span className="ml-3 text-slate-300 font-normal">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
