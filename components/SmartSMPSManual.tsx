'use client';
import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, Network, AlertTriangle, Settings, Lightbulb, Workflow, ShieldCheck, Thermometer, BarChart3, Clock, Layers, Gauge } from 'lucide-react';

export default function SmartSMPSManual() {
  const [isMobile, setIsMobile] = useState(false);
  const [load, setLoad] = useState(50);
  const [temp, setTemp] = useState(45);
  const [dimmingType, setDimmingType] = useState('PWM');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculation results
  const efficiency = Math.max(85, 96 - Math.abs(load - 80) * 0.2);
  const ripple = Math.max(0.5, 5 - (load / 20));

  return (
    <div style={{
      width: '100%',
      background: '#020617',
      borderRadius: isMobile ? '0' : '48px',
      padding: isMobile ? '24px 16px' : '80px',
      color: '#f8fafc',
      fontFamily: '"Pretendard", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
      boxShadow: '0 60px 150px rgba(0, 0, 0, 0.9)',
    }}>

      {/* Hero Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '32px' : '64px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
           ⚡ <span style={{ color: '#38bdf8' }}>스마트 LED SMPS</span> <br/>
           <span style={{ fontSize: '0.6em', color: '#94a3b8', display: 'block', marginTop: '16px' }}>초정밀 디밍 제어 및 전력 변환 공학의 정점</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#94a3b8', maxWidth: '1000px', margin: '0 auto', lineHeight: 1.8 }}>
           컨버터는 단순히 전기를 바꾸는 장치가 아닙니다. 0.1% 미만의 미세 디밍을 구현하는 **해상도 제어**와 
           낙뢰로부터 보호하는 **서지 방호**, 그리고 **고효율 에너지 변환** 기술이 집약된 시스템의 전원부입니다.
        </p>
      </div>

      {/* Chapter 1: Topology & Efficiency Simulator */}
      <section style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: isMobile ? '32px' : '64px', borderRadius: '56px' }}>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
               <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#38bdf8', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Cpu size={40} /> 1. 토폴로지와 효율 시뮬레이션
               </h2>
               <div style={{ marginBottom: '40px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                     <span>📉 부하율 (Load Percentage)</span>
                     <span style={{ color: '#38bdf8', fontSize: '24px' }}>{load} %</span>
                  </label>
                  <input type="range" min="10" max="100" value={load} onChange={(e)=>setLoad(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center' }}>
                     <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>변환 효율</p>
                     <div style={{ fontSize: '32px', fontWeight: 900, color: '#10b981' }}>{efficiency.toFixed(1)}%</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center' }}>
                     <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>Ripple & Noise</p>
                     <div style={{ fontSize: '32px', fontWeight: 900, color: '#f43f5e' }}>{ripple.toFixed(1)}%</div>
                  </div>
               </div>
            </div>

            <div style={{ background: '#020617', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
               <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px' }}>전문가 가이드: 최적 부하 구간</h3>
               <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '15px' }}>
                  플라이백(Flyback) 컨버터와 LLC 공진형 컨버터 모두 **80~90% 부하 구간**에서 최고의 효율을 보입니다. <br/>
                  부하가 30% 이하로 떨어지면 스위칭 손실 비중이 커져 효율이 급격히 낮아지며, 리플 노이즈(Ripple)가 증가하여 LED 수명에 악영향을 미칠 수 있습니다. 
                  따라서 설계 시 LED 모듈 소모 전력보다 **약 10~20%** 여유 있는 SMPS를 선택하는 것이 이상적입니다.
               </p>
            </div>
         </div>
      </section>

      {/* Chapter 2: Multi-Stage Protection Science */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
         <div style={{ background: '#0f172a', padding: '48px', borderRadius: '40px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#f43f5e', marginBottom: '24px' }}><ShieldCheck size={40} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>계통 보호 (Surge & OVP)</h4>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8 }}>
               실외 현장은 낙뢰와 개폐 서지에 항시 노출됩니다. <b>10kV 이상의 SPD(Surge Protective Device)</b>와 
               함께 과전압 보호(OVP) 회로가 이중으로 설계되어야 SMPS 내부의 전해 콘덴서와 FET 파손을 막을 수 있습니다.
            </p>
         </div>
         <div style={{ background: '#0f172a', padding: '48px', borderRadius: '40px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#fbbf24', marginBottom: '24px' }}><Thermometer size={40} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>열관리 지능 (OTP & Derating)</h4>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8 }}>
               고온 환경(60℃ 이상)에서 SMPS 내부 온도가 한계를 넘으면 **출력을 스스로 낮추는(Derating)** 지능형 OTP가 작동해야 합니다. 
               단순히 전원을 차단하는 것보다 밝기를 50%로 낮춰 안전을 확보하며 기기를 보호하는 것이 고급 설계의 핵심입니다.
            </p>
         </div>
         <div style={{ background: '#0f172a', padding: '48px', borderRadius: '40px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Activity size={40} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>Flicker-Free 회로 공학</h4>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8 }}>
               <b>Two-Stage 아키텍처</b>는 입력 전원 노이즈를 첫 단(PFC)에서 제거하고 두 번째 단(DC-DC)에서 순수 직류로 변환합니다. 
               이는 스마트폰 카메라 촬영 시에도 검은 줄이 생기지 않는 완전한 플리커 프리 성능을 보장합니다.
            </p>
         </div>
      </section>

      {/* Chapter 3: High-Resolution Dimming Protocol */}
      <section style={{ 
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)', 
        padding: isMobile ? '32px' : '64px', 
        borderRadius: '56px', 
        border: '1px solid #1e293b' 
      }}>
         <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#fbbf24', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
               <Gauge size={40} /> 3. 초정밀 디밍(Dimming) 프로토콜 심층분석
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '18px' }}>0~10V 아날로그부터 디지털 DALI-2까지, 제어의 정밀도가 공간의 품질을 결정합니다.</p>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { id: '1-10V', color: '#10b981', title: '1-10V Analog', desc: '가장 널리 쓰이는 표준. 하지만 노이즈에 취약하며 여러 대를 연결할 경우 전압 강하로 인한 밝기 불균일이 발생할 수 있습니다.' },
              { id: 'PWM', color: '#38bdf8', title: 'PWM Digital', desc: '고속 스위칭으로 밝기를 제어. 1% 미만의 딥 디밍(Deep Dimming)에서도 색온도 변화 없이 매우 안정적인 제어가 가능합니다.' },
              { id: 'DALI', color: '#818cf8', title: 'DALI-2 / D4i', desc: '양방향 통신 지원. 등기구의 전력량, 온도, 고장 여부를 실시간으로 보고받는 스마트 관리 시스템의 표준입니다.' },
              { id: 'Zigbee', color: '#f43f5e', title: 'Wireless Mesh', desc: '무선으로 개별 제어. 배축 공사가 필요 없어 리모델링 현장에 최적이며, 스마트폰 앱으로 즉각적인 그룹핑이 가능합니다.' }
            ].map(protocol => (
               <div key={protocol.id} style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: protocol.color, marginBottom: '16px' }}>{protocol.id}</div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px' }}>{protocol.title}</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{protocol.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Chapter 4: Circuit Logic & Component Secrets */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px' }}>
         <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '32px' }}>⚡ 내부 핵심 소자의 이해</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <li style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: '#38bdf8' }}><Zap size={24} /></div>
                  <div>
                     <strong style={{ color: '#fff' }}>전해 콘덴서 (Low ESR)</strong>
                     <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>SMPS 수명의 90%를 결정합니다. 105℃ 고온용 콘덴서 채용 여부가 5만 시간 수명 보장의 척도입니다.</p>
                  </div>
               </li>
               <li style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: '#fbbf24' }}><Layers size={24} /></div>
                  <div>
                     <strong style={{ color: '#fff' }}>트랜스포머 (Isolation)</strong>
                     <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>고주파 에너지를 전달하며 입력-출력 간 전기적 절연을 담당합니다. 함침(Potting) 처리가 잘 되어야 소음을 막을 수 있습니다.</p>
                  </div>
               </li>
            </ul>
         </div>
         <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '32px' }}>⚠️ 설치 및 결선 주의사항</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <li style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: '#f43f5e' }}><AlertTriangle size={24} /></div>
                  <div>
                     <strong style={{ color: '#fff' }}>Inrush Current (돌입전류)</strong>
                     <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>전원을 켤 때 일시적으로 수십 배의 전류가 흐릅니다. 차단기 용량 선정 시 N-Type보다는 D-Type 차단기를 권장합니다.</p>
                  </div>
               </li>
               <li style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: '#10b981' }}><Workflow size={24} /></div>
                  <div>
                     <strong style={{ color: '#fff' }}>Vf 매칭 윈도우</strong>
                     <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>LED 모듈의 전압이 SMPS 출력 범위의 정중앙에 올 때 효율이 가장 높습니다. 범위를 벗어나면 점멸 현상이 발생할 수 있습니다.</p>
                  </div>
               </li>
            </ul>
         </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '32px', fontWeight: 900, color: '#38bdf8', marginBottom: '20px' }}>컨버터는 조명의 생명선이자 지능의 중심입니다. ⚡</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Smart Power Solutions Guide by Antigravity Technical Content</p>
      </footer>
    </div>
  );
}
