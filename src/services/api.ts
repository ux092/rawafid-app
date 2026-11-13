import { 
  Product, 
  CategoryArch, 
  BaghdadNeighborhood, 
  Order, 
  UserProfile 
} from '@/types';
import { 
  ALL_PRODUCTS, 
  SPECIAL_OFFERS, 
  CATEGORY_ARCHES, 
  BAGHDAD_NEIGHBORHOODS, 
  INITIAL_ORDERS, 
  MOCK_USER_PROFILE 
} from '@/data/mockData';

// Toggle between Mock Service Layer and Live Backend API / Supabase
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.rawafid.iq/v1';

export interface CreateOrderPayload {
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: string;
  neighborhood: string;
  paymentMethod: 'cash_on_delivery' | 'zain_cash' | 'qi_card';
  notes?: string;
}

class ApiService {
  private useMock: boolean;
  private baseUrl: string;

  constructor() {
    this.useMock = USE_MOCK;
    this.baseUrl = BASE_API_URL;
  }

  // Helper for network delay simulation in mock mode
  private async delay(ms = 120): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Helper for HTTP requests when live backend is enabled
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`API Error [${res.status}]: ${errorBody || res.statusText}`);
    }

    return res.json() as Promise<T>;
  }

  /**
   * Fetch all wholesale grocery products with optional category and search filters
   */
  async getProducts(category?: string, query?: string): Promise<Product[]> {
    if (this.useMock) {
      await this.delay();
      let result = [...ALL_PRODUCTS];
      if (category && category !== 'all') {
        result = result.filter((p) => p.category === category);
      }
      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
            p.category.toLowerCase().includes(q)
        );
      }
      return result;
    }

    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (query) params.append('q', query);
    return this.request<Product[]>(`/products?${params.toString()}`);
  }

  /**
   * Fetch special offers and discounts
   */
  async getSpecialOffers(): Promise<Product[]> {
    if (this.useMock) {
      await this.delay();
      return [...SPECIAL_OFFERS];
    }
    return this.request<Product[]>('/products/special-offers');
  }

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    if (this.useMock) {
      await this.delay();
      const prod = ALL_PRODUCTS.find((p) => p.id === id);
      return prod || null;
    }
    return this.request<Product>(`/products/${id}`);
  }

  /**
   * Fetch Baghdadi Arches categories
   */
  async getCategories(): Promise<CategoryArch[]> {
    if (this.useMock) {
      await this.delay();
      return [...CATEGORY_ARCHES];
    }
    return this.request<CategoryArch[]>('/categories');
  }

  /**
   * Fetch Baghdad neighborhoods with delivery fees and ETAs
   */
  async getNeighborhoods(): Promise<BaghdadNeighborhood[]> {
    if (this.useMock) {
      await this.delay();
      return [...BAGHDAD_NEIGHBORHOODS];
    }
    return this.request<BaghdadNeighborhood[]>('/neighborhoods');
  }

  /**
   * Fetch user orders
   */
  async getOrders(): Promise<Order[]> {
    if (this.useMock) {
      await this.delay();
      return [...INITIAL_ORDERS];
    }
    return this.request<Order[]>('/orders');
  }

  /**
   * Submit new order
   */
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    if (this.useMock) {
      await this.delay(200);
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `RWF-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: 'الآن',
        status: 'processing',
        statusLabel: 'قيد التجهيز من مستودع الجملة',
        captainName: 'كابتن روافد (جاري التعيين)',
        captainPhone: '0770 000 0000',
        items: payload.items,
        subtotal: payload.subtotal,
        deliveryFee: payload.deliveryFee,
        total: payload.total,
        deliveryAddress: payload.deliveryAddress,
        neighborhood: payload.neighborhood,
        paymentMethod: payload.paymentMethod
      };
      return newOrder;
    }

    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  /**
   * Fetch customer profile & wallet balance
   */
  async getUserProfile(): Promise<UserProfile> {
    if (this.useMock) {
      await this.delay();
      return { ...MOCK_USER_PROFILE };
    }
    return this.request<UserProfile>('/user/profile');
  }

  /**
   * Update customer profile
   */
  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    if (this.useMock) {
      await this.delay();
      return { ...MOCK_USER_PROFILE, ...profile };
    }
    return this.request<UserProfile>('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(profile)
    });
  }
}

export const apiService = new ApiService();
export default apiService;
