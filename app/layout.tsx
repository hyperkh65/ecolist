import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUMINA — 프리미엄 LED 조명',
  description: '인테리어를 완성하는 프리미엄 LED 조명. 펜던트, 스트립, 패널, 트랙 조명까지 모든 공간에 어울리는 완벽한 빛을 제공합니다.',
  keywords: 'LED 조명, 인테리어 조명, 펜던트, 스트립 LED, 패널 조명, 스마트 조명',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
