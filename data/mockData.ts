import { Product, CategoryArch, BaghdadNeighborhood, Order, UserProfile } from '../types';

export const BAGHDAD_NEIGHBORHOODS: BaghdadNeighborhood[] = [
  { id: 'karrada', name: 'الكرادة', area: 'رصافة', deliveryMinutes: 25, deliveryFee: 2000 },
  { id: 'jadriya', name: 'الجادرية', area: 'رصافة', deliveryMinutes: 20, deliveryFee: 2000 },
  { id: 'mansour', name: 'المنصور', area: 'كرخ', deliveryMinutes: 30, deliveryFee: 2500 },
  { id: 'zayouna', name: 'زيونة', area: 'رصافة', deliveryMinutes: 30, deliveryFee: 2000 },
  { id: 'yarmouk', name: 'اليرموك', area: 'كرخ', deliveryMinutes: 35, deliveryFee: 2500 },
  { id: 'adhamiya', name: 'الأعظمية', area: 'رصافة', deliveryMinutes: 35, deliveryFee: 2500 },
  { id: 'palestine_st', name: 'شارع فلسطين', area: 'رصافة', deliveryMinutes: 30, deliveryFee: 2000 },
  { id: 'kadhimiya', name: 'الكاظمية', area: 'كرخ', deliveryMinutes: 40, deliveryFee: 3000 },
  { id: 'hartha', name: 'الحارثية', area: 'كرخ', deliveryMinutes: 28, deliveryFee: 2500 },
  { id: 'dora', name: 'الدورة', area: 'كرخ', deliveryMinutes: 35, deliveryFee: 2500 },
];

export const CATEGORY_ARCHES: CategoryArch[] = [
  { id: 'vegetables', name: 'خضار وفواكه', iconType: 'vegetables', itemCount: 142 },
  { id: 'canned', name: 'معلبات', iconType: 'canned', itemCount: 88 },
  { id: 'drinks', name: 'مشروبات', iconType: 'drinks', itemCount: 65 },
  { id: 'cleaning', name: 'منظفات', iconType: 'cleaning', itemCount: 94 },
  { id: 'staples', name: 'مواد أساسية', iconType: 'staples', itemCount: 180 },
  { id: 'more', name: 'المزيد', iconType: 'more', itemCount: 320 },
];

