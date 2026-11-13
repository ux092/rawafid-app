import React from 'react';

// Brand Golden Wheat & Cart Logo Icon
export const GoldenWheatCartIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cart Base with Golden Wheat Sheaves */}
    <circle cx="23" cy="54" r="5" fill="#E6A817" />
    <circle cx="45" cy="54" r="5" fill="#E6A817" />
    <path
      d="M10 14h8l6 26h24l5-20H18"
      stroke="#FFD54F"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 22h27M26 30h22"
      stroke="#FFD54F"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeOpacity="0.8"
    />
    {/* Golden Wheat Sheaves emerging from the cart */}
    <path
      d="M32 32C32 20 28 10 24 6C24 6 29 11 31 20"
      stroke="#FFE082"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M36 32C36 18 40 8 46 4C46 4 41 10 38 20"
      stroke="#FFE082"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M34 32V8"
      stroke="#FFD54F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Wheat Grains */}
    <ellipse cx="34" cy="9" rx="2.5" ry="4" fill="#FFC107" transform="rotate(-15 34 9)" />
    <ellipse cx="30" cy="14" rx="2.5" ry="4" fill="#FFE082" transform="rotate(-35 30 14)" />
    <ellipse cx="38" cy="14" rx="2.5" ry="4" fill="#FFE082" transform="rotate(35 38 14)" />
    <ellipse cx="31" cy="20" rx="2.5" ry="4" fill="#FFD54F" transform="rotate(-40 31 20)" />
    <ellipse cx="37" cy="20" rx="2.5" ry="4" fill="#FFD54F" transform="rotate(40 37 20)" />
  </svg>
);

// Subtle Islamic Geometric Arabesque Pattern
export const IslamicGeometricWatermark: React.FC<{ className?: string; opacity?: number }> = ({ 
  className = "w-full h-full", 
  opacity = 0.08 
}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <pattern id="islamic-arabesque" width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M30 0 L60 30 L30 60 L0 30 Z"
          fill="none"
          stroke="#FAF7F2"
          strokeWidth="1"
          strokeOpacity={opacity * 1.5}
        />
        <circle cx="30" cy="30" r="14" fill="none" stroke="#FAF7F2" strokeWidth="0.8" strokeOpacity={opacity} />
        <path
          d="M30 6 L36 24 L54 30 L36 36 L30 54 L24 36 L6 30 L24 24 Z"
          fill="none"
          stroke="#FAF7F2"
          strokeWidth="0.8"
          strokeOpacity={opacity * 1.2}
        />
        <circle cx="0" cy="0" r="6" fill="none" stroke="#FAF7F2" strokeWidth="0.8" strokeOpacity={opacity} />
        <circle cx="60" cy="0" r="6" fill="none" stroke="#FAF7F2" strokeWidth="0.8" strokeOpacity={opacity} />
        <circle cx="0" cy="60" r="6" fill="none" stroke="#FAF7F2" strokeWidth="0.8" strokeOpacity={opacity} />
        <circle cx="60" cy="60" r="6" fill="none" stroke="#FAF7F2" strokeWidth="0.8" strokeOpacity={opacity} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#islamic-arabesque)" />
  </svg>
);

