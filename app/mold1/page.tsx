'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ManualTabs from '@/components/ManualTabs';
import MoldManualInteractive from '@/components/MoldManualInteractive';
import { Layers, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function MoldPage() {
  const pageUrl = "https://newhome2026.vercel.app/mold1";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pageUrl}`;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--gray-50)' }}>
      <Navbar />
      <ManualSidebar />
      <ManualTabs />

      {/* Hero Header Section */}
      <section style={{ padding: '160px 24px 80px', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', right: '40px', top: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'var(--white)', padding: '16px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid var(--gray-200)' }}>
           <img src={qrUrl} alt="Mobile QR Code" width="100" height="100" style={{ display: 'block', borderRadius: '8px' }} />
           <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>📷 모바일에서 보기 스캔</span>
        </div>

        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--gray-100)', borderRadius: 50, color: 'var(--gray-700)', fontWeight: 700, fontSize: 13, marginBottom: 24, border: '1px solid var(--gray-200)' }}>
            <Layers size={16} color="var(--primary)" />
            <span>정밀 금형 설계 및 사출·압출 공학</span>
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>
            정밀 금형 설계 및 <br />
            <span className="text-gradient">실무 공정 매뉴얼</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--gray-600)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            사출, 압출뿐만 아니라 고난이도 이중 사출 및 이중 압출 공정의 파라미터를 다룹니다. 수축률 계산부터 불량 해결까지 최고의 실무 지침서입니다.
          </p>
        </div>
      </section>

      {/* Interactive Manual Section */}
      <section style={{ padding: '100px 24px', background: '#020617' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <MoldManualInteractive />
        </div>
      </section>

      <Footer />
    </main>
  );
}
