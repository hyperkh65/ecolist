'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminStore, Product } from '@/lib/store';
import CloudinaryUpload from '@/components/CloudinaryUpload';
import { supabase } from '@/lib/supabase';

// --- Types ---
interface Post {
  id?: string;
  type: 'board' | 'blog';
  title: string;
  content: string;
  author: string;
  attachments: { name: string; url: string }[];
  created_at?: string;
}

interface SiteSettings {
  company: {
    name: string;
    address: string;
    tel: string;
    fax: string;
    email: string;
    business_id: string;
    about_text: string;
  };
  menus: { label: string; href: string }[];
}

const EMPTY_POST: Post = { type: 'board', title: '', content: '', author: 'YNK Admin', attachments: [] };

export default function AdminPage() {
  const router = useRouter();
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn);
  const logout = useAdminStore((s) => s.logout);
  const products = useAdminStore((s) => s.products); // Keeping zustand products for now, can sync to supabase later

  const [tab, setTab] = useState<'dashboard' | 'products' | 'board' | 'blog' | 'settings'>('dashboard');
  const [loading, setLoading] = useState(false);
  
  // States for Board/Blog
  const [posts, setPosts] = useState<Post[]>([]);
  const [editPost, setEditPost] = useState<Post | null>(null);
  
  // States for Products
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [editProduct, setEditProduct] = useState<any | null>(null);

  // States for Settings
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (!isLoggedIn) router.push('/admin/login');
    else {
        fetchPosts();
        fetchSettings();
        fetchProducts();
    }
  }, [isLoggedIn]);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setDbProducts(data);
  }

  async function fetchSettings() {
    const { data } = await supabase.from('site_settings').select('*');
    if (data) {
        const company = data.find(d => d.category === 'company')?.config;
        const menus = data.find(d => d.category === 'menu')?.config;
        setSettings({ company, menus });
    }
  }

  if (!isLoggedIn) return null;

  // --- Handlers for Posts ---
  const handleSavePost = async () => {
    if (!editPost) return;
    setLoading(true);
    const { error } = await supabase.from('posts').upsert({
      ...editPost,
      id: editPost.id || undefined 
    });
    if (!error) {
        setEditPost(null);
        fetchPosts();
    }
    setLoading(false);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts();
  };

  // --- Handlers for Products ---
  const handleSaveProduct = async () => {
    if (!editProduct) return;
    setLoading(true);
    const { error } = await supabase.from('products').upsert({
      ...editProduct,
      id: editProduct.id || undefined
    });
    if (!error) {
        setEditProduct(null);
        fetchProducts();
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  // --- Handlers for Settings ---
  const handleSaveSettings = async () => {
    if (!settings) return;
    setLoading(true);
    await supabase.from('site_settings').upsert([
        { category: 'company', config: settings.company },
        { category: 'menu', config: settings.menus }
    ], { onConflict: 'category' });
    alert('설정이 저장되었습니다.');
    setLoading(false);
  };

  const INPUT = (label: string, value: string, onChange: (v: string) => void) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8, textTransform: 'uppercase' }}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="input-dark" />
    </div>
  );

  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, borderRight: '1px solid rgba(255,255,255,0.06)', padding: '32px 0', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '0 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle, #fff, rgba(255,255,255,0.3))', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: 16, fontWeight: 800 }}>YnK Admin</span>
          </div>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase' }}>CMS v2.0</span>
        </div>

        <nav style={{ padding: '20px 12px', flex: 1 }}>
          {[
            { key: 'dashboard', label: '대시보드', icon: '📊' },
            { key: 'products', label: '상품 관리', icon: '📦' },
            { key: 'board', label: '게시판 관리', icon: '📝' },
            { key: 'blog', label: '블로그 관리', icon: '🎨' },
            { key: 'settings', label: '사이트 설정', icon: '⚙️' },
          ].map((item) => (
            <button key={item.key} onClick={() => setTab(item.key as any)}
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
          <button onClick={() => { logout(); router.push('/'); }}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none', background: 'transparent', color: 'rgba(255,100,100,0.7)', fontSize: 13, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', display: 'flex', gap: 10, alignItems: 'center' }}>
            🔴 로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {tab === 'dashboard' && (
           <div>
             <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 40 }}>관리 대시보드</h1>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                <div className="card"><h3>상품</h3><p>{products.length}</p></div>
                <div className="card"><h3>게시글</h3><p>{posts.filter(p=>p.type==='board').length}</p></div>
                <div className="card"><h3>블로그</h3><p>{posts.filter(p=>p.type==='blog').length}</p></div>
                <div className="card"><h3>접속기기</h3><p>Desktop</p></div>
             </div>
           </div>
        )}

        {tab === 'products' && (
           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                <h1>상품 관리</h1>
                <button onClick={() => setEditProduct({ name: '', category: 'indoor', image: '', specs: '', description: '' })} className="btn-primary">+ 새 상품 등록</button>
             </div>

             {editProduct ? (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 32, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      {INPUT('제품명', editProduct.name, (v) => setEditProduct({ ...editProduct, name: v }))}
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>카테고리</label>
                        <select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className="input-dark">
                           <option value="smart">스마트조명</option>
                           <option value="indoor">실내조명</option>
                           <option value="commercial">상업조명</option>
                           <option value="outdoor">산업/실외조명</option>
                           <option value="landscape">경관조명</option>
                           <option value="special">특수조명</option>
                        </select>
                      </div>
                      <div style={{ gridColumn: '1 / span 2' }}>
                         <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>제품 이미지</label>
                         <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            {editProduct.image && <img src={editProduct.image} style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />}
                            <CloudinaryUpload label="이미지 업로드" folder="led-products" onSuccess={(url) => setEditProduct({ ...editProduct, image: url })} />
                         </div>
                      </div>
                      <div style={{ gridColumn: '1 / span 2' }}>
                         {INPUT('주요 사양 (예: 전력, 색온도 등)', editProduct.specs, (v) => setEditProduct({ ...editProduct, specs: v }))}
                      </div>
                      <div style={{ gridColumn: '1 / span 2' }}>
                         <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>제품 설명</label>
                         <textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} 
                                   className="input-dark" rows={4} />
                      </div>
                   </div>
                   
                   <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                      <button onClick={handleSaveProduct} className="btn-primary" disabled={loading}>{loading ? '저장 중...' : '상품 저장'}</button>
                      <button onClick={() => setEditProduct(null)} className="btn-outline">취소</button>
                   </div>
                </div>
             ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                   {dbProducts.map(prod => (
                      <div key={prod.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                         <img src={prod.image} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                         <div style={{ padding: 20 }}>
                            <div style={{ fontSize: 12, color: '#3b82f6', marginBottom: 4 }}>{prod.category.toUpperCase()}</div>
                            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{prod.name}</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                               <button onClick={() => setEditProduct(prod)} className="btn-sm" style={{ flex: 1 }}>수정</button>
                               <button onClick={() => handleDeleteProduct(prod.id)} className="btn-sm-red">삭제</button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             )}
           </div>
        )}

        {(tab === 'board' || tab === 'blog') && (
           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                <h1>{tab === 'board' ? '게시판 관리' : '블로그 관리'}</h1>
                <button onClick={() => setEditPost({ ...EMPTY_POST, type: tab })} className="btn-primary">+ 새 글 작성</button>
             </div>

             {editPost ? (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 32, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                   {INPUT('제목', editPost.title, (v) => setEditPost({ ...editPost, title: v }))}
                   <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>내용</label>
                      <textarea value={editPost.content} onChange={(e) => setEditPost({ ...editPost, content: e.target.value })} 
                                className="input-dark" rows={10} style={{ resize: 'vertical' }} />
                   </div>
                   
                   <div style={{ marginBottom: 24 }}>
                      <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                         <span>첨부파일 ({editPost.attachments.length}/5)</span>
                         {editPost.attachments.length < 5 && (
                           <CloudinaryUpload label="파일 추가" folder="led-attachments" onSuccess={(url) => {
                             const name = url.split('/').pop() || 'file';
                             setEditPost({ ...editPost, attachments: [...editPost.attachments, { name, url }] });
                           }} />
                         )}
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                         {editPost.attachments.map((f, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: 8 }}>
                               <span style={{ fontSize: 13 }}>{f.name}</span>
                               <button onClick={() => {
                                  const att = [...editPost.attachments]; att.splice(i, 1);
                                  setEditPost({ ...editPost, attachments: att });
                               }} style={{ color: '#ff8080', background: 'none', border: 'none', cursor: 'pointer' }}>삭제</button>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div style={{ display: 'flex', gap: 12 }}>
                      <button onClick={handleSavePost} className="btn-primary" disabled={loading}>{loading ? '저장 중...' : '저장하기'}</button>
                      <button onClick={() => setEditPost(null)} className="btn-outline">취소</button>
                   </div>
                </div>
             ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                   {posts.filter(p => p.type === tab).map(post => (
                      <div key={post.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                         <div>
                            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{post.title}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{new Date(post.created_at!).toLocaleDateString()} · {post.author}</div>
                         </div>
                         <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => setEditPost(post)} className="btn-sm">수정</button>
                            <button onClick={() => handleDeletePost(post.id!)} className="btn-sm-red">삭제</button>
                         </div>
                      </div>
                   ))}
                </div>
             )}
           </div>
        )}

        {tab === 'settings' && settings && (
           <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                 <h1>관리자 설정 (CMS)</h1>
                 <button onClick={handleSaveSettings} className="btn-primary" disabled={loading}>{loading ? '반영하기' : '설정 저장'}</button>
              </div>

              <section style={{ marginBottom: 48 }}>
                 <h2 style={{ fontSize: 18, marginBottom: 20, color: '#3b82f6' }}>🏢 회사 정보 관리</h2>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {INPUT('회사명', settings.company.name, (v) => setSettings({ ...settings, company: { ...settings.company, name: v } }))}
                    {INPUT('사업자번호', settings.company.business_id, (v) => setSettings({ ...settings, company: { ...settings.company, business_id: v } }))}
                    {INPUT('전화번호', settings.company.tel, (v) => setSettings({ ...settings, company: { ...settings.company, tel: v } }))}
                    {INPUT('팩스번호', settings.company.fax, (v) => setSettings({ ...settings, company: { ...settings.company, fax: v } }))}
                    {INPUT('이메일', settings.company.email, (v) => setSettings({ ...settings, company: { ...settings.company, email: v } }))}
                    <div style={{ gridColumn: '1 / span 2' }}>
                       {INPUT('주소', settings.company.address, (v) => setSettings({ ...settings, company: { ...settings.company, address: v } }))}
                    </div>
                    <div style={{ gridColumn: '1 / span 2' }}>
                       <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>회사 소개 (About)</label>
                       <textarea value={settings.company.about_text} onChange={(e) => setSettings({ ...settings, company: { ...settings.company, about_text: e.target.value } })} 
                                 className="input-dark" rows={5} />
                    </div>
                 </div>
              </section>

              <section>
                 <h2 style={{ fontSize: 18, marginBottom: 20, color: '#3b82f6' }}>🗺️ 메뉴 이름 관리</h2>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                    {settings.menus.map((menu, i) => (
                       <div key={i}>
                          <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{menu.href}</label>
                          <input type="text" value={menu.label} onChange={(e) => {
                             const m = [...settings.menus]; m[i].label = e.target.value;
                             setSettings({ ...settings, menus: m });
                          }} className="input-dark" />
                       </div>
                    ))}
                 </div>
              </section>
           </div>
        )}

      </div>

      <style jsx>{`
        .card { background: rgba(255,255,255,0.03); padding: 24px; borderRadius: 16px; border: 1px solid rgba(255,255,255,0.06); }
        .card h3 { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase' }
        .card p { fontSize: 28, fontWeight: 900 }
        .btn-primary { background: #fff; color: #000; padding: 12px 24px; border: none; borderRadius: 12px; fontWeight: 700; cursor: pointer; transition: 0.2s; }
        .btn-primary:hover { background: #e2e8f0; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 12px 24px; borderRadius: 12px; fontWeight: 600; cursor: pointer; }
        .btn-sm { background: rgba(255,255,255,0.1); color: #fff; padding: 6px 12px; border: none; borderRadius: 6px; fontSize: 12; cursor: pointer; }
        .btn-sm-red { background: rgba(255,50,50,0.1); color: #ff8080; padding: 6px 12px; border: none; borderRadius: 6px; fontSize: 12; cursor: pointer; }
        .input-dark { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); borderRadius: 12px; padding: 12px 16px; color: #fff; fontSize: 14; fontFamily: inherit; }
        .tag { fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }
      `}</style>
    </main>
  );
}
