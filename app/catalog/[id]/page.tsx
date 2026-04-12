'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Catalog {
  id: string; title: string; description: string; pdf_url: string;
  thumbnail: string; category: string; password: string; is_public: boolean;
  page_count: number; view_count: number; created_at: string;
}

export default function CatalogViewer() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    fetch(`/api/catalogs/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { router.push('/catalog'); return; }
        setCatalog(d);
        // 비밀번호 없으면 바로 공개
        if (!d.password) setUnlocked(true);
        setLoading(false);
        // 조회수 증가
        fetch(`/api/catalogs/${id}/view`, { method: 'POST' }).catch(() => {});
      });
  }, [id]);

  const handleUnlock = () => {
    if (!catalog) return;
    if (pwInput === catalog.password) { setUnlocked(true); setPwError(false); }
    else { setPwError(true); }
  };

  const goToPage = (p: number) => {
    if (!catalog) return;
    const max = catalog.page_count || 9999;
    const next = Math.max(1, Math.min(max, p));
    setCurrentPage(next);
    setPageInput(String(next));
    setIframeKey(k => k + 1); // force reload to new page
  };

  const pdfSrc = catalog ? `${catalog.pdf_url}#page=${currentPage}&toolbar=1&navpanes=1` : '';

  if (loading) return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>불러오는 중...
        </div>
      </main>
      <Footer />
    </>
  );

  if (!catalog) return null;

  // 비밀번호 게이트
  if (!unlocked) return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 420, width: '100%', padding: '0 24px' }}>
          <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔑</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>암호 보호 카탈로그</h2>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#475569', marginBottom: 6 }}>{catalog.title}</div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 28 }}>이 카탈로그는 암호로 보호되어 있습니다.</p>
            <input type="password" value={pwInput} onChange={e => { setPwInput(e.target.value); setPwError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              placeholder="암호를 입력하세요"
              style={{ width: '100%', padding: '12px 16px', border: `2px solid ${pwError ? '#ef4444' : '#e2e8f0'}`, borderRadius: 10, fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 8, textAlign: 'center' }} />
            {pwError && <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>암호가 올바르지 않습니다.</p>}
            <button onClick={handleUnlock}
              style={{ width: '100%', padding: '13px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 12 }}>
              확인
            </button>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 13 }}>← 돌아가기</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      {!fullscreen && <Navbar />}
      <main style={{ minHeight: '100vh', background: '#1e293b', paddingTop: fullscreen ? 0 : 84 }}>
        {/* 상단 컨트롤 바 */}
        <div style={{ background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/catalog')}
            style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', flexShrink: 0 }}>
            ← 목록
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{catalog.title}</div>
            {catalog.category && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{catalog.category}</div>}
          </div>

          {/* 페이지 이동 컨트롤 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
              style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: currentPage<=1?'not-allowed':'pointer', opacity: currentPage<=1?0.4:1, fontSize: 14 }}>
              ‹
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
              <input value={pageInput}
                onChange={e => setPageInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && goToPage(Number(pageInput))}
                onBlur={() => goToPage(Number(pageInput))}
                style={{ width: 48, padding: '5px 8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#fff', fontSize: 13, textAlign: 'center', fontFamily: 'inherit', outline: 'none' }} />
              {catalog.page_count > 0 && <span>/ {catalog.page_count}</span>}
            </div>
            <button onClick={() => goToPage(currentPage + 1)} disabled={catalog.page_count > 0 && currentPage >= catalog.page_count}
              style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer', fontSize: 14 }}>
              ›
            </button>
          </div>

          {/* 페이지 바로가기 버튼들 (page_count 있을 때) */}
          {catalog.page_count > 0 && catalog.page_count <= 50 && (
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', maxWidth: 300 }}>
              {Array.from({ length: Math.min(catalog.page_count, 20) }, (_, i) => i+1).map(p => (
                <button key={p} onClick={() => goToPage(p)}
                  style={{ width: 26, height: 26, borderRadius: 4, border: 'none', background: p===currentPage?'#0ea5e9':'rgba(255,255,255,0.08)', color: p===currentPage?'#fff':'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                  {p}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <a href={catalog.pdf_url} target="_blank" rel="noopener noreferrer" download
              style={{ padding: '7px 14px', background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.4)', borderRadius: 8, color: '#7dd3fc', fontSize: 12, fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}>
              ⬇ 다운로드
            </a>
            <button onClick={() => setFullscreen(f => !f)}
              style={{ padding: '7px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 13 }}>
              {fullscreen ? '⊠' : '⊞'}
            </button>
          </div>
        </div>

        {/* PDF 뷰어 */}
        <div style={{ width: '100%', background: '#374151' }}>
          <iframe
            key={`${id}-${iframeKey}`}
            src={pdfSrc}
            style={{ width: '100%', height: fullscreen ? '100vh' : 'calc(100vh - 140px)', border: 'none', display: 'block' }}
            title={catalog.title}
          />
        </div>
      </main>
      {!fullscreen && <Footer />}
    </>
  );
}
