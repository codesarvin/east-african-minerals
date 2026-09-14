import { NavigationItem } from '@/types';

export const navigation: NavigationItem[] = [
  { label: 'About', href: '/about' },
  { 
    label: 'Services', 
    href: '/services',
    children: [
      { label: 'Precious Metals Trading', href: '/services/precious-metals-trading' },
      { label: 'Mining Advisory', href: '/services/mining-advisory' },
      { label: 'Export Facilitation', href: '/services/export-facilitation' },
      { label: 'Transaction Security', href: '/services/transaction-security' },
      { label: 'Secure Storage', href: '/services/secure-storage' },
    ],
  },
  { label: 'Resources', href: '/resources' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Why Us', href: '/why-us' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Precious Metals Trading', href: '/services/precious-metals-trading' },
    { label: 'Mining Advisory', href: '/services/mining-advisory' },
    { label: 'Export Facilitation', href: '/services/export-facilitation' },
    { label: 'Transaction Security', href: '/services/transaction-security' },
    { label: 'Secure Storage', href: '/services/secure-storage' },
  ],
  resources: [
    { label: 'Mining Guides', href: '/resources?category=mining-guides' },
    { label: 'Regulatory Insights', href: '/resources?category=regulatory-insights' },
    { label: 'Export Guides', href: '/resources?category=export-guides' },
    { label: 'Market Intelligence', href: '/resources?category=market-intelligence' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};
