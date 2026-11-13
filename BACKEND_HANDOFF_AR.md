# وثيقة تسليم الواجهة الخلفية وقواعد البيانات (Backend Handoff)
## تطبيق «روافد» (Rawafid) - من الجملة.. إلى بيتك - بغداد

مرحباً بك يا شريكي في تطوير تطبيق روافد. تم تصميم هذه الوثيقة لمساعدتك على ربط الـ Backend وقواعد البيانات (PostgreSQL / Supabase / Express / NestJS) بالواجهة الأمامية بسلاسة وبدون أي تعارض، مع توفير كافة الـ Schemas وجداول الـ SQL ومسارات الـ API.

---

### 1. مفتاح التبديل بين الـ Mock والـ Live API

تم إنشاء طبقة وسيطة موحدة (Adapter) في المسار:
`src/services/api.ts`

للتبديل من البيانات التجريبية إلى خادم الـ Backend الخاص بك، قم فقط بتغيير المتغير في ملف `.env.local`:
```bash
# تفعيل الربط الحي مع الباك إند
NEXT_PUBLIC_USE_MOCK=false

# رابط الخادم الخاص بك (أو سيرفر Supabase Edge Functions)
NEXT_PUBLIC_API_URL=https://api.rawafid.iq/v1
```

عندما تكون القيمة `false`، ستقوم الواجهة بإرسال طلبات HTTP حقيقية تلقائياً بنفس الـ Contracts الموضحة أدناه.

---

### 2. مسارات الـ REST API المطلوبة (Endpoints)

| الدالة | المسار (Endpoint) | الوصف | المعاملات (Query Params) |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | جلب قائمة المنتجات مع الفلترة | `category` (اختياري), `q` (بحث نصي) |
| `GET` | `/products/special-offers` | جلب العروض الخاصة بتخفيضات الجملة | - |
| `GET` | `/products/:id` | جلب تفاصيل منتج محدد | المعرّف في المسار |
| `GET` | `/categories` | جلب أقسام الأقواس البغدادية الستة | - |
| `GET` | `/neighborhoods` | جلب مناطق بغداد (مدة التوصيل والأجور) | `area` (كرخ أو رصافة) |
| `GET` | `/orders` | جلب قائمة طلبات الزبون الحالية والسابقة | يتطلب Header للتوثيق `Bearer Token` |
| `POST` | `/orders` | إنشاء وتأكيد طلب جديد | يتطلب JSON Payload |
| `GET` | `/user/profile` | جلب بيانات حساب الزبون ورصيد المحفظة | يتطلب Header للتوثيق |
| `PATCH` | `/user/profile` | تحديث بيانات الملف الشخصي والعنوان | `name`, `phone`, `primaryLocation` |

---

### 3. مخططات البيانات (JSON Schemas)

#### أ. كائن المنتج (Product Schema)
```json
{
  "id": "prod-rice",
  "name": "رز بسمتي عنبر فاخر",
  "subtitle": "عنبر عراقي معتق حبّة طويلة رائحة زكية",
  "category": "مواد أساسية",
  "price": 18000,
  "originalPrice": 22000,
  "discountBadge": "-18%",
  "unit": "كيس 5 كغم خيش",
  "wholesaleTier": {
    "minQty": 4,
    "price": 16500,
    "label": "شروة 4 أكياس بسعر 16,500 د.ع للكيس"
  },
  "image": "rice",
  "isSpecialOffer": true,
  "stock": 120,
  "rating": 5.0,
  "origin": "العراق - المشخاب",
  "brand": "عنبر الفرات"
}
```

#### ب. كائن إنشاء طلب (Create Order Payload - POST `/orders`)
```json
{
  "items": [
    {
      "productId": "prod-tuna",
      "productName": "تونة فيلية",
      "price": 2500,
      "quantity": 2,
      "image": "tuna"
    },
    {
      "productId": "prod-rice",
      "productName": "رز بسمتي عنبر فاخر",
      "price": 18000,
      "quantity": 1,
      "image": "rice"
    }
  ],
  "subtotal": 23000,
  "deliveryFee": 2000,
  "total": 25000,
  "deliveryAddress": "الكرادة - شارع 62، قرب ساحة كهرمانة، عمارة 14",
  "neighborhood": "الكرادة",
  "paymentMethod": "cash_on_delivery",
  "notes": "يرجى الاتصال قبل الوصول"
}
```

