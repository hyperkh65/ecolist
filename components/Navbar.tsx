'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useShopStore, useAdminStore } from '@/lib/store';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useShopStore((s) => s.cartCount());
  const cart = useShopStore((s) => s.cart);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const cartTotal = useShopStore((s) => s.cartTotal());
  const isAdmin = useAdminStore((s) => s.isLoggedIn);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const categories = [
    { href: '/shop?cat=pendant', label: '펜던트' },
    { href: '/shop?cat=strip', label: '스트립' },
    { href: '/shop?cat=panel', label: '패널' },
    { href: '/shop?cat=track', label: '트랙' },
    { href: '/shop?cat=outdoor', label: '실외' },
    { href: '/shop?cat=accessory', label: '액세서리' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.3) 60%, transparent 100%)',
              boxShadow: '0 0 20px rgba(255,255,255,0.4)',
              animation: 'glow-pulse 3s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>LUMINA</span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: 8, flex: 1 }} className="desktop-nav">
            <Link href="/about" className="nav-link" style={{ padding: '6px 12px', borderRadius: 8 }}>회사소개</Link>
            <Link href="/tech" className="nav-link" style={{ padding: '6px 12px', borderRadius: 8 }}>기술력</Link>
            <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)', margin: 'auto 8px' }} />
            {categories.slice(0, 4).map((c) => (
              <Link key={c.href} href={c.href} className="nav-link" style={{ padding: '6px 12px', borderRadius: 8 }}>
                {c.label}
              </Link>
            ))}
            <Link href="/shop" className="nav-link" style={{ padding: '6px 12px', borderRadius: 8 }}>전체상품</Link>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <Link href="/shop" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'color 0.2s' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>
            {isAdmin && (
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, padding: '4px 10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}>ADMIN</span>
              </Link>
            )}
            {/* Cart */}
            <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', position: 'relative', display: 'flex', alignItems: 'center', padding: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="badge" style={{ position: 'absolute', top: -6, right: -6, fontSize: 10 }}>{cartCount}</span>}
            </button>
            <Link href="/admin/login" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 420, maxWidth: '100vw',
            background: '#0a0a0a', borderLeft: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', animation: 'slideInLeft 0.3s ease',
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>장바구니 {cartCount > 0 && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 400 }}>({cartCount}개)</span>}</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 24 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                  <p>장바구니가 비어있습니다</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cart.map((item) => (
                    <div key={item.product.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <img src={item.product.images[0]} alt={item.product.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.product.name}</p>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>수량: {item.quantity}</p>
                        <p style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{(item.product.price * item.quantity).toLocaleString()}원</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 18 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>합계</span>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>{cartTotal.toLocaleString()}원</span>
                </div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>주문하기</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
