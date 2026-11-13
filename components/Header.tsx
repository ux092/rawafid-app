'use client';

import React from 'react';
import { MapPin, Bell, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { GoldenWheatCartIcon, IslamicGeometricWatermark } from './SvgIcons';

export const Header: React.FC = () => {
  const { 
    selectedNeighborhood, 
    setIsLocationModalOpen, 
    setIsNotificationDrawerOpen 
  } = useCartStore();

  return (
    <header className="relative bg-[#5A7032] text-white pt-3 pb-6 px-4 rounded-b-[32px] shadow-lg overflow-hidden select-none">
      {/* Subtle Islamic Geometric Pattern Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <IslamicGeometricWatermark opacity={0.12} />
      </div>

      {/* Top Action Bar: Location on Right (Start in RTL), Notification on Left (End in RTL) */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        {/* Right Location Badge (RTL Start) */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-all text-xs active:scale-95 cursor-pointer shadow-sm"
          aria-label="تغيير موقع التوصيل"
        >
          <div className="w-5 h-5 rounded-full bg-[#E05A19] flex items-center justify-center text-white shrink-0">
            <MapPin className="w-3 h-3" />
          </div>
          <div className="flex flex-col text-right leading-tight">
            <span className="text-[10px] text-[#FAF7F2]/75">التوصيل إلى</span>
            <span className="font-bold text-[#FAF7F2] flex items-center gap-0.5">
              بغداد، {selectedNeighborhood.name}
              <ChevronDown className="w-3 h-3 text-[#FAF7F2]/80" />
            </span>
          </div>
        </button>

        {/* Left Notification Bell (RTL End) */}
        <button
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="relative w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all active:scale-90 cursor-pointer shadow-sm"
          aria-label="الإشعارات والتنبيهات"
        >
          <Bell className="w-4 h-4 text-[#FAF7F2]" />
          {/* Notification Red/Orange Badge */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E05A19] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#E05A19] text-[9px] font-bold text-white items-center justify-center">
              2
            </span>
          </span>
        </button>
      </div>

      {/* Center Brand Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-2.5">
          {/* Golden Wheat Shopping Cart Icon */}
          <div className="p-1 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 shadow-inner">
            <GoldenWheatCartIcon className="w-10 h-10" />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm font-[family-name:var(--font-cairo)]">
                روافد
              </h1>
              <span className="text-xs font-semibold tracking-wider text-[#FFD54F] uppercase">
                Rawafid
              </span>
            </div>
            {/* Brand Subtitle */}
            <p className="text-[11px] font-medium text-[#FAF7F2]/90 tracking-wide mt-0.5">
              من الجملة.. إلى بيتك
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Curved Edge Accent */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-6 bg-gradient-to-b from-transparent to-black/10 rounded-[100%] pointer-events-none" />
    </header>
  );
};
