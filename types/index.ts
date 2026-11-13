export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  price: number; // in IQD (د.ع)
  originalPrice?: number;
  discountBadge?: string; // e.g. "-15%"
  unit: string; // e.g. "علبة 185 غم", "1.8 لتر", "كيس 5 كغم"
  wholesaleTier?: {
    minQty: number;
    price: number;
    label: string;
  };
  image: string;
  isSpecialOffer?: boolean;
  stock: number;
  rating: number;
  origin: string;
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: 'single' | 'carton';
}

export interface CategoryArch {
  id: string;
  name: string;
  iconType: 'vegetables' | 'canned' | 'drinks' | 'cleaning' | 'staples' | 'more';
  itemCount: number;
}

export interface BaghdadNeighborhood {
  id: string;
  name: string;
  area: string; // 'رصافة' | 'كرخ'
  deliveryMinutes: number;
  deliveryFee: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'processing' | 'on_the_way' | 'delivered';
  statusLabel: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: string;
  neighborhood: string;
  paymentMethod: 'cash_on_delivery' | 'zain_cash' | 'qi_card';
  captainName?: string;
  captainPhone?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  primaryLocation: string;
  savedAddresses: { id: string; label: string; address: string; neighborhood: string }[];
  walletBalance: number;
  wholesaleSavings: number;
  memberTier: string;
}
