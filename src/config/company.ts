export const company = {
  name: 'Apex Mineral Ventures',
  legalName: 'Apex Mineral Ventures Limited',
  tagline: 'Your Trusted Partner for Precious Minerals',
  description:
    'Apex Mineral Ventures connects international buyers with verified gold and precious minerals, providing certified lab testing, full export paperwork, and secure trade.',
  country: 'Uganda',
  city: 'Kampala',
  locationDetails: 'Kampala, Uganda',
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+243 973 478 645',
  whatsapp: (process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || '243973478645').replace(/\D/g, ''),
  whatsappDisplay: '+243 973 478 645',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@apexgolduganda.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgolduganda.com',
  hours: 'Monday – Friday: 8:00 AM – 5:00 PM EAT',
  timezone: 'EAT (UTC+3)',
  disclaimer:
    'Apex Mineral Ventures operates under Uganda mining regulations. All mineral purchases require verified source documentation, certified lab assays, and legal export permits.',
} as const;

export type CompanyConfig = typeof company;
