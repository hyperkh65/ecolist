'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useAdminStore } from '@/lib/store';

const CATS = [
  { id: 'all', label: '전체' },
  { id: 'pendant', label: '펜던트' },
  { id: 'strip', label: '스트립' },
  { id: 'panel', label: '패널' },
  { id: 'track', label: '트랙' },
  { id: 'outdoor', label: '실외' },
  { id: 'accessory', label: '액세서리' },
];

const SORTS = [
  { id: 'featured', label: '추천순' },
  { id: 'price-asc', label: '가격 낮은순' },
  { id: 'price-desc', label: '가격 높은순' },
  { id: 'rating', label: '평점순' },
  { id: 'newest', label: '최신순' },
];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get('cat') || 'all';
  const [cat, setCat] = useState(initCat);
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(500000);
  const products = useAdminStore((s) => s.products);

  useEffect(() => { setCat(searchParams.get('cat') || 'all'); }, [searchParams]);

  const filtered = products
    .filter((p) => (cat === 'all' || p.category === cat) && p.price <= maxPrice && (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.includes(search)))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', paddingTop: 64 }}>
      <Navbar />
      <div style={{ padding: '60px 24px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>Shop</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 20 }}>전체 상품</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>{filtered.length}개 상품</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <aside style={{ width: 220, flexShrink: 0, position: 'sticky', top: 84 }}>
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 12 }}>검색</label>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="제품명 검색..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-dark" style={{ paddingLeft: 36 }} />
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 12 }}>카테고리</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {CATS.map((c) => (
                <button key={c.id} onClick={() => setCat(c.id)} style={{ background: cat === c.id ? 'rgba(255,255,255,0.1)' : 'transparent', border: '1px solid', borderColor: cat === c.id ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: 10, color: cat === c.id ? '#fff' : 'rgba(255,255,255,0.5)', padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: cat === c.id ? 600 : 400, fontFamily: 'inherit', transition: 'all 0.2s' }}>
                  {c.label} <span style={{ float: 'right', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 12 }}>가격 상한</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>
              <span>0원</span><span>{maxPrice.toLocaleString()}원</span>
            </div>
            <input type="range" min={0} max={500000} step={10000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#fff' }} />
          </div>
        </aside>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {SORTS.map((s) => (
              <button key={s.id} onClick={() => setSort(s.id)} style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid', borderColor: sort === s.id ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)', background: sort === s.id ? 'rgba(255,255,255,0.1)' : 'transparent', color: sort === s.id ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>{s.label}</button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
              <p style={{ fontSize: 18 }}>검색 결과가 없습니다</p>
              <button onClick={() => { setCat('all'); setSearch(''); setMaxPrice(500000); }} style={{ marginTop: 20, background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>필터 초기화</button>
            </div>
          ) : (
            <div className="products-grid">{filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
          )}
        </div>
      </div>
    </main>
  );
}
