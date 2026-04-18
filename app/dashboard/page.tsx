'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, LineChart, TrendingUp } from 'lucide-react';
import { PortalHeader, PortalShell, SectionHeading } from '@/components/EcolistShell';
import { formatCompactDate, toKRW } from '@/lib/ecolist';

type MarketData = {
  success: boolean;
  timestamp: string;
  rates: { usd: number; cny: number; jpy: number };
  metals: Record<string, { price: number; prev: number; change: number; changePct: number }>;
  history: Array<{ date: string; usd: number; cny: number; jpy: number; aluminum: number; copper: number; nickel: number; zinc: number; lead: number }>;
};

function Sparkline({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null;
  const w = 240;
  const h = 84;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 10) - 5;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardPage() {
  const [market, setMarket] = useState<MarketData | null>(null);

  useEffect(() => {
    fetch('/api/market', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setMarket)
      .catch(() => setMarket(null));
  }, []);

  const history = market?.history ?? [];
  const usdSeries = history.map((d) => Number(d.usd || 0)).filter((v) => v > 0);
  const cnySeries = history.map((d) => Number(d.cny || 0)).filter((v) => v > 0);
  const copperSeries = history.map((d) => Number(d.copper || 0)).filter((v) => v > 0);
  const lastDate = market?.timestamp ? formatCompactDate(market.timestamp) : '로딩 중';

  const cards = useMemo(() => {
    return [
      { label: 'USD / KRW', value: market?.rates?.usd?.toFixed(2) ?? '-', tone: '#38bdf8' },
      { label: 'CNY / KRW', value: market?.rates?.cny?.toFixed(2) ?? '-', tone: '#f97316' },
      { label: 'JPY / 100', value: market ? (market.rates.jpy * 100).toFixed(2) : '-', tone: '#f59e0b' },
      { label: '구리', value: market?.metals?.copper?.price ? toKRW(market.metals.copper.price) : '-', tone: '#22c55e' },
    ];
  }, [market]);

  return (
    <PortalShell>
      <PortalHeader
        kicker="DASHBOARD"
        title="시장 대시보드"
        description="환율과 원자재의 움직임을 시각적으로 읽고, 주간 리포트와 뉴스의 배경을 한 번에 보는 대시보드입니다."
        actionHref="/reports"
        actionLabel="리포트"
      />

      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <SectionHeading
            kicker="LIVE SNAPSHOT"
            title="지금의 시장"
            description={`최근 업데이트: ${lastDate}`}
            action={<Link href="/" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>홈으로 <ArrowRight size={16} /></Link>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14, marginBottom: 18 }}>
            {cards.map((card) => (
              <div key={card.label} style={{ padding: 18, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10, fontWeight: 700 }}>{card.label}</div>
                <div style={{ fontSize: 28, fontWeight: 950, color: '#fff', letterSpacing: '-0.05em' }}>{card.value}</div>
                <div style={{ marginTop: 12, height: 2, background: card.tone, borderRadius: 999, opacity: 0.7 }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#7dd3fc', letterSpacing: 2.5, fontWeight: 800, marginBottom: 8 }}>USD TREND</div>
                  <div style={{ fontSize: 18, color: '#fff', fontWeight: 900 }}>USD / KRW</div>
                </div>
                <BarChart3 size={18} color="#7dd3fc" />
              </div>
              <Sparkline values={usdSeries} color="#38bdf8" />
            </div>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#7dd3fc', letterSpacing: 2.5, fontWeight: 800, marginBottom: 8 }}>CNY TREND</div>
                  <div style={{ fontSize: 18, color: '#fff', fontWeight: 900 }}>CNY / KRW</div>
                </div>
                <LineChart size={18} color="#7dd3fc" />
              </div>
              <Sparkline values={cnySeries} color="#f97316" />
            </div>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#7dd3fc', letterSpacing: 2.5, fontWeight: 800, marginBottom: 8 }}>COPPER TREND</div>
                  <div style={{ fontSize: 18, color: '#fff', fontWeight: 900 }}>구리</div>
                </div>
                <TrendingUp size={18} color="#7dd3fc" />
              </div>
              <Sparkline values={copperSeries} color="#22c55e" />
            </div>
          </div>

          <div style={{ marginTop: 18, padding: 22, borderRadius: 22, background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,64,175,0.92))', border: '1px solid rgba(148,163,184,0.14)' }}>
            <div style={{ fontSize: 12, color: '#7dd3fc', letterSpacing: 3, fontWeight: 800, marginBottom: 12 }}>WORKFLOW</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
              {[
                '1. 시장 데이터 수집',
                '2. 뉴스 스크랩',
                '3. 자동 요약',
                '4. 리포트/팟캐스트 발행',
              ].map((item) => (
                <div key={item} style={{ padding: 16, borderRadius: 18, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontWeight: 800, lineHeight: 1.4 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
