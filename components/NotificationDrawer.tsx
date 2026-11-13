'use client';

import React from 'react';
import { X, Bell, Sparkles, Truck, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationDrawerOpen, setIsNotificationDrawerOpen, setIsOrdersDrawerOpen } = useCartStore();

  if (!isNotificationDrawerOpen) return null;

  const notifications = [
    {
      id: 1,
      icon: <Truck className="w-4 h-4 text-[#5A7032]" />,
      title: 'طلبك مع الكابتن في الطريق!',
      desc: 'الكابتن علي متوجه إلى الكرادة لتسليم مسواك الجملة (الطلب RWF-10492).',
      time: 'منذ 15 دقيقة',
      isNew: true,
      action: () => {
        setIsNotificationDrawerOpen(false);
        setIsOrdersDrawerOpen(true);
      }
    },
    {
      id: 2,
      icon: <Sparkles className="w-4 h-4 text-[#E05A19]" />,
      title: 'وصلت شروة تمن عنبر معتق!',
      desc: 'أكياس خيش 5 كغم عنبر أصلي من مزارع المشخاب متوفرة الآن بسعر الجملة.',
      time: 'اليوم، 10:30 ص',
      isNew: true
    },
    {
      id: 3,
      icon: <Tag className="w-4 h-4 text-[#D97706]" />,
      title: 'تخفيضات كراتين الزيت والمعلبات',
      desc: 'وفر 20% عند شراء كرتون كامل من زيت دوار الشمس وتونة ريو ماري.',
      time: 'أمس',
      isNew: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsNotificationDrawerOpen(false)} 
      />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="bg-[#5A7032] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-base font-extrabold text-white">
                تنبيهات وإشعارات روافد
              </h2>
              <span className="text-[11px] text-[#FAF7F2]/80">
                أحدث عروض الجملة ومتابعة طلباتك
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            aria-label="إغلاق التنبيهات"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={notif.action}
              className={`p-3 rounded-2xl border transition-all ${
                notif.isNew
                  ? 'bg-white border-[#5A7032]/30 shadow-xs'
                  : 'bg-white/70 border-[#EFE6D5]'
              } ${notif.action ? 'cursor-pointer hover:border-[#5A7032]' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] flex items-center justify-center shrink-0 border border-[#EFE6D5]">
                  {notif.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-[#54331E]">{notif.title}</h4>
                    <span className="text-[9px] text-gray-400">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-normal">
                    {notif.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
