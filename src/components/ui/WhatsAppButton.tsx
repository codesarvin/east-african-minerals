'use client';

import { company } from '@/config/company';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ShieldCheck, Sparkles, Clock, CheckCheck } from 'lucide-react';
import { iosSpring, iosSpringGentle } from '@/lib/motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const reduceMotion = useReducedMotion();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const quickTopics = [
    {
      title: 'Gold Bullion (999.9) Inquiries',
      msg: 'Hello Apex Minerals, I would like to inquire about purchasing 999.9 certified gold bullion and pricing terms.',
    },
    {
      title: 'Export Documentation & Permits',
      msg: 'Hello Apex Minerals, I need assistance regarding Uganda export permits, ICGLR certificates, and customs clearance.',
    },
    {
      title: 'Assay & Laboratory Testing',
      msg: 'Hello Apex Minerals, I would like to schedule an ISO-accredited spectrometer assay test in Kampala.',
    },
    {
      title: 'General Mineral Procurement',
      msg: 'Hello Apex Minerals, I am looking to initiate a commercial trade inquiry for precious minerals and gold doré.',
    },
  ];

  const handleLaunchWhatsApp = (text?: string) => {
    const message = text || customMsg.trim() || 'Hello Apex Mineral Ventures, I would like to inquire regarding precious metals trading, mineral sourcing, and export facilitation in Uganda.';
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${company.whatsapp}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={widgetRef}
      className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 z-50 flex flex-col items-end transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
    >
      {/* Interactive Chat Card Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
            transition={iosSpringGentle}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-label="Apex Mineral Ventures WhatsApp Trading Desk Widget"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <WhatsAppIcon className="w-6 h-6 fill-current" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {company.name} Desk
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Now · {company.whatsappDisplay}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close WhatsApp chat widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 sm:p-5 bg-slate-950/60 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
              {/* Officer Intro Bubble */}
              <div className="flex items-start gap-2.5 max-w-[92%]">
                <div className="p-3 bg-slate-900 rounded-2xl rounded-tl-sm border border-slate-800 text-slate-200 shadow-md space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400 border-b border-slate-800/80 pb-1">
                    <span className="font-semibold text-blue-400">Kampala Trading Desk</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> EAT (UTC+3)
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    Hello! Welcome to Apex Mineral Ventures. Direct commercial inquiries regarding 999.9 gold bullion, lab assays, and legal export licenses are handled immediately.
                  </p>
                  <div className="flex items-center justify-end text-[10px] text-slate-500">
                    <CheckCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Quick Prompt Chips */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>Select an Inquiry Topic</span>
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {quickTopics.map((topic, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleLaunchWhatsApp(topic.msg)}
                      className="text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800/80 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all text-[11px] font-medium flex items-center justify-between group active:scale-[0.98] cursor-pointer"
                    >
                      <span className="truncate">{topic.title}</span>
                      <Send className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <input
                  type="text"
                  placeholder="Or type a custom message..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLaunchWhatsApp();
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                />

                {/* Main Direct WhatsApp Button */}
                <button
                  type="button"
                  onClick={() => handleLaunchWhatsApp()}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
                  <span>Start WhatsApp Chat ({company.whatsappDisplay})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button & Tooltip Bar */}
      <div className="flex items-center gap-2">
        {/* Desktop Mini Label */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setHasInteracted(true);
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-900/95 text-slate-100 border border-slate-800 hover:border-slate-700 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Chat on WhatsApp</span>
          </button>
        )}

        {/* Primary Round / Rounded Square Toggle Button with Bouncing Physics */}
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          animate={
            reduceMotion || isOpen
              ? { y: 0 }
              : {
                  y: [0, -12, 0, -6, 0],
                  transition: {
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: 'easeInOut',
                  },
                }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.1, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          transition={iosSpring}
          className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Open WhatsApp chat desk"
        >
          {/* Ambient Glow / Pulse Ring */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-2xl bg-[#25D366]/40 blur-sm -z-10 animate-pulse pointer-events-none" />
          )}

          {/* Notification Ping Badge when unopened */}
          {!hasInteracted && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
            </span>
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-slate-950 font-bold" />
          ) : (
            <WhatsAppIcon className="w-7 h-7 fill-white text-white drop-shadow" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

