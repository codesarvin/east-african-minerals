'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { iosSpringGentle } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  width?: 'fit-content' | '100%';
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  width = '100%',
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-40px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width,
        overflow: 'hidden',
      }}
      className={className}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
          transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = { stagger: 0.08, delay: 0.05 }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: iosSpringGentle,
  },
};

export function StaggerContainer({
  children,
  className = '',
  staggerChildren = 0.08,
  delayChildren = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={{ stagger: staggerChildren, delay: delayChildren }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
