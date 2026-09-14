import { notFound } from 'next/navigation';
import { getResourceBySlug, getRelatedResources, resources } from '@/data/resources';
import { getResourceMedia } from '@/data/media';
import { ArticleDetail } from '@/components/sections/ArticleDetail';
import { generatePageMetadata } from '@/lib/metadata';
import { company } from '@/config/company';
import type { Metadata } from 'next';

interface ResourcePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};

  const media = getResourceMedia(slug);

  return generatePageMetadata({
    title: resource.seo.title,
    description: resource.seo.description,
    path: `/resources/${slug}`,
    image: `${company.siteUrl}${media.src}`,
    keywords: resource.seo.keywords,
    type: 'article',
    publishedTime: resource.publishedAt,
    modifiedTime: resource.modifiedAt || resource.publishedAt,
    authors: [resource.author || company.name],
    section: resource.category,
  });
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const relatedArticles = getRelatedResources(slug, 3);

  return <ArticleDetail article={resource} relatedArticles={relatedArticles} />;
}
