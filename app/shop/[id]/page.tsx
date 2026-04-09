'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAdminStore, useShopStore } from '@/lib/store';
import { ScrollReveal } from '@/components/LuminaAnimation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const products = useAdminStore((s) => s.products);
  const product = products.find((p) => p.id === id);
  const addToCart = useShopStore((s) => s.addToCart);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);
  const wishlist = useShopStore((s) => s.wishlist);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const isWished = product ? wishlist.includes(product.id) : false;

  if (!product) return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', paddingTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 64, marginBottom: 20 }}>🔍</p>
        <h1 style={{ fontSize: 32, marginBottom: 16 }}>제품을 찾을 수 없습니다</h1>
        <Link href="/shop" className="btn-primary">쇼핑 계속하기</Link>
      </div>
    </main>
  );

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', paddingTop: 64 }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>홈</Link>
          <span>›</span>
          <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>쇼핑</Link>
          <span>›</span>
          <Link href={`/shop?cat=${product.category}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.category}</Link>
          <span>›</span>
          <span style={{ color: '#fff' }}>{product.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start' }}>
        {/* Image */}
        <ScrollReveal direction="left">
          <div style={{ position: 'sticky', top: 84 }}>
            <div style={{ borderRadius: 24, overflow: 'hidden', background: '#0a0a0a', aspectRatio: '1', position: 'relative' }}>
              <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {product.badge && (
                <div style={{ position: 'absolute', top: 20, left: 20, padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                  {product.badge}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal direction="right">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span className="tag">{product.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                <span style={{ color: '#f5c518' }}>★</span>
                <span>{product.rating}</span>
                <span>({product.reviews}개 리뷰)</span>
              </div>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.2 }}>
              {product.name}
            </h1>

            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 32 }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{ marginBottom: 36, padding: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
              {product.originalPrice && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>{product.originalPrice.toLocaleString()}원</span>
                  {discount && <span style={{ fontSize: 13, fontWeight: 700, color: '#ff8080', background: 'rgba(255,80,80,0.1)', padding: '2px 8px', borderRadius: 4 }}>-{discount}%</span>}
                </div>
              )}
              <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>{product.price.toLocaleString()}원</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>재고: {product.stock}개</div>
            </div>

            {/* Specs */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>스펙</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{key}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            {product.certificates && product.certificates.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>인증서 및 문서</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {product.certificates.map((certUrl, index) => {
                    const certName = certUrl.split('/').pop() || `문서 ${index + 1}`;
                    return (
                      <a key={index} href={certUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', color: '#fff', transition: 'background 0.2s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)'; }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{certName}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>문서 조회</div>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.5)' }}>↗</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Qty + Cart */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, overflow: 'hidden' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', color: '#fff', width: 44, height: 48, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ width: 44, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{ background: 'none', border: 'none', color: '#fff', width: 44, height: 48, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
              <button onClick={handleAdd} className={added ? '' : 'btn-primary'} style={{
                flex: 1, padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.3s',
                background: added ? 'rgba(100,255,150,0.15)' : '#fff', color: added ? '#80ffaa' : '#000',
                border: `1px solid ${added ? 'rgba(100,255,150,0.4)' : 'transparent'}`,
              }}>
                {added ? '✓ 장바구니에 추가됨!' : '장바구니 담기'}
              </button>
              <button onClick={() => toggleWishlist(product.id)} style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isWished ? '#ff6b6b' : '#fff', transition: 'all 0.2s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <button style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
              바로 구매하기
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Related products */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40, letterSpacing: '-0.02em' }}>함께 보면 좋아요</h2>
          <div className="products-grid">
            {products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100}>
                <Link href={`/shop/${p.id}`} style={{ display: 'block', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s', color: '#fff' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{p.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{p.price.toLocaleString()}원</div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
