'use client';

import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  MapPin, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/cartStore';
import { ProductImageSvg } from './SvgIcons';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getSubtotal, 
    getDeliveryFee, 
    getTotalPrice, 
    getTotalSavings, 
    selectedNeighborhood, 
    setIsLocationModalOpen,
    checkoutOrder 
  } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'zain_cash' | 'qi_card'>('cash_on_delivery');
  const [addressDetails, setAddressDetails] = useState('شارع 62، قرب ساحة كهرمانة، عمارة 14');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartDrawerOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const savings = getTotalSavings();
  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'BAGHDAD' || promoCode.trim().toUpperCase() === 'RAWAFID') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('كود الخصم غير صالح. جرب كود BAGHDAD');
    }
  };

  const handleConfirmOrder = () => {
    setIsCheckingOut(true);

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore in environments where canvas is limited
    }

    setTimeout(() => {
      checkoutOrder(`${selectedNeighborhood.name} - ${addressDetails}`, paymentMethod);
      setIsCheckingOut(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      {/* Drawer Overlay Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={() => setIsCartDrawerOpen(false)} 
      />

      {/* Sheet Content Container */}
      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="relative bg-[#5A7032] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                سلة مشتريات الجملة
              </h2>
              <span className="text-[11px] text-[#FAF7F2]/80">
                {items.length} أصناف مختارة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-[#FFD54F] hover:underline cursor-pointer"
              >
                تفريغ السلة
              </button>
            )}
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#EFE6D5] flex items-center justify-center text-[#5A7032] mb-3">
                <ShoppingBag className="w-10 h-10 opacity-70" />
              </div>
              <h3 className="text-base font-extrabold text-[#54331E]">
                سلتك فارغة حالياً
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mt-1">
                تصفح عروض الجملة وأضف مسواكك الغذائي بأفضل أسعار بغداد
              </p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="mt-4 bg-[#5A7032] hover:bg-[#465825] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md"
              >
                تصفح العروض الآن
              </button>
            </div>
          ) : (
            <>
              {/* Delivery Destination Reminder */}
              <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-[#EFE6D5] shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#5A7032]/10 text-[#5A7032] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">التوصيل إلى منطقة</span>
                    <span className="text-xs font-extrabold text-[#54331E]">
                      بغداد، {selectedNeighborhood.name}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="text-xs font-bold text-[#E05A19] hover:underline"
                >
                  تغيير
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#54331E] block">المنتجات في السلة:</span>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between bg-white rounded-2xl p-3 border border-[#EFE6D5] shadow-xs gap-2"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-[#FAF7F2] p-1 shrink-0 overflow-hidden border border-[#EFE6D5]">
                      <ProductImageSvg type={item.product.image} className="w-full h-full" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 text-right">
                      <h4 className="text-xs font-bold text-[#54331E] truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 block">
                        {item.product.unit}
                      </span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xs font-extrabold text-[#E05A19]">
                          {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[9px] text-[#54331E]/70 font-semibold">د.ع</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-[#FAF7F2] rounded-xl px-2 py-1 border border-[#EFE6D5]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white text-[#54331E] hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors shadow-2xs"
                        aria-label="تقليل الكمية"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5" />
                        ) : (
                          <Minus className="w-3 h-3" />
                        )}
                      </button>

                      <span className="text-xs font-bold text-[#54331E] w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-[#5A7032] text-white hover:bg-[#465825] flex items-center justify-center transition-colors shadow-2xs"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Code */}
              <div className="bg-white rounded-2xl p-3 border border-[#EFE6D5]">
                <span className="text-xs font-bold text-[#54331E] block mb-1.5">كوبون خصم إضافي:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="أدخل الكوبون (مثلاً BAGHDAD)"
                    className="flex-1 px-3 py-1.5 text-xs bg-[#FAF7F2] rounded-xl border border-[#EFE6D5] outline-none focus:border-[#5A7032]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-[#5A7032] hover:bg-[#465825] text-white text-xs font-bold px-3 py-1.5 rounded-xl"
                  >
                    تطبيق
                  </button>
                </div>
                {promoApplied && (
                  <span className="text-[10px] text-green-700 font-bold block mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> تم تطبيق خصم 10% بنجاح
                  </span>
                )}
                {promoError && (
                  <span className="text-[10px] text-red-600 block mt-1">{promoError}</span>
                )}
              </div>

              {/* Delivery Address Details & Notes */}
              <div className="bg-white rounded-2xl p-3 border border-[#EFE6D5] space-y-2">
                <div>
                  <label className="text-[11px] font-bold text-[#54331E] block mb-1">
                    عنوان التوصيل التفصيلي (الشارع والدار):
                  </label>
                  <input
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] rounded-xl border border-[#EFE6D5] outline-none focus:border-[#5A7032]"
                    placeholder="مثال: شارع 14، قرب جامع أو نقطة دالة"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#54331E] block mb-1">
                    ملاحظات للكابتن (اختياري):
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] rounded-xl border border-[#EFE6D5] outline-none focus:border-[#5A7032]"
                    placeholder="الاتصال قبل الوصول، الدفع بالعملة الجديدة..."
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl p-3 border border-[#EFE6D5]">
                <span className="text-xs font-bold text-[#54331E] block mb-2">طريقة الدفع:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'bg-[#5A7032]/10 border-[#5A7032] text-[#5A7032] font-bold'
                        : 'bg-[#FAF7F2] border-[#EFE6D5] text-[#54331E]/75'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">نقد عند الاستلام</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('zain_cash')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'zain_cash'
                        ? 'bg-[#E05A19]/10 border-[#E05A19] text-[#E05A19] font-bold'
                        : 'bg-[#FAF7F2] border-[#EFE6D5] text-[#54331E]/75'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">زين كاش</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('qi_card')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'qi_card'
                        ? 'bg-[#1D72B8]/10 border-[#1D72B8] text-[#1D72B8] font-bold'
                        : 'bg-[#FAF7F2] border-[#EFE6D5] text-[#54331E]/75'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">كي كارد / ماستر</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white rounded-2xl p-3 border border-[#EFE6D5] space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>مجموع المنتجات:</span>
                  <span className="font-bold text-[#54331E]">{subtotal.toLocaleString()} د.ع</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-700">
                    <span>خصم الكوبون (10%):</span>
                    <span className="font-bold">-{discountAmount.toLocaleString()} د.ع</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>أجور توصيل بغداد ({selectedNeighborhood.name}):</span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-green-700">مجاني (طلب فوق 50 ألف)</span>
                  ) : (
                    <span className="font-bold text-[#54331E]">{deliveryFee.toLocaleString()} د.ع</span>
                  )}
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-[#E05A19] bg-[#E05A19]/10 p-1.5 rounded-lg font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> وفرت مع أسعار الجملة:
                    </span>
                    <span>{savings.toLocaleString()} د.ع</span>
                  </div>
                )}

                <div className="border-t border-[#EFE6D5] pt-2 flex justify-between items-baseline font-black text-sm text-[#54331E]">
                  <span>الإجمالي الكلي للدفع:</span>
                  <div className="flex items-baseline gap-1 text-base text-[#E05A19]">
                    <span>{finalTotal.toLocaleString()}</span>
                    <span className="text-xs">د.ع</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Action Button */}
        {items.length > 0 && (
          <div className="bg-white p-4 border-t border-[#EFE6D5] flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500">المجموع المطلوب</span>
              <span className="text-base font-black text-[#54331E] leading-tight">
                {finalTotal.toLocaleString()} <span className="text-xs font-bold">د.ع</span>
              </span>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={isCheckingOut}
              className="flex-1 bg-[#E05A19] hover:bg-[#C64B10] active:scale-95 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>جاري إرسال الطلب للمخزن...</span>
              ) : (
                <>
                  <span>تأكيد طلب الجملة</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
