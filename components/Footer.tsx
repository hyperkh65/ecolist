'use client';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/useSiteSettings';

export default function Footer() {
  const settings = useSiteSettings();
  
  // Default values if settings haven't loaded yet
  const c = settings?.company || {
    name: '(주)와이앤케이',
    address: '인천광역시 미추홀구 경인로112 4층',
    tel: '032-862-1350',
    fax: '032-863-1351',
    email: 'contact@ynk2014.com',
    business_id: '131-86-67779',
    about_text: '글로벌 LED 스탠다드를 주도하는 신뢰할 수 있는 무역 파트너'
  };

  return (
    <footer style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '80px 24px 40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 60 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 13 }}>YnK</span>
              </div>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{c.name}</span>
            </div>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 16 }}>
              {c.about_text}
            </p>
            <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              <strong>주소:</strong> {c.address} <br />
              <strong>Tel:</strong> {c.tel} | <strong>Fax:</strong> {c.fax}<br />
              <strong>Email:</strong> {c.email}
            </div>
          </div>

          {[
            { title: '제품 및 인증 조회', links: [{ label: '스마트조명', href: '/shop' }, { label: '실내조명', href: '/shop' }, { label: '산업/실외조명', href: '/shop' }] },
            { title: '무역 파트너스', links: [{ label: '수입/수출 절차 안내', href: '/trade-info' }, { label: '필수 인증서 정보', href: '/trade-info' }, { label: '운송/물류 트래킹', href: '/tracking' }] },
            { title: '고객지원', links: [{ label: '회사 소개 및 오시는 길', href: '/about' }, { label: '게시판', href: '/board' }, { label: '블로그', href: '/blog' }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 20, color: '#0f172a' }}>{col.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} style={{ fontSize: 15, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#0284c7'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#64748b'; }}>{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>© 2026 {c.name}. All rights reserved.</p>
          <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>사업자등록번호: {c.business_id}</p>
        </div>
      </div>
    </footer>
  );
}
