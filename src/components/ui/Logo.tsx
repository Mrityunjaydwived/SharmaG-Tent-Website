import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: { icon: 'w-8 h-8', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', title: 'text-lg sm:text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', title: 'text-2xl sm:text-3xl', sub: 'text-xs' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Royal Crest Icon (Indian Tent / Mandap with Kalash & Pillars) */}
      <div
        className={`${sizeClasses.icon} relative rounded-xl bg-gradient-to-br from-[#1F74BA] via-[#2A82C8] to-[#0D548F] p-[1.5px] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
      >
        <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center p-1.5">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            {/* Base platform */}
            <path
              d="M6 40H42C43.1 40 44 39.1 44 38V37H4V38C4 39.1 4.9 40 6 40Z"
              fill="#1F74BA"
            />
            {/* Carpet runner */}
            <rect x="18" y="36" width="12" height="4" fill="#F8D706" rx="1" />
            
            {/* Pillars */}
            <rect x="8" y="22" width="3" height="15" rx="1" fill="#1F74BA" />
            <rect x="37" y="22" width="3" height="15" rx="1" fill="#1F74BA" />
            <rect x="17" y="24" width="2.5" height="13" rx="1" fill="#F8D706" />
            <rect x="28.5" y="24" width="2.5" height="13" rx="1" fill="#F8D706" />

            {/* Scalloped Arch & Drapery */}
            <path
              d="M7 23C13 19 19 25 24 20C29 25 35 19 41 23"
              stroke="#F09120"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Pagoda Canopy Roof */}
            <path
              d="M24 10L6 22H42L24 10Z"
              fill="#1F74BA"
            />
            <path
              d="M24 10L14 22H34L24 10Z"
              fill="#F8D706"
              opacity="0.9"
            />

            {/* Golden Kalash & Finial Spire */}
            <circle cx="24" cy="7.5" r="2.2" fill="#F8D706" />
            <path d="M24 2.5L25.5 6H22.5L24 2.5Z" fill="#F09120" />
            <circle cx="24" cy="2" r="1" fill="#F8D706" />

            {/* Royal Star in center */}
            <path
              d="M24 26L25 28.5L27.5 29L25 30.5L24 33L23 30.5L20.5 29L23 28.5L24 26Z"
              fill="#F8D706"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {variant !== 'compact' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif-luxury font-black ${sizeClasses.title} tracking-tight text-[#111827] leading-none`}
            >
              Sharma<span className="text-[#1F74BA]">G</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#F8D706] text-black font-extrabold text-[9px] tracking-wider uppercase leading-none shadow-xs">
              टेंट हाउस
            </span>
          </div>
          <span
            className={`font-bold tracking-widest uppercase ${sizeClasses.sub} text-[#1F74BA] mt-0.5 flex items-center gap-1`}
          >
            <span>TENT HOUSE</span>
            <span className="text-[#F09120]">•</span>
            <span className="text-gray-500 font-medium">ROYAL EVENTS</span>
          </span>
        </div>
      )}
    </div>
  );
};