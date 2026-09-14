import Link from 'next/link';
import { company } from '@/config/company';
import { footerNavigation } from '@/data/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { MapPin, Mail, Phone, Shield, ArrowUpRight, Scale } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#090E17] text-slate-300 border-t border-blue-500/30">
      {/* Top Advisory / Compliance Banner */}
      <div className="border-b border-blue-500/20 bg-[#0D1522]">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-200">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Scale className="w-3.5 h-3.5" />
            </div>
            <span>
              <strong className="text-blue-300">Regulatory Framework:</strong> Licensed operations structured under the Uganda Mining and Minerals Act, 2022.
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-md border border-blue-500/30 text-[11px] text-blue-300 font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{company.timezone}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand & Overview Column */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            <BrandLogo variant="dark" size="lg" />
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {company.description} Connecting verified mineral provenance with accredited international markets through transparent, assay-verified channels.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{company.locationDetails}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`tel:${company.phone}`} className="hover:text-blue-300 py-1 transition-colors font-mono">
                  {company.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-blue-300 py-1 transition-colors font-mono">
                  {company.email}
                </a>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 sm:mb-4">
              Trading & Services
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerNavigation.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-blue-300 py-1 transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mineral Intelligence */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 sm:mb-4">
              Resource Guides
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerNavigation.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-blue-300 py-1 transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Governance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 sm:mb-4">
              Corporate Trust
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-blue-300 py-1 transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-800">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-blue-500/30 text-[11px] text-slate-300 space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" /> Due Diligence Desk
                </div>
                <p className="text-slate-400">Commercial registration and license validation provided upon direct inquiry.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <p>&copy; {currentYear} {company.legalName}. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-blue-300 py-1 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-300 py-1 transition-colors">Terms of Trading</Link>
            <Link href="/cookies" className="hover:text-blue-300 py-1 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
