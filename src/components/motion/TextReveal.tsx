'use client';

import { motion } from 'motion/react';
import { easeOutExpo } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Component = 'h1',
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden mr-[0.22em] last:mr-0 align-bottom">
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : delay + index * 0.035,
              ease: easeOutExpo,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
