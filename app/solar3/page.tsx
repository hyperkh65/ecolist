'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ManualTabs from '@/components/ManualTabs';
import BatteryManualInteractive from '@/components/BatteryManualInteractive';
import { Battery, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function BatteryManualPage() {
  const pageUrl = "https://newhome2026.vercel.app/solar3";
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
            <Battery size={16} color="var(--primary)" />
            <span>ESS 및 리튬인산철(LiFePO4) 정밀 설계 가이드</span>
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>
            배터리 용량 산출 및 <br />
            <span className="text-gradient">실무 유지보수 매뉴얼</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--gray-600)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            현장에서 즉시 활용 가능한 용량 산출 공식과 BMS 보호 로직, 온도에 따른 수명 저하 시뮬레이션을 제공합니다. 100% 실무 중심의 에너지 저장 시스템 가이드입니다.
          </p>
        </div>
      </section>

      {/* Interactive Manual Section */}
      <section style={{ padding: '100px 24px', background: '#020617' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <BatteryManualInteractive />
        </div>
      </section>

      <Footer />
    </main>
  );
}
