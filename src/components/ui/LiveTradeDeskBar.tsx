'use client';

import { useState, useEffect } from 'react';
import { company } from '@/config/company';
import { Shield, Clock, Sparkles, ExternalLink, TrendingUp } from 'lucide-react';

export function LiveTradeDeskBar({ onOpenQuote }: { onOpenQuote?: () => void }) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Kampala',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
      
      const kampalaDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Kampala' }));
      const day = kampalaDate.getDay();
      const hour = kampalaDate.getHours();
      setIsOpen(day >= 1 && day <= 5 && hour >= 8 && hour < 17);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#090E17] text-slate-200 border-b border-blue-500/20 text-xs py-2 relative z-30 font-medium">
      <div className="container flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left: Desk Status & Kampala Clock */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isOpen ? 'bg-emerald-400' : 'bg-blue-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isOpen ? 'bg-emerald-500' : 'bg-blue-500'
              }`} />
            </span>
            <span className="text-[11px] font-bold tracking-wide uppercase text-slate-300">
              Kampala Trading Desk: <span className={isOpen ? 'text-emerald-400 font-semibold' : 'text-blue-400'}>
                {isOpen ? 'Open Now' : 'Closed (Replies within 1 business day)'}
              </span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px] font-mono border-l border-slate-800 pl-3">
            <Clock className="w-3 h-3 text-blue-400" />
            <span>{currentTime || '08:00:00 AM'} EAT (UTC+3)</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-blue-200/90 text-[11px] border-l border-slate-800 pl-3">
            <Shield className="w-3 h-3 text-blue-400" />
            <span>Uganda Mining Act 2022 Compliant</span>
          </div>

          {/* Indicative Gold Purity reference */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-400 border-l border-slate-800 pl-3 font-mono">
            <TrendingUp className="w-3 h-3 text-blue-400" />
            <span className="text-blue-300">AU 999.9 & Doré Lots Available</span>
          </div>
        </div>

        {/* Right: Quick Quotation Handoff & WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
          <span className="hidden lg:inline text-slate-400">
            Certified DGSM Lab Assay
          </span>
          {onOpenQuote && (
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Instant Lot Quote</span>
            </button>
          )}
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <span>Chat on WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

