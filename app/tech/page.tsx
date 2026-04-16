'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import FactoryHighbayPromotion from '@/components/FactoryHighbayPromotion';

export default function TechPage() {
  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navbar />
      
      {/* 프리미엄 누끼 디자인이 적용된 하이베이 엔지니어링 매뉴얼 */}
      <FactoryHighbayPromotion />

      {/* 푸터 영역은 컴포넌트 내부에 포함되어 있으므로 추가적인 래퍼만 제공 */}
      <style jsx global>{`
        body {
          background-color: #000000;
          margin: 0;
          padding: 0;
        }
        /* 스크롤바 디자인 최적화 */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </main>
  );
}
