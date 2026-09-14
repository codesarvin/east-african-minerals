'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Scale,
  Lock,
  ArrowRight,
} from 'lucide-react';

export function DueDiligenceMatrix() {
  const comparisonItems = [
    {
      category: 'Mineral Source & Origins',
      informalRisk: 'Unverified origins from middle-men. High risk of counterfeit parcels or undocumented sources.',
      apexStandard: '100% legal sourcing directly from licensed artisanal and corporate mines with complete origin documents.',
      status: 'Verified Source',
    },
    {
      category: 'Purity & Lab Testing',
      informalRisk: 'Basic torch or acid field tests that can easily hide coated metals or inaccurate weights.',
      apexStandard: 'Accredited laboratory testing (XRF Spectrometry and Fire Assay) with an official certified purity report.',
      status: 'Certified Purity',
    },
    {
      category: 'Government Export Permits',
      informalRisk: 'Unofficial transport with high risk of customs seizure, legal penalties, and total cargo loss.',
      apexStandard: 'Official Form 10 Mineral Export Permits from the Ministry of Energy and fully cleared customs taxes.',
      status: 'Fully Cleared',
    },
    {
      category: 'Safe Payment & Escrow',
      informalRisk: 'Demands for upfront cash deposits or unsecured transfers with zero buyer protection.',
      apexStandard: 'Secure bank escrow and Letters of Credit (LC). Funds release only after verified assay and inspection.',
      status: 'Secure Escrow',
    },
    {
      category: 'Insured Global Shipping',
      informalRisk: 'Uninsured personal transport with complete financial loss if cargo is delayed, lost, or stolen.',
      apexStandard: 'Armored ground transport and 100% value-insured international air cargo via trusted security carriers.',
      status: '100% Insured',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-blue-50/25 to-slate-50 text-slate-900 border-b border-slate-200">
      <div className="container">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest shadow-sm mb-3">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Buyer Protection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            Safe Mineral Trading vs. Unverified Sellers
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
            Precious mineral sourcing offers significant opportunities, but unverified sellers carry real risks. Here is how our transparent process keeps your mineral purchases safe, legal, and straightforward.
          </p>
        </FadeIn>

        {/* Comparison Table with 3D Depth */}
        <div className="max-w-5xl mx-auto card-3d bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15),0_4px_12px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white font-bold text-xs uppercase tracking-wider p-5 sm:p-6 border-b border-blue-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="md:col-span-3 text-blue-100">Trade Step</div>
            <div className="md:col-span-4 text-red-200 flex items-center gap-1.5 mt-2 md:mt-0">
              <AlertTriangle className="w-4 h-4" />
              <span>Unverified / Street Brokers</span>
            </div>
            <div className="md:col-span-5 text-emerald-200 flex items-center gap-1.5 mt-2 md:mt-0">
              <ShieldCheck className="w-4 h-4" />
              <span>Apex Mineral Standard</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {comparisonItems.map((item, index) => (
              <div
                key={item.category}
                className={`grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 text-xs gap-4 items-start transition-colors hover:bg-slate-50/80 ${
                  index % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                }`}
              >
                {/* Category */}
                <div className="md:col-span-3">
                  <span className="font-extrabold text-slate-950 text-sm">{item.category}</span>
                  <div className="mt-1.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200/80 shadow-xs">
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Risk */}
                <div className="md:col-span-4 bg-red-50/70 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border md:border-0 border-red-200/70 flex items-start gap-2.5 shadow-xs md:shadow-none">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 leading-relaxed font-normal">{item.informalRisk}</span>
                </div>

                {/* Apex Standard */}
                <div className="md:col-span-5 bg-emerald-50/70 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border md:border-0 border-emerald-200/70 flex items-start gap-2.5 shadow-xs md:shadow-none">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-semibold leading-relaxed">{item.apexStandard}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer Banner */}
          <div className="bg-gradient-to-r from-blue-50/90 via-white to-blue-50/70 text-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-blue-200/80">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-11 h-11 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-[0_4px_12px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,1)]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-950 text-sm block font-bold">100% Legal & Documented Trade</strong>
                <span className="text-slate-600 text-xs">Every shipment follows official Ugandan mining and export laws.</span>
              </div>
            </div>

            <a
              href="/why-us"
              className="btn-3d-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex-shrink-0"
            >
              <span>Learn How We Protect You</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
