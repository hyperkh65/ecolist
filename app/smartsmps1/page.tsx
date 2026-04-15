'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ManualTabs from '@/components/ManualTabs';
import SmartSMPSManual from '@/components/SmartSMPSManual';
import { Zap, ShieldCheck, Activity, Cpu } from 'lucide-react';

export default function SmartSMPSPage() {
  const pageUrl = "https://newhome2026.vercel.app/smartsmps1";
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
            <Zap size={16} color="var(--primary)" />
            <span>최첨단 전력 공학 및 디밍 솔루션</span>
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>
            스마트 LED SMPS <br />
            <span className="text-gradient">초정밀 전력 제어 매뉴얼</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--gray-600)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            단순한 전압 변환을 넘어 0.1% 미세 디밍과 서지 방호 기술을 다룹니다. 시스템의 심장부인 컨버터 설계의 정수를 실전 데이터로 확인하세요.
          </p>
        </div>
      </section>

      {/* Interactive Manual Section */}
      <section style={{ padding: '100px 24px', background: '#020617' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SmartSMPSManual />
        </div>
      </section>

      <Footer />
    </main>
  );
}
