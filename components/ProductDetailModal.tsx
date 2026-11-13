'use client';

import React from 'react';
import { X, Plus, Minus, Check, Star, ShieldCheck, Box, Globe2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { ProductImageSvg } from './SvgIcons';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductDetail, 
    setSelectedProductDetail, 
    addItem, 
    updateQuantity, 
    items 
  } = useCartStore();

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const cartItem = items.find((i) => i.product.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="absolute inset-0" 
        onClick={() => setSelectedProductDetail(null)} 
      />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Top Image Showcase */}
        <div className="relative bg-white p-6 flex flex-col items-center justify-center border-b border-[#EFE6D5]">
          <button
            onClick={() => setSelectedProductDetail(null)}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EFE6D5] flex items-center justify-center text-[#54331E] hover:bg-[#EFE6D5] transition-colors"
            aria-label="إغلاق تفاصيل المنتج"
          >
            <X className="w-4 h-4" />
          </button>

          {product.discountBadge && (
            <span className="absolute top-4 right-4 bg-[#E05A19] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
              خصم الجملة {product.discountBadge}
            </span>
          )}

          <div className="w-40 h-40 flex items-center justify-center">
            <ProductImageSvg type={product.image} className="w-full h-full drop-shadow-md" />
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5A7032]">{product.category}</span>
              <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-gray-400 text-[10px]">(تقييم عالي)</span>
              </div>
            </div>

            <h3 className="text-lg font-black text-[#54331E] mt-1">
              {product.name}
            </h3>

            {product.subtitle && (
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Pricing & Unit */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#EFE6D5] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 block">سعر القطعة للمفرد</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-black text-[#E05A19]">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-[#54331E]">د.ع</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through mr-1.5">
                    {product.originalPrice.toLocaleString()} د.ع
                  </span>
                )}
              </div>
            </div>

            <span className="text-xs font-bold text-[#54331E] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#EFE6D5]">
              {product.unit}
            </span>
          </div>

          {/* Wholesale Bulk Tier Info */}
          {product.wholesaleTier && (
            <div className="bg-[#5A7032]/10 rounded-2xl p-3 border border-[#5A7032]/30 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#5A7032] text-white flex items-center justify-center shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-[#5A7032] block">
                  عرض كرتون الجملة الأوفر:
                </span>
                <p className="text-xs text-[#54331E] font-medium mt-0.5">
                  {product.wholesaleTier.label}
                </p>
              </div>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-[#EFE6D5] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#5A7032]" />
              <div>
                <span className="text-[9px] text-gray-500 block">بلد المنشأ</span>
                <span className="font-bold text-[#54331E]">{product.origin}</span>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#EFE6D5] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E05A19]" />
              <div>
                <span className="text-[9px] text-gray-500 block">حالة المخزن</span>
                <span className="font-bold text-green-700">متوفر في مخازن بغداد</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#EFE6D5] flex items-center gap-3">
          {currentQty > 0 ? (
            <div className="flex-1 flex items-center justify-between bg-[#FAF7F2] rounded-xl p-2 border border-[#EFE6D5]">
              <button
                onClick={() => updateQuantity(product.id, currentQty - 1)}
                className="w-9 h-9 rounded-lg bg-white text-[#54331E] flex items-center justify-center shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <span className="text-xs font-bold text-[#54331E] block">الكمية بالسلة: {currentQty}</span>
                <span className="text-[10px] text-gray-500">{(product.price * currentQty).toLocaleString()} د.ع</span>
              </div>
              <button
                onClick={() => updateQuantity(product.id, currentQty + 1)}
                className="w-9 h-9 rounded-lg bg-[#5A7032] text-white flex items-center justify-center shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(product, 1)}
              className="flex-1 bg-[#E05A19] hover:bg-[#C64B10] active:scale-95 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>إضافة مسواك الجملة إلى السلة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
