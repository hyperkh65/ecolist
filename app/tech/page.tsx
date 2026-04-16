'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

/* ───────────────────── 인터랙티브 시뮬레이션 컴포넌트들 ─────────────────── */

// 스크롤 등장 애니메이션
function ScrollReveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms: Record<string, string> = { up: 'translateY(48px)', left: 'translateX(-48px)', right: 'translateX(48px)' };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : (transforms[direction] || transforms.up),
      transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ──── 1. PWM 디밍 시뮬레이터 ────
function PWMSimulator() {
  const [duty, setDuty] = useState(75);
  const [freq, setFreq] = useState(2000);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawPWM = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    ctx.clearRect(0, 0, W, H);

    // 그리드 배경
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // PWM 파형
    const period = W / 5;
    const highY = 25;
    const lowY = H - 25;
    const dutyWidth = (duty / 100) * period;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, lowY);

    for (let cycle = 0; cycle < 6; cycle++) {
      const startX = cycle * period;
      ctx.lineTo(startX, lowY);
      ctx.lineTo(startX, highY);
      ctx.lineTo(startX + dutyWidth, highY);
      ctx.lineTo(startX + dutyWidth, lowY);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 유효 밝기 (평균: 점선)
    const avgY = highY + (lowY - highY) * (1 - duty / 100);
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, avgY);
    ctx.lineTo(W, avgY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 레이블
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`유효 밝기 ${duty}%`, W - 110, avgY - 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`${freq} Hz`, 10, 18);
  }, [duty, freq]);

  useEffect(() => { drawPWM(); }, [drawPWM]);

  const flickerRisk = freq < 1000 ? '위험' : freq < 2000 ? '주의' : '안전';
  const flickerColor = freq < 1000 ? '#ef4444' : freq < 2000 ? '#f59e0b' : '#22c55e';
  const resolution = duty <= 5 ? '8비트 (256단계) – 계단 현상 발생' : '16비트 (65,536단계) – 스무스 디밍';

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>
        🔬 PWM 디밍 시뮬레이터
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
        듀티 사이클과 주파수를 조절하여 LED 디밍 파형을 실시간으로 관찰하세요.
      </p>

      <canvas ref={canvasRef} style={{ width: '100%', height: 160, borderRadius: 12, background: 'rgba(0,0,0,0.4)', marginBottom: 24 }} />

      {/* 컨트롤 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            DUTY CYCLE: <span style={{ color: '#38bdf8' }}>{duty}%</span>
          </label>
          <input type="range" min={0} max={100} value={duty} onChange={e => setDuty(+e.target.value)}
            style={{ width: '100%', accentColor: '#38bdf8' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            FREQUENCY: <span style={{ color: '#38bdf8' }}>{freq} Hz</span>
          </label>
          <input type="range" min={100} max={4000} step={100} value={freq} onChange={e => setFreq(+e.target.value)}
            style={{ width: '100%', accentColor: '#38bdf8' }} />
        </div>
      </div>

      {/* 실시간 상태 표시 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>플리커 판정</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: flickerColor }}>{flickerRisk}</div>
        </div>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>유효 밝기</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{duty}%</div>
        </div>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>분해능</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: duty <= 5 ? '#f59e0b' : '#22c55e' }}>{resolution}</div>
        </div>
      </div>
    </div>
  );
}

// ──── 2. 전력 효율 계산기 ────
function PowerCalculator() {
  const [wattage, setWattage] = useState(150);
  const [efficiency, setEfficiency] = useState(140);
  const [hours, setHours] = useState(12);
  const [panels, setPanels] = useState(20);

  const totalLumens = wattage * efficiency;
  const dailyKwh = (wattage * hours * panels) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * 120; // 산업용 전기 약 120원/kWh
  const co2Saved = monthlyKwh * 0.4; // kg CO2

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>⚡ 전력 효율 계산기</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
        LED 조명 시스템의 전력 소비와 비용을 실시간으로 계산합니다.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            단위 전력: <span style={{ color: '#22c55e' }}>{wattage}W</span>
          </label>
          <input type="range" min={20} max={400} step={10} value={wattage} onChange={e => setWattage(+e.target.value)} style={{ width: '100%', accentColor: '#22c55e' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            광효율: <span style={{ color: '#22c55e' }}>{efficiency} lm/W</span>
          </label>
          <input type="range" min={80} max={200} step={5} value={efficiency} onChange={e => setEfficiency(+e.target.value)} style={{ width: '100%', accentColor: '#22c55e' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            일일 점등시간: <span style={{ color: '#22c55e' }}>{hours}시간</span>
          </label>
          <input type="range" min={1} max={24} value={hours} onChange={e => setHours(+e.target.value)} style={{ width: '100%', accentColor: '#22c55e' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            설치 수량: <span style={{ color: '#22c55e' }}>{panels}대</span>
          </label>
          <input type="range" min={1} max={200} value={panels} onChange={e => setPanels(+e.target.value)} style={{ width: '100%', accentColor: '#22c55e' }} />
        </div>
      </div>

      {/* 결과 대시보드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: '총 광속', value: totalLumens.toLocaleString(), unit: 'lm', color: '#f59e0b' },
          { label: '월간 전력', value: monthlyKwh.toFixed(0), unit: 'kWh', color: '#38bdf8' },
          { label: '월 전기료', value: `₩${(monthlyCost / 10000).toFixed(1)}`, unit: '만원', color: '#22c55e' },
          { label: 'CO₂ 절감', value: co2Saved.toFixed(0), unit: 'kg/월', color: '#a78bfa' },
        ].map(item => (
          <div key={item.label} style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: 14, textAlign: 'center', border: `1px solid ${item.color}22` }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: item.color, letterSpacing: '-0.02em' }}>{item.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{item.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──── 3. LED 드라이버 매칭 시뮬레이터 ────
function DriverMatchSimulator() {
  const [panelVf, setPanelVf] = useState(36);
  const [driverMin, setDriverMin] = useState(30);
  const [driverMax, setDriverMax] = useState(42);
  const [current, setCurrent] = useState(1.2);

  const isMatched = panelVf >= driverMin && panelVf <= driverMax;
  const outputPower = panelVf * current;
  const margin = isMatched ? Math.min(panelVf - driverMin, driverMax - panelVf) : 0;
  const safetyLevel = !isMatched ? 'OVP 경고' : margin < 2 ? '위험 마진' : margin < 5 ? '양호' : '최적';
  const safetyColor = !isMatched ? '#ef4444' : margin < 2 ? '#f59e0b' : margin < 5 ? '#38bdf8' : '#22c55e';

  // 전압 범위 시각화
  const rangeBarRef = useRef<HTMLDivElement>(null);
  const rangeTotal = 60; // 0-60V
  const minPct = (driverMin / rangeTotal) * 100;
  const maxPct = (driverMax / rangeTotal) * 100;
  const vfPct = (panelVf / rangeTotal) * 100;

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40 }}>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🔌 LED 드라이버 매칭</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
        LED 패널의 순방향 전압(Vf)과 컨버터 전압 윈도우의 매칭을 확인하세요.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            패널 Vf: <span style={{ color: '#818cf8' }}>{panelVf}V</span>
          </label>
          <input type="range" min={10} max={56} step={0.5} value={panelVf} onChange={e => setPanelVf(+e.target.value)} style={{ width: '100%', accentColor: '#818cf8' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
            정전류: <span style={{ color: '#818cf8' }}>{current}A</span>
          </label>
          <input type="range" min={0.1} max={3} step={0.1} value={current} onChange={e => setCurrent(+e.target.value)} style={{ width: '100%', accentColor: '#818cf8' }} />
        </div>
      </div>

      {/* 전압 범위 바 */}
      <div ref={rangeBarRef} style={{ position: 'relative', height: 50, background: 'rgba(0,0,0,0.4)', borderRadius: 12, marginBottom: 20, overflow: 'hidden' }}>
        {/* 드라이버 범위 */}
        <div style={{
          position: 'absolute', top: 10, bottom: 10,
          left: `${minPct}%`, width: `${maxPct - minPct}%`,
          background: isMatched ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          border: `1px solid ${isMatched ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          borderRadius: 8,
        }} />
        {/* 패널 Vf 마커 */}
        <div style={{
          position: 'absolute', top: 4, bottom: 4,
          left: `${vfPct}%`, width: 3,
          background: isMatched ? '#22c55e' : '#ef4444',
          boxShadow: `0 0 12px ${isMatched ? '#22c55e' : '#ef4444'}`,
          borderRadius: 2,
        }} />
        <div style={{ position: 'absolute', bottom: 2, left: `${minPct}%`, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{driverMin}V</div>
        <div style={{ position: 'absolute', bottom: 2, left: `${maxPct}%`, transform: 'translateX(-100%)', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{driverMax}V</div>
        <div style={{ position: 'absolute', top: 2, left: `calc(${vfPct}% + 8px)`, fontSize: 11, color: isMatched ? '#22c55e' : '#ef4444', fontWeight: 700 }}>Vf {panelVf}V</div>
      </div>

      {/* 결과 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>매칭 상태</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: safetyColor }}>{safetyLevel}</div>
        </div>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>출력 전력</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{outputPower.toFixed(1)}W</div>
        </div>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>안전 마진</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: safetyColor }}>{isMatched ? `±${margin.toFixed(1)}V` : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

// ──── 4. CRI 연색성 비교 시뮬레이터 ────
function CRICompare() {
  const [cri, setCri] = useState(95);
  const saturation = cri >= 90 ? 1 : cri >= 70 ? 0.55 : 0.3;
  const warmth = cri >= 90 ? 0 : cri >= 80 ? 10 : 20; // hue-rotate

  const colors = [
    { name: '레드', hsl: `hsl(0, ${saturation * 100}%, 50%)` },
    { name: '오렌지', hsl: `hsl(30, ${saturation * 100}%, 50%)` },
    { name: '옐로우', hsl: `hsl(50, ${saturation * 100}%, 55%)` },
    { name: '그린', hsl: `hsl(130, ${saturation * 100}%, 45%)` },
    { name: '블루', hsl: `hsl(210, ${saturation * 100}%, 50%)` },
    { name: '퍼플', hsl: `hsl(280, ${saturation * 100}%, 50%)` },
  ];

  const criLabel = cri >= 95 ? 'Ultra-Premium' : cri >= 90 ? 'Premium' : cri >= 80 ? 'Standard' : 'Economy';
  const criColor = cri >= 95 ? '#22c55e' : cri >= 90 ? '#38bdf8' : cri >= 80 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40 }}>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🌈 CRI 연색성 비교</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
        CRI 지수에 따라 물체의 색상이 어떻게 달라지는지 확인하세요.
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
          CRI (연색평가지수): <span style={{ color: criColor, fontSize: 18, fontWeight: 900 }}>{cri}</span>
          <span style={{ color: criColor, marginLeft: 8, fontSize: 12 }}>({criLabel})</span>
        </label>
        <input type="range" min={50} max={100} value={cri} onChange={e => setCri(+e.target.value)} style={{ width: '100%', accentColor: criColor }} />
      </div>

      {/* 색상 팔레트 시뮬레이션 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 20 }}>
        {colors.map(c => (
          <div key={c.name} style={{
            height: 80, borderRadius: 12,
            background: c.hsl,
            filter: `hue-rotate(${warmth}deg)`,
            transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8,
          }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* 실사 미리보기 (과일/음식 묘사) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: 20, borderRadius: 14, background: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8, filter: `saturate(${saturation}) hue-rotate(${warmth}deg)`, transition: 'all 0.3s' }}>🍎🥦🧀</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>신선식품 색 재현</div>
        </div>
        <div style={{ padding: 20, borderRadius: 14, background: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8, filter: `saturate(${saturation}) hue-rotate(${warmth}deg)`, transition: 'all 0.3s' }}>👗🎨🖼️</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>패션/아트 색 재현</div>
        </div>
      </div>
    </div>
  );
}

// ──── 5. 0-10V 디밍 커브 & Dead-Band 시뮬레이터 ────
function AnalogDimmingCurve() {
  const [voltage, setVoltage] = useState(5);
  const [dimToOff, setDimToOff] = useState(true);

  // 밝기 계산 (pop-on 현상 시뮬레이션)
  const getBrightness = (v: number, d2o: boolean) => {
    if (v < 0.5 && !d2o) return 0; // ghosting
    if (v < 1.5 && !d2o) return 0; // pop-on dead-band
    if (v < 1 && d2o) return v * 10;
    return Math.min(100, ((v - (d2o ? 0 : 1.5)) / (d2o ? 10 : 8.5)) * 100);
  };

  const brightness = getBrightness(voltage, dimToOff);
  const isGhosting = voltage < 0.5 && !dimToOff;
  const isPopOn = voltage >= 0.5 && voltage < 1.5 && !dimToOff;

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40 }}>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>💡 0-10V 아날로그 디밍 & Dead-Band</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
        Pop-On 현상과 유령등(Ghosting) 문제를 시뮬레이션합니다.
      </p>

      {/* 시각적 밝기 표현 */}
      <div style={{
        height: 120, borderRadius: 16, marginBottom: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `radial-gradient(circle, rgba(255,255,255,${brightness / 200}) 0%, rgba(0,0,0,0.6) 70%)`,
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        <span style={{ fontSize: 56, filter: `brightness(${0.3 + brightness / 150})`, transition: 'filter 0.3s' }}>💡</span>
        {isGhosting && (
          <div style={{ position: 'absolute', bottom: 10, fontSize: 12, color: '#f59e0b', fontWeight: 700, background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: 8 }}>
            ⚠️ 유령등 현상 (잔광)
          </div>
        )}
        {isPopOn && (
          <div style={{ position: 'absolute', bottom: 10, fontSize: 12, color: '#ef4444', fontWeight: 700, background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: 8 }}>
            ⛔ Dead-Band (Pop-On 영역)
          </div>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'block' }}>
          제어 전압: <span style={{ color: '#f59e0b', fontSize: 18 }}>{voltage.toFixed(1)}V</span>
        </label>
        <input type="range" min={0} max={10} step={0.1} value={voltage} onChange={e => setVoltage(+e.target.value)} style={{ width: '100%', accentColor: '#f59e0b' }} />
      </div>

      {/* Dim-to-Off 토글 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => setDimToOff(!dimToOff)}
          style={{
            width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: dimToOff ? '#22c55e' : '#475569',
            position: 'relative', transition: 'all 0.2s',
          }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 3,
            left: dimToOff ? 23 : 3,
            transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }} />
        </button>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
          Dim-to-Off 전용 컨버터 {dimToOff ? '사용' : '미사용'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>현재 밝기</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#f59e0b' }}>{brightness.toFixed(0)}%</div>
        </div>
        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>릴레이 필요</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: voltage < 0.5 && !dimToOff ? '#ef4444' : '#22c55e' }}>
            {voltage < 0.5 && !dimToOff ? '⚠ 마그네틱 릴레이 필요' : '정상 동작 중'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──── 기술 아티클 카드 ────
const TECH_ARTICLES = [
  {
    icon: '🔧', title: 'Flyback vs LLC 컨버터',
    desc: '플라이백과 LLC 공진형 컨버터의 차이점. 발열, EMI, 효율을 비교하고 최적의 토폴로지를 선택하세요.',
    tags: ['Topology', 'ZVS', '효율'],
  },
  {
    icon: '🧠', title: 'PFC / PSR / SSR IC 가이드',
    desc: '역률 보정(PFC), 1차측 제어(PSR), 2차측 제어(SSR)의 실무적 차이와 적용 기준.',
    tags: ['PFC', 'IC설계', '정전류'],
  },
  {
    icon: '📡', title: 'DALI-2 / D4i 프로토콜',
    desc: '양방향 디지털 통신으로 조명 텔레메트리를 구현하는 차세대 제어 표준.',
    tags: ['DALI', 'Telemetry', 'DX'],
  },
  {
    icon: '🌡️', title: 'Human Centric Lighting (HCL)',
    desc: 'Tunable White 2-CH 드라이버로 서캐디언 리듬에 맞춘 색온도 자동 전환.',
    tags: ['색온도', 'HCL', '웰빙'],
  },
  {
    icon: '🔌', title: 'PoE (Power over Ethernet)',
    desc: '랜선 하나로 전력+데이터, AC-DC 컨버터 없이 초박형 조명 구현.',
    tags: ['PoE', '802.3bt', '혁신'],
  },
  {
    icon: '📶', title: 'Thread / Matter / BLE Mesh',
    desc: '1000개 이상 노드를 딜레이 제로로 동시 제어하는 무선 메시 기술.',
    tags: ['Mesh', 'Thread', 'Matter'],
  },
];

/* ═══════════════════════════════ MAIN PAGE ═══════════════════════════════ */
export default function TechPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
      <Navbar />

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section style={{
        height: '80vh', minHeight: 650, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* 배경 그래디언트 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 40%, rgba(56,189,248,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(129,140,248,0.08) 0%, transparent 50%), radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, #050505 70%)',
        }} />

        {/* 그리드 패턴 */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 20px', background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.15)', borderRadius: 40, marginBottom: 32,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: 2 }}>ENGINEERING LAB</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900,
              letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 24,
            }}>
              LED 엔지니어링<br />
              <span style={{
                background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>인터랙티브 시뮬레이션</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 680, margin: '0 auto' }}>
              PWM 디밍 파형, 전력 효율 계산, 드라이버 매칭, CRI 연색성까지 —<br />
              직접 조작하며 체험하는 LED 조명 기술의 모든 것
            </p>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
              <a href="#simulators" style={{
                padding: '14px 32px', fontSize: 15, fontWeight: 700,
                background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#fff',
                border: 'none', borderRadius: 50, textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(2,132,199,0.35)',
                transition: 'all 0.2s',
              }}>시뮬레이터 시작 →</a>
              <a href="#articles" style={{
                padding: '14px 32px', fontSize: 15, fontWeight: 700,
                background: 'rgba(255,255,255,0.06)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, textDecoration: 'none',
                transition: 'all 0.2s',
              }}>기술 아티클</a>
            </div>
          </ScrollReveal>
        </div>

        {/* 스크롤 인디케이터 */}
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Scroll</span>
          <div style={{ width: 1.5, height: 30, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ─── 시뮬레이터 섹션 ─────────────────────────────────────── */}
      <section id="simulators" style={{ padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8', letterSpacing: 3, marginBottom: 16 }}>INTERACTIVE SIMULATORS</p>
              <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                실무 엔지니어링 시뮬레이션
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 32 }}>
            <ScrollReveal delay={100}><PWMSimulator /></ScrollReveal>
            <ScrollReveal delay={200}><PowerCalculator /></ScrollReveal>
            <ScrollReveal delay={100}><DriverMatchSimulator /></ScrollReveal>
            <ScrollReveal delay={200}><CRICompare /></ScrollReveal>
          </div>

          {/* 풀 와이드: 0-10V 시뮬레이터 */}
          <div style={{ marginTop: 32 }}>
            <ScrollReveal delay={100}><AnalogDimmingCurve /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 기술 아티클 그리드 ────────────────────────────────── */}
      <section id="articles" style={{ padding: '120px 24px', background: '#080808' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', letterSpacing: 3, marginBottom: 16 }}>TECH DEEP DIVES</p>
              <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                차세대 LED 기술 아카이브
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {TECH_ARTICLES.map((article, i) => (
              <ScrollReveal key={article.title} delay={i * 80}>
                <div style={{
                  padding: '36px 32px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s ease', cursor: 'pointer',
                  height: '100%',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(56,189,248,0.2)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(56,189,248,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>{article.icon}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>{article.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 16 }}>{article.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {article.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 11, fontWeight: 700, color: '#38bdf8',
                        padding: '4px 10px', background: 'rgba(56,189,248,0.08)',
                        borderRadius: 20, letterSpacing: 0.5,
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA 배너 ───────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{
              padding: '64px 48px', borderRadius: 28,
              background: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(129,140,248,0.08) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>맞춤 기술 상담이 필요하신가요?</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 32 }}>
                (주)와이앤케이의 전문 엔지니어가 귀사의 프로젝트에 최적화된<br />
                LED 조명 솔루션을 제안해 드립니다.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/shop" style={{
                  padding: '14px 32px', fontSize: 15, fontWeight: 700,
                  background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#fff',
                  borderRadius: 50, textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(2,132,199,0.3)',
                }}>제품 카탈로그 →</Link>
                <Link href="/about" style={{
                  padding: '14px 32px', fontSize: 15, fontWeight: 700,
                  background: 'rgba(255,255,255,0.06)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, textDecoration: 'none',
                }}>회사 소개</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
        © 2026 (주)와이앤케이 — LED Engineering Lab
      </footer>

      {/* ─── 글로벌 애니메이션 ──────────────────────────────── */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        input[type="range"] {
          -webkit-appearance: none;
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.1);
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        @media (max-width: 768px) {
          #simulators > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
