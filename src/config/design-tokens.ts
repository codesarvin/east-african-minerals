export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#0066FF', // Vibrant Bright Royal Blue
    600: '#0052cc',
    700: '#003d99',
    800: '#002966',
    900: '#001433',
    950: '#000a1a',
  },
  blue: {
    50: '#f0f7ff',
    100: '#e0effe',
    200: '#b9dffd',
    300: '#7cc5fb',
    400: '#36a8f7',
    500: '#0088ff', // Electric Bright Blue
    600: '#006cd6',
    700: '#0056ad',
    800: '#00478a',
    900: '#003c73',
    950: '#00254a',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
  },
  neutral: {
    50: '#FFFFFF',
    100: '#F8FAFC',
    150: '#F1F5F9',
    200: '#E2E8F0',
    250: '#CBD5E1',
    300: '#94A3B8',
    400: '#64748B',
    500: '#475569',
    600: '#334155',
    700: '#1E293B',
    800: '#0F172A',
    900: '#0B1120',
    950: '#020617',
  },
  emerald: {
    50: '#ecfdf5',
    500: '#10b981',
    900: '#064e3b',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    900: '#7f1d1d',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: [
      'Plus Jakarta Sans',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
} as const;

export const shadows = {
  blueGlow: '0 0 25px -5px rgba(0, 102, 255, 0.25)',
  blueGlowLg: '0 0 45px -10px rgba(0, 102, 255, 0.35)',
  card: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
  cardHover: '0 16px 32px -4px rgba(0, 102, 255, 0.12)',
} as const;
