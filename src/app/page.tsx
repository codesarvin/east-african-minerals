import { generatePageMetadata } from '@/lib/metadata';
import { HomeClient } from '@/components/sections/HomeClient';
import { company } from '@/config/company';

export const metadata = generatePageMetadata({
  title: `${company.name} | Verified Mineral Sourcing & Precious Metals Trading`,
  description: company.description,
  path: '/',
  keywords: [
    'gold in uganda',
    'gold in congo',
    'gold in africa',
    'buy gold in uganda',
    'buy gold from congo',
    'african gold trading',
    'uganda gold refinery',
    'kampala gold dealers',
    'drc gold export',
    'verified gold suppliers africa',
    'licensed mineral dealer uganda',
    'conflict free african gold',
  ],
});

export default function HomePage() {
  return <HomeClient />;
}

