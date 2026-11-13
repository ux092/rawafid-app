'use client';

import React from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  RotateCcw, 
  Receipt 
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { ProductImageSvg } from './SvgIcons';
import { ALL_PRODUCTS } from '../data/mockData';

export const OrdersModal: React.FC = () => {
  const { 
    isOrdersDrawerOpen, 
    setIsOrdersDrawerOpen, 
    orders, 
    addItem, 
    setIsCartDrawerOpen 
  } = useCartStore();

  if (!isOrdersDrawerOpen) return null;

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      const fullProd = ALL_PRODUCTS.find((p) => p.id === item.productId);
      if (fullProd) {
        addItem(fullProd, item.quantity);
      }
    });
    setIsOrdersDrawerOpen(false);
    setIsCartDrawerOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" /> قيد التجهيز من المستودع
          </span>
        );
      case 'on_the_way':
        return (
          <span className="inline-flex items-center gap-1 bg-[#5A7032]/15 text-[#5A7032] text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Truck className="w-3 h-3" /> مع الكابتن في الطريق
          </span>
        );
      case 'delivered':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> تم التوصيل بنجاح
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsOrdersDrawerOpen(false)} 
      />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="bg-[#5A7032] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-base font-extrabold text-white">
                طلباتي وفواتير الجملة
              </h2>
              <span className="text-[11px] text-[#FAF7F2]/80">
                متابعة شحنات المسواك في بغداد
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOrdersDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            aria-label="إغلاق الطلبات"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 border border-[#EFE6D5] shadow-xs space-y-3"
            >
              {/* Order Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]">
                <div>
                  <span className="text-xs font-black text-[#54331E]">
                    رقم الطلب: {order.orderNumber}
                  </span>
                  <span className="text-[10px] text-gray-500 block">
                    {order.createdAt}
                  </span>
                </div>
                {getStatusBadge(order.status)}
              </div>

              {/* Delivery Captain Info if on the way */}
              {order.status === 'on_the_way' && (
                <div className="bg-[#FAF7F2] rounded-xl p-2.5 flex items-center justify-between border border-[#EFE6D5]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5A7032] text-white flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">الكابتن المسؤول:</span>
                      <span className="text-xs font-bold text-[#54331E]">{order.captainName}</span>
                    </div>
                  </div>
                  {order.captainPhone && (
                    <a
                      href={`tel:${order.captainPhone}`}
                      className="bg-[#5A7032] hover:bg-[#465825] text-white p-2 rounded-xl text-xs flex items-center gap-1 font-bold"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>اتصال</span>
                    </a>
                  )}
                </div>
              )}

              {/* Items in order */}
              <div className="space-y-1.5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] p-0.5 shrink-0">
                        <ProductImageSvg type={item.image} className="w-full h-full" />
                      </div>
                      <span className="font-bold text-[#54331E]">{item.productName}</span>
                      <span className="text-[10px] text-gray-500">×{item.quantity}</span>
                    </div>
                    <span className="font-extrabold text-[#54331E]">
                      {(item.price * item.quantity).toLocaleString()} د.ع
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="text-[10px] text-gray-500 bg-[#FAF7F2] p-2 rounded-lg">
                <span className="font-bold text-[#54331E]">عنوان التسليم: </span>
                {order.deliveryAddress}
              </div>

              {/* Total & Reorder Action */}
              <div className="pt-2 border-t border-[#FAF7F2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block">الإجمالي الكلي:</span>
                  <span className="text-sm font-black text-[#E05A19]">
                    {order.total.toLocaleString()} د.ع
                  </span>
                </div>

                <button
                  onClick={() => handleReorder(order)}
                  className="inline-flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#EFE6D5] text-[#54331E] border border-[#EFE6D5] font-bold text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#5A7032]" />
                  <span>إعادة الطلب</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
