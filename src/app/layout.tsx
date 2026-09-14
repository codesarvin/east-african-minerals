import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { company } from '@/config/company';
import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  generateLocalBusinessJsonLd,
} from '@/lib/structured-data';

export const viewport: Viewport = {
  themeColor: '#0066FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${company.name} | Licensed Precious Metals & Mineral Trading`,
  description: company.description,
  metadataBase: new URL(company.siteUrl),
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'gold trading Uganda',
    'precious metals export Uganda',
    'licensed gold dealer Kampala',
    'mineral assay laboratory',
    'mining advisory East Africa',
    'conflict free minerals ICGLR',
    'OECD due diligence gold',
  ],
  authors: [{ name: company.name, url: company.siteUrl }],
  creator: company.name,
  publisher: company.name,
  category: 'Commodities & Mining',
  openGraph: {
    title: `${company.name} | Licensed Precious Metals & Mineral Trading`,
    description: company.description,
    url: company.siteUrl,
    siteName: company.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${company.siteUrl}/images/gold-bullion.jpg`,
        width: 1200,
        height: 630,
        alt: `${company.name} - Certified Precious Metals & Mineral Trading`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} | Licensed Precious Metals & Mineral Trading`,
    description: company.description,
    images: [`${company.siteUrl}/images/gold-bullion.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500 selection:text-white font-sans antialiased">
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
