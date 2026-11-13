'use client';

import React from 'react';
import { 
  Apple, 
  Package, 
  Coffee, 
  Sparkles, 
  Wheat, 
  Grid 
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CATEGORY_ARCHES } from '../data/mockData';
import { BaghdadiArchFrame } from './SvgIcons';

export const BaghdadiArches: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    setIsCategoriesDrawerOpen 
  } = useCartStore();

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'vegetables':
        return <Apple className="w-5 h-5 text-[#5A7032]" />;
      case 'canned':
        return <Package className="w-5 h-5 text-[#E05A19]" />;
      case 'drinks':
        return <Coffee className="w-5 h-5 text-[#54331E]" />;
      case 'cleaning':
        return <Sparkles className="w-5 h-5 text-[#1D72B8]" />;
      case 'staples':
        return <Wheat className="w-5 h-5 text-[#D97706]" />;
      case 'more':
      default:
        return <Grid className="w-5 h-5 text-[#5A7032]" />;
    }
  };

  const handleArchClick = (id: string, name: string) => {
    if (id === 'more') {
      setIsCategoriesDrawerOpen(true);
    } else {
      setSelectedCategory(selectedCategory === name ? null : name);
    }
  };

  return (
    <section className="px-4 mt-4 select-none">
      {/* Olive Green Strip Container */}
      <div className="relative bg-[#5A7032] rounded-2xl p-3 shadow-md overflow-hidden">
        {/* Subtle Islamic Lattice in Olive Strip Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="arch-strip-pat" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M15 0 L30 15 L15 30 L0 15 Z" fill="none" stroke="#FAF7F2" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arch-strip-pat)" />
          </svg>
        </div>

        {/* Section Header inside strip */}
        <div className="relative z-10 flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E05A19]" />
            <h3 className="text-xs font-bold text-[#FAF7F2]">
              أقسام مسواك الجملة
            </h3>
          </div>
          <span className="text-[10px] text-[#FAF7F2]/70 font-medium">
            تصفح حسب القسم
          </span>
        </div>

        {/* 6 Pointed Baghdadi Architectural Arches (Right to Left) */}
        <div className="relative z-10 grid grid-cols-6 gap-1.5 sm:gap-2">
          {CATEGORY_ARCHES.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.id}
                onClick={() => handleArchClick(category.id, category.name)}
                className="group flex flex-col items-center focus:outline-none cursor-pointer"
                aria-label={`قسم ${category.name}`}
              >
                {/* Baghdadi Arch Frame with Cream Background */}
                <BaghdadiArchFrame isActive={isSelected} className="w-full">
                  <div className="w-9 h-9 rounded-full bg-[#EFE6D5]/60 flex items-center justify-center transition-transform group-hover:scale-110">
                    {getCategoryIcon(category.iconType)}
                  </div>
                  {/* Subtle decorative dot */}
                  <span className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-[#E05A19]' : 'bg-[#5A7032]/40'}`} />
                </BaghdadiArchFrame>

                {/* Category Label (Right to Left) */}
                <span className={`text-[9px] sm:text-[10px] font-bold mt-1 text-center leading-[1.1] h-6 flex items-center justify-center transition-colors ${
                  isSelected ? 'text-[#FFD54F]' : 'text-[#FAF7F2] group-hover:text-white'
                }`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
