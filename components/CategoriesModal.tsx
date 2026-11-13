'use client';

import React, { useState } from 'react';
import { X, Search, Plus, Check } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CATEGORY_ARCHES, ALL_PRODUCTS } from '../data/mockData';
import { ProductImageSvg } from './SvgIcons';

export const CategoriesModal: React.FC = () => {
  const { 
    isCategoriesDrawerOpen, 
    setIsCategoriesDrawerOpen, 
    addItem, 
    items,
    setSelectedProductDetail 
  } = useCartStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  if (!isCategoriesDrawerOpen) return null;

  const filteredProducts = ALL_PRODUCTS.filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = !localSearch || 
      prod.name.includes(localSearch) || 
      (prod.subtitle && prod.subtitle.includes(localSearch));
    return matchesCategory && matchesSearch;
  });

  const getProductCartQuantity = (id: string) => {
    const found = items.find((i) => i.product.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsCategoriesDrawerOpen(false)} 
      />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="bg-[#5A7032] text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white">
              أقسام الجملة والمواد الغذائية
            </h2>
            <span className="text-[11px] text-[#FAF7F2]/80">
              تصفح كامل المخزون المتوفر في بغداد
            </span>
          </div>
          <button
            onClick={() => setIsCategoriesDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            aria-label="إغلاق الأقسام"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search inside categories */}
        <div className="p-3 bg-white border-b border-[#EFE6D5]">
          <div className="flex items-center bg-[#FAF7F2] rounded-full px-3 py-1.5 border border-[#EFE6D5]">
            <Search className="w-4 h-4 text-gray-400 ml-2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="ابحث داخل الأقسام..."
              className="w-full text-xs bg-transparent border-none outline-none font-[family-name:var(--font-cairo)]"
            />
            {localSearch && (
              <button onClick={() => setLocalSearch('')}>
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-[#FAF7F2] px-3 py-2 border-b border-[#EFE6D5] flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-bold ${
              activeCategory === 'all'
                ? 'bg-[#5A7032] text-white shadow-xs'
                : 'bg-white text-[#54331E] border border-[#EFE6D5]'
            }`}
          >
            الكل ({ALL_PRODUCTS.length})
          </button>
          {CATEGORY_ARCHES.filter(c => c.id !== 'more').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-bold ${
                activeCategory === cat.name
                  ? 'bg-[#5A7032] text-white shadow-xs'
                  : 'bg-white text-[#54331E] border border-[#EFE6D5]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const qty = getProductCartQuantity(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductDetail(product)}
                  className="bg-white rounded-2xl p-2.5 border border-[#EFE6D5] shadow-xs flex flex-col justify-between hover:border-[#5A7032]/40 transition-all cursor-pointer relative group"
                >
                  {product.discountBadge && (
                    <span className="absolute top-2 right-2 z-10 bg-[#E05A19] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                      {product.discountBadge}
                    </span>
                  )}

                  <div className="w-full aspect-square bg-[#FAF7F2] rounded-xl p-2 flex items-center justify-center">
                    <ProductImageSvg type={product.image} className="w-full h-full" />
                  </div>

                  <div className="mt-2 text-right">
                    <span className="text-[9px] text-[#5A7032] font-semibold">{product.category}</span>
                    <h4 className="text-xs font-bold text-[#54331E] truncate">{product.name}</h4>
                    <span className="text-[10px] text-gray-500 block">{product.unit}</span>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-xs font-black text-[#54331E]">{product.price.toLocaleString()}</span>
                      <span className="text-[9px] text-gray-500">د.ع</span>
                      {product.originalPrice && (
                        <span className="text-[9px] text-gray-400 line-through mr-1">
                          {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#FAF7F2] flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[#5A7032] bg-[#5A7032]/10 px-1.5 py-0.5 rounded">
                      جملة
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product, 1);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        qty > 0
                          ? 'bg-[#5A7032] text-white'
                          : 'bg-[#E05A19] text-white hover:bg-[#C64B10]'
                      }`}
                      aria-label="إضافة للسلة"
                    >
                      {qty > 0 ? (
                        <span className="text-[10px] font-bold">{qty}</span>
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-xs">
              لا توجد منتجات مطابقة في هذا القسم حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
