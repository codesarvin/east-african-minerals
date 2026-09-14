import { Metadata } from 'next';
import { company } from '@/config/company';

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[] | string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  keywords,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
}: PageMetadataProps): Metadata {
  const url = new URL(path, company.siteUrl);
  // Default to verified existing high-res asset
  const ogImage = image || `${company.siteUrl}/images/gold-bullion.jpg`;

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          title,
          description,
          url: url.toString(),
          siteName: company.name,
          locale: 'en_US',
          type: 'article',
          publishedTime,
          modifiedTime,
          authors,
          section,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }
      : {
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
        };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url.toString(),
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
