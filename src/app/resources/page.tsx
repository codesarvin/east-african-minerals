import Link from 'next/link';
import Image from 'next/image';
import { resources } from '@/data/resources';
import { getResourceMedia } from '@/data/media';
import { generatePageMetadata } from '@/lib/metadata';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import { ContactChoiceButton } from '@/components/ui/ContactChoiceButton';
import { company } from '@/config/company';
import { BookOpen, Calendar, Clock, ArrowRight, FileText, Sparkles, ArrowUpRight } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Mineral Knowledge Base & Sourcing Intelligence | Apex Mineral Ventures',
  description: 'Authoritative guides on Uganda mining licenses, mineral export documentation, assay verification methods, and OECD responsible sourcing standards.',
  path: '/resources',
  image: `${company.siteUrl}/images/mining-operation.jpg`,
  keywords: [
    'Uganda mining intelligence',
    'mineral sourcing guides',
    'Uganda mining laws',
    'gold export compliance guide',
    'responsible sourcing research',
  ],
});

export default function ResourcesPage() {
  const featured = resources[0];
  const remaining = resources.slice(1);
  const featuredCover = featured ? getResourceMedia(featured.slug) : null;

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <PageMasthead
        eyebrow="Research & Regulatory Intelligence"
        icon={<Sparkles className="w-4 h-4 text-blue-500" />}
        title="Mineral Sourcing Knowledge Base"
        description="Authoritative documentation, legal analyses, and technical guides on precious metals compliance, taxation, and export protocols in Uganda and international corridors."
      />

      {featured && featuredCover && (
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="container max-w-5xl">
            <FadeIn>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Featured Regulatory Analysis</span>
              </div>
              <Link
                href={`/resources/${featured.slug}`}
                className="block bg-gradient-to-br from-blue-50/70 to-slate-50 border border-blue-200 rounded-3xl overflow-hidden group hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-56 md:h-full min-h-[240px]">
                    <Image
                      src={featuredCover.src}
                      alt={featuredCover.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 sm:p-12 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full font-bold uppercase text-[10px] shadow-sm">
                        {featured.category.replace(/-/g, ' ')}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      {featured.readingTime && (
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          {featured.readingTime} min read
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{featured.excerpt}</p>
                    <div className="pt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700">
                      <span>Read Full Intelligence Report</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-5xl">
          <FadeIn>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Published Analyses</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-10 tracking-tight">
              All Knowledge Base Reports
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remaining.map((article, index) => {
              const cover = getResourceMedia(article.slug);
              return (
                <FadeIn key={article.slug} delay={index * 0.06}>
                  <HoverCard className="h-full">
                    <Link
                      href={`/resources/${article.slug}`}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-blue-400 h-full"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-7 flex flex-col justify-between flex-1">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px]">
                              {article.category.replace(/-/g, ' ')}
                            </span>
                            <span>{article.readingTime || 5} min read</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                          <span>Read Report</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <div className="container max-w-2xl space-y-6">
          <FadeIn>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight mt-4">
              Need Tailored Regulatory Due Diligence?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal mt-3">
              Our advisory desk prepares bespoke compliance dossiers, concessions evaluations, and assay verification protocols for institutional buyers.
            </p>
            <div className="pt-6">
              <ContactChoiceButton
                label="Initiate Commercial Inquiry"
                variant="primary"
                className="[&>button]:px-8 [&>button]:py-4 [&>button]:text-sm"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
