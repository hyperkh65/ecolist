'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/lib/store';

export default function AdminLoginPage() {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAdminStore((s) => s.login);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (login(pw)) {
      router.push('/admin');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
      setLoading(false);
    }
  };

  return (
    <main style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 420, padding: 24 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.3) 60%, transparent 100%)', boxShadow: '0 0 40px rgba(255,255,255,0.2)', margin: '0 auto 20px', animation: 'glow-pulse 3s ease-in-out infinite' }} />
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 8 }}>LUMINA Admin</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>관리자 전용 페이지</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 36 }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>비밀번호</label>
            <input
              type="password" value={pw} onChange={(e) => { setPw(e.target.value); setError(''); }}
              placeholder="관리자 비밀번호 입력" className="input-dark" autoFocus
              style={{ fontSize: 16 }}
            />
            {error && <p style={{ marginTop: 8, fontSize: 13, color: '#ff8080' }}>{error}</p>}
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: loading ? 'rgba(255,255,255,0.1)' : '#fff',
            color: loading ? 'rgba(255,255,255,0.5)' : '#000',
            fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', transition: 'all 0.2s',
          }}>
            {loading ? '로그인 중...' : '로그인'}
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            힌트: admin1234
          </p>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← 쇼핑몰로 돌아가기</a>
        </div>
      </div>

      <style>{`@keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(255,255,255,0.2)} 50%{box-shadow:0 0 40px rgba(255,255,255,0.4)} }`}</style>
    </main>
  );
}
