'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Sun, Moon, Move, Settings, Zap, Eye, BarChart3, CloudRain, Cpu, Network, Radio, Bell, Activity, ShieldCheck, Thermometer, Clock, Gauge, Share2, Globe, Database, Smartphone } from 'lucide-react';

export default function ControllerManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState('MPPT');
  const [loadStrategy, setLoadStrategy] = useState('Dynamic');
  const [isNight, setIsNight] = useState(false);
  const [commType, setCommType] = useState('LoRa');
  const [mpptSearch, setMpptSearch] = useState(85); // Efficiency
  const [soc, setSoc] = useState(75);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Professional Energy Transfer Model
  const energyGain = mode === 'MPPT' ? 32 : 0;
  const systemHealth = soc < 20 ? 'Critical' : soc < 40 ? 'Low' : 'Healthy';

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
      gap: '120px',
      boxShadow: '0 80px 180px rgba(0, 0, 0, 0.9)',
    }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '36px' : '84px', fontWeight: 900, marginBottom: '32px', lineHeight: 1, letterSpacing: '-0.05em' }}>
           🧠 <span style={{ color: '#fbbf24' }}>지능형 전력 제어 유닛(CCU)</span> <br/>
           <span style={{ color: '#38bdf8' }}>MPPT 알고리즘 & 스마트 관제 100% 실무</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '26px', color: '#94a3b8', maxWidth: '1100px', margin: '0 auto', lineHeight: 1.8 }}>
           컨트롤러는 가로등의 '태양광 발전'과 '에너지 보존'을 매칭하는 핵심 오케스트레이터입니다. <br/>
           기능을 넘어선 **알고리즘의 최적화**가 시스템의 수명을 10년 이상 보장합니다.
        </p>
      </div>

      {/* Chapter 1: MPPT Search & Peak Tracking Science */}
      <section style={{ background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: isMobile ? '32px' : '80px', borderRadius: '64px' }}>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
               <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#fbbf24', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <Cpu size={40} /> 지능형 MPPT 추직 로직
               </h2>
               <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
                  {['MPPT', 'PWM'].map(m => (
                    <button key={m} onClick={()=>setMode(m)} style={{ flex: 1, padding: '24px', borderRadius: '20px', background: mode === m ? '#fbbf24' : '#1e1b4b', border: 'none', color: mode === m ? '#000' : '#fff', fontWeight: 900, cursor: 'pointer', transition: '0.3s' }}>{m} Architecture</button>
                  ))}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #334155' }}>
                     <h4 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>{mode} 발전 메커니즘 분석</h4>
                     <p style={{ color: '#94a3b8', lineHeight: 2.0, fontSize: '16px' }}>
                        {mode === 'MPPT' ? (
                          'P&O (Perturb and Observe) 알고리즘을 탑재하여 패널의 출력 전압을 초당 수십 회 이상 미세 조정(Scanning)합니다. 특히 겨울철이나 저온 환경에서 패널의 높은 전압을 배터리 충전 전류로 증폭시켜 발전량을 30% 이상 향상시키는 전문가용 솔루션입니다.'
                        ) : (
                          '패널의 전압을 배터리 전압까지 강제로 클램핑(Clamping)하여 연결합니다. 전압 차이만큼의 파워는 컨트롤러 내부의 열로 소산되며, 직사광선이 강한 낮 시간대에는 전체 가용 에너지의 절반 가까이를 잃게 됩니다.'
                        )}
                     </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                     <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>발전 가용 에너지</div>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#10b981' }}>{mode === 'MPPT' ? '98%' : '65%'}</div>
                     </div>
                     <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>추가 에너지 이득</div>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24' }}>+ {energyGain}%</div>
                     </div>
                  </div>
               </div>
            </div>

            <div style={{ background: '#020617', height: '500px', borderRadius: '56px', border: '8px solid #1e2937', position: 'relative', overflow: 'hidden', padding: '40px' }}>
               <h4 style={{ textAlign: 'center', color: '#64748b', fontWeight: 800 }}>P-V Curve Max Search</h4>
               <div style={{ position: 'relative', width: '100%', height: '80%', marginTop: '30px' }}>
                  {/* Mockup Graph Chart */}
                  <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ overflow: 'visible' }}>
                     <path d="M 0 280 Q 200 50 400 280" fill="none" stroke="#334155" strokeWidth="4" />
                     {mode === 'MPPT' ? (
                        <>
                           <circle cx="200" cy="120" r="12" fill="#fbbf24" style={{ filter: 'blur(10px)', animation: 'pulse 2s infinite' }} />
                           <circle cx="200" cy="120" r="6" fill="#fbbf24" />
                           <line x1="200" y1="120" x2="200" y2="280" stroke="#fbbf2444" strokeDasharray="4 4" />
                           <text x="215" y="110" fill="#fbbf24" fontSize="14" fontWeight="900">MAX POINT FOUND</text>
                        </>
                     ) : (
                        <>
                           <circle cx="300" cy="180" r="6" fill="#94a3b8" />
                           <line x1="300" y1="180" x2="300" y2="280" stroke="#334155" strokeDasharray="4 4" />
                           <text x="260" y="165" fill="#94a3b8" fontSize="12">FIXED POINT (PWM)</text>
                        </>
                     )}
                     <line x1="0" y1="280" x2="400" y2="280" stroke="#1e293b" strokeWidth="2" />
                     <line x1="0" y1="0" x2="0" y2="280" stroke="#1e293b" strokeWidth="2" />
                  </svg>
               </div>
            </div>
         </div>
      </section>

      {/* Chapter 2: Smart City & Global IoT Dashboard */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #020617 100%)', padding: isMobile ? '40px' : '80px', borderRadius: '64px', border: '1px solid #312e81' }}>
         <div style={{ textAlign: 'center', marginBottom: '80px' }}>
           <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#818cf8', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
             <Globe size={48} /> 국가급 스마트 시티 관제 노드
           </h2>
           <p style={{ color: '#94a3b8', fontSize: '20px' }}>각 가로등은 단순한 조명이 아닌 '데이터 수집 장치'로 동작합니다.</p>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { id: 'LoRa', icon: <Radio />, title: 'LoRaWAN', desc: '중계기 하나로 10km 범위를 커버하는 비면허 대역 통신의 표준.' },
              { id: 'Zigbee', icon: <Share2 />, title: 'Mesh Network', desc: '가로등 간 자율 그물망 통신으로 사각지대 없는 데이터 전달.' },
              { id: 'NBIoT', icon: <Network />, title: 'NB-IoT', desc: '통신사 LTE 망을 이용하여 가장 높은 보안성과 신뢰성 제공.' },
              { id: 'Server', icon: <Database />, title: 'Cloud CMS', desc: '전 세계 만 대 이상의 가로등을 실시간 Map 기반으로 관리.' }
            ].map((item, idx) => (
               <div key={idx} style={{ background: '#0f172a', padding: '40px', borderRadius: '32px', border: '1px solid #1e293b', transition: '0.3s' }}>
                  <div style={{ color: '#818cf8', marginBottom: '24px' }}>{item.icon}</div>
                  <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '16px' }}>{item.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7 }}>{item.desc}</p>
               </div>
            ))}
         </div>

         <div style={{ marginTop: '80px', background: '#020617', padding: '48px', borderRadius: '48px', border: '1px solid #334155' }}>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <Smartphone size={32} /> 원격 실시간 제어 인터페이스
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '80px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ padding: '24px', background: '#0f172a', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <div style={{ color: '#94a3b8', fontSize: '14px' }}>배터리 잔량 (SOC)</div>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: systemHealth === 'Critical' ? '#f43f5e' : '#10b981' }}>{soc}%</div>
                     </div>
                     <div style={{ width: '150px' }}>
                        <input type="range" value={soc} onChange={(e)=>setSoc(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                     </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                     <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>시스템 상태</div>
                        <div style={{ color: '#10b981', fontWeight: 900 }}>ONLINE / STABLE</div>
                     </div>
                     <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>센서 노드</div>
                        <div style={{ color: '#fbbf24', fontWeight: 900 }}>PIR ACTIVE</div>
                     </div>
                  </div>
               </div>
               <div style={{ background: '#1e1b4b', padding: '40px', borderRadius: '40px' }}>
                  <h5 style={{ fontWeight: 800, marginBottom: '16px' }}>System Alert Log</h5>
                  <div style={{ fontSize: '14px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'monospace' }}>
                     <p style={{ color: '#10b981' }}>[07:00] Charging Bulk Mode started</p>
                     <p style={{ color: '#fbbf24' }}>[12:00] MPPT Peak Reached at 18.5V</p>
                     <p>[18:30] Entering Night Mode - Load ON</p>
                     {soc < 30 && <p style={{ color: '#f43f5e' }}>[WARN] Low Battery - Dimming 30%</p>}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Chapter 3: Sensor Fusion & Dynamic Dimming Algorithm */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
         <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Move size={48} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>센서 퓨전 (Motion)</h4>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 2.0 }}>
               단순한 움직임 감지가 아닙니다. **마이크로웨이브 센서**와 PIR을 교차 검증하여 
               나뭇가지의 흔들림이나 눈/비에 의한 오동작을 99% 차단하고, 
               실제 보행자가 접근할 때만 0.5초 내에 부드럽게 밝기를 올립니다.
            </p>
         </div>
         <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#10b981', marginBottom: '24px' }}><Clock size={48} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>가변 시간 디밍</h4>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 2.0 }}>
               배터리 잔량에 따라 디밍 스케줄을 실시간 수정합니다. 
               흐린 날이 지속되어 SOC가 30% 미만일 경우, 심야 시간대 기본 밝기를 10%로 낮춰 
               가로등이 완전히 꺼지는 최악의 상황을 방지하는 상시 보존(Preservation) 로직입니다.
            </p>
         </div>
         <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#a855f7', marginBottom: '24px' }}><Settings size={48} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>고정밀 RTC 회로</h4>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 2.0 }}>
               인터넷 연결이 끊긴 극한 환경에서도 자체 **실시간 시계(RTC)**와 슈퍼 커패시터를 통해 
               일몰/일출 시간을 1분 오차 내로 계산합니다. 위성 GPS 데이터를 수신하여 
               현장 위치별 정확한 절기 데이터를 자동으로 업데이트합니다.
            </p>
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24', marginBottom: '20px' }}>지능형 제어가 도시의 밤을 바꿉니다. 🎛️</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Global Intelligent Control Guide by Antigravity Systems</p>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
