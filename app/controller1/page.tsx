'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ManualTabs from '@/components/ManualTabs';
import ControllerManualInteractive from '@/components/ControllerManualInteractive';
import { Settings, Cpu, Zap, Activity } from 'lucide-react';

export default function ControllerPage() {
  const pageUrl = "https://newhome2026.vercel.app/controller1";
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
            <Settings size={16} color="var(--primary)" />
            <span>지능형 MPPT 및 스마트 센싱 기술</span>
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>
            컨트롤러 설정 및 <br />
            <span className="text-gradient">실무 센싱 기술 매뉴얼</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--gray-600)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            태양광 패널의 물리적 생산 한계를 뛰어넘는 MPPT 알고리즘과 도심 환경에 최적화된 스마트 디밍 로직, 무선 IoT 관제 기술의 정수를 다룹니다.
          </p>
        </div>
      </section>

      {/* Interactive Manual Section */}
      <section style={{ padding: '100px 24px', background: '#020617' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <ControllerManualInteractive />
        </div>
      </section>

      <Footer />
    </main>
  );
}
