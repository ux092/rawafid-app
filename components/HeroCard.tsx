'use client';

import React from 'react';
import { WholesaleHeroBasketSvg } from './SvgIcons';
import { useCartStore } from '../store/cartStore';

export const HeroCard: React.FC = () => {
  const { setIsCategoriesDrawerOpen } = useCartStore();

  const handleShopNow = () => {
    const el = document.getElementById('special-offers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsCategoriesDrawerOpen(true);
    }
  };

  return (
    <section className="px-4 mt-3 select-none">
      <div className="relative overflow-hidden rounded-2xl bg-[#54331E] text-white p-4 card-shadow border border-[#6D4327]/40">
        {/* Subtle Decorative Golden/Cream Islamic Lattice in the Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-lattice" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#FFE082" strokeWidth="1" />
                <circle cx="20" cy="20" r="5" fill="none" stroke="#FFE082" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-lattice)" />
          </svg>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-[#E05A19]/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -top-10 w-36 h-36 bg-[#5A7032]/25 rounded-full blur-2xl pointer-events-none" />

        {/* Card Content Grid: Grocery basket on the right, Text & CTA on the left */}
        <div className="relative z-10 flex flex-row-reverse items-center justify-between gap-3">
          {/* Grocery Basket Illustration on the Right */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center relative">
            <WholesaleHeroBasketSvg className="w-full h-full drop-shadow-md" />
            {/* Floating Wholesale discount sticker */}
            <div className="absolute -bottom-1 -right-1 bg-[#5A7032] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/30 shadow-sm">
              وفر حتى 30%
            </div>
          </div>

          {/* Text & CTA Section on the Left */}
          <div className="flex-1 flex flex-col items-start text-right">
            {/* Wholesale Badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E05A19]/20 border border-[#E05A19]/40 text-[#FFA07A] text-[10px] font-bold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E05A19] animate-pulse" />
              أسعار جملة الجملة لبغداد
            </span>

            {/* Headline */}
            <h2 className="text-sm sm:text-base font-extrabold text-white leading-snug mb-3">
              كل احتياجاتك الغذائية بأسرع توصيل وأفضل الأسعار
            </h2>

            {/* Orange CTA Button: < تسوق الآن */}
            <button
              onClick={handleShopNow}
              className="inline-flex items-center gap-1.5 bg-[#E05A19] hover:bg-[#C64B10] active:scale-95 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer group"
              aria-label="تسوق الآن"
            >
              <span className="text-sm font-black transition-transform group-hover:-translate-x-1">‹</span>
              <span>تسوق الآن</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
