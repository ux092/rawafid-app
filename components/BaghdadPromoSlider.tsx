'use client';

import React, { useState, useEffect } from 'react';
import { Bike, ShieldCheck, Truck } from 'lucide-react';
import { BaghdadLandmarksArt } from './SvgIcons';

interface SlideData {
  id: number;
  centerText: string;
  badgeTitle: string;
  badgePercent: string;
  circleText: string;
  icon: 'scooter' | 'truck' | 'shield';
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    centerText: 'جودة عالية ... وسعر أوفر لأهلنا',
    badgeTitle: 'خصم',
    badgePercent: '10%',
    circleText: 'توصيل سريع لكل مناطق بغداد',
    icon: 'scooter',
  },
  {
    id: 1,
    centerText: 'مسواك الجملة لباب بيتك بطرفة عين',
    badgeTitle: 'شروات',
    badgePercent: '20%',
    circleText: 'توصيل مجاني للأوردر فوق 50 ألف',
    icon: 'truck',
  },
  {
    id: 2,
    centerText: 'تمن عنبر وزيوت أصلية ومضمونة',
    badgeTitle: 'كاش باك',
    badgePercent: '15%',
    circleText: 'ضمان استرجاع فوري 100%',
    icon: 'shield',
  },
];

export const BaghdadPromoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="px-4 mt-4 select-none">
      {/* Warm Sand Banner Container (#EFE6D5) */}
      <div className="relative bg-[#EFE6D5] rounded-2xl p-4 shadow-sm border border-[#E2D5BE] overflow-hidden">
        {/* Subtle Line-Art of Baghdad Landmarks in the Background */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-30">
          <BaghdadLandmarksArt className="w-full h-20" />
        </div>

        {/* Floating Ambient Decorative Circles */}
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-white/40 blur-xl pointer-events-none" />

        {/* Promo Slider Content Layout */}
        <div className="relative z-10 flex items-center justify-between gap-3 min-h-[84px]">
          {/* Right Section (Start in RTL): Olive Circle + Orange 10% Scooter Icon */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Olive Circle (#5A7032) */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#5A7032] text-white flex flex-col items-center justify-center p-1.5 shadow-md border-2 border-white/60 text-center leading-tight">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#FAF7F2]">
                {slide.circleText}
              </span>

              {/* Orange 10% Scooter / Delivery Floating Badge on the corner */}
              <div className="absolute -bottom-1 -left-2 bg-[#E05A19] text-white rounded-full px-2 py-0.5 flex items-center gap-1 shadow-md border border-white text-[9px] font-black">
                <Bike className="w-3 h-3 text-white" />
                <span>{slide.badgePercent}</span>
              </div>
            </div>
          </div>

          {/* Center / Main Promo Text */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
            <span className="text-[10px] text-[#54331E]/70 font-semibold mb-0.5">
              عروض العاصمة بغداد
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-[#54331E] leading-snug drop-shadow-xs">
              {slide.centerText}
            </h3>
            <span className="inline-block mt-1 text-[10px] font-bold text-[#E05A19] bg-[#E05A19]/10 px-2 py-0.5 rounded-full">
              أسعار تنافس سوق الشورجة وجميلة
            </span>
          </div>

          {/* Left Decorative Palm / Landmark Silhouette Accent */}
          <div className="shrink-0 w-8 flex flex-col items-center justify-center opacity-80">
            <span className="text-xl">🌴</span>
            <span className="text-[9px] font-bold text-[#5A7032]">بغداد</span>
          </div>
        </div>

        {/* Slider Dots Below */}
        <div className="relative z-10 flex items-center justify-center gap-1.5 mt-3 pt-1 border-t border-[#54331E]/10">
          {SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index
                  ? 'w-5 bg-[#5A7032]'
                  : 'w-1.5 bg-[#54331E]/30 hover:bg-[#54331E]/50'
              }`}
              aria-label={`الشريحة ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
