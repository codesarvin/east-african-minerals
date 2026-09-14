import { notFound } from 'next/navigation';
import { getResourceBySlug, getRelatedResources, resources } from '@/data/resources';
import { ArticleDetail } from '@/components/sections/ArticleDetail';
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

  return {
    title: resource.seo.title,
    description: resource.seo.description,
    keywords: resource.seo.keywords,
  };
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