// Baghdad Landmarks Detailed Line Art (نصب الشهيد، نصب التحرير، الجسر المعلق، نخيل بغداد)
export const BaghdadLandmarksArt: React.FC<{ className?: string }> = ({ className = "w-full h-24" }) => (
  <svg viewBox="0 0 400 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ground Baseline */}
    <line x1="10" y1="84" x2="390" y2="84" stroke="#54331E" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />

    {/* 1. Al-Shaheed Monument (نصب الشهيد - قبتين منفصلتين مع الشعلة والأعلام) */}
    <g transform="translate(45, 12)">
      {/* Left Dome Half */}
      <path
        d="M26 70 C24 45 14 30 2 24 C2 24 16 20 24 38 C28 47 28 70 28 70 Z"
        fill="#5A7032"
        fillOpacity="0.15"
        stroke="#5A7032"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Right Dome Half */}
      <path
        d="M38 70 C40 45 50 30 62 24 C62 24 48 20 40 38 C36 47 36 70 36 70 Z"
        fill="#5A7032"
        fillOpacity="0.15"
        stroke="#5A7032"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Central Flame / Flag Platform */}
      <line x1="32" y1="44" x2="32" y2="70" stroke="#E05A19" strokeWidth="1.5" />
      <circle cx="32" cy="40" r="2.5" fill="#E05A19" />
      {/* Circular Platform base */}
      <ellipse cx="32" cy="71" rx="34" ry="4" stroke="#54331E" strokeWidth="1.2" strokeOpacity="0.5" />
    </g>

    {/* 2. Palm Trees (نخيل بغداد العريقة) */}
    <g transform="translate(130, 24)">
      {/* Trunk */}
      <path d="M12 60 C13 46 15 32 16 18" stroke="#54331E" strokeWidth="2.5" strokeLinecap="round" />
      {/* Palm Fronds */}
      <path d="M16 18 C10 10 3 12 0 16" stroke="#5A7032" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 18 C14 8 18 2 22 2" stroke="#5A7032" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 18 C22 10 29 11 32 16" stroke="#5A7032" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 18 C24 18 30 24 31 30" stroke="#5A7032" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 18 C8 18 2 24 1 30" stroke="#5A7032" strokeWidth="1.6" strokeLinecap="round" />
      {/* Dates clusters */}
      <circle cx="14" cy="22" r="2" fill="#E05A19" />
      <circle cx="18" cy="22" r="2" fill="#E05A19" />
    </g>

    {/* 3. Suspension Bridge / Al-Jadriya Bridge (الجسر المعلق) */}
    <g transform="translate(180, 16)">
      {/* Main Pylon Towers */}
      <path d="M40 68 L40 10 M52 68 L52 10" stroke="#54331E" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="20" x2="54" y2="20" stroke="#54331E" strokeWidth="1.5" />
      <line x1="36" y1="38" x2="56" y2="38" stroke="#54331E" strokeWidth="1.5" />
      <line x1="38" y1="10" x2="54" y2="10" stroke="#54331E" strokeWidth="2" />
      
      {/* Suspension Cables */}
      <path d="M4 68 Q24 45 40 12" stroke="#5A7032" strokeWidth="1.2" strokeOpacity="0.8" />
      <path d="M14 68 Q28 50 40 12" stroke="#5A7032" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M26 68 Q34 54 40 12" stroke="#5A7032" strokeWidth="1" strokeOpacity="0.5" />
      
      <path d="M88 68 Q68 45 52 12" stroke="#5A7032" strokeWidth="1.2" strokeOpacity="0.8" />
      <path d="M78 68 Q64 50 52 12" stroke="#5A7032" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M66 68 Q58 54 52 12" stroke="#5A7032" strokeWidth="1" strokeOpacity="0.5" />
    </g>

    {/* 4. Liberation Monument (نصب التحرير - جواد سليم في ساحة التحرير) */}
    <g transform="translate(290, 20)">
      {/* Travertine Marble Wall */}
      <rect x="0" y="30" width="85" height="34" rx="2" fill="#FAF7F2" stroke="#54331E" strokeWidth="1.5" />
      {/* Frieze relief figures (Abstract Bronze Sculptures of Jawad Saleem) */}
      <path
        d="M8 46 Q14 38 20 46 T32 46 T44 42 T56 46 T68 40 T78 46"
        stroke="#54331E"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="42" r="2.5" fill="#54331E" />
      <circle cx="44" cy="38" r="3" fill="#E05A19" />
      <circle cx="68" cy="36" r="2.5" fill="#54331E" />
      {/* Support pillars */}
      <line x1="12" y1="64" x2="12" y2="70" stroke="#54331E" strokeWidth="3" />
      <line x1="72" y1="64" x2="72" y2="70" stroke="#54331E" strokeWidth="3" />
    </g>
  </svg>
);

