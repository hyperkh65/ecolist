'use client';
import { useState, useEffect, useCallback } from 'react';

// ── 타입 ──────────────────────────────────────────────────────────────
type Tool = 'port' | 'cbm' | 'cost' | null;

interface PortData {
  level: 'smooth' | 'normal' | 'busy' | 'very_busy';
  waiting: number;
  berthed: number;
  berthRate: number;
  departed: number;
  updatedAt: string;
  vessels: { name: string; flag: string; status: string; eta?: string; etd?: string }[];
}

// ── CBM 계산기 ────────────────────────────────────────────────────────
function CbmCalculator() {
  const [items, setItems] = useState([{ l: '', w: '', h: '', qty: '1', unit: 'cm' as 'cm' | 'mm' }]);

  const addItem = () => setItems([...items, { l: '', w: '', h: '', qty: '1', unit: 'cm' }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const update = (i: number, k: string, v: string) => {
    const next = [...items]; (next[i] as any)[k] = v; setItems(next);
  };

  const cbmOf = (item: typeof items[0]) => {
    const f = item.unit === 'mm' ? 1000 : 1;
    const l = parseFloat(item.l) / f, w = parseFloat(item.w) / f, h = parseFloat(item.h) / f, q = parseInt(item.qty) || 1;
    if (!l || !w || !h) return 0;
    return (l * w * h / 1e6) * q;
  };

  const totalCbm = items.reduce((s, it) => s + cbmOf(it), 0);
  const c20 = 25.5, c40 = 55, c40hc = 67.5;

  const inp: React.CSSProperties = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 7, padding: '7px 10px', color: '#fff', fontSize: 13, fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' };

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px', marginBottom: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>박스 {i + 1}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select value={item.unit} onChange={e => update(i, 'unit', e.target.value)}
                style={{ ...inp, width: 60, padding: '4px 6px', fontSize: 11 }}>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
              </select>
              {items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 12 }}>×</button>}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 70px', gap: 8 }}>
            {['l', 'w', 'h'].map((k, ki) => (
              <div key={k}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{['가로(L)', '세로(W)', '높이(H)'][ki]}</div>
                <input value={(item as any)[k]} onChange={e => update(i, k, e.target.value)} placeholder="0" style={inp} />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>수량</div>
              <input value={item.qty} onChange={e => update(i, 'qty', e.target.value)} placeholder="1" style={inp} />
            </div>
          </div>
          {cbmOf(item) > 0 && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#34d399', textAlign: 'right' }}>
              → {(cbmOf(item)).toFixed(4)} CBM
            </div>
          )}
        </div>
      ))}

      <button onClick={addItem} style={{ width: '100%', padding: '9px', background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px dashed rgba(59,130,246,0.3)', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', marginBottom: 16 }}>
        + 박스 추가
      </button>

      {totalCbm > 0 && (
        <div style={{ background: 'rgba(52,211,153,0.08)', borderRadius: 14, padding: '18px', border: '1px solid rgba(52,211,153,0.2)' }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#34d399', letterSpacing: -0.5, marginBottom: 6 }}>
            {totalCbm.toFixed(4)} <span style={{ fontSize: 14, fontWeight: 500 }}>CBM</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>총 부피 합계</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: '20ft', max: c20, icon: '🚢' },
              { label: '40ft', max: c40, icon: '🚢' },
              { label: '40HC', max: c40hc, icon: '🚢' },
            ].map(ct => {
              const pct = Math.min(totalCbm / ct.max * 100, 100);
              const need = Math.ceil(totalCbm / ct.max);
              return (
                <div key={ct.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{ct.label}</div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 6 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#34d399', borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>{need}개 필요</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{pct.toFixed(0)}% 적재</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── 원가 계산기 ────────────────────────────────────────────────────────
function CostCalculator() {
  const [form, setForm] = useState({
    fobPrice: '', qty: '', freightUsd: '', dutyRate: '8',
    otherKrw: '', exchangeRate: '1380', margin: '20',
    currency: 'USD' as 'USD' | 'CNY',
  });

  const s = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const inp: React.CSSProperties = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 12px', color: '#fff', fontSize: 14, fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 5, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 };
  const row = (label: string, key: string, placeholder: string, suffix?: string) => (
    <div style={{ marginBottom: 12 }}>
      <label style={lbl}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input value={(form as any)[key]} onChange={e => s(key, e.target.value)} placeholder={placeholder} style={{ ...inp, paddingRight: suffix ? 44 : 12 }} />
        {suffix && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{suffix}</span>}
      </div>
    </div>
  );

  const calc = () => {
    const fob = parseFloat(form.fobPrice) || 0;
    const qty = parseInt(form.qty) || 1;
    const freight = parseFloat(form.freightUsd) || 0;
    const duty = parseFloat(form.dutyRate) / 100;
    const other = parseFloat(form.otherKrw) || 0;
    const rate = parseFloat(form.exchangeRate) || 1380;
    const margin = parseFloat(form.margin) / 100;
    // CNY → USD if needed
    const cnyRate = rate / 7.3;
    const fobKrw = form.currency === 'CNY' ? fob * cnyRate * qty : fob * rate * qty;
    const freightKrw = freight * rate;
    const cifKrw = fobKrw + freightKrw;
    const dutyKrw = cifKrw * duty;
    const vatKrw = (cifKrw + dutyKrw) * 0.1;
    const totalKrw = cifKrw + dutyKrw + vatKrw + other;
    const unitKrw = totalKrw / qty;
    const sellPrice = unitKrw / (1 - margin);
    return { fobKrw, freightKrw, cifKrw, dutyKrw, vatKrw, totalKrw, unitKrw, sellPrice, qty };
  };

  const r = calc();
  const hasResult = (parseFloat(form.fobPrice) || 0) > 0 && (parseInt(form.qty) || 0) > 0;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 4 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={lbl}>제품 단가</label>
          <div style={{ display: 'flex', gap: 4 }}>
            <select value={form.currency} onChange={e => s('currency', e.target.value)}
              style={{ ...inp, width: 70, padding: '9px 6px', fontSize: 12 }}>
              <option value="USD">USD</option>
              <option value="CNY">CNY</option>
            </select>
            <input value={form.fobPrice} onChange={e => s('fobPrice', e.target.value)} placeholder="0.00" style={inp} />
          </div>
        </div>
        {row('수량', 'qty', '1', 'EA')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {row('운임 (USD)', 'freightUsd', '0', 'USD')}
        {row('관세율', 'dutyRate', '8', '%')}
        {row('환율 (KRW/USD)', 'exchangeRate', '1380', '원')}
        {row('마진율 목표', 'margin', '20', '%')}
      </div>
      {row('기타 비용 (KRW)', 'otherKrw', '창고료, 내륙운송 등', '원')}

      {hasResult && (
        <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: 14, padding: '18px', border: '1px solid rgba(59,130,246,0.2)', marginTop: 8 }}>
          {[
            { label: 'FOB 매입가 (KRW)', val: r.fobKrw },
            { label: '운임·보험 (KRW)', val: r.freightKrw },
            { label: '관세', val: r.dutyKrw },
            { label: '부가세 (10%)', val: r.vatKrw },
          ].map(({ label, val }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{Math.round(val).toLocaleString()}원</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>총 원가</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#60a5fa' }}>{Math.round(r.totalKrw).toLocaleString()}원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>단위 원가 ({r.qty}EA 기준)</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#93c5fd' }}>{Math.round(r.unitKrw).toLocaleString()}원/EA</span>
          </div>
          <div style={{ background: 'rgba(52,211,153,0.1)', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(52,211,153,0.2)' }}>
            <div style={{ fontSize: 11, color: 'rgba(52,211,153,0.8)', marginBottom: 4 }}>마진 {form.margin}% 적용 시 최소 판매가</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#34d399' }}>{Math.round(r.sellPrice).toLocaleString()}원/EA</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 인천항 혼잡도 ─────────────────────────────────────────────────────
function PortCongestion() {
  const [data, setData] = useState<PortData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/port');
      if (!res.ok) throw new Error('API 오류');
      const json = await res.json();
      setData(json);
    } catch {
      setError('데이터를 불러오지 못했습니다.');
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.4)' }}>
      <div style={{ width: 28, height: 28, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 10px' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      조회 중...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '32px', color: '#f87171' }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>⚠️</div>
      {error}
      <button onClick={fetchData} style={{ display: 'block', margin: '14px auto 0', padding: '8px 16px', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>재시도</button>
    </div>
  );

  if (!data) return null;

  const LEVEL_MAP = {
    smooth:   { label: '원활', color: '#34d399', bg: 'rgba(52,211,153,0.1)', icon: '🟢' },
    normal:   { label: '보통', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', icon: '🔵' },
    busy:     { label: '혼잡', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '🟡' },
    very_busy:{ label: '매우혼잡', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: '🔴' },
  };
  const lv = LEVEL_MAP[data.level];

  return (
    <div>
      {/* 혼잡도 레벨 */}
      <div style={{ background: lv.bg, borderRadius: 16, padding: '20px', border: `1px solid ${lv.color}30`, marginBottom: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{lv.icon}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: lv.color, marginBottom: 4 }}>{lv.label}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>인천항 현재 혼잡도</div>
      </div>

      {/* 통계 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[
          { label: '대기 선박', value: data.waiting, unit: '척', color: '#f59e0b' },
          { label: '접안 중', value: data.berthed, unit: '척', color: '#34d399' },
          { label: '출항 예정', value: data.departed, unit: '척', color: '#60a5fa' },
        ].map(st => (
          <div key={st.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: st.color }}>{st.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{st.unit}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* 선석 점유율 */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px', marginBottom: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>선석 점유율</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>{data.berthRate}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
          <div style={{ height: '100%', width: `${data.berthRate}%`, background: data.berthRate > 80 ? '#ef4444' : data.berthRate > 60 ? '#f59e0b' : '#34d399', borderRadius: 3, transition: '0.6s' }} />
        </div>
      </div>

      {/* 선박 목록 */}
      {data.vessels.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>주요 입출항 선박</div>
          {data.vessels.map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 9, marginBottom: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 18 }}>{v.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{v.eta ? `ETA ${v.eta}` : ''}{v.etd ? `ETD ${v.etd}` : ''}</div>
              </div>
              <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, fontWeight: 700, background: v.status === '접안' ? 'rgba(52,211,153,0.15)' : v.status === '대기' ? 'rgba(245,158,11,0.15)' : 'rgba(96,165,250,0.15)', color: v.status === '접안' ? '#34d399' : v.status === '대기' ? '#f59e0b' : '#60a5fa' }}>{v.status}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>업데이트: {data.updatedAt}</span>
        <button onClick={fetchData} style={{ padding: '6px 12px', background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}>🔄 새로고침</button>
      </div>
    </div>
  );
}

// ── 메인 ToolDock ─────────────────────────────────────────────────────
const TOOLS = [
  { id: 'port' as Tool, icon: '🚢', label: '항만혼잡도', color: '#0ea5e9' },
  { id: 'cbm'  as Tool, icon: '📦', label: 'CBM계산기',  color: '#10b981' },
  { id: 'cost' as Tool, icon: '💰', label: '원가계산기',  color: '#f59e0b' },
];

const TITLES: Record<string, string> = {
  port: '🚢 인천항 혼잡도',
  cbm:  '📦 CBM 계산기',
  cost: '💰 원가 계산기',
};

export default function ToolDock() {
  const [active, setActive] = useState<Tool>(null);
  const [hovered, setHovered] = useState<Tool>(null);

  const open  = (id: Tool) => setActive(id);
  const close = () => setActive(null);

  return (
    <>
      {/* ── 플로팅 도구 버튼 (우측 고정) ── */}
      <div style={{
        position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)',
        zIndex: 990, display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {TOOLS.map(tool => (
          <button key={tool.id!} onClick={() => open(tool.id)}
            onMouseEnter={() => setHovered(tool.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative', display: 'flex', alignItems: 'center',
              gap: 10, padding: '0 16px 0 0', height: 52,
              background: active === tool.id ? tool.color : 'rgba(10,14,26,0.92)',
              border: `1px solid ${active === tool.id ? tool.color : 'rgba(255,255,255,0.1)'}`,
              borderRight: 'none', borderRadius: '12px 0 0 12px',
              color: active === tool.id ? '#fff' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer', fontFamily: 'inherit',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
              transform: hovered === tool.id || active === tool.id ? 'translateX(0)' : 'translateX(8px)',
              boxShadow: active === tool.id ? `0 0 20px ${tool.color}40` : '0 4px 16px rgba(0,0,0,0.4)',
            }}>
            <span style={{ width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginLeft: 12 }}>{tool.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3, whiteSpace: 'nowrap' }}>{tool.label}</span>
          </button>
        ))}
      </div>

      {/* ── 모달 오버레이 ── */}
      {active && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '20px' }}
          onClick={e => { if (e.target === e.currentTarget) close(); }}>

          <div style={{
            width: 460, maxHeight: 'calc(100vh - 40px)', background: '#0b0f1a',
            borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            animation: 'slideIn 0.25s ease',
          }}>
            {/* 모달 헤더 */}
            <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>{TITLES[active!]}</div>
                {active === 'port' && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>PORT-MIS 실시간 연동</div>}
              </div>
              <button onClick={close} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>

            {/* 모달 내용 (스크롤) */}
            <div style={{ padding: '20px 22px', overflowY: 'auto', flex: 1 }}>
              {active === 'port' && <PortCongestion />}
              {active === 'cbm'  && <CbmCalculator />}
              {active === 'cost' && <CostCalculator />}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </>
  );
}
