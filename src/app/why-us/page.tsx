import { generatePageMetadata } from '@/lib/metadata';
import { WhyUsClient } from '@/components/sections/WhyUsClient';

export const metadata = generatePageMetadata({
  title: 'Why Us | Secure & Compliant Mineral Trading | Apex Mineral Ventures',
  description: 'See why international buyers, refiners, and investors choose Apex Mineral Ventures for safe, legal gold and mineral trading in Uganda.',
  path: '/why-us',
});

export default function WhyUsPage() {
  return <WhyUsClient />;
}

