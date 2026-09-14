import { company } from '@/config/company';

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.legalName,
    description: company.description,
    url: company.siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressCountry: company.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      email: company.email,
      contactType: 'sales',
    },
  };
}

export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: company.siteUrl,
    description: company.description,
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function generateArticleJsonLd({
  title,
  description,
  publishedAt,
  modifiedAt,
  author,
  category,
  url,
}: {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  category?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    articleSection: category,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
    },
    url,
  };
}

export function generateServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: company.name,
    },
    url,
  };
}
