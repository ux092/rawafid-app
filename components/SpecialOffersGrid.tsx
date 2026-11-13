'use client';

import React from 'react';
import { Flame, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { SPECIAL_OFFERS } from '../data/mockData';
import { ProductImageSvg } from './SvgIcons';

export const SpecialOffersGrid: React.FC = () => {
  const { 
    items, 
    addItem, 
    searchQuery, 
    selectedCategory, 
    setSelectedProductDetail,
    setIsCategoriesDrawerOpen 
  } = useCartStore();

  // Filter products by search query or category if active
  const filteredProducts = SPECIAL_OFFERS.filter((product) => {
    if (searchQuery) {
      return (
        product.name.includes(searchQuery) ||
        (product.subtitle && product.subtitle.includes(searchQuery)) ||
        product.category.includes(searchQuery)
      );
    }
    if (selectedCategory) {
      return product.category === selectedCategory;
    }
    return true;
  });

  const getProductCartQuantity = (productId: string) => {
    const found = items.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <section id="special-offers-section" className="px-4 mt-5 mb-6 select-none">
      {/* Section Header: Right "عروض خاصة" with Flame 🔥, Left "< عرض الكل" */}
      <div className="flex items-center justify-between mb-3">
        {/* Right (Start in RTL): Flame Icon + Title */}
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-[#E05A19]/15 text-[#E05A19] flame-pulse">
            <Flame className="w-4 h-4 fill-[#E05A19]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#54331E] leading-tight">
              عروض خاصة
            </h3>
            <span className="text-[10px] text-[#5A7032] font-semibold">
              بأسعار كراتين الجملة
            </span>
          </div>
        </div>

        {/* Left (End in RTL): < عرض الكل Button */}
        <button
          onClick={() => setIsCategoriesDrawerOpen(true)}
          className="flex items-center gap-1 text-xs font-bold text-[#E05A19] hover:text-[#C64B10] transition-colors cursor-pointer group"
          aria-label="عرض كل المنتجات والعروض"
        >
          <span className="text-xs transition-transform group-hover:-translate-x-1">‹</span>
          <span>عرض الكل</span>
        </button>
      </div>

      {/* 3-Column Product Card Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {filteredProducts.map((product) => {
          const cartQty = getProductCartQuantity(product.id);
          const hasDiscount = Boolean(product.discountBadge);

          return (
            <div
              key={product.id}
              onClick={() => setSelectedProductDetail(product)}
              className="relative flex flex-col justify-between bg-white rounded-2xl p-2 soft-shadow border border-[#EFE6D5] hover:border-[#5A7032]/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group overflow-hidden"
            >
              {/* Top Discount Badge & Wholesale Tag */}
              <div className="relative w-full">
                {hasDiscount && (
                  <span className="absolute top-0 right-0 z-10 bg-[#E05A19] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                    {product.discountBadge}
                  </span>
                )}
                
                {/* Product Image / Illustration */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] p-1 flex items-center justify-center transition-transform group-hover:scale-105">
                  <ProductImageSvg type={product.image} className="w-full h-full" />
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-1.5 flex flex-col flex-grow text-right">
                <span className="text-[9px] text-[#5A7032] font-semibold line-clamp-1">
                  {product.category}
                </span>

                <h4 className="text-[11px] sm:text-xs font-bold text-[#54331E] leading-tight line-clamp-1 group-hover:text-[#5A7032] transition-colors mt-0.5">
                  {product.name}
                </h4>

                <span className="text-[9px] text-gray-500 line-clamp-1 mt-0.5">
                  {product.unit}
                </span>

                {/* Price Display */}
                <div className="mt-1.5 pt-1 border-t border-[#FAF7F2]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-black text-[#54331E]">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-semibold text-[#54331E]/75">
                      د.ع
                    </span>
                  </div>

                  {product.originalPrice && (
                    <span className="text-[9px] text-gray-400 line-through block -mt-0.5">
                      {product.originalPrice.toLocaleString()} د.ع
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions: Circular Orange Add-to-Cart Button in the Bottom Corner */}
              <div className="mt-2 pt-1 flex items-center justify-between">
                {/* Quantity Indicator or Wholesale badge */}
                <span className="text-[8px] font-bold text-[#5A7032] bg-[#5A7032]/10 px-1.5 py-0.5 rounded-md">
                  جملة
                </span>

                {/* Circular Orange Add Button (#E05A19) */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer active:scale-85 ${
                    cartQty > 0
                      ? 'bg-[#5A7032] text-white hover:bg-[#465825]'
                      : 'bg-[#E05A19] text-white hover:bg-[#C64B10]'
                  }`}
                  aria-label={`إضافة ${product.name} إلى السلة`}
                >
                  {cartQty > 0 ? (
                    <div className="flex items-center justify-center">
                      <span className="text-[10px] font-bold">{cartQty}</span>
                    </div>
                  ) : (
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {/* Already in cart badge ring */}
              {cartQty > 0 && (
                <div className="absolute top-1 left-1 bg-[#5A7032] text-white rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-6 text-center soft-shadow mt-3">
          <p className="text-sm font-bold text-[#54331E]">لا توجد نتائج مطابقة لبحثك</p>
          <p className="text-xs text-gray-500 mt-1">جرب البحث بكلمات أخرى مثل "تونة" أو "زيت"</p>
        </div>
      )}
    </section>
  );
};
