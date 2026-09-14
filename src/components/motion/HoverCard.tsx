'use client';

import { motion } from 'motion/react';
import { iosSpring } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  enableTap?: boolean;
}

export function HoverCard({ children, className = '', enableTap = true }: HoverCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.008 }}
      whileTap={reduceMotion || !enableTap ? undefined : { scale: 0.985 }}
      transition={reduceMotion ? undefined : iosSpring}
    >
      {children}
    </motion.div>
  );
}
