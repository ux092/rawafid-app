'use client';

import React from 'react';
import { 
  X, 
  User, 
  Wallet, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  Award, 
  HeartHandshake, 
  HelpCircle 
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const ProfileModal: React.FC = () => {
  const { 
    isProfileDrawerOpen, 
    setIsProfileDrawerOpen, 
    userProfile,
    setIsLocationModalOpen 
  } = useCartStore();

  if (!isProfileDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsProfileDrawerOpen(false)} 
      />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="bg-[#5A7032] text-white px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                {userProfile.name}
              </h2>
              <span className="text-xs text-[#FFD54F] font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> {userProfile.memberTier}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsProfileDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            aria-label="إغلاق الحساب"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Wallet Balance & Savings Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-3 border border-[#EFE6D5] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#5A7032] mb-1">
                <Wallet className="w-4 h-4" />
                <span className="text-[10px] font-bold">محفظة روافد</span>
              </div>
              <span className="text-sm font-black text-[#54331E]">
                {userProfile.walletBalance.toLocaleString()} د.ع
              </span>
              <span className="text-[9px] text-gray-500 block mt-0.5">رصيد كاش باك جاهز</span>
            </div>

            <div className="bg-white rounded-2xl p-3 border border-[#EFE6D5] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#E05A19] mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span className="text-[10px] font-bold">وفرت مع الجملة</span>
              </div>
              <span className="text-sm font-black text-[#E05A19]">
                {userProfile.wholesaleSavings.toLocaleString()} د.ع
              </span>
              <span className="text-[9px] text-gray-500 block mt-0.5">مقارنة بأسعار المفرد</span>
            </div>
          </div>

          {/* Saved Baghdad Addresses */}
          <div className="bg-white rounded-2xl p-4 border border-[#EFE6D5] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-[#54331E] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#5A7032]" /> العناوين المحفوظة في بغداد
              </span>
              <button
                onClick={() => {
                  setIsProfileDrawerOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="text-[11px] font-bold text-[#E05A19] hover:underline"
              >
                + إضافة منطقة
              </button>
            </div>

            <div className="space-y-2">
              {userProfile.savedAddresses.map((addr) => (
                <div key={addr.id} className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE6D5] text-xs">
                  <div className="flex items-center justify-between font-bold text-[#54331E]">
                    <span>{addr.label} ({addr.neighborhood})</span>
                    <span className="text-[10px] text-[#5A7032] bg-[#5A7032]/10 px-2 py-0.5 rounded">نشط</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">{addr.address}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wholesale Guarantees */}
          <div className="bg-[#5A7032]/10 rounded-2xl p-4 border border-[#5A7032]/20 space-y-2">
            <span className="text-xs font-black text-[#5A7032] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> ضمانات روافد لأهل بغداد:
            </span>
            <ul className="text-xs text-[#54331E] space-y-1 pr-4 list-disc">
              <li>نفس أسعار مستودعات الشورجة وجميلة مباشرة لباب البيت.</li>
              <li>استبدال فوري مجاني خلال 24 ساعة لأي مادة غير مطابقة للمواصفات.</li>
              <li>ميزان إلكتروني دقيق مع كل طلبية خضار ومسواك.</li>
            </ul>
          </div>

          {/* Customer Service Support */}
          <div className="bg-white rounded-2xl p-4 border border-[#EFE6D5] shadow-xs">
            <span className="text-xs font-bold text-[#54331E] block mb-2">
              خدمة زبائن ومستودعات روافد - بغداد:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:07801234567"
                className="flex items-center justify-center gap-1.5 bg-[#FAF7F2] hover:bg-[#EFE6D5] p-2.5 rounded-xl border border-[#EFE6D5] text-[#54331E] font-bold"
              >
                <PhoneCall className="w-4 h-4 text-[#5A7032]" />
                <span>أثير / زين</span>
              </a>
              <a
                href="tel:07701234567"
                className="flex items-center justify-center gap-1.5 bg-[#FAF7F2] hover:bg-[#EFE6D5] p-2.5 rounded-xl border border-[#EFE6D5] text-[#54331E] font-bold"
              >
                <PhoneCall className="w-4 h-4 text-[#E05A19]" />
                <span>آسيا سيل</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
