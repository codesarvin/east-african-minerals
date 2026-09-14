'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'apex_cookie_consent_v2';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Avoid synchronous layout-thrashing by reading in microtask
    const stored = typeof window !== 'undefined' ? localStorage.getItem(COOKIE_CONSENT_KEY) : 'accepted';
    if (!stored) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md z-50 card-3d bg-white/98 backdrop-blur-xl border border-blue-200/90 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.25),0_4px_12px_rgba(15,23,42,0.08)] rounded-3xl p-4 sm:p-5 text-slate-800 animate-in slide-in-from-bottom-5 fade-in duration-300"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Consent"
    >
      <div className="flex items-start gap-3 sm:gap-3.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 shadow-xs">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-slate-950">Privacy & Cookie Controls</h4>
            <button
              onClick={reject}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
            We use technical cookies in compliance with the Uganda Data Protection and Privacy Act, 2019. Review our{' '}
            <Link href="/cookies" className="text-blue-600 hover:text-blue-800 underline font-semibold">
              Cookie Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={accept}
              className="btn-3d-primary flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition-all cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={reject}
              className="btn-3d-secondary flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 active:scale-95 rounded-xl transition-all cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
