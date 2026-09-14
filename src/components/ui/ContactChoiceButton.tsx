'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ChevronDown } from 'lucide-react';
import { company } from '@/config/company';
import { iosSpringGentle } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';

interface ContactChoiceButtonProps {
  label?: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Full width */
  fullWidth?: boolean;
  /** Extra className for the trigger button */
  className?: string;
  /** Icon to show before the label */
  icon?: React.ReactNode;
}

export function ContactChoiceButton({
  label = 'Contact Us',
  variant = 'primary',
  fullWidth = false,
  className = '',
  icon,
}: ContactChoiceButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const isPrimary = variant === 'primary';

  const triggerClasses = isPrimary
    ? `btn-3d-primary cta-glow inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 cursor-pointer ${fullWidth ? 'w-full' : ''}`
    : `btn-3d-secondary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 bg-white hover:bg-blue-50/80 border border-blue-200 rounded-xl transition-all duration-200 cursor-pointer ${fullWidth ? 'w-full' : ''}`;

  return (
    <div ref={ref} className={`relative inline-flex ${fullWidth ? 'w-full' : ''} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={triggerClasses}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {icon}
        <span>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${isPrimary ? 'text-white/80' : 'text-slate-500'}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.97 }}
            transition={iosSpringGentle}
            className="absolute top-full left-0 right-0 mt-2 min-w-[220px] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_-8px_rgba(15,23,42,0.16),0_4px_12px_rgba(15,23,42,0.06)] overflow-hidden z-50 origin-top"
          >
            <div className="p-1.5">
              <a
                href={`mailto:${company.email}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-700 transition-all group active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Email Us</div>
                  <div className="text-[11px] text-slate-500 font-mono">{company.email}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 transition-all group active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0">
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-sm font-semibold">WhatsApp</div>
                  <div className="text-[11px] text-slate-500 font-mono">{company.whatsappDisplay}</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
