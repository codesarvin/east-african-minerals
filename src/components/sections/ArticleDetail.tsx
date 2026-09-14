import Link from 'next/link';
import { Resource } from '@/types';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/structured-data';
import { company } from '@/config/company';
import { getResourceMedia } from '@/data/media';
import { PageMasthead } from '@/components/layout/PageMasthead';
import { MediaFrame } from '@/components/media/MediaFrame';
import { FadeIn } from '@/components/motion/FadeIn';
import { HoverCard } from '@/components/motion/HoverCard';
import { ContactChoiceButton } from '@/components/ui/ContactChoiceButton';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

interface ArticleDetailProps {
  article: Resource;
  relatedArticles: Resource[];
}

function parseContent(content: string) {
  const lines = content.split('\n');
  const sections: { type: 'heading' | 'paragraph' | 'list'; level?: number; content: string; id?: string }[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      sections.push({ type: 'list', content: currentList.map((l) => l.replace(/^- /, '')).join('|||') });
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      flushList();
      const rawText = headingMatch[2];
      const anchorId = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      sections.push({ 
        type: 'heading', 
        level: headingMatch[1].length, 
        content: rawText,
        id: anchorId,
      });
    } else if (trimmed.startsWith('- ')) {
      currentList.push(trimmed);
    } else {
      flushList();
      sections.push({ type: 'paragraph', content: trimmed });
    }
  }
  flushList();

  return sections;
}

export function ArticleDetail({ article, relatedArticles }: ArticleDetailProps) {
  const sections = parseContent(article.content);
  const headings = sections.filter((s) => s.type === 'heading');
  const cover = getResourceMedia(article.slug);

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white relative">

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleJsonLd({
              title: article.title,
              description: article.excerpt,
              url: `${company.siteUrl}/resources/${article.slug}`,
              publishedAt: article.publishedAt,
              modifiedAt: article.modifiedAt,
              author: article.author || company.name,
              category: article.category,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: 'Home', item: company.siteUrl },
              { name: 'Resources', item: `${company.siteUrl}/resources` },
              { name: article.title, item: `${company.siteUrl}/resources/${article.slug}` },
            ])
          ),
        }}
      />

      <PageMasthead
        eyebrow={article.category.replace(/-/g, ' ')}
        icon={<Sparkles className="w-4 h-4 text-blue-500" />}
        title={article.title}
        lead={
          <Link
            href="/resources"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 inline-flex items-center gap-1.5 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>All Intelligence Reports</span>
          </Link>
        }
      >
        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{article.readingTime} min read</span>
            </div>
          )}
          {article.author && (
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Author: {article.author}</span>
            </div>
          )}
        </div>
      </PageMasthead>

      {/* Main Content Layout */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents (Sticky on Desktop) */}
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-28 space-y-4 p-5 card-3d bg-white border border-slate-200/90 rounded-3xl shadow-[0_12px_32px_-6px_rgba(15,23,42,0.08)]">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Report Index</span>
                </div>
                <nav className="space-y-2 text-xs">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className="block text-slate-600 hover:text-blue-700 py-1 transition-colors leading-snug font-medium"
                    >
                      {h.content}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Article Body */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              {/* Article Hero Photo Frame */}
              <FadeIn>
                <MediaFrame media={cover} heightClassName="h-56 sm:h-80" />
              </FadeIn>

              {/* Mobile Quick Jump / Table of Contents Accordion */}
              {headings.length > 0 && (
                <div className="lg:hidden p-4 card-3d bg-white border border-slate-200/90 rounded-2xl space-y-2.5 shadow-sm">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-bold uppercase tracking-wider text-blue-700">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Quick Section Jump ({headings.length} Topics)</span>
                      </span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform text-sm font-bold">
                        ↓
                      </span>
                    </summary>
                    <nav className="pt-3 space-y-1.5 border-t border-slate-200/80 mt-2.5">
                      {headings.map((h, i) => (
                        <a
                          key={i}
                          href={`#${h.id}`}
                          className="block py-1.5 px-2 rounded-lg text-xs text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-medium transition-colors"
                        >
                          • {h.content}
                        </a>
                      ))}
                    </nav>
                  </details>
                </div>
              )}

              {/* Executive Summary Box */}
              <div className="p-5 sm:p-6 card-3d bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 border border-blue-200/90 rounded-2xl space-y-2 shadow-[0_12px_28px_-6px_rgba(30,58,138,0.12)]">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Key Takeaways
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {article.excerpt}
                </p>
              </div>

              {/* Rendered Sections */}
              <FadeIn delay={0.08}>
              <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
                {sections.map((section, index) => {
                  if (section.type === 'heading') {
                    const Tag = section.level === 1 ? 'h2' : section.level === 2 ? 'h3' : 'h4';
                    const size =
                      section.level === 1
                        ? 'text-2xl font-extrabold text-slate-950 mt-10 mb-4 pt-4 border-t border-slate-200'
                        : section.level === 2
                        ? 'text-xl font-bold text-slate-950 mt-8 mb-3'
                        : 'text-lg font-bold text-blue-800 mt-6 mb-2';

                    return (
                      <Tag key={index} id={section.id} className={size}>
                        {section.content}
                      </Tag>
                    );
                  }

                  if (section.type === 'list') {
                    return (
                      <ul key={index} className="space-y-2 pl-2 my-4">
                        {section.content.split('|||').map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={index} className="leading-relaxed">
                      {section.content}
                    </p>
                  );
                })}
              </div>
              </FadeIn>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-8 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Statutory & Classification Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-slate-100 border border-slate-200/90 text-slate-700 rounded-lg font-medium shadow-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Intelligence Reports */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container max-w-5xl">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Further Reading
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950 mb-8 tracking-tight">
              Related Articles & Guides
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <FadeIn key={rel.slug} delay={0.05}>
                  <HoverCard>
                <Link
                  href={`/resources/${rel.slug}`}
                  className="card-3d bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between group hover:border-blue-400 hover:shadow-[0_16px_36px_-8px_rgba(37,99,235,0.18)] transition-all h-full"
                >
                  <div className="space-y-2">
                    <span className="text-blue-700 font-bold uppercase text-[10px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/80">
                      {rel.category.replace(/-/g, ' ')}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center justify-between">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                  </HoverCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consultation CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container max-w-2xl space-y-6">
          <FadeIn>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Need Advice on Mineral Compliance & Export?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal mt-3">
            Our advisory team helps international buyers and mining operators with regulatory navigation and verification.
          </p>
          <div className="pt-6">
            <ContactChoiceButton
              label="Talk to Our Team"
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
