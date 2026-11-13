'use client';

import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, setIsCategoriesDrawerOpen } = useCartStore();

  const quickSearches = ['تمن عنبر', 'شاي وزة', 'زيت عافية', 'تونة فيلية', 'مسواك خضار'];

  return (
    <section className="px-4 mt-3 select-none">
      <div className="relative flex items-center">
        {/* Pill-shaped Input Container */}
        <div className="relative w-full flex items-center bg-white rounded-full soft-shadow border border-[#EFE6D5] focus-within:border-[#5A7032] focus-within:ring-2 focus-within:ring-[#5A7032]/20 transition-all">
          {/* Right Search Icon (RTL Start) */}
          <div className="pr-4 pl-2 text-[#5A7032] flex items-center pointer-events-none">
            <Search className="w-4 h-4" />
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مسواك، شاي، تمن عنبر..."
            className="w-full py-2.5 pl-10 pr-1 text-xs md:text-sm text-[#54331E] placeholder:text-[#54331E]/45 bg-transparent border-none outline-none font-[family-name:var(--font-cairo)]"
            dir="rtl"
          />

          {/* Clear Button if input has text */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-10 p-1 rounded-full text-gray-400 hover:text-gray-600 active:scale-90"
              aria-label="مسح البحث"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Filter Icon Button (RTL End) */}
          <button
            onClick={() => setIsCategoriesDrawerOpen(true)}
            className="pl-3.5 pr-2 py-1 text-[#54331E]/60 hover:text-[#5A7032] transition-colors"
            aria-label="تصفية الأقسام"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Search Tag Chips */}
      <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar py-0.5 text-[10px]">
        <span className="text-[#54331E]/60 shrink-0 font-medium ml-1">الأكثر طلباً:</span>
        {quickSearches.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchQuery(tag === searchQuery ? '' : tag)}
            className={`px-2.5 py-0.5 rounded-full whitespace-nowrap transition-all border ${
              searchQuery === tag
                ? 'bg-[#5A7032] text-white border-[#5A7032]'
                : 'bg-[#FAF7F2] text-[#54331E]/80 border-[#EFE6D5] hover:bg-[#EFE6D5]/60'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};
