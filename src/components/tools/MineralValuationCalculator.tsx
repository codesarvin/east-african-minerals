'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '@/components/motion/FadeIn';
import { iosSpring, iosSpringGentle } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import {
  Scale,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Lock,
  ChevronDown,
  Calculator,
} from 'lucide-react';

interface MetalGrade {
  id: string;
  name: string;
  purityRange: string;
  defaultPurity: number; // e.g. 0.94 for 94%
  royaltyRate: number; // Uganda export royalty percentage
  assayMethod: string;
  description: string;
}

const METAL_GRADES: MetalGrade[] = [
  {
    id: 'dore-bar',
    name: 'Gold Doré Bars',
    purityRange: '92.0% – 96.5% Au',
    defaultPurity: 0.94,
    royaltyRate: 0.05,
    assayMethod: 'Dual-phase XRF & Fire Assay',
    description: 'Smelted semi-pure unrefined bars sourced from verified licensed mines.',
  },
  {
    id: 'refined-bullion',
    name: 'Refined Bullion (999.9)',
    purityRange: '99.99% Fine Gold (24K)',
    defaultPurity: 0.9999,
    royaltyRate: 0.01,
    assayMethod: 'Accredited Refinery Hallmarking & Spectrometry',
    description: 'Investment-grade LBMA standard bullion bars sealed in tamper-evident packaging.',
  },
  {
    id: 'alluvial-dust',
    name: 'Raw Alluvial Gold Dust',
    purityRange: '86.0% – 92.0% Au',
    defaultPurity: 0.89,
    royaltyRate: 0.05,
    assayMethod: 'Inductively Coupled Plasma (ICP-OES) + Fire Assay',
    description: 'Natural placer deposit gold sourced directly from licensed mining cooperatives.',
  },
  {
    id: 'nuggets',
    name: 'Natural Gold Nuggets',
    purityRange: '88.0% – 94.0% Au',
    defaultPurity: 0.91,
    royaltyRate: 0.05,
    assayMethod: 'Density Testing & Certified Spectrometry',
    description: 'High-specimen collectible and smelting nuggets with certified provenance.',
  },
];

type WeightUnit = 'kg' | 'oz' | 'g';

// Conversion factors to grams
const UNIT_TO_GRAMS: Record<WeightUnit, number> = {
  kg: 1000,
  oz: 31.1035,
  g: 1,
};

interface MineralValuationCalculatorProps {
  defaultExpanded?: boolean;
  onOpenQuote?: (spec: {
    metalType: string;
    weight: number;
    unit: string;
    estimatedValue: number;
    purity: string;
  }) => void;
}

