import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ecolist Finance',
  description: '환율, 뉴스, 주간 리포트, 팟캐스트를 한 곳에서 보는 금융 인텔리전스 포털',
  keywords: '금융, 환율, 경제뉴스, 주간리포트, 팟캐스트, Ecolist, 시장 대시보드',
  icons: {
    icon: '/window.svg',
    shortcut: '/window.svg',
    apple: '/window.svg',
  },
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
