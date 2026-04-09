'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  attachments: { name: string; url: string }[];
}

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'board')
        .order('created_at', { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '160px 24px 80px' }}>
        <header style={{ marginBottom: 48, textAlign: 'center' }}>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>사내 게시판</h1>
          <p style={{ color: '#64748b', fontSize: 18 }}>중요 공지사항 및 기술 자료를 확인하실 수 있습니다.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>연결 중...</div>
        ) : selectedPost ? (
          <div style={{ background: '#fff', padding: 40, borderRadius: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <button onClick={() => setSelectedPost(null)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              ← 목록으로 돌아가기
            </button>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>{selectedPost.title}</h2>
            <div style={{ display: 'flex', gap: 16, color: '#94a3b8', fontSize: 14, marginBottom: 32, borderBottom: '1px solid #f1f5f9', paddingBottom: 16 }}>
              <span>작성자: {selectedPost.author}</span>
              <span>•</span>
              <span>날짜: {new Date(selectedPost.created_at).toLocaleDateString()}</span>
            </div>
            
            <div style={{ lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-wrap', marginBottom: 48 }}>
              {selectedPost.content}
            </div>

            {selectedPost.attachments && selectedPost.attachments.length > 0 && (
              <div style={{ background: '#f1f5f9', padding: 24, borderRadius: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                   📎 첨부파일 ({selectedPost.attachments.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selectedPost.attachments.map((file, i) => (
                    <a key={i} href={file.url} download target="_blank" rel="noreferrer" 
                       style={{ background: '#fff', padding: '12px 20px', borderRadius: 10, color: '#0f172a', textDecoration: 'none', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', transition: '0.2s' }}
                       onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}>
                      <span>{file.name}</span>
                      <span style={{ color: '#3b82f6', fontWeight: 600 }}>다운로드</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '20px', textAlign: 'left', color: '#64748b', fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>제목</th>
                  <th style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', width: 120 }}>작성자</th>
                  <th style={{ padding: '20px', textAlign: 'right', color: '#64748b', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', width: 150 }}>날짜</th>
                </tr>
              </thead>
              <tbody>
                {posts.length > 0 ? posts.map(post => (
                  <tr key={post.id} onClick={() => setSelectedPost(post)} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: '0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}>
                    <td style={{ padding: '20px' }}>
                      <div style={{ color: '#0f172a', fontWeight: 600, fontSize: 16 }}>{post.title}</div>
                      {post.attachments && post.attachments.length > 0 && <span style={{ fontSize: 11, color: '#3b82f6', background: '#eff6ff', padding: '2px 8px', borderRadius: 20, marginLeft: 8 }}>파일 {post.attachments.length}개</span>}
                    </td>
                    <td style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: 14 }}>{post.author}</td>
                    <td style={{ padding: '20px', textAlign: 'right', color: '#94a3b8', fontSize: 14 }}>{new Date(post.created_at).toLocaleDateString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} style={{ padding: '100px 0', textAlign: 'center', color: '#94a3b8' }}>등록된 게시물이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
