import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/data/services';
import { mediaAssets, getServiceMedia } from '@/data/media';
import { generatePageMetadata } from '@/lib/metadata';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { MediaFrame } from '@/components/media/MediaFrame';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import {
  ShieldCheck,
  Scale,
  FileCheck,
  Vault,
  Lock,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Services | Mineral Trading, Testing & Export | Apex Mineral Ventures',
  description: 'Explore our services including precious metals trading, mining advisory, certified lab assaying, export paperwork facilitation, and secure vault storage.',
  path: '/services',
});

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'precious-metals-trading': Scale,
  'mining-advisory': FileCheck,
  'export-facilitation': ShieldCheck,
  'transaction-security': Lock,
  'secure-storage': Vault,
};

export default function ServicesPage() {
  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <PageMasthead
        eyebrow="Our Core Capabilities"
        icon={<Sparkles className="w-4 h-4 text-blue-500" />}
        title="Mineral Trading, Testing & Export Services"
        description="We provide end-to-end support for precious metals transactions in Uganda and regional corridors, giving you clear paperwork, certified lab testing, and secure delivery."
      />

      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn>
            <MediaFrame
              media={mediaAssets.heroSmelting}
              kicker="End-to-End Execution"
              caption="From Mine Sourcing to Global Delivery"
              heightClassName="h-64 sm:h-80"
            />
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComp = serviceIcons[service.slug] || Layers;
              const media = getServiceMedia(service.slug);

              return (
                <FadeIn key={service.slug} delay={index * 0.06}>
                  <HoverCard className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-blue-400 hover:bg-white h-full">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                    </div>
                    <div className="p-7 flex flex-col justify-between flex-1">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                            {service.shortDescription}
                          </p>
                        </div>
                        <div className="pt-2 space-y-2 text-xs text-slate-700">
                          {service.benefits.slice(0, 3).map((benefit) => (
                            <div key={benefit} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-6 mt-6 border-t border-slate-200">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors"
                        >
                          <span>View Service Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </HoverCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 text-center">
        <div className="container max-w-2xl space-y-6">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Need Custom Support or Advice?</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal mt-3">
              Whether you have a specific trade volume in mind, need testing on existing inventory, or want advice on local licenses, we are ready to assist.
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
