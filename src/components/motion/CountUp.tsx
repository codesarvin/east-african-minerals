'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
  decimals = 0,
  className = '',
}: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const shown = reduceMotion ? value : count;

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    let hasStarted = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          observer.unobserve(el);

          const totalFrames = Math.max(1, Math.round(duration * 60));
          let frame = 0;

          timer = setInterval(() => {
            frame++;
            const progress = Math.min(1, frame / totalFrames);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = value * easedProgress;
            setCount(current);

            if (frame >= totalFrames) {
              setCount(value);
              if (timer) clearInterval(timer);
            }
          }, 1000 / 60);
        }
      },
      { rootMargin: '-40px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [value, duration, reduceMotion]);

  const formatted =
    decimals > 0
      ? shown.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(shown).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
