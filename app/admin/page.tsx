'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminStore, Product } from '@/lib/store';
import CloudinaryUpload from '@/components/CloudinaryUpload';
// AI Product Generator
async function generateWithAI(productName: string): Promise<Partial<Product>> {
  // Simulated AI generation (would call OpenAI/Gemini API in production)
  await new Promise((r) => setTimeout(r, 1500));
  
  const nameL = productName.toLowerCase();
  const isStrip = nameL.includes('스트립') || nameL.includes('strip') || nameL.includes('led strip');
  const isPanel = nameL.includes('패널') || nameL.includes('panel');
  const isPendant = nameL.includes('펜던트') || nameL.includes('pendant') || nameL.includes('링');
  const isOutdoor = nameL.includes('실외') || nameL.includes('outdoor') || nameL.includes('방수');
  
  const category = isStrip ? 'strip' : isPanel ? 'panel' : isPendant ? 'pendant' : isOutdoor ? 'outdoor' : 'track';
  const basePrice = { strip: 85000, panel: 130000, pendant: 260000, outdoor: 120000, track: 55000, accessory: 45000 }[category];

  return {
    name: productName,
    category,
    price: basePrice + Math.round(Math.random() * 50000 / 1000) * 1000,
    originalPrice: Math.random() > 0.5 ? basePrice + Math.round(Math.random() * 80000 / 1000) * 1000 : undefined,
    description: `${productName}은(는) 최신 LED 기술이 집약된 프리미엄 제품입니다. 고효율 칩셋으로 탁월한 밝기와 낮은 소비전력을 자랑하며, CRI 90 이상의 자연색 연색성으로 공간 내 모든 색상을 생생하게 표현합니다.`,
    specs: {
      '전력': `${category === 'strip' ? '18W/m' : `${20 + Math.round(Math.random() * 30)}W`}`,
      '색온도': '3000K~6500K',
      'CRI': '>90',
      '수명': '50,000hr',
      'IP등급': category === 'outdoor' ? 'IP67' : 'IP20',
      '제품보증': '3년',
    },
    images: ['/hero-main.png'],
    stock: 20 + Math.round(Math.random() * 80),
    rating: 4.5 + Math.round(Math.random() * 5) / 10,
    reviews: Math.round(Math.random() * 50),
    featured: Math.random() > 0.7,
    badge: Math.random() > 0.7 ? 'NEW' : undefined,
  };
}

const EMPTY_PRODUCT: Omit<Product, 'id' | 'createdAt'> = {
  name: '', category: 'pendant', price: 0, description: '',
  specs: {}, images: [], certificates: [], stock: 10, rating: 4.5, reviews: 0, featured: false,
};

