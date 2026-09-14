'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { MediaAsset } from '@/data/media';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface MediaFrameProps {
  media: MediaAsset;
  caption?: string;
  kicker?: string;
  className?: string;
  heightClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function MediaFrame({
  media,
  caption,
  kicker,
  className = '',
  heightClassName = 'h-64 sm:h-80 md:h-96',
  priority = false,
  sizes = '(max-width: 1200px) 100vw, 1100px',
}: MediaFrameProps) {
  const reduceMotion = useReducedMotion();
  const label = caption ?? media.caption;

  return (
    <div className={`relative card-3d rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-[0_16px_36px_-8px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.06)] ${className}`}>
      <div className={`relative ${heightClassName} w-full overflow-hidden bg-slate-100`}>
        <motion.div
          className="absolute inset-0"
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
        {(kicker || label) && (
          <div className="absolute bottom-4 left-4 right-4 text-white">
            {kicker ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                {kicker}
              </span>
            ) : null}
            {label ? <p className="text-sm font-semibold">{label}</p> : null}
          </div>
        )}
      </div>
    </div>
  );
}
