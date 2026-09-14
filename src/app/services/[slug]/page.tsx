import { notFound } from 'next/navigation';
import { getServiceBySlug, services } from '@/data/services';
import { getServiceMedia } from '@/data/media';
import { ServiceDetail } from '@/components/sections/ServiceDetail';
import { generatePageMetadata } from '@/lib/metadata';
import { company } from '@/config/company';
import type { Metadata } from 'next';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const media = getServiceMedia(slug);

  return generatePageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${slug}`,
    image: `${company.siteUrl}${media.src}`,
    keywords: service.seo.keywords,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
