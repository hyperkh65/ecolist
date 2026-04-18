'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, Compass, Mic2, Newspaper, ShieldCheck } from 'lucide-react';

export const ECOLIST_NAV = [
  { href: '/', label: '홈' },
  { href: '/reports', label: '주간리포트' },
  { href: '/news', label: '경제뉴스' },
  { href: '/podcast', label: '팟캐스트' },
  { href: '/dashboard', label: '대시보드' },
];

export function PortalShell({ children }: { children: ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #11203d 0%, #08111f 42%, #050b14 100%)', color: '#e2e8f0' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 'auto -10% 70% auto', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 68%)', filter: 'blur(8px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: '18% auto auto -12%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 64%)', pointerEvents: 'none' }} />
        {children}
      </div>
    </main>
  );
}

export function PortalHeader({
  kicker = 'ECOLIST',
  title = '금융을 읽는 가장 빠른 방법',
  description = '환율, 금속, 뉴스, 주간 리포트, 팟캐스트를 한 화면에서 보는 금융 인텔리전스 허브입니다.',
  actionHref = '/reports',
  actionLabel = '리포트 보기',
}: {
  kicker?: string;
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', background: 'rgba(5, 11, 20, 0.72)', borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 16, paddingBottom: 16, flexWrap: 'wrap' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: 15, background: 'linear-gradient(135deg, #38bdf8, #2563eb)', display: 'grid', placeItems: 'center', boxShadow: '0 14px 34px rgba(37,99,235,0.32)' }}>
            <BarChart3 size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 4, color: '#7dd3fc', fontWeight: 800, marginBottom: 4 }}>{kicker}</div>
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>Ecolist Finance</div>
          </div>
        </Link>

        <nav style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {ECOLIST_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: 'none',
                color: '#cbd5e1',
                padding: '10px 14px',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.16)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={actionHref} className="btn-primary" style={{ fontSize: 14 }}>
          {actionLabel} <ArrowRight size={16} />
        </Link>
      </div>

      <div className="container" style={{ paddingBottom: 22, paddingTop: 6 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 0.7fr)', gap: 18, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 4, color: '#7dd3fc', marginBottom: 14 }}>{kicker}</div>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 84px)', lineHeight: 0.94, letterSpacing: '-0.08em', fontWeight: 950, color: '#fff', maxWidth: 760, marginBottom: 18 }}>
              {title}
            </h1>
            <p style={{ maxWidth: 760, fontSize: 18, lineHeight: 1.8, color: '#cbd5e1' }}>{description}</p>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: 18, borderRadius: 22, background: 'linear-gradient(135deg, rgba(14,165,233,0.16), rgba(59,130,246,0.08))', border: '1px solid rgba(125,211,252,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: '#7dd3fc', fontSize: 12, fontWeight: 800, letterSpacing: 1.5 }}>
                <ShieldCheck size={16} /> WEEKLY BRIEF
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: '#e2e8f0' }}>매주 자동 리포트와 뉴스 요약이 업데이트되는 금융 브리핑 허브</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(148,163,184,0.12)' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>포커스</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>환율 · 뉴스 · 리포트</div>
              </div>
              <div style={{ padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(148,163,184,0.12)' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>형태</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>대시보드 + 아카이브</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: 3.5, fontWeight: 800, color: '#7dd3fc', marginBottom: 10 }}>{kicker}</div>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, letterSpacing: '-0.05em', color: '#fff' }}>{title}</h2>
        {description && <p style={{ marginTop: 8, color: '#94a3b8', lineHeight: 1.7, maxWidth: 760, fontSize: 14 }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  sublabel,
  change,
}: {
  label: string;
  value: string;
  sublabel?: string;
  change?: string;
}) {
  return (
    <div style={{ padding: 18, borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(148,163,184,0.14)', boxShadow: '0 18px 40px rgba(0,0,0,0.16)' }}>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 950, color: '#fff', letterSpacing: '-0.05em', marginBottom: 6 }}>{value}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#64748b' }}>{sublabel}</span>
        {change && <span style={{ fontSize: 12, fontWeight: 800, color: '#38bdf8' }}>{change}</span>}
      </div>
    </div>
  );
}

export function ContentCard({
  title,
  description,
  meta,
  tone = 'dark',
  href,
}: {
  title: string;
  description: string;
  meta?: string;
  tone?: 'dark' | 'light';
  href?: string;
}) {
  const body = (
    <div
      style={{
        display: 'block',
        padding: 20,
        borderRadius: 22,
        textDecoration: 'none',
        color: tone === 'dark' ? '#fff' : '#0f172a',
        background: tone === 'dark' ? 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,118,110,0.9))' : '#fff',
        border: tone === 'dark' ? '1px solid rgba(148,163,184,0.12)' : '1px solid #e2e8f0',
        boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
        minHeight: 180,
      }}
    >
      {meta && <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: tone === 'dark' ? '#7dd3fc' : '#0ea5e9', marginBottom: 12 }}>{meta}</div>}
      <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.04em', marginBottom: 12 }}>{title}</div>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: tone === 'dark' ? 'rgba(226,232,240,0.85)' : '#475569' }}>{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href} style={{ textDecoration: 'none' }}>{body}</Link>;
  }
  return body;
}

export function PodcastCard({
  title,
  description,
  duration,
  published,
  audioUrl,
}: {
  title: string;
  description: string;
  duration: string;
  published: string;
  audioUrl?: string;
}) {
  return (
    <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(148,163,184,0.14)', boxShadow: '0 18px 40px rgba(0,0,0,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: '#7dd3fc', letterSpacing: 2.5, fontWeight: 800, marginBottom: 8 }}>PODCAST</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.35 }}>{title}</div>
        </div>
        <Mic2 size={18} color="#7dd3fc" />
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: '#cbd5e1', marginBottom: 16 }}>{description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>{published} · {duration}</div>
        {audioUrl ? (
          <a href={audioUrl} target="_blank" rel="noreferrer" style={{ color: '#7dd3fc', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
            재생
          </a>
        ) : (
          <span style={{ color: '#64748b', fontSize: 13 }}>준비 중</span>
        )}
      </div>
    </div>
  );
}

export function NewsletterBadge({ label }: { label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(125,211,252,0.16)', color: '#7dd3fc', fontSize: 12, fontWeight: 800 }}>
      <Compass size={14} /> {label}
    </span>
  );
}
