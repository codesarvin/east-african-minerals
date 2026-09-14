import Link from 'next/link';
import { company } from '@/config/company';
import { mediaAssets } from '@/data/media';
import { generatePageMetadata } from '@/lib/metadata';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { MediaFrame } from '@/components/media/MediaFrame';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import {
  ShieldCheck,
  Scale,
  FileCheck,
  Globe2,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'About Us | Apex Mineral Ventures',
  description: 'Learn about Apex Mineral Ventures, our team, and how we help buyers source minerals safely and responsibly in Uganda and international markets.',
  path: '/about',
});

export default function AboutPage() {
  const operatingPrinciples = [
    {
      title: 'Verified Sources Only',
      description: 'We only work with legitimate, licensed mining concessions with complete, verified paperwork and clear origins.',
      icon: ShieldCheck,
    },
    {
      title: 'Certified Independent Lab Testing',
      description: 'Every batch is tested in accredited metallurgical laboratories using XRF spectrometry and fire assays to prove exact purity.',
      icon: Scale,
    },
    {
      title: 'Complete Legal & Tax Compliance',
      description: 'We follow the Uganda Mining and Minerals Act 2022, settle all official royalties and taxes with the URA, and obtain valid export permits.',
      icon: FileCheck,
    },
    {
      title: 'Safe & Protected Payments',
      description: 'All transactions are settled through trusted commercial banks, insured transport, and secure escrow arrangements.',
      icon: Building2,
    },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <PageMasthead
        eyebrow="About Apex Mineral Ventures"
        icon={<Globe2 className="w-4 h-4" />}
        title="Connecting Precious Minerals with the World"
        description="We help international buyers source gold and precious minerals safely and legally from Uganda and partner corridors through verified supply, clear testing, and complete export support."
      />

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Who We Are</span>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                Your Trusted Mineral Trading Partner
              </h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  {company.legalName} is a licensed mineral trading and advisory company based in Kampala, Uganda. We help international buyers, refineries, and investors source high-grade gold, obtain certified lab tests, and handle all export paperwork smoothly.
                </p>
                <p>
                  The region is rich in natural gold and mineral deposits, but navigating local regulations, finding reliable suppliers, and arranging safe export can often be challenging.
                </p>
                <p>
                  Apex Mineral Ventures was built to make mineral trading simple, transparent, and completely legal. We handle everything by the book so you can trade with total peace of mind.
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
                <div className="font-bold text-blue-600">Head Office</div>
                <p>
                  {company.locationDetails} · {company.timezone}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl p-2.5">
                <MediaFrame
                  media={mediaAssets.advisoryBoard}
                  heightClassName="h-80 sm:h-96"
                  className="border-0 shadow-none rounded-xl"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute bottom-6 left-6 right-6 p-3.5 bg-white/95 border border-slate-200 rounded-xl backdrop-blur-md text-xs text-slate-800 shadow-md z-10">
                  <span className="text-blue-600 font-bold uppercase text-[10px] block mb-1">Due Diligence Desk</span>
                  Company registration and license details are gladly shared with verified buyers upon request.
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">How We Work</span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Our Core Standards & Safeguards
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operatingPrinciples.map((principle, index) => {
              const IconComp = principle.icon;
              return (
                <FadeIn key={principle.title} delay={index * 0.07}>
                  <HoverCard className="bg-white border border-slate-200 rounded-2xl p-7 group hover:border-blue-400 h-full">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {principle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {principle.description}
                      </p>
                    </div>
                  </HoverCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn>
            <div className="bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-100 rounded-3xl p-8 md:p-12 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Ethical Sourcing</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Responsible Sourcing You Can Trust
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                We are committed to ethical mineral trade. We follow international OECD guidelines and regional ICGLR standards to ensure all minerals are conflict-free and that small-scale mining communities are supported fairly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-slate-800">
                <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Clear Origin Tracking</div>
                    <div className="text-slate-600 mt-0.5">We track every batch from licensed mines to final export.</div>
                  </div>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Anti-Fraud Protection</div>
                    <div className="text-slate-600 mt-0.5">We thoroughly verify every party to ensure legitimate, safe deals.</div>
                  </div>
                </div>
              </div>
              <Link
                href="/resources/responsible-mineral-sourcing-practices"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Read Our Responsible Sourcing Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-slate-50 text-center">
        <div className="container max-w-2xl space-y-6">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Have Questions About Sourcing Minerals?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal mt-3">
              Whether you are looking to buy gold, need lab testing, or want help navigating regulations, our team in Kampala is here to help.
            </p>
            <div className="pt-6">
              <Link
                href="/contact"
                className="cta-glow inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all"
              >
                <span>Get in Touch with Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
