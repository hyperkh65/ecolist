'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';

interface MarketData {
  success: boolean;
  timestamp: string;
  rates: { usd: number; cny: number; jpy: number };
  metals: Record<string, { price: number; prev: number; change: number; changePct: number; currency: string; name: string }>;
  history: Array<{ date: string; usd: number; cny: number; jpy: number; aluminum: number; copper: number; nickel: number; zinc: number; lead: number }>;
}

type ChartKey = 'usd' | 'cny' | 'jpy' | 'aluminum' | 'copper' | 'nickel' | 'zinc';
type LongRange = '1y' | '5y' | '10y';

// ── 미니 라인 차트 (기존 카드용) ──────────────────────────────────
function LineChart({ data, color, height = 60 }: { data: number[]; color: string; height?: number }) {
  if (data.length < 2) return null;
  const w = 200, h = height;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
  const area = `0,${h} ` + pts + ` ${w},${h}`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`g-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#g-${color.replace('#','')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// ── 장기 차트 (축 라벨 + 그리드 + 툴팁) ──────────────────────────
function LongChart({
  data, color,
}: {
  data: { date: string; price: number }[];
  color: string;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  if (data.length < 2) return null;

  const W = 600, H = 220;
  const PAD = { top: 16, right: 20, bottom: 28, left: 70 };
  const IW = W - PAD.left - PAD.right;
  const IH = H - PAD.top - PAD.bottom;

  const prices = data.map(d => d.price);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  const rangeP = maxP - minP || 1;

  const cx = (i: number) => PAD.left + (i / (data.length - 1)) * IW;
  const cy = (v: number) => PAD.top + (1 - (v - minP) / rangeP) * IH;

  const pts  = data.map((d, i) => `${cx(i)},${cy(d.price)}`).join(' ');
  const area = `${cx(0)},${PAD.top + IH} ` + pts + ` ${cx(data.length - 1)},${PAD.top + IH}`;

  // Y 라벨 (4개)
  const yTicks = [0, 0.33, 0.67, 1].map(pct => {
    const v = minP + pct * rangeP;
    const label = v >= 100000
      ? `${(v / 1000).toFixed(0)}K`
      : v >= 10000
      ? `${(v / 1000).toFixed(1)}K`
      : v >= 1000
      ? `${(v / 1000).toFixed(2)}K`
      : v.toFixed(1);
    return { y: cy(v), label };
  });

  // X 라벨 (5개 균등)
  const xCount = 5;
  const xTicks = Array.from({ length: xCount }, (_, i) => {
    const idx = Math.round((i / (xCount - 1)) * (data.length - 1));
    return { x: cx(idx), label: data[idx].date.slice(0, 7) };
  });

  // hover 이벤트
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width) * W - PAD.left;
    const idx = Math.round((relX / IW) * (data.length - 1));
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
  };

  const hovered = hoverIdx !== null ? data[hoverIdx] : null;

  return (
    <div style={{ position: 'relative' }}>
      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          background: '#0f172a', color: '#fff', borderRadius: 8, padding: '4px 12px',
          fontSize: 12, fontWeight: 700, pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 10,
        }}>
          {hovered.date} · {hovered.price.toLocaleString()}
        </div>
      )}
      <svg ref={svgRef} width="100%" viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}
        onMouseMove={handleMouseMove} onMouseLeave={() => setHoverIdx(null)}>
        <defs>
          <linearGradient id={`lg2-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* 그리드 */}
        {yTicks.map((t, i) => (
          <line key={i} x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y}
            stroke="#f1f5f9" strokeWidth="1" />
        ))}

        {/* 영역 + 선 */}
        <polygon points={area} fill={`url(#lg2-${color.replace('#','')})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />

        {/* Y 라벨 */}
        {yTicks.map((t, i) => (
          <text key={i} x={PAD.left - 6} y={t.y + 4} textAnchor="end"
            fontSize="9" fill="#94a3b8" fontFamily="monospace">{t.label}</text>
        ))}

        {/* X 라벨 */}
        {xTicks.map((t, i) => (
          <text key={i} x={t.x} y={H - 4} textAnchor="middle"
            fontSize="9" fill="#94a3b8">{t.label}</text>
        ))}

        {/* hover 수직선 + 점 */}
        {hoverIdx !== null && (
          <>
            <line x1={cx(hoverIdx)} y1={PAD.top} x2={cx(hoverIdx)} y2={PAD.top + IH}
              stroke={color} strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
            <circle cx={cx(hoverIdx)} cy={cy(data[hoverIdx].price)} r="4"
              fill={color} stroke="#fff" strokeWidth="2" />
          </>
        )}
      </svg>
    </div>
  );
}

// ── 메타 정의 ──────────────────────────────────────────────────────
const RATE_META = [
  { key: 'usd', label: 'USD / KRW', flag: '🇺🇸', color: '#3b82f6', unit: '원' },
  { key: 'cny', label: 'CNY / KRW', flag: '🇨🇳', color: '#ef4444', unit: '원' },
  { key: 'jpy', label: 'JPY / KRW', flag: '🇯🇵', color: '#f59e0b', unit: '원/100엔' },
];

const METAL_META = [
  { key: 'aluminum', label: '알루미늄', en: 'Aluminum', symbol: 'AL', color: '#6366f1', unit: 'USD/MT' },
  { key: 'copper',   label: '구리',    en: 'Copper',   symbol: 'CU', color: '#f97316', unit: 'USD/MT' },
  { key: 'nickel',   label: '니켈',    en: 'Nickel',   symbol: 'NI', color: '#22c55e', unit: 'USD/MT' },
  { key: 'zinc',     label: '아연',    en: 'Zinc',     symbol: 'ZN', color: '#8b5cf6', unit: 'USD/MT' },
  { key: 'lead',     label: '납',      en: 'Lead',     symbol: 'PB', color: '#64748b', unit: 'USD/MT' },
];

const ALL_META = [...RATE_META, ...METAL_META] as { key: string; label: string; color: string; unit: string }[];

function pct(v: number) { return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`; }
function num(v: number, dec = 2) {
  if (!v || isNaN(v)) return '-';
  return v.toLocaleString('ko-KR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

// ── 메인 페이지 ────────────────────────────────────────────────────
export default function MarketPage() {
  const [data, setData]         = useState<MarketData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [view, setView]         = useState<'card' | 'table'>('card');
  const [chartKey, setChartKey] = useState<ChartKey>('usd');

  // 장기 차트
  const [longRange, setLongRange]   = useState<LongRange>('1y');
  const [longData, setLongData]     = useState<{ date: string; price: number }[]>([]);
  const [longLoading, setLongLoading] = useState(false);
  const longSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/market')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // 카드 선택 or 기간 변경 → 장기 데이터 fetch
  useEffect(() => {
    setLongLoading(true);
    setLongData([]);
    fetch(`/api/market/history?key=${chartKey}&range=${longRange}`)
      .then(r => r.json())
      .then(d => { setLongData(d.points ?? []); setLongLoading(false); })
      .catch(() => setLongLoading(false));
  }, [chartKey, longRange]);

  const handleCardClick = (key: ChartKey) => {
    setChartKey(key);
    setTimeout(() => {
      longSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const hist = data?.history ?? [];
  const chartMeta30 = [...RATE_META, ...METAL_META.slice(0, 4)];
  const chartData30 = hist.map(h => Number((h as unknown as Record<string, number>)[chartKey] ?? 0)).filter(v => v > 0);
  const activeMeta  = ALL_META.find(m => m.key === chartKey)!;

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />

      {/* 헤더 */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '100px 24px 48px' }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#7dd3fc', letterSpacing: 2, marginBottom: 12 }}>LIVE MARKET DATA</div>
              <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>
                시장 현황 · 원자재 시세
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                {data?.timestamp
                  ? `업데이트: ${new Date(data.timestamp).toLocaleString('ko-KR')}`
                  : '실시간 데이터 로딩 중...'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['card', 'table'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                    background: view === v ? '#0ea5e9' : 'rgba(255,255,255,0.08)', color: '#fff' }}>
                  {v === 'card' ? '📊 카드' : '📋 표'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '32px 24px 80px' }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

          {loading && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ marginTop: 16, color: '#64748b' }}>시장 데이터 로딩 중...</p>
            </div>
          )}

          {!loading && data?.success && (
            <>
              {/* ── 환율 섹션 ── */}
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  💱 주요 환율 <span style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>(KRW 기준 · 카드 클릭 시 장기 차트)</span>
                </h2>
                {view === 'card' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                    {RATE_META.map(m => {
                      const val = data.rates[m.key as keyof typeof data.rates];
                      const prevArr = hist.map(h => Number((h as unknown as Record<string,number>)[m.key])).filter(v => v > 0);
                      const prev = prevArr.length > 1 ? prevArr[prevArr.length - 2] : val;
                      const chg = val - prev;
                      const chgPct = prev ? (chg / prev) * 100 : 0;
                      const isActive = chartKey === m.key;
                      return (
                        <div key={m.key} onClick={() => handleCardClick(m.key as ChartKey)}
                          style={{ background: '#fff', borderRadius: 16, padding: 24,
                            border: `2px solid ${isActive ? m.color : '#e2e8f0'}`,
                            cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: isActive ? `0 8px 24px ${m.color}33` : '0 2px 8px rgba(0,0,0,0.04)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div>
                              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>{m.flag} {m.label}</div>
                              <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a' }}>{num(m.key === 'jpy' ? val * 100 : val)}</div>
                              <div style={{ fontSize: 12, color: '#94a3b8' }}>{m.unit}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: chg >= 0 ? '#16a34a' : '#dc2626' }}>{pct(chgPct)}</div>
                              <div style={{ fontSize: 12, color: '#94a3b8' }}>{chg >= 0 ? '▲' : '▼'} {Math.abs(chg).toFixed(2)}</div>
                              {isActive && <div style={{ fontSize: 10, color: m.color, fontWeight: 700, marginTop: 4 }}>📈 선택됨</div>}
                            </div>
                          </div>
                          <LineChart data={prevArr.map(v => m.key === 'jpy' ? v * 100 : v)} color={m.color} height={50} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['통화', '현재 환율', '전일비', '등락률', '단위'].map(h => (
                            <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RATE_META.map((m, i) => {
                          const val = data.rates[m.key as keyof typeof data.rates];
                          const prevArr = hist.map(h => Number((h as unknown as Record<string,number>)[m.key])).filter(v => v > 0);
                          const prev = prevArr.length > 1 ? prevArr[prevArr.length - 2] : val;
                          const chg = val - prev;
                          const chgPct = prev ? (chg / prev) * 100 : 0;
                          return (
                            <tr key={m.key} onClick={() => handleCardClick(m.key as ChartKey)}
                              style={{ background: chartKey === m.key ? m.color + '08' : i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                              <td style={{ padding: '14px 16px', fontWeight: 700 }}>{m.flag} {m.label}</td>
                              <td style={{ padding: '14px 16px', fontSize: 16, fontWeight: 900 }}>{num(m.key === 'jpy' ? val * 100 : val)}</td>
                              <td style={{ padding: '14px 16px', color: chg >= 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>{chg >= 0 ? '▲' : '▼'} {Math.abs(chg).toFixed(2)}</td>
                              <td style={{ padding: '14px 16px', color: chg >= 0 ? '#16a34a' : '#dc2626', fontWeight: 700 }}>{pct(chgPct)}</td>
                              <td style={{ padding: '14px 16px', fontSize: 12, color: '#94a3b8' }}>{m.unit}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* ── 비철금속 섹션 ── */}
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  ⚙️ LME 비철금속 시세 <span style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>(stooq 실시간 · 카드 클릭 시 장기 차트)</span>
                </h2>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>알루미늄·구리·니켈·아연 — LED 조명 핵심 원자재 (USD/MT)</p>
                {view === 'card' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                    {METAL_META.map(m => {
                      const metal = data.metals[m.key];
                      const prevArr = hist.map(h => Number((h as unknown as Record<string,number>)[m.key])).filter(v => v > 0);
                      const isActive = chartKey === m.key;
                      if (!metal) return (
                        <div key={m.key} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #e2e8f0', opacity: 0.45 }}>
                          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{m.label} ({m.symbol})</div>
                          <div style={{ fontSize: 14, color: '#cbd5e1' }}>데이터 없음</div>
                        </div>
                      );
                      return (
                        <div key={m.key} onClick={() => handleCardClick(m.key as ChartKey)}
                          style={{ background: '#fff', borderRadius: 14, padding: 20,
                            border: `2px solid ${isActive ? m.color : '#e2e8f0'}`,
                            cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: isActive ? `0 8px 20px ${m.color}33` : '0 2px 6px rgba(0,0,0,0.04)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>{m.label} ({m.symbol})</div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                              <div style={{ fontSize: 12, fontWeight: 700, color: metal.changePct >= 0 ? '#16a34a' : '#dc2626' }}>{pct(metal.changePct)}</div>
                              {isActive && <div style={{ fontSize: 9, color: m.color, fontWeight: 700 }}>📈 선택됨</div>}
                            </div>
                          </div>
                          <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 4 }}>
                            ${num(metal.price, 0)}
                          </div>
                          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10 }}>{m.unit}</div>
                          <LineChart data={prevArr.length > 1 ? prevArr : [metal.prev, metal.price]} color={m.color} height={40} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['금속', '현재가 (USD/MT)', '전일종가', '변동', '등락률'].map(h => (
                            <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {METAL_META.map((m, i) => {
                          const metal = data.metals[m.key];
                          return (
                            <tr key={m.key} onClick={() => handleCardClick(m.key as ChartKey)}
                              style={{ background: chartKey === m.key ? m.color + '08' : i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                              <td style={{ padding: '14px 16px', fontWeight: 700 }}>{m.label} <span style={{ fontSize: 11, color: '#94a3b8' }}>({m.symbol})</span></td>
                              <td style={{ padding: '14px 16px', fontSize: 16, fontWeight: 900 }}>${num(metal?.price ?? 0, 0)}</td>
                              <td style={{ padding: '14px 16px', color: '#475569' }}>${num(metal?.prev ?? 0, 0)}</td>
                              <td style={{ padding: '14px 16px', color: (metal?.change ?? 0) >= 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>{(metal?.change ?? 0) >= 0 ? '▲' : '▼'} {Math.abs(metal?.change ?? 0).toFixed(0)}</td>
                              <td style={{ padding: '14px 16px', color: (metal?.changePct ?? 0) >= 0 ? '#16a34a' : '#dc2626', fontWeight: 700 }}>{pct(metal?.changePct ?? 0)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* ── 30일 추이 (기존) ── */}
              {hist.length > 1 && (
                <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: 40 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>📈 30일 추이</h2>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {chartMeta30.map(m => (
                        <button key={m.key} onClick={() => setChartKey(m.key as ChartKey)}
                          style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${chartKey === m.key ? m.color : '#e2e8f0'}`,
                            background: chartKey === m.key ? m.color + '18' : 'transparent',
                            color: chartKey === m.key ? m.color : '#64748b', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                          {'label' in m ? m.label.split(' ')[0] : m.key}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ position: 'relative', height: 180 }}>
                    <LineChart data={chartData30} color={activeMeta?.color ?? '#0ea5e9'} height={180} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
                    <span>{hist[0]?.date}</span>
                    <span style={{ fontWeight: 700, color: activeMeta?.color }}>{activeMeta?.label}</span>
                    <span>{hist[hist.length - 1]?.date}</span>
                  </div>
                </div>
              )}

              {/* ── 장기 추이 차트 (신규) ── */}
              <div ref={longSectionRef} style={{ background: '#fff', borderRadius: 20, padding: 28, border: '2px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 40, scrollMarginTop: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
                      <span style={{ color: activeMeta?.color }}>■</span>{' '}
                      {activeMeta?.label} 장기 추이
                    </h2>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>
                      위 카드/표에서 종목 선택 → 아래 기간 선택
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {(['1y', '5y', '10y'] as const).map(r => (
                      <button key={r} onClick={() => setLongRange(r)}
                        style={{
                          padding: '7px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                          border: `1.5px solid ${longRange === r ? (activeMeta?.color ?? '#0ea5e9') : '#e2e8f0'}`,
                          background: longRange === r ? (activeMeta?.color ?? '#0ea5e9') : 'transparent',
                          color: longRange === r ? '#fff' : '#64748b',
                          transition: 'all 0.18s',
                        }}>
                        {r === '1y' ? '1년' : r === '5y' ? '5년' : '10년'}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 16, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#64748b' }}>
                  📌 환율: Yahoo Finance 주봉/월봉 · 비철금속: stooq.com 주봉/월봉
                  &nbsp;·&nbsp; 단위: {activeMeta?.unit}
                </div>

                {longLoading && (
                  <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTopColor: activeMeta?.color ?? '#0ea5e9', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  </div>
                )}

                {!longLoading && longData.length > 1 && (
                  <>
                    <LongChart data={longData} color={activeMeta?.color ?? '#0ea5e9'} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
                      <span>{longData[0]?.date}</span>
                      <span style={{ color: activeMeta?.color, fontWeight: 700 }}>
                        최근가: {longData[longData.length - 1]?.price?.toLocaleString()} {activeMeta?.unit}
                      </span>
                      <span>{longData[longData.length - 1]?.date}</span>
                    </div>
                    <div style={{ marginTop: 12, fontSize: 12, color: '#94a3b8', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      <span>최고: <strong style={{ color: '#16a34a' }}>{Math.max(...longData.map(d => d.price)).toLocaleString()}</strong></span>
                      <span>최저: <strong style={{ color: '#dc2626' }}>{Math.min(...longData.map(d => d.price)).toLocaleString()}</strong></span>
                      <span>데이터 {longData.length}개</span>
                    </div>
                  </>
                )}

                {!longLoading && longData.length < 2 && (
                  <div style={{ height: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: 12 }}>
                    <div style={{ fontSize: 32 }}>📊</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>데이터를 불러올 수 없습니다</div>
                    <div style={{ fontSize: 12 }}>위 카드를 클릭하거나 기간을 다시 선택해주세요</div>
                  </div>
                )}
              </div>

              {/* ── 종가 히스토리 표 (기존) ── */}
              {hist.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>🗂️ 종가 히스토리</span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>Supabase 자동 저장 · 최근 {hist.length}일</span>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['날짜', 'USD', 'CNY', 'JPY/100', 'AL(알루미늄)', 'CU(구리)', 'NI(니켈)', 'ZN(아연)'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[...hist].reverse().map((row, i) => (
                          <tr key={row.date} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155', textAlign: 'left' }}>{row.date}</td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>{num(row.usd)}</td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>{num(row.cny)}</td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>{num(row.jpy * 100)}</td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>${num(row.aluminum, 0)}</td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>${num(row.copper, 0)}</td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>${num(row.nickel, 0)}</td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>${num(row.zinc, 0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && !data?.success && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
              <div style={{ color: '#dc2626', fontWeight: 700, marginBottom: 8 }}>데이터 로딩 실패</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>잠시 후 새로고침해주세요</div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
