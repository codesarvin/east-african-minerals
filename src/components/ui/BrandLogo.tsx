import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  className = '',
}: BrandLogoProps) {
  const isDark = variant === 'dark';

  const dimensions = {
    sm: { icon: 32, text: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 42, text: 'text-base', sub: 'text-[10px]' },
    lg: { icon: 50, text: 'text-xl', sub: 'text-xs' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Mineral Emblem */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center rounded-xl p-1.5 transition-transform duration-300 group-hover:scale-105"
        style={{
          width: dimensions.icon,
          height: dimensions.icon,
          background: 'linear-gradient(135deg, #0052D6 0%, #002266 100%)',
          border: '1px solid rgba(0, 102, 255, 0.45)',
          boxShadow: '0 4px 18px -2px rgba(0, 102, 255, 0.28), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Faceted Hexagon Structure */}
          <polygon 
            points="20,4 34,12 34,28 20,36 6,28 6,12" 
            stroke="url(#blueStroke)" 
            strokeWidth="1.5" 
            fill="none"
          />
          {/* Inner Apex Triangle "A" Prism */}
          <polygon 
            points="20,10 30,28 10,28" 
            stroke="url(#blueStroke)" 
            strokeWidth="2" 
            fill="url(#blueFill)" 
            fillOpacity="0.35"
          />
          {/* Core Central Diamond */}
          <polygon 
            points="20,16 25,23 20,28 15,23" 
            fill="url(#blueCore)"
          />
          {/* Crossbar accent */}
          <line 
            x1="14" 
            y1="25" 
            x2="26" 
            y2="25" 
            stroke="#60A5FA" 
            strokeWidth="1.5" 
          />
          <defs>
            <linearGradient id="blueStroke" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93C5FD" />
              <stop offset="0.5" stopColor="#0066FF" />
              <stop offset="1" stopColor="#0043B8" />
            </linearGradient>
            <linearGradient id="blueFill" x1="20" y1="10" x2="20" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0066FF" stopOpacity="0.8" />
              <stop offset="1" stopColor="#0043B8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="blueCore" x1="15" y1="16" x2="25" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.4" stopColor="#93C5FD" />
              <stop offset="1" stopColor="#0066FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-wider leading-tight flex items-center gap-1.5 ${dimensions.text} ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <span className="tracking-widest font-extrabold">APEX</span>
          <span className="text-blue-gradient font-bold tracking-wider">MINERAL</span>
        </div>
        {showSubtitle && (
          <span className={`tracking-[0.25em] uppercase font-semibold text-[9px] ${
            isDark ? 'text-blue-300/80' : 'text-blue-700'
          } ${dimensions.sub}`}>
            Mineral Ventures
          </span>
        )}
      </div>
    </div>
  );
}