export function MineralValuationCalculator({
  defaultExpanded = false,
  onOpenQuote,
}: MineralValuationCalculatorProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [selectedGradeId, setSelectedGradeId] = useState<string>('dore-bar');
  const [weight, setWeight] = useState<number>(5);
  const [unit, setUnit] = useState<WeightUnit>('kg');
  const [spotPricePerGram, setSpotPricePerGram] = useState<number>(85);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#valuation-calculator') {
        setIsExpanded(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const activeGrade = METAL_GRADES.find((g) => g.id === selectedGradeId) || METAL_GRADES[0];

  // Calculations
  const weightInGrams = weight * UNIT_TO_GRAMS[unit];
  const pureGoldGrams = weightInGrams * activeGrade.defaultPurity;
  const grossEstimatedValue = pureGoldGrams * spotPricePerGram;
  const estimatedRoyaltyLevy = grossEstimatedValue * activeGrade.royaltyRate;
  const pureGoldKg = (pureGoldGrams / 1000).toFixed(3);
  const pureGoldOz = (pureGoldGrams / 31.1035).toFixed(2);

  const handleRequestQuote = () => {
    if (onOpenQuote) {
      onOpenQuote({
        metalType: activeGrade.name,
        weight,
        unit: unit.toUpperCase(),
        estimatedValue: Math.round(grossEstimatedValue),
        purity: activeGrade.purityRange,
      });
    }
  };

  return (
    <section id="valuation-calculator" className="py-16 sm:py-20 section-depth-light border-b border-slate-200/80">
      <div className="container max-w-5xl">
        <FadeIn>
          {/* Collapsible Accordion Header Trigger */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full bg-white hover:bg-slate-50/90 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_12px_32px_-4px_rgba(0,102,255,0.12)] hover:border-blue-300 cursor-pointer group text-left"
            aria-expanded={isExpanded}
            aria-controls="calculator-panel"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Calculation Tool</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors">
                  Calculate Mineral Lot Valuation & Export Estimates
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  Estimate benchmark value, fine gold content, and official export fees.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-200/80 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                {isExpanded ? 'Collapse Tool' : 'Launch Calculator'}
              </span>
              <div className={`w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </button>
        </FadeIn>

        {/* Collapsible Body */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id="calculator-panel"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={iosSpringGentle}
              className="overflow-hidden pt-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls Column (Left) */}
                <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,1)] space-y-6">
                  {/* Step 1: Select Mineral Grade */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
                      1. Select Mineral Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {METAL_GRADES.map((grade) => {
                        const isSelected = grade.id === selectedGradeId;
                        return (
                          <button
                            key={grade.id}
                            type="button"
                            onClick={() => setSelectedGradeId(grade.id)}
                            className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50/90 border-blue-500 text-slate-900 ring-2 ring-blue-500/30 shadow-[0_4px_12px_rgba(0,102,255,0.12),inset_0_1px_0_rgba(255,255,255,1)]'
                                : 'bg-slate-50/80 border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-white shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm text-slate-900">{grade.name}</span>
                              {isSelected && (
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm" />
                              )}
                            </div>
                            <div className="text-xs text-blue-600 font-mono mt-1 font-semibold">
                              {grade.purityRange}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                              {grade.description}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Weight & Unit Inputs */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        2. Trade Quantity
                      </label>
                      <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/80 text-xs shadow-inner">
                        {(['kg', 'oz', 'g'] as WeightUnit[]).map((u) => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setUnit(u)}
                            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              unit === u
                                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {u === 'kg' ? 'Kilograms' : u === 'oz' ? 'Troy Oz' : 'Grams'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0.1"
                        step={unit === 'kg' ? '0.5' : unit === 'oz' ? '1' : '100'}
                        value={weight || ''}
                        onChange={(e) => setWeight(Math.max(0.01, parseFloat(e.target.value) || 0))}
                        className="w-full input-3d rounded-2xl px-4 py-3.5 text-xl font-bold font-mono text-slate-900 focus:outline-none"
                      />
                      <span className="text-base font-bold text-slate-500 uppercase tracking-wider min-w-[3rem]">
                        {unit}
                      </span>
                    </div>

                    {/* Quick Weight Presets */}
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {(unit === 'kg'
                        ? [1, 2.5, 5, 10, 25, 50]
                        : unit === 'oz'
                        ? [20, 50, 100, 250, 500]
                        : [500, 1000, 2500, 5000]
                      ).map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setWeight(preset)}
                          className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/90 border border-slate-200 text-slate-700 font-mono transition-all shadow-sm cursor-pointer active:scale-95"
                        >
                          +{preset} {unit}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Spot Benchmark Reference */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                        <span>Spot Price Benchmark Reference</span>
                      </span>
                      <span className="font-mono text-blue-600 font-bold">
                        ${(spotPricePerGram * 31.1035).toFixed(2)} / Troy Oz (${spotPricePerGram}/g)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="105"
                      value={spotPricePerGram}
                      onChange={(e) => setSpotPricePerGram(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>$70/g (~$2,177/oz)</span>
                      <span>Adjust reference spot rate</span>
                      <span>$105/g (~$3,265/oz)</span>
                    </div>
                  </div>
                </div>

                {/* Results Column (Right) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-blue-50/90 to-blue-100/40 border border-blue-200/90 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-4px_rgba(0,102,255,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] relative">
                  <div className="space-y-6">
                    {/* Header Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                      <div className="text-xs uppercase tracking-widest font-bold text-blue-700 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-blue-600" />
                        <span>Trade Breakdown</span>
                      </div>
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white text-blue-700 border border-blue-200/90 font-bold shadow-sm">
                        Verified Lot
                      </span>
                    </div>

                    {/* Major Value Display */}
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                        Estimated Gross Value
                      </span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono tracking-tight mt-1 drop-shadow-sm">
                        ${Math.round(grossEstimatedValue).toLocaleString()}{' '}
                        <span className="text-base text-blue-600 font-sans">USD</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Calculated based on fine gold content.
                      </div>
                    </div>

                    {/* Data Matrix */}
                    <div className="space-y-3 bg-white border border-blue-200/90 rounded-2xl p-4 sm:p-5 text-xs font-mono shadow-[0_2px_8px_rgba(0,102,255,0.05),inset_0_1px_0_rgba(255,255,255,1)]">
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="text-slate-500 font-sans">Gross Weight:</span>
                        <span className="font-bold text-slate-900">
                          {weight.toLocaleString()} {unit.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-700">
                        <span className="text-slate-500 font-sans">Fine Gold (Au):</span>
                        <span className="font-bold text-blue-600">
                          {pureGoldKg} kg / {pureGoldOz} oz
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-700">
                        <span className="text-slate-500 font-sans">Testing Method:</span>
                        <span className="font-bold text-blue-700 text-right text-[11px]">
                          {activeGrade.assayMethod}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-700 pt-2 border-t border-slate-100">
                        <span className="text-slate-500 font-sans">Estimated Export Levy (~{(activeGrade.royaltyRate * 100).toFixed(0)}%):</span>
                        <span className="font-bold text-slate-800">
                          ~${Math.round(estimatedRoyaltyLevy).toLocaleString()} USD
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-700">
                        <span className="text-slate-500 font-sans">Dispatch Timeline:</span>
                        <span className="font-bold text-emerald-600">24 – 48 Hours Ex-Kampala</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 space-y-3">
                      <motion.button
                        type="button"
                        whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        transition={iosSpring}
                        onClick={handleRequestQuote}
                        className="btn-3d-primary w-full py-4 px-6 text-white font-extrabold uppercase tracking-wider text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Request a Quote for this Lot</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 text-center">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>No-Obligation Quote</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-blue-600" />
                          <span>Bank Escrow Supported</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
