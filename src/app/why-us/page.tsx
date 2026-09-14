import { generatePageMetadata } from '@/lib/metadata';
import { WhyUsClient } from '@/components/sections/WhyUsClient';
import { company } from '@/config/company';

export const metadata = generatePageMetadata({
  title: 'Why Us | Secure & Compliant Mineral Trading | Apex Mineral Ventures',
  description: 'See why international buyers, refiners, and investors choose Apex Mineral Ventures for safe, legal gold and mineral trading in Uganda.',
  path: '/why-us',
  image: `${company.siteUrl}/images/geological-survey.jpg`,
  keywords: [
    'trusted gold dealer Uganda',
    'verified mineral supplier Kampala',
    'licensed precious metals trader',
    'gold export compliance safeguards',
  ],
});

export default function WhyUsPage() {
  return <WhyUsClient />;
}

