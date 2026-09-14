import { generatePageMetadata } from '@/lib/metadata';
import { HomeClient } from '@/components/sections/HomeClient';
import { company } from '@/config/company';

export const metadata = generatePageMetadata({
  title: `${company.name} | Verified Mineral Sourcing & Precious Metals Trading`,
  description: company.description,
  path: '/',
});

export default function HomePage() {
  return <HomeClient />;
}

