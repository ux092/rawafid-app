'use client';

import React from 'react';
import { 
  Home, 
  LayoutGrid, 
  ShoppingBag, 
  ReceiptText, 
  User 
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const BottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    getTotalCount, 
    setIsCartDrawerOpen,
    setIsCategoriesDrawerOpen,
    setIsOrdersDrawerOpen,
    setIsProfileDrawerOpen 
  } = useCartStore();

  const totalCount = getTotalCount();

  const handleNavClick = (tab: 'home' | 'categories' | 'cart' | 'orders' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto select-none">
      {/* Curved Olive Green Bar Container (#5A7032) */}
      <div className="relative bg-[#5A7032] text-[#FAF7F2] px-2 py-2 shadow-2xl rounded-t-[28px] border-t border-white/20">
        {/* Navigation Items (Right to Left in RTL) */}
        <div className="flex items-center justify-around relative">
          {/* 1. الرئيسية (Home) - Right */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'home'
                ? 'text-[#FFD54F] font-bold'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
            aria-label="الرئيسية"
          >
            <div className="relative">
              <Home className="w-5 h-5" />
              {activeTab === 'home' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD54F]" />
              )}
            </div>
            <span className="text-[10px] mt-1">الرئيسية</span>
          </button>

          {/* 2. الأقسام (Categories) */}
          <button
            onClick={() => {
              handleNavClick('categories');
              setIsCategoriesDrawerOpen(true);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'categories'
                ? 'text-[#FFD54F] font-bold'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
            aria-label="الأقسام"
          >
            <div className="relative">
              <LayoutGrid className="w-5 h-5" />
              {activeTab === 'categories' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD54F]" />
              )}
            </div>
            <span className="text-[10px] mt-1">الأقسام</span>
          </button>

          {/* 3. Raised Floating Orange "السلة" Button (Center) */}
          <div className="relative -top-6 flex flex-col items-center">
            <button
              onClick={() => {
                handleNavClick('cart');
                setIsCartDrawerOpen(true);
              }}
              className="relative w-14 h-14 rounded-full bg-[#E05A19] hover:bg-[#C64B10] text-white flex flex-col items-center justify-center floating-cart-shadow border-4 border-[#FAF7F2] transition-transform active:scale-90 cursor-pointer group"
              aria-label={`سلة التسوق تحتوي على ${totalCount} عناصر`}
            >
              <ShoppingBag className="w-6 h-6 stroke-[2.2] transition-transform group-hover:scale-110" />

              {/* Red Badge with Count (e.g. 2) */}
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  {totalCount}
                </span>
              )}
            </button>
            <span className="text-[10px] font-bold text-[#FAF7F2] mt-0.5">
              السلة
            </span>
          </div>

          {/* 4. طلباتي (My Orders) */}
          <button
            onClick={() => {
              handleNavClick('orders');
              setIsOrdersDrawerOpen(true);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'orders'
                ? 'text-[#FFD54F] font-bold'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
            aria-label="طلباتي"
          >
            <div className="relative">
              <ReceiptText className="w-5 h-5" />
              {activeTab === 'orders' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD54F]" />
              )}
            </div>
            <span className="text-[10px] mt-1">طلباتي</span>
          </button>

          {/* 5. حسابي (My Account / Profile) - Left */}
          <button
            onClick={() => {
              handleNavClick('profile');
              setIsProfileDrawerOpen(true);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'profile'
                ? 'text-[#FFD54F] font-bold'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
            aria-label="حسابي"
          >
            <div className="relative">
              <User className="w-5 h-5" />
              {activeTab === 'profile' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD54F]" />
              )}
            </div>
            <span className="text-[10px] mt-1">حسابي</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
