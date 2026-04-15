'use client';
import React from 'react';
import MaterialManualInteractive from '@/components/MaterialManualInteractive';
import ManualSidebar from '@/components/ManualSidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MaterialPage() {
  const pageUrl = "https://newhome2026.vercel.app/material1";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pageUrl}`;

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Navbar />
      <ManualSidebar />
      
      <div style={{ padding: '80px 20px' }}>
        {/* Header with QR Code for Mobile Access */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto 40px auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(168, 85, 247, 0.2)'
        }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              실무 소재 사전: 플라스틱 & 비철금속
            </h2>
            <p style={{ color: '#c084fc', fontSize: '18px' }}>
              PC, ABS, ASA 및 알루미늄 다이캐스팅의 특성과 옥외 내후성 가이드
            </p>
          </div>
          
          <div style={{ 
            background: '#fff', 
            padding: '16px', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <img src={qrUrl} alt="QR Code for Mobile Access" width={120} height={120} />
            <p style={{ color: '#0f172a', fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>모바일로 보기</p>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <MaterialManualInteractive />
        </div>
      </div>
      <Footer />
    </main>
  );
}
