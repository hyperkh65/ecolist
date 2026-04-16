'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

/* ──────── 스크롤 등장 애니메이션 ──────── */
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(40px)',
      transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ──────── 센서 감지 범위 시뮬레이터 ──────── */
function SensorSimulator() {
  const [height, setHeight] = useState(8);
  const [sensitivity, setSensitivity] = useState(80);

  // 탐지 반경: 높이 + 감도
  const radius = Math.min(18, (height * 1.5) * (sensitivity / 100) + 4);
  const coverage = Math.PI * radius * radius;

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40 }}>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>📡 마이크로웨이브 센서 시뮬레이션</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
        5.8GHz 마이크로웨이브 센서의 감지 범위를 높이와 감도에 따라 확인하세요.
      </p>

      {/* 시각적 감지 범위 */}
      <div style={{
        height: 240, borderRadius: 16, background: 'rgba(0,0,0,0.5)',
        position: 'relative', overflow: 'hidden', marginBottom: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* 파동 원 */}
        {[1, 0.7, 0.4].map((scale, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${radius * 12 * scale}px`,
            height: `${radius * 12 * scale}px`,
            borderRadius: '50%',
            border: `1.5px solid rgba(56,189,248,${0.3 - i * 0.08})`,
            background: i === 0 ? `radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)` : 'transparent',
            transition: 'all 0.4s ease',
            animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
          }} />
        ))}

        {/* 조명 아이콘 (중심) */}
        <div style={{
          position: 'relative', zIndex: 10,
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(245,158,11,0.4)',
          fontSize: 24,
        }}>💡</div>

        {/* 레이블 */}
        <div style={{ position: 'absolute', bottom: 12, right: 16, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          반경 {radius.toFixed(1)}m
        </div>
        <div style={{ position: 'absolute', top: 12, left: 16, fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
          5.8GHz MICROWAVE
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 8, display: 'block' }}>
            설치 높이: <span style={{ color: '#38bdf8' }}>{height}m</span>
          </label>
          <input type="range" min={3} max={15} value={height} onChange={e => setHeight(+e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 8, display: 'block' }}>
            감도: <span style={{ color: '#38bdf8' }}>{sensitivity}%</span>
          </label>
          <input type="range" min={10} max={100} value={sensitivity} onChange={e => setSensitivity(+e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>감지 반경</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#38bdf8' }}>{radius.toFixed(1)}m</div>
        </div>
        <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>커버리지 면적</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#22c55e' }}>{coverage.toFixed(0)}m²</div>
        </div>
        <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>최대 감지거리</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#f59e0b' }}>18m</div>
        </div>
      </div>
    </div>
  );
}

/* ──────── 열 방출 시뮬레이션 ──────── */
function ThermalSimulation() {
  const [ambient, setAmbient] = useState(25);
  const [load, setLoad] = useState(100);

  const baseTemp = ambient;
  const heatRise = (load / 100) * 35; // 알루미늄 다이캐스팅 기준 최대 35°C 상승
  const totalTemp = baseTemp + heatRise;
  const lifeReduction = totalTemp > 80 ? ((totalTemp - 80) * 2) : 0;
  const estimatedLife = Math.max(10000, 50000 - lifeReduction * 500);

  const tempColor = totalTemp > 85 ? '#ef4444' : totalTemp > 70 ? '#f59e0b' : '#22c55e';

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40 }}>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🌡️ 열 방출 시뮬레이션</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
        다이캐스팅 알루미늄 하우징의 열 방출 성능을 실시간으로 확인합니다.
      </p>

      {/* 온도 게이지 */}
      <div style={{
        height: 40, borderRadius: 20, marginBottom: 24,
        background: 'rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: 20,
          width: `${(totalTemp / 120) * 100}%`,
          background: `linear-gradient(90deg, #22c55e 0%, #f59e0b 60%, #ef4444 100%)`,
          transition: 'width 0.4s ease',
          boxShadow: `inset 0 2px 8px rgba(0,0,0,0.3)`,
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: `${(totalTemp / 120) * 100}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: 14, fontWeight: 900, color: '#fff',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}>
          {totalTemp.toFixed(1)}°C
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 8, display: 'block' }}>
            환경 온도: <span style={{ color: tempColor }}>{ambient}°C</span>
          </label>
          <input type="range" min={-10} max={55} value={ambient} onChange={e => setAmbient(+e.target.value)} style={{ width: '100%', accentColor: tempColor }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 8, display: 'block' }}>
            부하율: <span style={{ color: tempColor }}>{load}%</span>
          </label>
          <input type="range" min={10} max={100} value={load} onChange={e => setLoad(+e.target.value)} style={{ width: '100%', accentColor: tempColor }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>LED 접합 온도</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: tempColor }}>{totalTemp.toFixed(1)}°C</div>
        </div>
        <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>열 상승분</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#f59e0b' }}>+{heatRise.toFixed(1)}°C</div>
        </div>
        <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 4 }}>예상 수명</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#22c55e' }}>{(estimatedLife / 1000).toFixed(0)}K hr</div>
        </div>
      </div>
    </div>
  );
}

/* ──────── 스펙 데이터 ──────── */
const SPECS = [
  { category: '전기적 특성', items: [
    { label: '정격 전력', value: '150W' },
    { label: '입력 전압', value: 'AC 100-277V, 50/60Hz' },
    { label: '역률 (PF)', value: '> 0.95' },
    { label: 'THD', value: '< 15%' },
    { label: '서지 보호', value: '6kV/4kA' },
  ]},
  { category: '광학적 특성', items: [
    { label: '광속', value: '21,000 lm' },
    { label: '광효율', value: '140 lm/W' },
    { label: 'CRI', value: '> 80 (옵션 > 90)' },
    { label: '색온도', value: '3000K/4000K/5000K/6500K' },
    { label: '빔 각도', value: '60°/90°/120°' },
  ]},
  { category: '물리적 특성', items: [
    { label: '외경', value: 'Φ350mm × 180mm' },
    { label: '무게', value: '4.2 kg' },
    { label: '하우징', value: '다이캐스팅 ADC12 알루미늄' },
    { label: '표면처리', value: '양극산화 + 정전도장' },
    { label: 'IP등급', value: 'IP65 (방수방진)' },
  ]},
  { category: '센서 & 제어', items: [
    { label: '센서 유형', value: '5.8GHz 마이크로웨이브' },
    { label: '최대 감지거리', value: '18m (반경)' },
    { label: '감도 조절', value: '10%~100%' },
    { label: '디밍 방식', value: '0-10V / DALI / PWM' },
    { label: '프로토콜', value: 'Zigbee 3.0 (옵션)' },
  ]},
];

const CERTIFICATIONS = [
  { icon: '🇰🇷', name: 'KC', desc: '전기안전 인증' },
  { icon: '🇪🇺', name: 'CE', desc: '유럽 적합성' },
  { icon: '♻️', name: 'RoHS', desc: '유해물질 규제' },
  { icon: '🌍', name: 'CB', desc: '국제 안전 규격' },
  { icon: '🇺🇸', name: 'UL', desc: '미국 안전 인증' },
  { icon: '📐', name: 'IK08', desc: '내충격 등급' },
];

/* ═══════════════════════════ MAIN PAGE ═══════════════════════════ */
export default function UFOAM6Page() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
      <Navbar />

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '120px 24px 80px',
      }}>
        {/* 배경 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(56,189,248,0.06) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* 좌측: 제품 비주얼 */}
            <ScrollReveal>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                aspectRatio: '1', position: 'relative',
              }}>
                {/* 광원 효과 */}
                <div style={{
                  position: 'absolute', width: '80%', height: '80%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 50%, transparent 70%)',
                  animation: 'glow 4s ease-in-out infinite alternate',
                }} />

                {/* 제품 실루엣 */}
                <div style={{
                  width: 280, height: 200, position: 'relative',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* UFO 본체 */}
                  <div style={{
                    width: 260, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.08)',
                    position: 'relative', zIndex: 2,
                  }}>
                    {/* 발광면 */}
                    <div style={{
                      position: 'absolute', bottom: -3, left: '10%', right: '10%', height: 6,
                      background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.8), rgba(255,220,100,0.9), rgba(245,158,11,0.8), transparent)',
                      borderRadius: '0 0 50% 50%',
                      boxShadow: '0 4px 30px rgba(245,158,11,0.4), 0 10px 60px rgba(245,158,11,0.15)',
                    }} />
                  </div>

                  {/* 빛 콘 */}
                  <div style={{
                    width: 0, height: 0, marginTop: -2,
                    borderLeft: '130px solid transparent',
                    borderRight: '130px solid transparent',
                    borderTop: '200px solid rgba(245,158,11,0.04)',
                    filter: 'blur(8px)',
                    position: 'relative', zIndex: 1,
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: '-50%', right: '-50%', bottom: 0,
                      background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.08) 0%, transparent 50%)',
                    }} />
                  </div>
                </div>

                {/* 디자인 태그 */}
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  padding: '6px 14px', borderRadius: 8,
                  background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                  fontSize: 11, fontWeight: 700, color: '#f59e0b', letterSpacing: 1,
                }}>
                  IP65
                </div>
              </div>
            </ScrollReveal>

            {/* 우측: 제품 정보 */}
            <div>
              <ScrollReveal>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '6px 16px', background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.15)', borderRadius: 30, marginBottom: 24,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', letterSpacing: 2 }}>HIGH-BAY LIGHT</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h1 style={{
                  fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900,
                  letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 16,
                }}>
                  UFO-AM6-<span style={{ color: '#f59e0b' }}>150W</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)', fontWeight: 300, marginBottom: 8 }}>
                  스마트 센서 하이베이 조명
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 32 }}>
                  5.8GHz 마이크로웨이브 센서 내장으로 최대 18m 반경 감지.
                  다이캐스팅 ADC12 알루미늄 하우징의 탁월한 열 관리 설계.
                  140lm/W 고효율 광학으로 기존 HID/HPS 대비 60% 이상 에너지 절감.
                </p>
              </ScrollReveal>

              {/* 핵심 스펙 하이라이트 */}
              <ScrollReveal delay={250}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                  {[
                    { value: '150W', label: '정격 전력' },
                    { value: '21,000', label: 'lm 광속' },
                    { value: '140', label: 'lm/W 광효율' },
                  ].map(spec => (
                    <div key={spec.label} style={{
                      padding: '16px', borderRadius: 14,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: '#f59e0b', letterSpacing: '-0.02em' }}>{spec.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: 4 }}>{spec.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link href="/shop" style={{
                    padding: '14px 32px', fontSize: 15, fontWeight: 700,
                    background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#fff',
                    borderRadius: 50, textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(217,119,6,0.3)',
                  }}>견적 문의 →</Link>
                  <a href="#specs" style={{
                    padding: '14px 32px', fontSize: 15, fontWeight: 700,
                    background: 'rgba(255,255,255,0.06)', color: '#fff',
                    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, textDecoration: 'none',
                  }}>상세 스펙</a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 핵심 기능 스트립 ─────────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #050505, #080808)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: '📡', title: '18m 센서', desc: '5.8GHz 마이크로웨이브 모션 센서로 최대 18m 반경 감지', color: '#38bdf8' },
              { icon: '🔥', title: '열 관리', desc: 'ADC12 다이캐스팅 + 핀 방열 설계로 50,000시간 수명 보장', color: '#ef4444' },
              { icon: '⚡', title: '140lm/W', desc: 'LED 업계 최고 수준의 광효율, HID 대비 60% 절감', color: '#f59e0b' },
              { icon: '🛡️', title: 'IP65', desc: '분진 완전 차단 + 전방향 방수, 열악한 공장 환경 대응', color: '#22c55e' },
              { icon: '🔌', title: '멀티 디밍', desc: '0-10V / DALI / PWM 전 방식 호환 스마트 제어', color: '#818cf8' },
            ].map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 80}>
                <div style={{
                  padding: '32px 24px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center', transition: 'all 0.3s',
                  height: '100%',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${feat.color}33`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                >
                  <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{feat.icon}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: feat.color }}>{feat.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{feat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 인터랙티브 시뮬레이터 ──────────────────────── */}
      <section style={{ padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', letterSpacing: 3, marginBottom: 16 }}>PRODUCT SIMULATION</p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                제품 성능 인터랙티브 시뮬레이션
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 32 }}>
            <ScrollReveal delay={100}><SensorSimulator /></ScrollReveal>
            <ScrollReveal delay={200}><ThermalSimulation /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 상세 스펙 ─────────────────────────────────── */}
      <section id="specs" style={{ padding: '120px 24px', background: '#080808' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', letterSpacing: 3, marginBottom: 16 }}>SPECIFICATIONS</p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900 }}>상세 제품 사양</h2>
            </div>
          </ScrollReveal>

          {/* 탭 네비게이션 */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {SPECS.map((spec, i) => (
              <button key={spec.category} onClick={() => setActiveTab(i)} style={{
                padding: '10px 20px', fontSize: 14, fontWeight: 700,
                background: activeTab === i ? 'rgba(129,140,248,0.15)' : 'rgba(255,255,255,0.03)',
                color: activeTab === i ? '#818cf8' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${activeTab === i ? 'rgba(129,140,248,0.3)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {spec.category}
              </button>
            ))}
          </div>

          {/* 스펙 테이블 */}
          <ScrollReveal>
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20, overflow: 'hidden',
            }}>
              {SPECS[activeTab].items.map((item, i) => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 32px',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  borderBottom: i < SPECS[activeTab].items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: 15, color: '#fff', fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 인증 ──────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', letterSpacing: 3, marginBottom: 16 }}>CERTIFICATIONS</p>
              <h2 style={{ fontSize: 32, fontWeight: 900 }}>글로벌 인증 현황</h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {CERTIFICATIONS.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={i * 60}>
                <div style={{
                  padding: '24px 16px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}>
                  <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{cert.icon}</span>
                  <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>{cert.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{cert.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{
              padding: '64px 48px', borderRadius: 28,
              background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(217,119,6,0.06) 100%)',
              border: '1px solid rgba(245,158,11,0.12)',
            }}>
              <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>UFO-AM6-150W 견적 받기</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 32 }}>
                대량 구매, OEM/ODM 주문, 현장 맞춤 사양을 원하시면<br />
                지금 바로 견적을 요청해 주세요.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/shop" style={{
                  padding: '14px 32px', fontSize: 15, fontWeight: 700,
                  background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#fff',
                  borderRadius: 50, textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(217,119,6,0.3)',
                }}>견적 요청 →</Link>
                <Link href="/tech" style={{
                  padding: '14px 32px', fontSize: 15, fontWeight: 700,
                  background: 'rgba(255,255,255,0.06)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, textDecoration: 'none',
                }}>기술 시뮬레이터 →</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────── */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
        © 2026 (주)와이앤케이 — UFO-AM6-150W Product Page
      </footer>

      <style jsx>{`
        @keyframes glow {
          0% { opacity: 0.6; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.97); }
          50% { opacity: 1; transform: scale(1.03); }
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
      `}</style>
    </main>
  );
}
