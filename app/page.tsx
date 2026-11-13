'use client';

import React from 'react';
import { Header } from '../components/Header';
import { HeroCard } from '../components/HeroCard';
import { SearchBar } from '../components/SearchBar';
import { BaghdadiArches } from '../components/BaghdadiArches';
import { BaghdadPromoSlider } from '../components/BaghdadPromoSlider';
import { SpecialOffersGrid } from '../components/SpecialOffersGrid';
import { BottomNav } from '../components/BottomNav';
import { CartDrawer } from '../components/CartDrawer';
import { CategoriesModal } from '../components/CategoriesModal';
import { OrdersModal } from '../components/OrdersModal';
import { ProfileModal } from '../components/ProfileModal';
import { LocationSelectorModal } from '../components/LocationSelectorModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { ToastNotification } from '../components/ToastNotification';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#54331E] pb-28 relative flex flex-col">
      {/* 1 & 2: Curved Olive Header with Brand Logo, Location Badge, Notification Bell */}
      <Header />

      {/* 3: Hero Banner Card */}
      <HeroCard />

      {/* 4: Pill-shaped Search Bar */}
      <SearchBar />

      {/* 5 & 6: Baghdadi Architectural Arches Categories Strip */}
      <BaghdadiArches />

      {/* 7 & 8: Baghdad Landmarks Promo Slider */}
      <BaghdadPromoSlider />

      {/* 9, 10 & 11: Special Offers Grid (3-column, Tuna, Oil, Basmati Rice, etc.) */}
      <SpecialOffersGrid />

      {/* 12: Fixed Olive Green Bottom Navigation Bar with Raised Orange Cart Button */}
      <BottomNav />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <CategoriesModal />
      <OrdersModal />
      <ProfileModal />
      <LocationSelectorModal />
      <ProductDetailModal />
      <NotificationDrawer />
      <ToastNotification />
    </main>
  );
}
