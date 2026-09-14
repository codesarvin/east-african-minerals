import { notFound } from 'next/navigation';
import { getServiceBySlug, services } from '@/data/services';
import { ServiceDetail } from '@/components/sections/ServiceDetail';
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

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
