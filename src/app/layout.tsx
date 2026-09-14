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
    // Uganda Gold Keywords
    'gold in uganda',
    'buy gold in uganda',
    'uganda gold trading',
    'uganda gold price',
    'licensed gold dealer kampala',
    'uganda gold exporters',
    'uganda gold refinery',
    'karamoja gold',
    'mubende gold mines',
    'uganda mineral dealers license',
    'dgsm uganda gold export permit',
    'uganda revenue authority gold tax',
    
    // Congo (DRC) Gold Keywords
    'gold in congo',
    'congo gold trading',
    'drc gold export',
    'buy gold in congo',
    'congo gold dore bars',
    'congo gold nuggets',
    'democratic republic of congo gold',
    'eastern congo gold corridor',
    'bukavu gold trade',
    'goma gold market',
    'ituri gold mining',
    'conflict free congo gold',
    'icglr certified gold congo',
    
    // Africa & Regional Gold Keywords
    'gold in africa',
    'buy gold in africa',
    'african gold trading company',
    'east africa gold export hub',
    'african precious metals trade',
    'african gold suppliers verified',
    'raw gold nuggets africa',
    'africa bullion refinery',
    'oecd responsible gold sourcing africa',
    'great lakes region minerals',
    'certified gold assay east africa',
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
