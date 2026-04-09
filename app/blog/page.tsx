'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  attachments?: { name: string; url: string }[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'blog')
        .order('created_at', { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '160px 24px 80px' }}>
        <header style={{ marginBottom: 80, textAlign: 'center' }}>
          <h1 style={{ fontSize: 56, fontWeight: 900, color: '#0f172a', marginBottom: 20, letterSpacing: '-0.04em' }}>와이앤케이 블로그</h1>
          <p style={{ color: '#64748b', fontSize: 20, maxWidth: 600, margin: '0 auto' }}>최신 LED 기술 트렌드와 산업 현장 소식을 전해드립니다.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', fontSize: 18, color: '#94a3b8' }}>소식을 불러오는 중...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 40 }}>
            {posts.length > 0 ? posts.map(post => (
              <article key={post.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Image Placeholder or First Attachment Image */}
                <div style={{ aspectRatio: '16/9', background: '#f8fafc', borderRadius: 20, overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                   <img 
                      src={post.attachments?.[0]?.url || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                   />
                </div>
                
                <div>
                  <div style={{ fontSize: 13, color: '#3b82f6', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Editorial</div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16, lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.6, marginBottom: 24, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.content}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, color: '#94a3b8' }}>{new Date(post.created_at).toLocaleDateString()}</span>
                    <button style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0, borderBottom: '2px solid #0f172a' }}>
                      자세히 보기
                    </button>
                  </div>
                </div>
              </article>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>아직 등록된 블로그 글이 없습니다.</div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
