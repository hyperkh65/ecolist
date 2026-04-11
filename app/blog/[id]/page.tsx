'use client';
import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string; title: string; content: string; author: string;
  created_at: string; cover_image?: string;
  attachments?: { name: string; url: string }[];
}

const PROSE = `
  .prose-content { line-height: 1.85; color: #334155; font-size: 15px; }
  .prose-content h2 { font-size: 22px; font-weight: 800; margin: 28px 0 12px; color: #0f172a; }
  .prose-content h3 { font-size: 18px; font-weight: 700; margin: 20px 0 10px; color: #1e293b; }
  .prose-content h4 { font-size: 14px; font-weight: 700; margin: 14px 0 6px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
  .prose-content ul, .prose-content ol { padding-left: 22px; margin: 10px 0; }
  .prose-content li { margin: 6px 0; }
  .prose-content blockquote { border-left: 3px solid #0ea5e9; margin: 16px 0; padding: 12px 20px; background: #f0f9ff; border-radius: 0 10px 10px 0; color: #0369a1; }
  .prose-content hr { border: none; border-top: 1px solid #e2e8f0; margin: 28px 0; }
  .prose-content img { max-width: 100%; border-radius: 12px; margin: 14px 0; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
  .prose-content a { color: #0ea5e9; text-decoration: underline; }
  .prose-content video { max-width: 100%; border-radius: 12px; margin: 14px 0; }
  .prose-content iframe { max-width: 100%; border-radius: 12px; }
  .prose-content s { opacity: 0.5; }
  .prose-content p { margin: 10px 0; }
`;

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('posts').select('*').eq('id', id).eq('type', 'blog').single();
      if (data) setPost(data as BlogPost);
      const { data: related } = await supabase.from('posts').select('id, title, cover_image, created_at, content')
        .eq('type', 'blog').neq('id', id).order('created_at', { ascending: false }).limit(3);
      if (related) setRelatedPosts(related as BlogPost[]);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
        <div style={{ width: 36, height: 36, border: '2px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 14px' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        로딩 중...
      </div>
    </div>
  );

  if (!post) return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '160px 24px' }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🔍</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>글을 찾을 수 없습니다</h1>
        <Link href="/blog" style={{ display: 'inline-block', padding: '12px 24px', background: '#0ea5e9', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>블로그로 돌아가기</Link>
      </div>
      <Footer />
    </div>
  );

  const excerpt = (html: string, len = 80) => {
    const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    return text.length > len ? text.slice(0, len) + '…' : text;
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />
      <style>{PROSE}</style>

      {/* 커버 이미지 */}
      {post.cover_image && (
        <div style={{ height: 400, overflow: 'hidden', background: '#0f172a' }}>
          <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
        </div>
      )}

      <main style={{ maxWidth: 760, margin: '0 auto', padding: post.cover_image ? '40px 24px 80px' : '100px 24px 80px' }}>
        {/* 뒤로가기 */}
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0ea5e9', fontWeight: 700, textDecoration: 'none', fontSize: 14, marginBottom: 28 }}>
          ← 블로그 목록
        </Link>

        {/* 게시글 본문 */}
        <article style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
          {/* 헤더 */}
          <div style={{ padding: '40px 48px 32px', borderBottom: '1px solid #f1f5f9' }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', lineHeight: 1.3, marginBottom: 20, letterSpacing: -0.5 }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', gap: 16, color: '#94a3b8', fontSize: 13, alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 800 }}>
                  {post.author?.[0]?.toUpperCase() || 'Y'}
                </span>
                <strong style={{ color: '#475569' }}>{post.author}</strong>
              </span>
              <span>·</span>
              <span>{new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* 본문 */}
          <div className="prose-content" style={{ padding: '36px 48px' }}
            dangerouslySetInnerHTML={{ __html: post.content || '<p style="color:#94a3b8">내용이 없습니다.</p>' }} />

          {/* 첨부파일 */}
          {post.attachments && post.attachments.length > 0 && (
            <div style={{ padding: '24px 48px 40px', borderTop: '1px solid #f1f5f9', background: '#f8fafc' }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>📎 첨부파일 ({post.attachments.length}개)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {post.attachments.map((f, i) => (
                  <a key={i} href={f.url} download target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a', transition: '0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#0ea5e9'; (e.currentTarget as HTMLAnchorElement).style.background = '#f0f9ff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLAnchorElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>📄 {f.name}</span>
                    <span style={{ fontSize: 13, color: '#0ea5e9', fontWeight: 700 }}>↓ 다운로드</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* 관련 글 */}
        {relatedPosts.length > 0 && (
          <section style={{ marginTop: 60 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 24, letterSpacing: -0.3 }}>관련 블로그 글</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
              {relatedPosts.map(rp => (
                <Link key={rp.id} href={`/blog/${rp.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', transition: '0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                    <div style={{ height: 120, overflow: 'hidden', background: '#f1f5f9' }}>
                      {rp.cover_image
                        ? <img src={rp.cover_image} alt={rp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, opacity: 0.2 }}>✍️</div>}
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 6, lineHeight: 1.4 }}>{rp.title}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{excerpt(rp.content || '')}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
