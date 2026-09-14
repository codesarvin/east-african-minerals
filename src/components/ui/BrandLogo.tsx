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
    sm: { icon: 34, text: 'text-sm', sub: 'text-[8.5px]' },
    md: { icon: 44, text: 'text-base', sub: 'text-[9.5px]' },
    lg: { icon: 52, text: 'text-xl', sub: 'text-[11px]' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Obsidian & Gold Geometric Mineral Emblem */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center rounded-xl p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.35)]"
        style={{
          width: dimensions.icon,
          height: dimensions.icon,
          background: 'linear-gradient(135deg, #111827 0%, #0B0F17 50%, #030712 100%)',
          border: '1px solid rgba(217, 119, 6, 0.55)',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 0 14px -2px rgba(245, 158, 11, 0.25), inset 0 1px 1px 0 rgba(254, 240, 138, 0.3)',
        }}
      >
        <svg 
          viewBox="0 0 44 44" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer Obsidian Faceted Shield */}
          <polygon 
            points="22,3 38,12 38,32 22,41 6,32 6,12" 
            fill="url(#obsidianBase)" 
            stroke="url(#goldBorder)" 
            strokeWidth="1.2"
          />

          {/* Obsidian Crystal Facet Planes */}
          <polygon points="22,3 38,12 22,22 6,12" fill="url(#facetTop)" fillOpacity="0.8" />
          <polygon points="6,12 22,22 22,41 6,32" fill="url(#facetLeft)" fillOpacity="0.9" />
          <polygon points="38,12 22,22 22,41 38,32" fill="url(#facetRight)" fillOpacity="0.95" />

          {/* Faceted Internal Diamond / Apex Pyramid */}
          {/* Left Facet of Apex */}
          <polygon 
            points="22,9 22,29 11,26" 
            fill="url(#goldFacetLeft)" 
            stroke="url(#goldWire)" 
            strokeWidth="0.8"
          />
          {/* Right Facet of Apex */}
          <polygon 
            points="22,9 33,26 22,29" 
            fill="url(#goldFacetRight)" 
            stroke="url(#goldWire)" 
            strokeWidth="0.8"
          />

          {/* Central Brilliant Cut Gem Core */}
          <polygon 
            points="22,14 27,21 22,27 17,21" 
            fill="url(#goldCore)"
            stroke="#FFFBEB"
            strokeWidth="0.6"
          />

          {/* Precision Horizontal Platinum/Gold Baseline */}
          <line 
            x1="12" 
            y1="29" 
            x2="32" 
            y2="29" 
            stroke="url(#goldLine)" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />

          {/* Top Specular Glint */}
          <circle cx="22" cy="3" r="1.5" fill="#FEF08A" />
          <path d="M22 0.5 L22 5.5 M19.5 3 L24.5 3" stroke="#FFFBEB" strokeWidth="0.7" strokeLinecap="round" />

          {/* Gradients Definition */}
          <defs>
            {/* Obsidian Glass Gradient */}
            <linearGradient id="obsidianBase" x1="6" y1="3" x2="38" y2="41" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E293B" />
              <stop offset="0.5" stopColor="#0F172A" />
              <stop offset="1" stopColor="#020617" />
            </linearGradient>

            {/* Facet Sheen Gradients */}
            <linearGradient id="facetTop" x1="22" y1="3" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="1" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="facetLeft" x1="6" y1="12" x2="22" y2="41" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E293B" />
              <stop offset="1" stopColor="#0A0F1D" />
            </linearGradient>
            <linearGradient id="facetRight" x1="38" y1="12" x2="22" y2="41" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" />
              <stop offset="1" stopColor="#020617" />
            </linearGradient>

            {/* Gold Borders & Facets */}
            <linearGradient id="goldBorder" x1="6" y1="3" x2="38" y2="41" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.25" stopColor="#D97706" />
              <stop offset="0.6" stopColor="#F59E0B" />
              <stop offset="0.85" stopColor="#B45309" />
              <stop offset="1" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="goldFacetLeft" x1="11" y1="9" x2="22" y2="29" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.4" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>

            <linearGradient id="goldFacetRight" x1="33" y1="9" x2="22" y2="29" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.6" stopColor="#D97706" />
              <stop offset="1" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="goldCore" x1="17" y1="14" x2="27" y2="27" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.25" stopColor="#FEF08A" />
              <stop offset="0.65" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>

            <linearGradient id="goldLine" x1="12" y1="29" x2="32" y2="29" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B45309" stopOpacity="0.2" />
              <stop offset="0.3" stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#B45309" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="goldWire" x1="11" y1="9" x2="33" y2="29" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF9C3" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#92400E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Blue Wordmark */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-wider leading-tight flex items-center gap-1.5 ${dimensions.text}`}>
          <span className={`tracking-widest font-extrabold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            APEX
          </span>
          <span className="text-blue-gradient font-extrabold tracking-wider">
            MINERAL
          </span>
        </div>
        {showSubtitle && (
          <span 
            className={`tracking-[0.25em] uppercase font-semibold ${dimensions.sub} ${
              isDark ? 'text-blue-300/80' : 'text-blue-700'
            }`}
          >
            Mineral Ventures
          </span>
        )}
      </div>
    </div>
  );
}

