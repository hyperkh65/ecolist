'use client';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Catalog {
  id: string; title: string; description: string; pdf_url: string;
  thumbnail: string; category: string; password: string; is_public: boolean;
  page_count: number; view_count: number; created_at: string;
}

const PAGE_SIZE = 24;

export default function CatalogPage() {
  const [all, setAll] = useState<Catalog[]>([]);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('전체');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/catalogs').then(r => r.json()).then(d => { setAll(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  const categories = ['전체', ...Array.from(new Set(all.map(c => c.category).filter(Boolean)))];
  const filtered = all.filter(c => {
    const matchCat = cat === '전체' || c.category === cat;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = useCallback((v: string) => { setSearch(v); setPage(1); }, []);
  const handleCat = useCallback((v: string) => { setCat(v); setPage(1); }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
          <header style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, color: '#0ea5e9', fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 12 }}>PRODUCT CATALOG</div>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', marginBottom: 14, letterSpacing: -0.5 }}>전자 카탈로그</h1>
            <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.7 }}>
              제품 카탈로그를 온라인으로 열람하세요. 총 <strong style={{ color: '#0f172a' }}>{all.length}개</strong> 카탈로그 보유 중
            </p>
          </header>

          {/* 검색 + 필터 */}
          <div style={{ marginBottom: 28 }}>
            <input value={search} onChange={e => handleSearch(e.target.value)} placeholder="🔍 카탈로그 검색 (제목, 설명)..."
              style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#fff', fontFamily: 'inherit', marginBottom: 16 }} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button key={c} onClick={() => handleCat(c)}
                  style={{ padding: '7px 16px', borderRadius: 20, border: `2px solid ${cat === c ? '#0ea5e9' : '#e2e8f0'}`, background: cat === c ? '#0ea5e9' : '#fff', color: cat === c ? '#fff' : '#475569', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 결과 카운트 */}
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>
            {filtered.length}개 카탈로그{search && ` — "${search}" 검색 결과`}
          </div>

          {/* 카탈로그 그리드 */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>불러오는 중...
            </div>
          ) : paged.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <div style={{ fontSize: 16 }}>{search ? `"${search}" 검색 결과가 없습니다.` : '등록된 카탈로그가 없습니다.'}</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
              {paged.map(c => (
                <Link key={c.id} href={`/catalog/${c.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = 'none'; el.style.transform = 'none'; }}>
                    {/* 썸네일 */}
                    <div style={{ position: 'relative', paddingTop: '141%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', overflow: 'hidden' }}>
                      {c.thumbnail
                        ? <img src={c.thumbnail} alt={c.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                            </svg>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 8, fontWeight: 700, letterSpacing: 1 }}>PDF</span>
                          </div>
                      }
                      {/* 배지들 */}
                      <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4 }}>
                        {!c.is_public && (
                          <span style={{ background: 'rgba(239,68,68,0.9)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 6 }}>🔒 비공개</span>
                        )}
                        {c.password && (
                          <span style={{ background: 'rgba(245,158,11,0.9)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 6 }}>🔑 암호보호</span>
                        )}
                      </div>
                      {c.page_count > 0 && (
                        <span style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 6 }}>
                          {c.page_count}p
                        </span>
                      )}
                    </div>
                    {/* 정보 */}
                    <div style={{ padding: '14px 16px' }}>
                      {c.category && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: 1 }}>{c.category}</span>
                      )}
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 4, marginBottom: 4, lineHeight: 1.3,
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {c.title}
                      </div>
                      {c.description && (
                        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {c.description}
                        </div>
                      )}
                      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{new Date(c.created_at).toLocaleDateString('ko-KR')}</span>
                        {c.view_count > 0 && <span>👁 {c.view_count}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid #e2e8f0', background: '#fff', cursor: page===1?'not-allowed':'pointer', opacity: page===1?0.4:1, fontFamily:'inherit' }}>
                ← 이전
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const p = totalPages <= 7 ? i+1 : page <= 4 ? i+1 : page >= totalPages-3 ? totalPages-6+i : page-3+i;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    style={{ width: 36, height: 36, borderRadius: 8, border: `2px solid ${p===page?'#0ea5e9':'#e2e8f0'}`, background: p===page?'#0ea5e9':'#fff', color: p===page?'#fff':'#475569', fontWeight: 700, cursor: 'pointer', fontFamily:'inherit' }}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid #e2e8f0', background: '#fff', cursor: page===totalPages?'not-allowed':'pointer', opacity: page===totalPages?0.4:1, fontFamily:'inherit' }}>
                다음 →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
