'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ManualTabs from '@/components/ManualTabs';
import LEDCircuitInteractive from '@/components/LEDCircuitInteractive';
import { Workflow, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function LEDCircuitPage() {
  const pageUrl = "https://newhome2026.vercel.app/led-circuit1";
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
            <Workflow size={16} color="var(--primary)" />
            <span>임계 전압(Vf) 및 시스템 광효율 최적화 설계</span>
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>
            LED 모듈 직·병렬 설계 및 <br />
            <span className="text-gradient">컨버터 매칭 실무 매뉴얼</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--gray-600)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
             정적 계산을 넘어 칩 사양, 컨버터 효율, 커버 투과율까지 고려한 시스템적 접근이 필요합니다. 0.1V의 정밀 비닝 전략이 최고의 품질을 만듭니다.
          </p>
        </div>
      </section>

      {/* Interactive Manual Section */}
      <section style={{ padding: '100px 24px', background: '#020617' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <LEDCircuitInteractive />
        </div>
      </section>

      <Footer />
    </main>
  );
}
