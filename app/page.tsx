'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { AnimatedCounter, ScrollReveal } from '@/components/LuminaAnimation';
import RemotionHero from '@/components/RemotionHero';
import { useAdminStore } from '@/lib/store';

const CATEGORIES = [
  { id: 'pendant', label: '펜던트', icon: '💡', desc: '공간의 중심을 밝히는 아트피스' },
  { id: 'strip', label: '스트립', icon: '〰️', desc: '선형 빛으로 공간을 정의하다' },
  { id: 'panel', label: '패널', icon: '⬜', desc: '균일한 면빛, 눈의 피로 제로' },
  { id: 'track', label: '트랙', icon: '⚡', desc: '포인트 조명의 유연한 배치' },
  { id: 'outdoor', label: '실외', icon: '🌐', desc: 'IP67 방수, 사계절 안전' },
  { id: 'accessory', label: '액세서리', icon: '🔧', desc: '스마트홈과 완벽한 연동' },
];

export default function Home() {
  const products = useAdminStore((s) => s.products);
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const allProducts = products.slice(0, 6);

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      {/* HERO with Remotion */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <RemotionHero />

        {/* Content over the video */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 800 }}>
          <div style={{ opacity: 0, animation: 'fadeInUp 0.8s ease 0.8s forwards', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 300 }}>
            <Link href="/shop" className="btn-primary">지금 쇼핑하기 →</Link>
            <Link href="/shop?cat=pendant" className="btn-secondary">베스트 제품</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #fff, transparent)', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, textAlign: 'center' }}>
          {[
            { value: 50000, suffix: '+', label: '누적 판매' },
            { value: 98, suffix: '%', label: '고객 만족도' },
            { value: 500, suffix: '개+', label: '제품 라인업' },
            { value: 24, suffix: '/7', label: 'AS 지원' },
          ].map((stat) => (
            <ScrollReveal key={stat.label}>
              <div>
                <div style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p className="section-label" style={{ marginBottom: 16 }}>카테고리</p>
              <h2 className="section-title">모든 공간을 위한<br />완벽한 솔루션</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {CATEGORIES.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 60}>
                <Link href={`/shop?cat=${cat.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '32px 24px', borderRadius: 20, textAlign: 'center',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.3s ease', cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{cat.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{cat.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{cat.desc}</div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p className="section-label" style={{ marginBottom: 16 }}>Featured</p>
                <h2 className="section-title">베스트 셀러</h2>
              </div>
              <Link href="/shop" className="btn-secondary">전체보기 →</Link>
            </div>
          </ScrollReveal>
          <div className="products-grid">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* FULLSCREEN - Strip light showcase */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/strip-glow.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', alignItems: 'center', padding: '0 10vw' }}>
          <ScrollReveal direction="left">
            <div style={{ maxWidth: 560 }}>
              <p className="section-label" style={{ marginBottom: 20, color: 'rgba(255,255,255,0.5)' }}>COB Strip Light</p>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
                선 하나로<br />공간이 달라진다
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 40 }}>
                COB 기술로 구현한 끊김 없는 선형 조명.<br />어디서나 완벽한 직선의 빛.
              </p>
              <Link href="/shop?cat=strip" className="btn-primary">스트립 조명 보기</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p className="section-label" style={{ marginBottom: 16 }}>Shop All</p>
                <h2 className="section-title">전체 상품</h2>
              </div>
              <Link href="/shop" className="btn-secondary">더 보기 →</Link>
            </div>
          </ScrollReveal>
          <div className="products-grid">
            {allProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* PANEL Interior */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/panel-interior.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 10vw' }}>
          <ScrollReveal direction="right">
            <div style={{ maxWidth: 520, textAlign: 'right' }}>
              <p className="section-label" style={{ marginBottom: 20, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>Office Panel</p>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
                일하는 공간,<br />눈이 편안하다
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 40 }}>
                UGR &lt; 19 저눈부심 설계.<br />8시간 작업에도 피로하지 않은 완벽한 면빛.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                <Link href="/shop?cat=panel" className="btn-primary">패널 조명 보기</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI REGISTRATION Banner */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{
              padding: '60px', borderRadius: 28,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              {/* Glow decoration */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', filter: 'blur(40px)' }} />
              <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(30px)' }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✨</div>
                <p className="section-label" style={{ marginBottom: 16 }}>AI 상품 등록</p>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: 20, letterSpacing: '-0.02em' }}>
                  관리자가 아니어도<br />AI가 등록해드립니다
                </h2>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 40 }}>
                  제품 이름만 입력하면 AI가 스펙, 설명, 가격을 자동 생성.<br />단 10초 만에 완벽한 상품 페이지를 만들어보세요.
                </p>
                <Link href="/admin" className="btn-primary" style={{ fontSize: 16 }}>관리자 페이지 →</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 60 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'radial-gradient(circle, #ffffff, rgba(255,255,255,0.3))', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }} />
                <span style={{ fontSize: 16, fontWeight: 800 }}>LUMINA</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>인테리어를 완성하는<br />프리미엄 LED 조명 전문 몰</p>
            </div>
            {[
              { title: '쇼핑', links: ['전체상품', '베스트셀러', '신상품', '세일'] },
              { title: '카테고리', links: ['펜던트', '스트립', '패널', '트랙'] },
              { title: '고객지원', links: ['공지사항', '자주묻는질문', '1:1 문의', 'AS 신청'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>{col.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map((l) => (
                    <a key={l} href="#" className="nav-link" style={{ fontSize: 13 }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2024 LUMINA. All rights reserved.</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>사업자등록번호: 000-00-00000 · 대표: 홍길동</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
