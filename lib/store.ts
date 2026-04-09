import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  original_price?: number;
  description: string;
  specs: Record<string, string>;
  images: string[];
  image?: string;
  certificates?: string[];
  badge?: string;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  createdAt: string;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AdminState {
  isLoggedIn: boolean;
  products: Product[];
  login: (id: string, pw: string) => boolean;
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

// Initial products will be fetched from Supabase
const DEMO_PRODUCTS: Product[] = [];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      products: DEMO_PRODUCTS,
      login: (id, pw) => {
        if (id === 'YNK' && pw === 'aa565577##') { 
          set({ isLoggedIn: true }); 
          return true; 
        }
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
