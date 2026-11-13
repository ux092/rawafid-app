import { create } from 'zustand';
import { Product, CartItem, Order, BaghdadNeighborhood, UserProfile } from '../types';
import { SPECIAL_OFFERS, BAGHDAD_NEIGHBORHOODS, INITIAL_ORDERS, MOCK_USER_PROFILE } from '../data/mockData';

interface CartState {
  items: CartItem[];
  orders: Order[];
  userProfile: UserProfile;
  selectedNeighborhood: BaghdadNeighborhood;
  searchQuery: string;
  selectedCategory: string | null;
  activeTab: 'home' | 'categories' | 'cart' | 'orders' | 'profile';
  
  // Modals & Drawers
  isCartDrawerOpen: boolean;
  isCategoriesDrawerOpen: boolean;
  isOrdersDrawerOpen: boolean;
  isProfileDrawerOpen: boolean;
  isLocationModalOpen: boolean;
  isNotificationDrawerOpen: boolean;
  selectedProductDetail: Product | null;
  lastAddedToast: { product: Product; show: boolean } | null;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  setNeighborhood: (neighborhood: BaghdadNeighborhood) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setActiveTab: (tab: 'home' | 'categories' | 'cart' | 'orders' | 'profile') => void;
  
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsCategoriesDrawerOpen: (open: boolean) => void;
  setIsOrdersDrawerOpen: (open: boolean) => void;
  setIsProfileDrawerOpen: (open: boolean) => void;
  setIsLocationModalOpen: (open: boolean) => void;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  setSelectedProductDetail: (product: Product | null) => void;
  hideToast: () => void;

  checkoutOrder: (deliveryAddress: string, paymentMethod: 'cash_on_delivery' | 'zain_cash' | 'qi_card') => Order;
  
  // Computations
  getTotalCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotalPrice: () => number;
  getTotalSavings: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  // Initialize with the 2 items to match the user prompt ("a raised floating orange 'السلة' button with red badge '2'")
  items: [
    { product: SPECIAL_OFFERS[0], quantity: 1 }, // تونة فيلية
    { product: SPECIAL_OFFERS[1], quantity: 1 }, // زيت دوار الشمس
  ],
  orders: INITIAL_ORDERS,
  userProfile: MOCK_USER_PROFILE,
  selectedNeighborhood: BAGHDAD_NEIGHBORHOODS[0], // الكرادة
  searchQuery: '',
  selectedCategory: null,
  activeTab: 'home',

  isCartDrawerOpen: false,
  isCategoriesDrawerOpen: false,
  isOrdersDrawerOpen: false,
  isProfileDrawerOpen: false,
  isLocationModalOpen: false,
  isNotificationDrawerOpen: false,
  selectedProductDetail: null,
  lastAddedToast: null,

  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.product.id === product.id);
      let updatedItems: CartItem[];
      
      if (existingIndex > -1) {
        updatedItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...state.items, { product, quantity }];
      }

      return {
        items: updatedItems,
        lastAddedToast: { product, show: true }
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId)
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId)
        };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      };
    });
  },

  clearCart: () => set({ items: [] }),

  setNeighborhood: (neighborhood: BaghdadNeighborhood) => {
    set({ selectedNeighborhood: neighborhood, isLocationModalOpen: false });
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedCategory: (category: string | null) => set({ selectedCategory: category }),
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
    if (tab === 'cart') set({ isCartDrawerOpen: true });
    if (tab === 'categories') set({ isCategoriesDrawerOpen: true });
    if (tab === 'orders') set({ isOrdersDrawerOpen: true });
    if (tab === 'profile') set({ isProfileDrawerOpen: true });
  },

  setIsCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),
  setIsCategoriesDrawerOpen: (open) => set({ isCategoriesDrawerOpen: open }),
  setIsOrdersDrawerOpen: (open) => set({ isOrdersDrawerOpen: open }),
  setIsProfileDrawerOpen: (open) => set({ isProfileDrawerOpen: open }),
  setIsLocationModalOpen: (open) => set({ isLocationModalOpen: open }),
  setIsNotificationDrawerOpen: (open) => set({ isNotificationDrawerOpen: open }),
  setSelectedProductDetail: (product) => set({ selectedProductDetail: product }),
  hideToast: () => set({ lastAddedToast: null }),

  checkoutOrder: (deliveryAddress, paymentMethod) => {
    const state = get();
    const subtotal = state.getSubtotal();
    const deliveryFee = state.getDeliveryFee();
    const total = state.getTotalPrice();
    const orderNum = `RWF-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: 'الآن',
      status: 'processing',
      statusLabel: 'قيد التجهيز من مستودع الجملة',
      captainName: 'كابتن روافد (جاري التعيين)',
      captainPhone: '0770 000 0000',
      items: state.items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image
      })),
      subtotal,
      deliveryFee,
      total,
      deliveryAddress,
      neighborhood: state.selectedNeighborhood.name,
      paymentMethod
    };

    set((s) => ({
      orders: [newOrder, ...s.orders],
      items: [],
      isCartDrawerOpen: false,
      isOrdersDrawerOpen: true,
      activeTab: 'orders'
    }));

    return newOrder;
  },

  getTotalCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    // Free delivery in Baghdad if subtotal >= 50,000 IQD
    if (subtotal >= 50000) return 0;
    return get().selectedNeighborhood.deliveryFee;
  },

  getTotalPrice: () => {
    return get().getSubtotal() + get().getDeliveryFee();
  },

  getTotalSavings: () => {
    return get().items.reduce((sum, item) => {
      const orig = item.product.originalPrice || item.product.price;
      return sum + (orig - item.product.price) * item.quantity;
    }, 0);
  }
}));
