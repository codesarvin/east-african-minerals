'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '@/components/motion/FadeIn';
import { iosSpringGentle } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import {
  ShieldCheck,
  QrCode,
  Stamp,
  Lock,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface DocumentSpecimen {
  id: string;
  title: string;
  shortCode: string;
  issuingBody: string;
  description: string;
  securityFeatures: string[];
  specimenData: {
    docNumber: string;
    dateOfIssue: string;
    lotReference: string;
    declaredPurity: string;
    statutoryClearance: string;
  };
}

const SPECIMENS: DocumentSpecimen[] = [
  {
    id: 'form-10',
    title: 'Form 10 Mineral Export Permit',
    shortCode: 'Export Permit (Form 10)',
    issuingBody: 'Uganda Directorate of Geological Survey and Mines (DGSM)',
    description: 'Official government permit required by Ugandan mining law before any mineral shipment can legally leave the country.',
    securityFeatures: [
      'Official Ministry Hologram & Security Stamp',
      'QR Code Verification against the National Mines Registry',
      'Customs Tax Clearance Certificate',
      'Numbered Tamper-Evident Container Seal',
    ],
    specimenData: {
      docNumber: 'UG-DGSM-EXP-2026/0842-A',
      dateOfIssue: 'Active Export Clearance',
      lotReference: 'LOT #EAM-AU-9428',
      declaredPurity: '999.9 Fine Gold / 94.2% Doré',
      statutoryClearance: 'Verified under Uganda Mining Act',
    },
  },
  {
    id: 'icglr-cert',
    title: 'ICGLR Certificate of Origin',
    shortCode: 'Certificate of Origin',
    issuingBody: 'International Conference on the Great Lakes Region (ICGLR)',
    description: 'Internationally accepted certificate proving that minerals are responsibly sourced from conflict-free, legally registered mine sites.',
    securityFeatures: [
      'Official ICGLR Tracking Barcode',
      'Conflict-Free Origin Stamp',
      'Verified Mine Site GPS Location',
      'Complete Chain-of-Custody Record',
    ],
    specimenData: {
      docNumber: 'ICGLR-UG-RCM-2026-9041',
      dateOfIssue: 'Certified Origin',
      lotReference: 'MINE-ID: KRM-0482-L',
      declaredPurity: 'Conflict-Free Sourcing Verified',
      statutoryClearance: 'ICGLR Regional Standards Compliant',
    },
  },
  {
    id: 'assay-report',
    title: 'Certified Laboratory Assay Report',
    shortCode: 'Lab Assay Report',
    issuingBody: 'Independent Certified Testing Laboratory (Kampala)',
    description: 'Accredited laboratory report showing the exact purity, weight, and metal breakdown tested through Spectrometry and Fire Assay.',
    securityFeatures: [
      'Detailed Purity & Weight Breakdown',
      'Signed by Certified Chief Chemist',
      'Representative Sample Core Testing',
      'Independent Chemical Fire Assay',
    ],
    specimenData: {
      docNumber: 'LAB-ASSAY-KLA-2026/5120',
      dateOfIssue: 'Testing Complete & Certified',
      lotReference: '5.000 KG Doré Bar Batch #4',
      declaredPurity: '95.42% Gold (Au) | 3.81% Silver (Ag)',
      statutoryClearance: 'ISO-Accredited Lab Calibration',
    },
  },
  {
    id: 'customs-awb',
    title: 'Customs Clearance & Insured Air Waybill (AWB)',
    shortCode: 'Customs & Shipping AWB',
    issuingBody: 'Uganda Revenue Authority (URA) & Insured Cargo Carrier',
    description: 'Customs export documentation and fully insured international air shipping direct to your designated airport or vault.',
    securityFeatures: [
      'Official URA Customs Electronic Seal',
      'Secure Armored Airport Transfer',
      '100% Full-Value Cargo Insurance Policy',
      'Direct Consignee Delivery Verification',
    ],
    specimenData: {
      docNumber: 'AWB-070-9841-2026',
      dateOfIssue: 'Entebbe International Airport',
      lotReference: 'SEAL #UG-SEC-849120',
      declaredPurity: 'Insured Precious Cargo',
      statutoryClearance: 'Customs & Security Cleared',
    },
  },
];

export function AssayDocumentInspector() {
  const [activeDocId, setActiveDocId] = useState<string>('form-10');
  const reduceMotion = useReducedMotion();

  const activeDoc = SPECIMENS.find((d) => d.id === activeDocId) || SPECIMENS[0];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/60 to-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="container">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest shadow-sm mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Documentation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            Clear Documents & Lab Reports
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
            Every shipment with Apex Mineral Ventures is backed by official government permits, origin certificates, and independent laboratory test reports.
          </p>
        </FadeIn>

        {/* Tab Selector with 3D elevation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {SPECIMENS.map((spec) => {
            const isSelected = spec.id === activeDocId;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => setActiveDocId(spec.id)}
                className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'btn-3d-primary bg-blue-600 text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4),0_2px_4px_rgba(37,99,235,0.2)] ring-2 ring-blue-400/50'
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                {spec.shortCode}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Specimen Card with 3D Depth */}
        <div className="max-w-5xl mx-auto card-3d bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15),0_4px_12px_rgba(15,23,42,0.06)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDoc.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={iosSpringGentle}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Column: Specimen Sheet Simulation */}
              <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200/80 relative bg-gradient-to-br from-slate-50/90 via-blue-50/20 to-slate-50/70">
                {/* Security Watermark Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                  <span className="text-8xl font-black rotate-[-25deg] tracking-widest text-blue-600">
                    VERIFIED
                  </span>
                </div>

                {/* Simulated Certificate Header */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-blue-700">
                        Official Specimen
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1">
                        {activeDoc.title}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">{activeDoc.issuingBody}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-[0_4px_12px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,1)]">
                      <Stamp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Specimen Data Fields (Monospaced Security Table with 3D Depth) */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-4.5 space-y-2.5 font-mono text-xs shadow-[0_4px_12px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,1)]">
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="text-slate-500 font-sans">Document ID:</span>
                      <span className="font-bold text-blue-700">{activeDoc.specimenData.docNumber}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="text-slate-500 font-sans">Verification Status:</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{activeDoc.specimenData.dateOfIssue}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="text-slate-500 font-sans">Lot Ref:</span>
                      <span className="text-slate-950 font-bold">{activeDoc.specimenData.lotReference}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="text-slate-500 font-sans">Fineness / Grade:</span>
                      <span className="text-blue-700 font-bold">{activeDoc.specimenData.declaredPurity}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700 pt-2 border-t border-slate-100">
                      <span className="text-slate-500 font-sans">Regulatory Seal:</span>
                      <span className="text-blue-700 text-right text-[11px] font-semibold">{activeDoc.specimenData.statutoryClearance}</span>
                    </div>
                  </div>

                  {/* Security QR Feature */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-slate-700 shadow-inner">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      <span className="text-[11px] font-mono text-slate-700 font-medium">
                        Official Digital Verification Active
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-blue-800 px-2.5 py-0.5 rounded-md bg-white border border-blue-200 shadow-xs">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Why This Protects the Buyer */}
              <div className="lg:col-span-5 p-6 sm:p-10 bg-white flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs uppercase font-bold tracking-wider text-blue-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span>How This Protects You</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {activeDoc.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Key Security Features:
                    </span>
                    <ul className="space-y-2">
                      {activeDoc.securityFeatures.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="/contact"
                    className="btn-3d-primary w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-blue-500/20"
                  >
                    <span>Request Sample Documents</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
