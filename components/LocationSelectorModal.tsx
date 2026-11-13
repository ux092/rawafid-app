'use client';

import React from 'react';
import { X, MapPin, Check, Clock } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { BAGHDAD_NEIGHBORHOODS } from '../data/mockData';

export const LocationSelectorModal: React.FC = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    selectedNeighborhood, 
    setNeighborhood 
  } = useCartStore();

  if (!isLocationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsLocationModalOpen(false)} 
      />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="bg-[#5A7032] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FFD54F]" />
            <div>
              <h2 className="text-base font-extrabold text-white">
                اختر منطقتك في بغداد
              </h2>
              <span className="text-[11px] text-[#FAF7F2]/80">
                تغطية سريعة لجانبي الكرخ والرصافة
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            aria-label="إغلاق نافذة الموقع"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Neighborhoods List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {BAGHDAD_NEIGHBORHOODS.map((neighborhood) => {
            const isSelected = selectedNeighborhood.id === neighborhood.id;
            return (
              <button
                key={neighborhood.id}
                onClick={() => setNeighborhood(neighborhood)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-right cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#5A7032] ring-2 ring-[#5A7032]/20 shadow-sm'
                    : 'bg-white/80 border-[#EFE6D5] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#5A7032] text-white' : 'bg-[#FAF7F2] text-[#54331E]'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#54331E]">
                        بغداد، {neighborhood.name}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 bg-[#FAF7F2] px-1.5 py-0.5 rounded">
                        جانب {neighborhood.area}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#5A7032]" /> {neighborhood.deliveryMinutes} دقيقة
                      </span>
                      <span>•</span>
                      <span>أجور التوصيل: {neighborhood.deliveryFee.toLocaleString()} د.ع</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#5A7032] text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
