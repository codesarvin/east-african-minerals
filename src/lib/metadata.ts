import { Metadata } from 'next';
import { company } from '@/config/company';

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataProps): Metadata {
  const url = new URL(path, company.siteUrl);
  const ogImage = image || `${company.siteUrl}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: company.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
