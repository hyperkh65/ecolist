import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  specs: Record<string, string>;
  images: string[];
  certificates?: string[];
  badge?: string;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AdminState {
  isLoggedIn: boolean;
  products: Product[];
  login: (pw: string) => boolean;
  logout: () => void;
  addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  cartTotal: () => number;
  cartCount: () => number;
}

// Demo products
const DEMO_PRODUCTS: Product[] = [
  {
    id: '1', name: 'Lumina Ring Pro', category: 'pendant',
    price: 289000, originalPrice: 350000,
    description: '직경 60cm 프리미엄 원형 LED 펜던트. 3000K-6500K 색온도 조절, 디밍 가능. 최대 50W, 4500 lm 광속.',
    specs: { '크기': 'Ø600mm', '전력': '50W', '색온도': '3000K~6500K', '광속': '4500lm', 'CRI': '>95', '수명': '50,000hr' },
    images: ['/hero-main.png'],
    badge: 'BEST', stock: 24, rating: 4.9, reviews: 128, featured: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2', name: 'NeoStrip COB 10m', category: 'strip',
    price: 89000, originalPrice: 120000,
    description: 'COB 기술의 균일한 빛. 끊김 없는 선형 조명. IP65 방수, 실내외 모두 사용 가능.',
    specs: { '길이': '10m', '전력': '18W/m', 'IP등급': 'IP65', '색온도': '2700K~6500K', 'CRI': '>90', '컷팅': '10cm 단위' },
    images: ['/strip-glow.png'],
    badge: 'NEW', stock: 56, rating: 4.8, reviews: 89, featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: '3', name: 'Panel Pro 60x60', category: 'panel',
    price: 145000,
    description: '사무용 LED 매입 패널. UGR<19 저눈부심 설계. 균일한 면발광으로 눈의 피로 최소화.',
    specs: { '크기': '600×600mm', '전력': '40W', '광속': '4800lm', 'CRI': '>85', 'UGR': '<19', '수명': '50,000hr' },
    images: ['/panel-interior.png'],
    stock: 30, rating: 4.7, reviews: 64, featured: false,
    createdAt: '2024-02-01'
  },
  {
    id: '4', name: 'SpotX Track GU10', category: 'track',
    price: 56000,
    description: '3선식 트랙 레일용 스팟 조명. 360도 회전, 90도 틸팅. 인테리어 포인트 조명에 최적.',
    specs: { '소켓': 'GU10', '전력': '7W', '빔각도': '24°/36°', '색온도': '3000K', 'CRI': '>92', '회전': '360°' },
    images: ['/hero-main.png'],
    stock: 80, rating: 4.6, reviews: 45, featured: false,
    createdAt: '2024-02-10'
  },
  {
    id: '5', name: 'Outdoor Wall Duo', category: 'outdoor',
    price: 125000, originalPrice: 155000,
    description: '방수 IP67 외부 벽부등. 상하 빛 분산으로 건축적 미감 극대화. 소금물 부식 방지 코팅.',
    specs: { '크기': '300×120×80mm', '전력': '24W', 'IP등급': 'IP67', '색온도': '3000K', 'CRI': '>80', '소재': '다이캐스팅 알루미늄' },
    images: ['/panel-interior.png'],
    badge: 'SALE', stock: 15, rating: 4.8, reviews: 37, featured: true,
    createdAt: '2024-03-01'
  },
  {
    id: '6', name: 'SmartDim Controller', category: 'accessory',
    price: 48000,
    description: 'Zigbee 3.0 기반 스마트 디밍 컨트롤러. 앱 제어, 스마트홈 연동 (SmartThings, HomeKit 지원).',
    specs: { '통신': 'Zigbee 3.0', '입력': '0-10V / PWM', '최대전류': '30A', '호환': 'SmartThings / HomeKit', '크기': '86×86mm' },
    images: ['/strip-glow.png'],
    stock: 45, rating: 4.5, reviews: 28, featured: false,
    createdAt: '2024-03-10'
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      products: DEMO_PRODUCTS,
      login: (pw) => {
        if (pw === 'admin1234') { set({ isLoggedIn: true }); return true; }
        return false;
      },
      logout: () => set({ isLoggedIn: false }),
      addProduct: (p) => set((s) => ({
        products: [...s.products, { ...p, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      })),
      updateProduct: (id, p) => set((s) => ({
        products: s.products.map((prod) => prod.id === id ? { ...prod, ...p } : prod)
      })),
      deleteProduct: (id) => set((s) => ({
        products: s.products.filter((p) => p.id !== id)
      })),
    }),
    { name: 'led-admin-store' }
  )
);

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      addToCart: (product, qty = 1) => set((s) => {
        const existing = s.cart.find((i) => i.product.id === product.id);
        if (existing) return { cart: s.cart.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i) };
        return { cart: [...s.cart, { product, quantity: qty }] };
      }),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((i) => i.product.id !== id) })),
      updateQty: (id, qty) => set((s) => ({
        cart: qty === 0 ? s.cart.filter((i) => i.product.id !== id) : s.cart.map((i) => i.product.id === id ? { ...i, quantity: qty } : i)
      })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (id) => set((s) => ({
        wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id]
      })),
      cartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'led-shop-store' }
  )
);