#### ج. كائن الطلب المُرجع (Order Response Schema)
```json
{
  "id": "ord-10492",
  "orderNumber": "RWF-10492",
  "createdAt": "2026-11-13T12:15:00Z",
  "status": "on_the_way",
  "statusLabel": "مع الكابتن في الطريق",
  "captainName": "علي البغدادي (دراجة نارية)",
  "captainPhone": "07701234567",
  "items": [...],
  "subtotal": 23000,
  "deliveryFee": 2000,
  "total": 25000,
  "deliveryAddress": "الكرادة - شارع 62، قرب ساحة كهرمانة",
  "neighborhood": "الكرادة",
  "paymentMethod": "cash_on_delivery"
}
```

---

### 4. مخطط قاعدة البيانات المقترح (PostgreSQL / Supabase DDL)

يمكنك تشغيل هذا الكود مباشرة في PostgreSQL أو داخل Supabase SQL Editor:

```sql
-- 1. جدول أقسام الجملة
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_type VARCHAR(50) NOT NULL,
    item_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. جدول المنتجات ومسواك الجملة
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    subtitle TEXT,
    category_id VARCHAR(50) REFERENCES categories(id),
    price INT NOT NULL, -- بالدينار العراقي IQD
    original_price INT,
    discount_badge VARCHAR(20),
    unit VARCHAR(100) NOT NULL,
    wholesale_min_qty INT DEFAULT 1,
    wholesale_price INT,
    wholesale_label TEXT,
    image VARCHAR(100) NOT NULL,
    is_special_offer BOOLEAN DEFAULT FALSE,
    stock INT DEFAULT 0,
    rating NUMERIC(2,1) DEFAULT 5.0,
    origin VARCHAR(100) DEFAULT 'العراق',
    brand VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. جدول مناطق بغداد
CREATE TABLE baghdad_neighborhoods (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    area VARCHAR(20) CHECK (area IN ('كرخ', 'رصافة')),
    delivery_minutes INT DEFAULT 30,
    delivery_fee INT DEFAULT 2000
);

-- 4. جدول حسابات الزبائن
CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) UNIQUE NOT NULL,
    primary_location VARCHAR(150),
    wallet_balance INT DEFAULT 0,
    wholesale_savings INT DEFAULT 0,
    member_tier VARCHAR(50) DEFAULT 'عضوية الجملة الذهبية',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. جدول طلبات التوصيل
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    order_number VARCHAR(30) UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id),
    status VARCHAR(30) CHECK (status IN ('processing', 'on_the_way', 'delivered', 'cancelled')) DEFAULT 'processing',
    subtotal INT NOT NULL,
    delivery_fee INT NOT NULL,
    total INT NOT NULL,
    delivery_address TEXT NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    payment_method VARCHAR(30) CHECK (payment_method IN ('cash_on_delivery', 'zain_cash', 'qi_card')) DEFAULT 'cash_on_delivery',
    captain_name VARCHAR(100),
    captain_phone VARCHAR(30),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. جدول عناصر الطلب
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id),
    product_name VARCHAR(200) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(100) NOT NULL
);

-- إنشاء فهارس سريعة للبحث والتصفية
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_special_offers ON products(is_special_offer);
CREATE INDEX idx_orders_user ON orders(user_id);
```

---

### 5. ملاحظات هامة لتكامل بوابات الدفع في العراق
1. **زين كاش (ZainCash API)**:
   * عند اختيار الزبون للدفع عبر زين كاش، يجب توليد `transaction_id` عبر ZainCash Merchant API وتوجيه الزبون أو إرجاع رابط الدفع `redirect_url`.
2. **كي كارد / ماستر كارد (Qi Card Webhook)**:
   * يدعم جدول `orders` الحالات: `payment_method = 'qi_card'` ويمكن تتبع حالة العملية عبر Webhook بعد إتمام الدفع بنجاح.
3. **الدفع نقداً عند الاستلام (COD)**:
   * يتم تأكيد الطلب فوراً ويبدأ كابتن التوصيل البغدادي بالتجهيز والانطلاق.

إذا كانت لديك أي استفسارات أو احتجت لتعديل أي Structure، الكود منظم بالكامل داخل مجلد `src/services/api.ts` ويمكن تخصيصه بسهولة. بالتوفيق!
