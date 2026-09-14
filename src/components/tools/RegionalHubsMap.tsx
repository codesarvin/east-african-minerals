'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '@/components/motion/FadeIn';
import { iosSpringGentle } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import {
  MapPin,
  Globe2,
  CheckCircle2,
  FileText,
  ArrowRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Hub Data with REAL GPS coordinates                                */
/* ------------------------------------------------------------------ */

interface HubDetail {
  id: string;
  name: string;
  category: 'Commercial Hub' | 'Mining Belt' | 'Air Cargo Corridor' | 'Regional Gateway';
  location: string;
  lat: number;
  lng: number;
  focus: string;
  features: string[];
  securityProtocol: string;
  leadTime: string;
  complianceDoc: string;
}

const HUBS_DATA: HubDetail[] = [
  {
    id: 'kampala-desk',
    name: 'Kampala Central Assay & Trade Hub',
    category: 'Commercial Hub',
    location: 'Kampala, Uganda (Central Operations)',
    lat: 0.3136,
    lng: 32.5811,
    focus: 'Primary XRF Spectrometry, Fire Assay testing, bank escrow settlement, and sovereign export permit issuance.',
    features: [
      'Accredited Dual-Phase Laboratory',
      'Bank-Grade Custodial Vaulting',
      'Ministry of Energy & Mineral Development (MEMD) Liaison',
      'Direct Escrow Release Verification',
    ],
    securityProtocol: '24/7 Biometric Armored Storage & Bonded Handover',
    leadTime: '12 – 24 Hours Assay Processing',
    complianceDoc: 'DGSM Form 10 & Assay Certificate',
  },
  {
    id: 'karamoja-belt',
    name: 'Karamoja Greenstone Mining Corridor',
    category: 'Mining Belt',
    location: 'North-Eastern Uganda',
    lat: 2.5,
    lng: 34.5,
    focus: 'Primary artisanal and mechanized lode mining operations with high natural gold purity (92-96%).',
    features: [
      'Licensed Local Mining Cooperatives',
      'ICGLR Traceability Tagging at Source',
      'Fair-Trade & Conflict-Free Sourcing Checks',
      'Direct Mine-Gate Ore & Ingot Verification',
    ],
    securityProtocol: 'Armored GPS-Tracked Escort to Kampala Hub',
    leadTime: 'Scheduled Weekly Aggregation',
    complianceDoc: 'ICGLR Mine-Site Origin Certificate',
  },
  {
    id: 'buhweju-mubende',
    name: 'Buhweju & Mubende Alluvial Concessions',
    category: 'Mining Belt',
    location: 'Western & Central Uganda',
    lat: 0.4,
    lng: 30.5,
    focus: 'Rich alluvial and quartz-vein doré production with continuous supply agreements.',
    features: [
      'Direct Smelting at Regional Depots',
      'Continuous Batch Purity Monitoring',
      'Verified Environmental Clearance (NEMA)',
      'Community Royalty Compliance',
    ],
    securityProtocol: 'Tamper-Evident Barcode Sealed Transit',
    leadTime: '24 – 48 Hours to Central Assay',
    complianceDoc: 'Regional Mineral Dispatch Pass',
  },
  {
    id: 'entebbe-air',
    name: 'Entebbe International Air Cargo Hub (EBB)',
    category: 'Air Cargo Corridor',
    location: 'Entebbe International Airport, Uganda',
    lat: 0.0424,
    lng: 32.4434,
    focus: 'Dedicated customs-bonded mineral export corridor with direct air-cargo connectivity to global refining hubs.',
    features: [
      'Uganda Revenue Authority (URA) Customs Clearance',
      'Brinks / Malca-Amit Secure Armored Transport',
      'Direct Flights to Dubai (DXB), Zurich (ZRH), London (LHR)',
      '100% Insured In-Transit Airway Bill (AWB)',
    ],
    securityProtocol: 'Aviation Police & Bonded Freight Customs Escort',
    leadTime: 'Same-Day Airfreight Departure Post-Clearance',
    complianceDoc: 'Customs Single Administrative Document (C-17) & AWB',
  },
];

/* ------------------------------------------------------------------ */
/*  Leaflet Map (dynamically imported to avoid SSR)                   */
/* ------------------------------------------------------------------ */

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-blue-50/50 rounded-2xl flex items-center justify-center border border-blue-100">
      <div className="text-sm text-blue-400 font-medium animate-pulse">Loading map…</div>
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export function RegionalHubsMap() {
  const [selectedHubId, setSelectedHubId] = useState<string>('kampala-desk');
  const reduceMotion = useReducedMotion();
  const activeHub = HUBS_DATA.find((h) => h.id === selectedHubId) || HUBS_DATA[0];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="container">
        <FadeIn className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-sm mb-3">
            <Globe2 className="w-4 h-4 text-blue-500" />
            <span>Regional Provenance & Logistics</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            Regional Sourcing & Corridor Explorer
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
            Trace the secure custody chain from verified Ugandan artisanal mining belts through our Kampala testing hub directly to Entebbe International Airport for global delivery.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Real Interactive Map (Left) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="card-3d bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-[0_12px_32px_-6px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.06)]">
              {/* Map Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-600">
                  Active Trade Network
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 font-bold shadow-xs">
                  4 Active Hubs
                </span>
              </div>

              {/* Leaflet Map */}
              <div className="h-[400px] sm:h-[440px] relative">
                <LeafletMap
                  hubs={HUBS_DATA.map((h) => ({
                    id: h.id,
                    name: h.name,
                    category: h.category,
                    lat: h.lat,
                    lng: h.lng,
                  }))}
                  selectedHubId={selectedHubId}
                  onSelectHub={setSelectedHubId}
                />
              </div>
            </div>

            {/* Quick Hub Selector Pills */}
            <div className="grid grid-cols-2 gap-2.5">
              {HUBS_DATA.map((hub) => (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setSelectedHubId(hub.id)}
                  className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                    hub.id === selectedHubId
                      ? 'bg-blue-50/90 border-blue-300 text-blue-800 font-bold shadow-[0_4px_12px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-blue-400/30'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="line-clamp-1 font-semibold">{hub.name}</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">{hub.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Hub Deep Dive Inspector (Right) */}
          <div className="lg:col-span-6 card-3d bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_16px_36px_-8px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.06)] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHub.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={iosSpringGentle}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeHub.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                    {activeHub.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1 font-mono">{activeHub.location}</div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {activeHub.focus}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                    Operational Highlights
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeHub.features.map((feat) => (
                      <div
                        key={feat}
                        className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 flex items-start gap-2 shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics & Security Card */}
                <div className="bg-gradient-to-br from-blue-50/80 via-white to-blue-50/50 border border-blue-200/90 rounded-2xl p-4.5 space-y-3 text-xs shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Security & Custody:</span>
                    <span className="text-blue-800 font-bold font-mono text-right">{activeHub.securityProtocol}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Transit Turnaround:</span>
                    <span className="text-emerald-700 font-bold font-mono">{activeHub.leadTime}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-blue-200/70">
                    <span className="text-slate-600">Primary Clearance Doc:</span>
                    <span className="text-blue-800 font-bold flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{activeHub.complianceDoc}</span>
                    </span>
                  </div>
                </div>

                {/* Verification CTA Link */}
                <div className="pt-2">
                  <a
                    href="#valuation-calculator"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Calculate Volume Sourcing from this Corridor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