export const SPECIAL_OFFERS: Product[] = [
  {
    id: 'prod-tuna',
    name: 'تونة فيلية',
    subtitle: 'لحم تونة أبيض فاخر بزيت الزيتون',
    category: 'معلبات',
    price: 2500,
    originalPrice: 2950,
    discountBadge: '-15%',
    unit: 'علبة 185 غم',
    wholesaleTier: {
      minQty: 12,
      price: 2200,
      label: 'كرتون 24 علبة بسعر 2,200 د.ع للقطعة'
    },
    image: 'tuna',
    isSpecialOffer: true,
    stock: 450,
    rating: 4.8,
    origin: 'تايلاند',
    brand: 'ريو ماري'
  },
  {
    id: 'prod-oil',
    name: 'زيت دوار الشمس',
    subtitle: 'نقي 100% وخفيف للطبخ والقلي',
    category: 'مواد أساسية',
    price: 6000,
    originalPrice: 7500,
    discountBadge: '-20%',
    unit: 'قنينة 1.8 لتر',
    wholesaleTier: {
      minQty: 6,
      price: 5400,
      label: 'كرتون 6 قناني بسعر 5,400 د.ع للقنينة'
    },
    image: 'oil',
    isSpecialOffer: true,
    stock: 280,
    rating: 4.9,
    origin: 'تركيا',
    brand: 'عافية'
  },
  {
    id: 'prod-rice',
    name: 'رز بسمتي عنبر فاخر',
    subtitle: 'عنبر عراقي معتق حبّة طويلة رائحة زكية',
    category: 'مواد أساسية',
    price: 18000,
    originalPrice: 22000,
    discountBadge: '-18%',
    unit: 'كيس 5 كغم خيش',
    wholesaleTier: {
      minQty: 4,
      price: 16500,
      label: 'شروة 4 أكياس بسعر 16,500 د.ع للكيس'
    },
    image: 'rice',
    isSpecialOffer: true,
    stock: 120,
    rating: 5.0,
    origin: 'العراق - المشخاب',
    brand: 'عنبر الفرات'
  },
  {
    id: 'prod-tea',
    name: 'شاي وزة سيلاني أسود',
    subtitle: 'طعم أصيل كلاسيكي ونكهة قوية مخدرة',
    category: 'مشروبات',
    price: 12500,
    originalPrice: 14000,
    discountBadge: '-11%',
    unit: 'علبة كرتون 400 غم',
    wholesaleTier: {
      minQty: 6,
      price: 11200,
      label: 'كرتون جملة 12 علبة'
    },
    image: 'tea',
    isSpecialOffer: true,
    stock: 310,
    rating: 4.9,
    origin: 'سريلانكا',
    brand: 'الوزة'
  },
  {
    id: 'prod-tomato-paste',
    name: 'معجون طماطم ألتونسا',
    subtitle: 'كثيف ومركز بدون مواد حافظة مضافة',
    category: 'معلبات',
    price: 1750,
    originalPrice: 2000,
    discountBadge: '-12%',
    unit: 'قوطية 830 غم',
    wholesaleTier: {
      minQty: 12,
      price: 1500,
      label: 'كرتون 12 قوطية'
    },
    image: 'tomato',
    isSpecialOffer: true,
    stock: 520,
    rating: 4.7,
    origin: 'تركيا',
    brand: 'Altunsa'
  },
  {
    id: 'prod-tide',
    name: 'مسحوق غسيل تايد الأصلي',
    subtitle: 'نظافة فائقة للغسالات الأوتوماتيك والعادية',
    category: 'منظفات',
    price: 9000,
    originalPrice: 11500,
    discountBadge: '-22%',
    unit: 'كيس اقتصادي 3 كغم',
    wholesaleTier: {
      minQty: 4,
      price: 8000,
      label: 'كرتون 4 أكياس بسعر الجملة'
    },
    image: 'detergent',
    isSpecialOffer: true,
    stock: 190,
    rating: 4.8,
    origin: 'السعودية',
    brand: 'Tide'
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...SPECIAL_OFFERS,
  {
    id: 'prod-dates',
    name: 'تمر خستاوي وبصراوي معبأ',
    subtitle: 'تمر عراقي ممتاز مغلف بعناية فائقة',
    category: 'خضار وفواكه',
    price: 3500,
    originalPrice: 4000,
    discountBadge: '-12%',
    unit: 'علبة كرتون 1 كغم',
    image: 'dates',
    stock: 200,
    rating: 4.9,
    origin: 'العراق - البصرة'
  },
  {
    id: 'prod-veg-box',
    name: 'صندوق مسواك خضار بغدادي مشكل',
    subtitle: 'طماطم، خيار، بطاطا، بصل، باذنجان طازج يومياً',
    category: 'خضار وفواكه',
    price: 11000,
    originalPrice: 13500,
    discountBadge: '-18%',
    unit: 'صندوق خشبي 7 كغم',
    image: 'veg_box',
    stock: 85,
    rating: 5.0,
    origin: 'العراق - مزارع الكوت وبغداد'
  },
  {
    id: 'prod-sugar',
    name: 'سكر نقي أبيض حبيبات',
    subtitle: 'سكر حلويات وشاي درجة أولى فائق البياض',
    category: 'مواد أساسية',
    price: 5500,
    originalPrice: 6500,
    discountBadge: '-15%',
    unit: 'كيس 5 كغم',
    image: 'sugar',
    stock: 340,
    rating: 4.7,
    origin: 'العراق - سكر الاتحاد'
  },
  {
    id: 'prod-soap',
    name: 'صابون رقي غار حلبي طبيعي',
    subtitle: 'مصنوع بزيت الزيتون والغار الأصلي للشعر والجسم',
    category: 'منظفات',
    price: 3500,
    originalPrice: 4500,
    discountBadge: '-22%',
    unit: 'باكيت 4 قطع',
    image: 'soap',
    stock: 160,
    rating: 4.9,
    origin: 'حلب'
  },
  {
    id: 'prod-juice',
    name: 'عصير راني حبيبات خوخ وبرتقال',
    subtitle: 'عصير منعش مع قطع الفاكهة الطبيعية',
    category: 'مشروبات',
    price: 750,
    originalPrice: 1000,
    discountBadge: '-25%',
    unit: 'قوطية 240 مل',
    wholesaleTier: {
      minQty: 24,
      price: 600,
      label: 'كرتون 24 قوطية بسعر 600 د.ع للقطعة'
    },
    image: 'juice',
    stock: 600,
    rating: 4.8,
    origin: 'السعودية',
    brand: 'راني'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10492',
    orderNumber: 'RWF-10492',
    createdAt: 'اليوم، 12:15 م',
    status: 'on_the_way',
    statusLabel: 'مع الكابتن في الطريق',
    captainName: 'علي البغدادي (دراجة نارية)',
    captainPhone: '07701234567',
    items: [
      { productId: 'prod-tuna', productName: 'تونة فيلية', price: 2500, quantity: 2, image: 'tuna' },
      { productId: 'prod-oil', productName: 'زيت دوار الشمس', price: 6000, quantity: 1, image: 'oil' },
      { productId: 'prod-rice', productName: 'رز بسمتي عنبر فاخر', price: 18000, quantity: 1, image: 'rice' }
    ],
    subtotal: 29000,
    deliveryFee: 2000,
    total: 31000,
    deliveryAddress: 'شارع 62، قرب ساحة كهرمانة، الكرادة، بغداد',
    neighborhood: 'الكرادة',
    paymentMethod: 'cash_on_delivery'
  },
  {
    id: 'ord-10381',
    orderNumber: 'RWF-10381',
    createdAt: 'أمس، 05:40 م',
    status: 'delivered',
    statusLabel: 'تم التوصيل بنجاح',
    items: [
      { productId: 'prod-tea', productName: 'شاي وزة سيلاني أسود', price: 12500, quantity: 1, image: 'tea' },
      { productId: 'prod-tide', productName: 'مسحوق غسيل تايد الأصلي', price: 9000, quantity: 1, image: 'detergent' }
    ],
    subtotal: 21500,
    deliveryFee: 2000,
    total: 23500,
    deliveryAddress: 'مقابل مطعم صمد، المنصور، بغداد',
    neighborhood: 'المنصور',
    paymentMethod: 'zain_cash'
  }
];

export const MOCK_USER_PROFILE: UserProfile = {
  name: 'أبو فهد البغدادي',
  phone: '0780 123 4567',
  primaryLocation: 'بغداد، الكرادة',
  savedAddresses: [
    { id: 'addr-1', label: 'البيت', address: 'شارع 62، فرع 14، قرب ساحة كهرمانة', neighborhood: 'الكرادة' },
    { id: 'addr-2', label: 'المحل / المكتب', address: 'شارع الأميرات، مجمع النخيل التجاري', neighborhood: 'المنصور' }
  ],
  walletBalance: 15000, // IQD
  wholesaleSavings: 48500, // Total saved compared to retail
  memberTier: 'عضوية الجملة الذهبية'
};