export default function AdminPage() {
  const router = useRouter();
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn);
  const logout = useAdminStore((s) => s.logout);
  const products = useAdminStore((s) => s.products);
  const addProduct = useAdminStore((s) => s.addProduct);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);

  const [tab, setTab] = useState<'dashboard' | 'products' | 'add'>('dashboard');
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_PRODUCT });
  const [aiName, setAiName] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [specInput, setSpecInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push('/admin/login');
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  const handleAIGenerate = async () => {
    if (!aiName.trim()) return;
    setAiLoading(true);
    const result = await generateWithAI(aiName);
    setForm({ ...EMPTY_PRODUCT, ...result } as any);
    setAiLoading(false);
    setAiDone(true);
    setTimeout(() => setAiDone(false), 3000);
  };

  const handleSave = () => {
    if (editId) {
      updateProduct(editId, form);
    } else {
      addProduct(form);
    }
    setForm({ ...EMPTY_PRODUCT });
    setEditId(null);
    setTab('products');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, price: p.price, originalPrice: p.originalPrice, description: p.description, specs: p.specs, images: p.images || [], certificates: p.certificates || [], badge: p.badge, stock: p.stock, rating: p.rating, reviews: p.reviews, featured: p.featured });
    setEditId(p.id);
    setTab('add');
  };

  const totalRevenue = products.reduce((s, p) => s + p.price * p.reviews, 0);
  const avgRating = products.reduce((s, p) => s + p.rating, 0) / products.length;

  const INPUT = (label: string, key: keyof typeof form, type: string = 'text') => (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</label>
      <input
        type={type}
        value={(form as any)[key] ?? ''}
        onChange={(e) => setForm((f) => ({ ...f, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
        className="input-dark"
      />
    </div>
  );

  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, borderRight: '1px solid rgba(255,255,255,0.06)', padding: '32px 0', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '0 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle, #fff, rgba(255,255,255,0.3))', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: 16, fontWeight: 800 }}>LUMINA</span>
          </div>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase' }}>Admin Console</span>
        </div>

        <nav style={{ padding: '20px 12px', flex: 1 }}>
          {[
            { key: 'dashboard', label: '대시보드', icon: '📊' },
            { key: 'products', label: '상품 관리', icon: '📦' },
            { key: 'add', label: editId ? '상품 수정' : '상품 등록', icon: '✨' },
          ].map((item) => (
            <button key={item.key} onClick={() => { setTab(item.key as any); if (item.key !== 'add') { setEditId(null); setForm({ ...EMPTY_PRODUCT }); } }}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 12, border: 'none',
                background: tab === item.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: tab === item.key ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: 14, fontWeight: tab === item.key ? 600 : 400,
                cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 10, alignItems: 'center',
                fontFamily: 'inherit', marginBottom: 4, transition: 'all 0.2s',
              }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', borderRadius: 10, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, marginBottom: 4, transition: 'color 0.2s' }}>
            ← 쇼핑몰 바로가기
          </Link>
          <button onClick={() => { logout(); router.push('/'); }}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none', background: 'transparent', color: 'rgba(255,100,100,0.7)', fontSize: 13, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', display: 'flex', gap: 10, alignItems: 'center' }}>
            🔴 로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>대시보드</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>LUMINA 쇼핑몰 운영 현황</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginBottom: 48 }}>
              {[
                { label: '전체 상품', value: products.length + '개', icon: '📦', sub: '6개 카테고리' },
                { label: '총 리뷰 수', value: products.reduce((s, p) => s + p.reviews, 0).toLocaleString() + '개', icon: '⭐', sub: `평균 ${avgRating.toFixed(1)}점` },
                { label: '총 재고', value: products.reduce((s, p) => s + p.stock, 0).toLocaleString() + '개', icon: '📊', sub: '입고 대기: 0' },
                { label: '예상 매출', value: (totalRevenue / 100000000).toFixed(1) + '억', icon: '💰', sub: '리뷰 기반 추산' },
              ].map((stat) => (
                <div key={stat.label} style={{ padding: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{stat.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{stat.sub}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>상품 현황</h2>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['상품명', '카테고리', '가격', '재고', '평점', '상태'].map((h) => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: '14px 20px' }}><span className="tag">{p.category}</span></td>
                      <td style={{ padding: '14px 20px', fontSize: 14 }}>{p.price.toLocaleString()}원</td>
                      <td style={{ padding: '14px 20px', fontSize: 14, color: p.stock < 10 ? '#ff8080' : 'rgba(255,255,255,0.7)' }}>{p.stock}</td>
                      <td style={{ padding: '14px 20px', fontSize: 14, color: '#f5c518' }}>★ {p.rating}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, background: p.featured ? 'rgba(100,255,150,0.1)' : 'rgba(255,255,255,0.05)', color: p.featured ? '#80ffaa' : 'rgba(255,255,255,0.4)', border: `1px solid ${p.featured ? 'rgba(100,255,150,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
                          {p.featured ? '추천' : '일반'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>상품 관리</h1>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>총 {products.length}개 상품</p>
              </div>
              <button onClick={() => setTab('add')} className="btn-primary">+ 상품 등록</button>
            </div>

            {saved && (
              <div style={{ marginBottom: 20, padding: '16px 20px', background: 'rgba(100,255,150,0.1)', border: '1px solid rgba(100,255,150,0.2)', borderRadius: 12, color: '#80ffaa', fontSize: 14 }}>
                ✓ 상품이 성공적으로 저장되었습니다.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {products.map((p) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{p.category} · {p.price.toLocaleString()}원 · 재고 {p.stock}개</div>
                  </div>
                  {p.badge && <span className="tag">{p.badge}</span>}
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={() => handleEdit(p)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>수정</button>
                    <button onClick={() => deleteProduct(p.id)} style={{ padding: '8px 16px', background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: 8, color: '#ff8080', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD / EDIT */}
        {tab === 'add' && (
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
              {editId ? '상품 수정' : '새 상품 등록'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>AI 자동 완성 또는 직접 입력</p>

            {/* AI Section */}
            {!editId && (
              <div style={{ marginBottom: 48, padding: '32px', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(20px)' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>✨</span>
                    <h2 style={{ fontSize: 20, fontWeight: 700 }}>AI 자동 상품 생성</h2>
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>제품 이름을 입력하면 AI가 자동으로 스펙, 설명, 카테고리, 가격을 생성합니다.</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <input type="text" value={aiName} onChange={(e) => setAiName(e.target.value)} placeholder="예: 화이트 LED 링 펜던트 60cm" className="input-dark" style={{ flex: 1 }}
                      onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()} />
                    <button onClick={handleAIGenerate} disabled={aiLoading || !aiName.trim()} style={{
                      padding: '12px 24px', borderRadius: 12,
                      background: aiDone ? 'rgba(100,255,150,0.2)' : aiLoading ? 'rgba(255,255,255,0.1)' : '#fff',
                      color: aiDone ? '#80ffaa' : aiLoading ? 'rgba(255,255,255,0.5)' : '#000',
                      fontSize: 14, fontWeight: 700, cursor: aiLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                      minWidth: 120, transition: 'all 0.3s', border: `1px solid ${aiDone ? 'rgba(100,255,150,0.3)' : 'transparent'}`,
                    }}>
                      {aiDone ? '✓ 완료!' : aiLoading ? '생성 중...' : 'AI 생성'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              {INPUT('상품명', 'name')}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>카테고리</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="input-dark" style={{ appearance: 'none', cursor: 'pointer' }}>
                  {['pendant', 'strip', 'panel', 'track', 'outdoor', 'accessory'].map((c) => <option key={c} value={c} style={{ background: '#1a1a1a' }}>{c}</option>)}
                </select>
              </div>
              {INPUT('판매가 (원)', 'price', 'number')}
              {INPUT('정가 (원, 선택)', 'originalPrice', 'number')}
              {INPUT('재고', 'stock', 'number')}
              {INPUT('배지 (NEW/BEST/SALE)', 'badge')}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>상품 설명</label>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={4} className="input-dark" style={{ resize: 'vertical', lineHeight: 1.6 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              {/* Images */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                  <span>상품 이미지 (Cloudinary)</span>
                  <CloudinaryUpload label="이미지 추가" folder="led-products" onSuccess={(url) => setForm((f: any) => ({ ...f, images: [...(f.images || []), url] }))} />
                </label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {(form.images || []).map((img, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={img} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }} />
                      <button onClick={() => setForm((f: any) => ({ ...f, images: f.images.filter((_: any, idx: number) => idx !== i) }))} style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>×</button>
                    </div>
                  ))}
                  {(form.images || []).length === 0 && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', padding: 20, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 8, width: '100%', textAlign: 'center' }}>이미지를 업로드해주세요</div>}
                </div>
              </div>

              {/* Certificates */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                  <span>인증서 파일 (KC 등)</span>
                  <CloudinaryUpload label="인증서 추가" folder="led-certificates" onSuccess={(url) => setForm((f: any) => ({ ...f, certificates: [...(f.certificates || []), url] }))} />
                </label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexDirection: 'column' }}>
                  {(form as any).certificates?.map((cert: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <a href={cert} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                        📄 인증서 {i + 1}
                      </a>
                      <button onClick={() => setForm((f: any) => ({ ...f, certificates: f.certificates.filter((_: any, idx: number) => idx !== i) }))} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>삭제</button>
                    </div>
                  ))}
                  {((form as any).certificates || []).length === 0 && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', padding: 20, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 8, width: '100%', textAlign: 'center' }}>KC 또는 기타 인증서를 업로드해주세요</div>}
                </div>
              </div>
            </div>

            {/* Specs */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>스펙 ({Object.keys(form.specs).length}개)</label>
              {Object.entries(form.specs).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, background: 'rgba(255,255,255,0.06)', padding: '8px 14px', borderRadius: 8, minWidth: 100, color: 'rgba(255,255,255,0.7)' }}>{k}</span>
                  <span style={{ fontSize: 13, color: '#fff', flex: 1 }}>{v}</span>
                  <button onClick={() => { const s = { ...form.specs }; delete s[k]; setForm((f) => ({ ...f, specs: s })); }} style={{ background: 'none', border: 'none', color: 'rgba(255,50,50,0.6)', cursor: 'pointer', fontSize: 18 }}>×</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <input type="text" placeholder="항목명 (예: 전력)" value={specInput} onChange={(e) => setSpecInput(e.target.value)} className="input-dark" style={{ flex: 1 }} />
                <input type="text" id="spec-val" placeholder="값 (예: 50W)" className="input-dark" style={{ flex: 1 }} />
                <button onClick={() => {
                  const valEl = document.getElementById('spec-val') as HTMLInputElement;
                  if (specInput && valEl?.value) { setForm((f) => ({ ...f, specs: { ...f.specs, [specInput]: valEl.value } })); setSpecInput(''); valEl.value = ''; }
                }} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  + 추가
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 32 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#fff' }} />
                베스트 추천 상품으로 등록
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleSave} disabled={!form.name || !form.price} style={{
                padding: '14px 32px', borderRadius: 12, border: 'none',
                background: !form.name || !form.price ? 'rgba(255,255,255,0.1)' : '#fff',
                color: !form.name || !form.price ? 'rgba(255,255,255,0.3)' : '#000',
                fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {editId ? '수정 저장' : '상품 등록'}
              </button>
              <button onClick={() => { setTab('products'); setEditId(null); setForm({ ...EMPTY_PRODUCT }); }}
                style={{ padding: '14px 24px', borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
