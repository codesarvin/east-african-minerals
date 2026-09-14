'use client';

import { motion } from 'motion/react';
import { easeOutExpo, iosSpringGentle, fadeOffsets, type FadeDirection } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface FadeInProps {
  children: React.ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
  type?: 'ease' | 'spring';
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className = '',
  viewportMargin = '-48px',
  once = true,
  type = 'ease',
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const offset = fadeOffsets[direction];

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: viewportMargin }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : type === 'spring'
          ? { ...iosSpringGentle, delay }
          : { duration, delay, ease: easeOutExpo }
      }
    >
      {children}
    </motion.div>
  );
}
