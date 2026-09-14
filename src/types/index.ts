/**
 * Type definitions for the application
 */

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon?: string;
  benefits: string[];
  process: ProcessStep[];
  faqs: FAQ[];
  seo: SEO;
}

export interface ProcessStep {
  title: string;
  description: string;
  order: number;
}

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export interface Resource {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ResourceCategory;
  tags: string[];
  author?: string;
  publishedAt: string;
  modifiedAt?: string;
  featuredImage?: string;
  seo: SEO;
  readingTime?: number;
}

export type ResourceCategory = 
  | 'mining-guides'
  | 'regulatory-insights'
  | 'export-guides'
  | 'market-intelligence'
  | 'precious-metals-education';

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  inquiryType: InquiryType;
  message: string;
  consent: boolean;
}

export type InquiryType = 
  | 'general'
  | 'gold-trading'
  | 'mining-advisory'
  | 'export-support'
  | 'partnership'
  | 'other';

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