// Baghdadi Pointed Arch SVG Frame (قوس بغدادي إسلامي مدبب)
export const BaghdadiArchFrame: React.FC<{
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}> = ({ children, isActive = false, className = "" }) => (
  <div className={`relative flex flex-col items-center justify-center transition-transform active:scale-95 ${className}`}>
    <div
      className={`relative w-[60px] h-[78px] flex flex-col items-center justify-center transition-all duration-200 overflow-hidden ${
        isActive
          ? 'bg-[#FAF7F2] ring-2 ring-[#E05A19] shadow-md'
          : 'bg-[#FAF7F2] hover:bg-[#FFFDF9] shadow-sm'
      }`}
      style={{
        borderRadius: '30px 30px 14px 14px',
        border: '1.5px solid #EFE6D5'
      }}
    >
      {/* Pointed top accent peak */}
      <div className="absolute top-1 w-2 h-2 rotate-45 border-t border-r border-[#EFE6D5]/60" />
      
      {/* Content inside arch */}
      <div className="relative z-10 flex flex-col items-center justify-center p-1">
        {children}
      </div>

      {/* Subtle interior gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/50 via-transparent to-[#EFE6D5]/40 pointer-events-none" />
    </div>
  </div>
);

// High Quality Vector Product Graphic Renderers
export const ProductImageSvg: React.FC<{ type: string; className?: string }> = ({ type, className = "w-full h-full" }) => {
  switch (type) {
    case 'tuna':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Tuna Tin Can */}
          <rect width="100" height="100" rx="16" fill="#F4EDE2" />
          <ellipse cx="50" cy="74" rx="34" ry="14" fill="#C9B89A" />
          <path d="M16 46v28c0 8 15 14 34 14s34-6 34-14V46Z" fill="#E2D4BC" />
          <ellipse cx="50" cy="46" rx="34" ry="14" fill="#FBF8F3" stroke="#A89474" strokeWidth="2" />
          {/* Tuna Label */}
          <path d="M16 52v16c0 6 15 11 34 11s34-5 34-11V52Z" fill="#5A7032" fillOpacity="0.85" />
          {/* Fish & Olive icon */}
          <path
            d="M38 60c8-6 16-6 24 0c-8 6-16 6-24 0"
            stroke="#FAF7F2"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polygon points="62,60 69,56 69,64" fill="#FAF7F2" />
          {/* Pull Ring */}
          <ellipse cx="50" cy="45" rx="8" ry="4" stroke="#8C7A5B" strokeWidth="2" fill="none" />
          <circle cx="50" cy="45" r="2" fill="#E05A19" />
          {/* Fresh Herbs */}
          <path d="M68 30c-2 6-8 8-12 6c4-1 6-5 6-8c2 2 4 2 6 2Z" fill="#5A7032" />
        </svg>
      );

    case 'oil':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Sunflower Oil Bottle */}
          <rect width="100" height="100" rx="16" fill="#FBF5E8" />
          {/* Bottle Body */}
          <path
            d="M40 28h20l6 14v40c0 6-6 10-16 10s-16-4-16-10V42l6-14Z"
            fill="#FEE685"
            stroke="#E5B83B"
            strokeWidth="2"
          />
          {/* Cap */}
          <rect x="42" y="16" width="16" height="12" rx="3" fill="#E05A19" />
          <rect x="40" y="26" width="20" height="3" fill="#C24910" />
          {/* Golden Oil Level */}
          <path
            d="M35 50h30v32c0 5-5 8-15 8s-15-3-15-8V50Z"
            fill="#FBBF24"
            fillOpacity="0.75"
          />
          {/* Sunflower Motif */}
          <circle cx="50" cy="62" r="5" fill="#54331E" />
          <circle cx="50" cy="54" r="2.5" fill="#E05A19" />
          <circle cx="50" cy="70" r="2.5" fill="#E05A19" />
          <circle cx="42" cy="62" r="2.5" fill="#E05A19" />
          <circle cx="58" cy="62" r="2.5" fill="#E05A19" />
          <circle cx="44" cy="56" r="2" fill="#E05A19" />
          <circle cx="56" cy="56" r="2" fill="#E05A19" />
          <circle cx="44" cy="68" r="2" fill="#E05A19" />
          <circle cx="56" cy="68" r="2" fill="#E05A19" />
          {/* Bottle Highlights */}
          <line x1="38" y1="44" x2="38" y2="78" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
        </svg>
      );

    case 'rice':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Burlap Rice Sack (خيش عنبر فاخر) */}
          <rect width="100" height="100" rx="16" fill="#F4EFE6" />
          {/* Sack Shape */}
          <path
            d="M26 36c4-12 44-12 48 0c4 18 6 36 2 48c-3 8-14 8-26 8s-23 0-26-8c-4-12-2-30 2-48Z"
            fill="#D4B996"
            stroke="#8C6E4E"
            strokeWidth="2.2"
          />
          {/* Tied top neck */}
          <path d="M34 34c4-3 28-3 32 0" stroke="#54331E" strokeWidth="4" strokeLinecap="round" />
          <path d="M42 34l-8-12M58 34l8-12" stroke="#8C6E4E" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sack Stamp Badge (العنبر) */}
          <rect x="34" y="48" width="32" height="24" rx="4" fill="#54331E" fillOpacity="0.85" />
          <ellipse cx="50" cy="55" rx="10" ry="3.5" fill="#FAF7F2" />
          <circle cx="50" cy="63" r="2" fill="#E05A19" />
          {/* Rice Grains spilled */}
          <ellipse cx="48" cy="84" rx="3.5" ry="1.5" fill="#FFFFFF" stroke="#8C6E4E" strokeWidth="0.8" transform="rotate(25 48 84)" />
          <ellipse cx="54" cy="85" rx="3.5" ry="1.5" fill="#FFFFFF" stroke="#8C6E4E" strokeWidth="0.8" transform="rotate(-15 54 85)" />
          <ellipse cx="42" cy="86" rx="3.5" ry="1.5" fill="#FFFFFF" stroke="#8C6E4E" strokeWidth="0.8" transform="rotate(10 42 86)" />
        </svg>
      );

    case 'tea':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#F2EBE0" />
          {/* Tea Box */}
          <rect x="25" y="24" width="50" height="58" rx="6" fill="#1C3829" stroke="#E5C158" strokeWidth="2" />
          <rect x="30" y="30" width="40" height="46" rx="3" fill="#2E5640" />
          {/* Golden Swan / Al-Wazza Emblem */}
          <path
            d="M50 42 C44 42 42 46 44 50 C46 54 54 54 54 58 C54 62 48 64 44 64"
            stroke="#FFD54F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="51" cy="40" r="2" fill="#FFD54F" />
          {/* Tea leaves */}
          <path d="M40 70c4-4 12-4 16 0" stroke="#FFD54F" strokeWidth="1.5" />
        </svg>
      );

    case 'tomato':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#FCECE8" />
          {/* Tomato Can */}
          <rect x="28" y="28" width="44" height="52" rx="8" fill="#C22718" stroke="#8C140A" strokeWidth="2" />
          <ellipse cx="50" cy="28" rx="22" ry="7" fill="#E84838" stroke="#8C140A" strokeWidth="1.5" />
          {/* Label */}
          <rect x="28" y="42" width="44" height="24" fill="#FAF7F2" />
          <circle cx="50" cy="54" r="7" fill="#C22718" />
          <path d="M50 47v-3M48 45l4-2" stroke="#5A7032" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'detergent':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#E8F4FC" />
          {/* Tide Bag */}
          <path
            d="M30 32h40l6 48c0 4-4 8-10 8H34c-6 0-10-4-10-8l6-48Z"
            fill="#E05A19"
            stroke="#B53E08"
            strokeWidth="2"
          />
          {/* Handle */}
          <rect x="42" y="20" width="16" height="14" rx="4" stroke="#E05A19" strokeWidth="3" fill="none" />
          {/* Bullseye rings */}
          <circle cx="50" cy="58" r="14" fill="#FFC107" />
          <circle cx="50" cy="58" r="9" fill="#1976D2" />
          <circle cx="50" cy="58" r="4" fill="#FFFFFF" />
        </svg>
      );

    case 'dates':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#F8EFE4" />
          <rect x="20" y="32" width="60" height="44" rx="6" fill="#54331E" stroke="#8C5C38" strokeWidth="2" />
          <rect x="25" y="37" width="50" height="34" rx="3" fill="#754728" />
          {/* Dates fruits */}
          <ellipse cx="40" cy="54" rx="6" ry="10" fill="#3D2010" transform="rotate(30 40 54)" />
          <ellipse cx="52" cy="52" rx="6" ry="10" fill="#3D2010" transform="rotate(-15 52 52)" />
          <ellipse cx="62" cy="56" rx="6" ry="10" fill="#3D2010" transform="rotate(20 62 56)" />
        </svg>
      );

    case 'veg_box':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#EFF7E6" />
          {/* Wooden Crate */}
          <rect x="20" y="44" width="60" height="36" rx="4" fill="#C29D6E" stroke="#8A6439" strokeWidth="2" />
          <line x1="20" y1="56" x2="80" y2="56" stroke="#8A6439" strokeWidth="1.5" />
          <line x1="20" y1="68" x2="80" y2="68" stroke="#8A6439" strokeWidth="1.5" />
          {/* Veggies popping out */}
          <circle cx="36" cy="40" r="9" fill="#C22718" /> {/* Tomato */}
          <path d="M48 26c3 0 10 16 10 18s-4 4-8 4s-8-2-8-4s3-18 6-18Z" fill="#E05A19" /> {/* Carrot */}
          <ellipse cx="64" cy="38" rx="8" ry="10" fill="#5A7032" /> {/* Cucumber/Pepper */}
        </svg>
      );

    case 'sugar':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#F4F8FA" />
          <path d="M28 34h44l4 46c0 4-4 8-10 8H34c-6 0-10-4-10-8l4-46Z" fill="#FFFFFF" stroke="#90A4AE" strokeWidth="2" />
          <rect x="36" y="50" width="28" height="20" rx="4" fill="#0288D1" fillOpacity="0.8" />
          <circle cx="50" cy="60" r="4" fill="#FFFFFF" />
        </svg>
      );

    case 'soap':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#F0F4E8" />
          <rect x="26" y="32" width="48" height="42" rx="8" fill="#7A8F4A" stroke="#52632C" strokeWidth="2" />
          <rect x="34" y="40" width="32" height="26" rx="4" fill="#8DA656" />
          {/* Laurel stamp */}
          <circle cx="50" cy="53" r="7" stroke="#465425" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
          <path d="M47 53c2-3 4-3 6 0" stroke="#465425" strokeWidth="1.5" />
        </svg>
      );

    case 'juice':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="16" fill="#FFF2E0" />
          <rect x="34" y="24" width="32" height="58" rx="8" fill="#FF9800" stroke="#E65100" strokeWidth="2" />
          <ellipse cx="50" cy="24" rx="16" ry="5" fill="#FFE082" />
          <circle cx="50" cy="50" r="8" fill="#F57C00" />
          <path d="M46 50c2-4 6-4 8 0" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center bg-[#EFE6D5] rounded-xl text-[#54331E] ${className}`}>
          <span className="text-xl">🛒</span>
        </div>
      );
  }
};

