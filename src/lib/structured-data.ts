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
      availableLanguage: 'English',
      areaServed: ['UG', 'KE', 'TZ', 'RW', 'CD'],
    },
    areaServed: [
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Tanzania' },
      { '@type': 'Country', name: 'Rwanda' },
      { '@type': 'Country', name: 'Democratic Republic of the Congo' },
    ],
    knowsAbout: [
      'Gold in Uganda',
      'Gold in Congo DRC',
      'Gold in Africa',
      'Precious Metals Trading',
      'Uganda Gold Refining and Assay',
      'Mineral Export Permits and Licensing',
      'Mining and Minerals Act 2022 Uganda',
      'East Africa Mineral Trade Corridors',
      'Congo Gold Dore and Supply Chains',
      'ICGLR Regional Mineral Certification',
      'OECD Due Diligence Guidance for Conflict Minerals',
      'Fire Assay and XRF Spectrometry',
      'Secure Bank Escrow and Bullion Custody',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mineral Trading Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Precious Metals Trading',
            url: `${company.siteUrl}/services/precious-metals-trading`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mining Advisory Services',
            url: `${company.siteUrl}/services/mining-advisory`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Export Facilitation',
            url: `${company.siteUrl}/services/export-facilitation`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Transaction Security',
            url: `${company.siteUrl}/services/transaction-security`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Secure Storage Solutions',
            url: `${company.siteUrl}/services/secure-storage`,
          },
        },
      ],
    },
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: company.name,
    description: company.description,
    url: company.siteUrl,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressCountry: 'UG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.3476,
      longitude: 32.5825,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$$$',
    currenciesAccepted: 'USD, UGX',
    paymentAccepted: 'Bank Transfer, Escrow',
  };
}

export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: company.siteUrl,
    description: company.description,
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${company.siteUrl}/resources?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
    inLanguage: 'en',
    isAccessibleForFree: true,
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
      url: company.siteUrl,
    },
    areaServed: [
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Tanzania' },
    ],
    serviceType: 'Mineral Trading Services',
    url,
  };
}

export function generateFAQPageJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
