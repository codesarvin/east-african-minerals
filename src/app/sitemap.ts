import { MetadataRoute } from 'next';
import { company } from '@/config/company';
import { services } from '@/data/services';
import { resources } from '@/data/resources';
import { getServiceMedia, getResourceMedia } from '@/data/media';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = company.siteUrl;
  const siteUpdateDate = new Date('2025-02-01T00:00:00.000Z');

  // Static pages with image metadata
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [`${baseUrl}/images/hero-smelting.jpg`],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${baseUrl}/images/advisory-board.jpg`],
    },
    {
      url: `${baseUrl}/services`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/images/gold-bullion.jpg`],
    },
    {
      url: `${baseUrl}/why-us`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [`${baseUrl}/images/geological-survey.jpg`],
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: siteUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/images/mining-operation.jpg`],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2024-01-01T00:00:00.000Z'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2024-01-01T00:00:00.000Z'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date('2024-01-01T00:00:00.000Z'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Service pages with mapped images
  const servicePages: MetadataRoute.Sitemap = services.map((service) => {
    const media = getServiceMedia(service.slug);
    return {
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: siteUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${baseUrl}${media.src}`],
    };
  });

  // Resource pages with mapped images and real modified dates
  const resourcePages: MetadataRoute.Sitemap = resources.map((resource) => {
    const media = getResourceMedia(resource.slug);
    return {
      url: `${baseUrl}/resources/${resource.slug}`,
      lastModified: new Date(resource.modifiedAt || resource.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [`${baseUrl}${media.src}`],
    };
  });

  return [...staticPages, ...servicePages, ...resourcePages];
}