// Hero Wholesale Basket Graphic
export const WholesaleHeroBasketSvg: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Woven Wholesale Basket */}
    <path
      d="M24 65 L36 122 C37 127 42 130 47 130 L113 130 C118 130 123 127 124 122 L136 65 Z"
      fill="#D1A76E"
      stroke="#8C6538"
      strokeWidth="3"
    />
    {/* Basket weave pattern */}
    <line x1="30" y1="82" x2="130" y2="82" stroke="#8C6538" strokeWidth="2" strokeDasharray="5 3" />
    <line x1="34" y1="98" x2="126" y2="98" stroke="#8C6538" strokeWidth="2" strokeDasharray="5 3" />
    <line x1="38" y1="114" x2="122" y2="114" stroke="#8C6538" strokeWidth="2" strokeDasharray="5 3" />
    <path d="M50 66 L55 128 M80 66 L80 128 M110 66 L105 128" stroke="#8C6538" strokeWidth="2" strokeOpacity="0.6" />

    {/* Big Groceries in Basket */}
    {/* Oil bottle */}
    <rect x="94" y="24" width="22" height="48" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
    <rect x="98" y="16" width="14" height="10" rx="2" fill="#E05A19" />
    {/* Rice sack */}
    <rect x="42" y="32" width="34" height="42" rx="6" fill="#FAF7F2" stroke="#54331E" strokeWidth="2" />
    <ellipse cx="59" cy="50" rx="8" ry="3" fill="#54331E" />
    {/* Canned tuna */}
    <rect x="74" y="44" width="28" height="24" rx="4" fill="#5A7032" stroke="#3D4E20" strokeWidth="2" />
    <circle cx="88" cy="56" r="4" fill="#FAF7F2" />
    {/* Fresh red tomato */}
    <circle cx="36" cy="62" r="14" fill="#DC2626" />
    <path d="M36 50v-4M33 48l6-3" stroke="#5A7032" strokeWidth="2" strokeLinecap="round" />
    {/* Bread Baguette */}
    <path
      d="M120 18 C126 12 134 16 138 24 L118 70 L108 64 Z"
      fill="#D97706"
      stroke="#92400E"
      strokeWidth="2"
    />
    {/* Fresh green leaves */}
    <path d="M30 46 C24 38 32 30 40 34 C36 44 32 46 30 46 Z" fill="#65A30D" />
    <path d="M22 54 C16 48 24 40 32 44" fill="#4D7C0F" />
  </svg>
);
