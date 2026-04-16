'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useShopStore, useAdminStore } from '@/lib/store';

const PRODUCT_CATEGORIES = [
  { href: '/shop?cat=smart', label: '스마트조명시스템', icon: '☁️', desc: 'IoT 기반 무선 자동제어' },
  { href: '/shop?cat=indoor', label: '실내조명', icon: '🏢', desc: '사무·상업용 고효율 LED' },
  { href: '/shop?cat=commercial', label: '상업조명', icon: '🏪', desc: '쇼핑몰·매장 프리미엄 라인' },
  { href: '/shop?cat=outdoor', label: '산업/실외조명', icon: '🏭', desc: '공장등·가로등 내구성 특화' },
  { href: '/shop?cat=landscape', label: '경관조명', icon: '🌉', desc: '건축물·랜드마크 특화' },
  { href: '/shop?cat=special', label: '특수조명', icon: '🔬', desc: '의료·클린룸·방폭·살균' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);
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

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(e.target as Node)) {
        setProductMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.04)' : 'none',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', height: 76, gap: 40 }}>
          
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 15 }}>Y&K</span>
            </div>
            <div>
              <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
                (주)<span style={{ color: '#0284c7' }}>와이앤케이</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: 4, flex: 1, alignItems: 'center' }} className="desktop-nav">
            <Link href="/about" style={{
              fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none',
              padding: '8px 14px', borderRadius: 8,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLAnchorElement).style.color = '#0284c7'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#334155'; }}
            >회사안내</Link>

            {/* 제품소개 드롭다운 */}
            <div ref={productMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProductMenuOpen(v => !v)}
                style={{
                  background: productMenuOpen ? '#f1f5f9' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  fontSize: 15, fontWeight: 600, color: productMenuOpen ? '#0284c7' : '#334155',
                  padding: '8px 14px', borderRadius: 8,
                  display: 'flex', alignItems: 'center', gap: 4,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!productMenuOpen) { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLButtonElement).style.color = '#0284c7'; } }}
                onMouseLeave={e => { if (!productMenuOpen) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#334155'; } }}
              >
                제품소개
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: productMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {/* 메가 드롭다운 */}
              {productMenuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
                  background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.05)',
                  padding: 16, width: 520, zIndex: 2000,
                  animation: 'dropdownFadeIn 0.15s ease',
                }}>
                  <div style={{ marginBottom: 12, padding: '0 8px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 1.5, textTransform: 'uppercase' }}>제품 카테고리</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setProductMenuOpen(false)}
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderRadius: 10, transition: 'all 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f0f9ff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                      >
                        <span style={{ fontSize: 24, flexShrink: 0 }}>{cat.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{cat.label}</div>
                          <div style={{ fontSize: 12, color: '#64748b' }}>{cat.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                    <Link href="/shop" onClick={() => setProductMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0', fontSize: 14, fontWeight: 600, color: '#0284c7', textDecoration: 'none' }}>
                      전체 제품 보기 →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/trade-info" style={{
              fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none',
              padding: '8px 14px', borderRadius: 8, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLAnchorElement).style.color = '#0284c7'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#334155'; }}
            >무역/인증 안내</Link>

            <Link href="/tracking" style={{
              fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none',
              padding: '8px 14px', borderRadius: 8, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLAnchorElement).style.color = '#0284c7'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#334155'; }}
            >물류조회</Link>

            <Link href="/tech" style={{
              fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none',
              padding: '8px 14px', borderRadius: 8, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLAnchorElement).style.color = '#0284c7'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#334155'; }}
            >기술연구소</Link>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {isAdmin && (
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0284c7', letterSpacing: 1, padding: '6px 14px', background: 'rgba(14,165,233,0.08)', borderRadius: 8, border: '1px solid rgba(14,165,233,0.2)' }}>ADMIN</span>
              </Link>
            )}
            
            {/* B2B 견적 문의함 */}
            <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#334155', position: 'relative', display: 'flex', alignItems: 'center', padding: 8, borderRadius: 8, transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              {cartCount > 0 && <span style={{ position: 'absolute', top: 2, right: 2, fontSize: 10, background: '#0284c7', color: 'white', padding: '2px 6px', borderRadius: 10, fontWeight: 700, minWidth: 18, textAlign: 'center' }}>{cartCount}</span>}
            </button>

            {/* B2B 견적 문의 CTA */}
            <Link href="/admin/login" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#334155', display: 'flex', alignItems: 'center', padding: 8, borderRadius: 8, transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </Link>

            {/* 모바일 햄버거 */}
            <button onClick={() => setMenuOpen(v => !v)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#334155', padding: 8, borderRadius: 8, display: 'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div className="mobile-menu" style={{
            background: '#fff', borderTop: '1px solid #e2e8f0',
            padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
          }}>
            <Link href="/about" onClick={() => setMenuOpen(false)} style={{ padding: '12px 16px', fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none', borderRadius: 8 }}>회사안내</Link>
            <div style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginTop: 8 }}>제품 카테고리</div>
            {PRODUCT_CATEGORIES.map(cat => (
              <Link key={cat.href} href={cat.href} onClick={() => setMenuOpen(false)} style={{ padding: '10px 16px', fontSize: 14, fontWeight: 600, color: '#475569', textDecoration: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{cat.icon}</span> {cat.label}
              </Link>
            ))}
            <Link href="/trade-info" onClick={() => setMenuOpen(false)} style={{ padding: '12px 16px', fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none', borderRadius: 8, marginTop: 8 }}>무역/인증 안내</Link>
            <Link href="/tracking" onClick={() => setMenuOpen(false)} style={{ padding: '12px 16px', fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none', borderRadius: 8 }}>물류조회</Link>
            <Link href="/tech" onClick={() => setMenuOpen(false)} style={{ padding: '12px 16px', fontSize: 15, fontWeight: 600, color: '#334155', textDecoration: 'none', borderRadius: 8 }}>기술연구소</Link>
          </div>
        )}
      </nav>

      {/* 견적 문의함 Drawer */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 440, maxWidth: '100vw',
            background: '#ffffff', borderLeft: '1px solid #e2e8f0',
            display: 'flex', flexDirection: 'column', animation: 'slideInLeft 0.3s ease',
            boxShadow: '-12px 0 50px rgba(0,0,0,0.12)'
          }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>견적 문의함</h2>
                <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{cartCount}건의 제품이 담겨있습니다</p>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: '#f8fafc', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20, width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#64748b' }}>담겨있는 제품이 없습니다</p>
                  <p style={{ fontSize: 13, marginTop: 8, color: '#94a3b8' }}>견적이 필요한 제품을 담아주세요.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cart.map((item) => (
                    <div key={item.product.id} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                      <img src={item.product.images[0]} alt={item.product.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>{item.product.name}</p>
                        <p style={{ fontSize: 12, color: '#64748b' }}>요청 수량: {item.quantity}개</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 20, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: '20px 28px', borderTop: '1px solid #f1f5f9' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }}>
                  종합 견적 문의하기 →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
