'use client';

import React, { useEffect } from 'react';
import { ShoppingBag, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const ToastNotification: React.FC = () => {
  const { lastAddedToast, hideToast, setIsCartDrawerOpen } = useCartStore();

  useEffect(() => {
    if (lastAddedToast?.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [lastAddedToast, hideToast]);

  if (!lastAddedToast?.show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto select-none pointer-events-auto">
      <div className="bg-[#54331E] text-white p-3 rounded-2xl shadow-2xl border border-[#6D4327] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#5A7032] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 text-right">
            <span className="text-[10px] text-[#FAF7F2]/80 block">تمت الإضافة إلى السلة</span>
            <span className="text-xs font-bold text-white truncate block">
              {lastAddedToast.product.name}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            hideToast();
            setIsCartDrawerOpen(true);
          }}
          className="bg-[#E05A19] hover:bg-[#C64B10] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 shadow-sm active:scale-95 transition-all"
        >
          <span>عرض السلة</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
