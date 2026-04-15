'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Battery, Zap, Shield, AlertTriangle, RefreshCcw, Ruler, Settings, Thermometer, Activity, Info, BarChart3, Layers, CloudRain, Flame, Gauge, TrendingDown, ClipboardList, ZapOff } from 'lucide-react';

export default function BatteryManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [temp, setTemp] = useState(25);
  const [dod, setDod] = useState(80);
  const [sysVolt, setSysVolt] = useState(12.8);
  const [crate, setCrate] = useState(0.2); // C-rate
  
  // States for Capacity Calculator
  const [wattage, setWattage] = useState(60);
  const [hours, setHours] = useState(12);
  const [days, setDays] = useState(3);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalWh = useMemo(() => (wattage * hours * days), [wattage, hours, days]);
  const requiredAh = useMemo(() => (totalWh / sysVolt / (dod / 100)).toFixed(1), [totalWh, sysVolt, dod]);
  
  // Advanced Cycle Life Estimation (Multi-parameter)
  const estimatedCycles = useMemo(() => {
    let base = dod > 95 ? 1500 : dod > 80 ? 3500 : dod > 50 ? 6000 : 8000;
    // Temp penalty
    if (temp > 50) base *= 0.4;
    else if (temp > 40) base *= 0.7;
    else if (temp < 0) base *= 0.6; // Lithium plating risk
    
    // C-rate penalty (Higher discharge current = shorter life)
    if (crate > 1.0) base *= 0.7;
    else if (crate > 0.5) base *= 0.9;
    
    return Math.round(base);
  }, [dod, temp, crate]);

  const cycleYear = (estimatedCycles / 365).toFixed(1);

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
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '36px' : '84px', fontWeight: 900, marginBottom: '32px', lineHeight: 1, letterSpacing: '-0.05em' }}>
           ⚡ <span style={{ color: '#10b981' }}>차세대 리튬인산철(LiFePO4)</span> <br/>
           <span style={{ color: '#38bdf8' }}>배터리 엔지니어링 마스터 가이드</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '26px', color: '#94a3b8', maxWidth: '1150px', margin: '0 auto', lineHeight: 1.8 }}>
           단순한 전력 저장이 아닌 **'수명 정밀 제어'**의 영역입니다. <br/>
           화학적 특성(Chemistry)부터 BMS 제어로직, 환경 변수 시뮬레이션까지 
           배터리의 모든 잠재력을 끌어내는 100% 실무 가이드입니다.
        </p>
      </div>

      {/* Chapter 1: Standard Capacity Architecture */}
      <section style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: isMobile ? '32px' : '80px', borderRadius: '64px' }}>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
               <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#10b981', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <Activity size={40} /> 시스템 용량 설계 (Sizing)
               </h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 800 }}>
                       <span>💡 조명 소비전력 (Watt)</span>
                       <span style={{ color: '#10b981', fontSize: '24px' }}>{wattage} W</span>
                    </label>
                    <input type="range" min="10" max="500" step="5" value={wattage} onChange={(e)=>setWattage(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                     <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px', border: '1px solid #1e293b' }}>
                        <label style={{ display: 'block', marginBottom: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: 800 }}>🕒 점등 시간/일</label>
                        <input type="number" value={hours} onChange={(e)=>setHours(Number(e.target.value))} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #334155', fontSize: '24px', fontWeight: 900, color: '#fff', textAlign: 'center' }} />
                     </div>
                     <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px', border: '1px solid #1e293b' }}>
                        <label style={{ display: 'block', marginBottom: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: 800 }}>📅 무일조 보증일</label>
                        <input type="number" value={days} onChange={(e)=>setDays(Number(e.target.value))} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #334155', fontSize: '24px', fontWeight: 900, color: '#fff', textAlign: 'center' }} />
                     </div>
                  </div>

                  <div style={{ background: '#1e1b4b99', padding: '32px', borderRadius: '32px' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 800 }}>
                       <span>🔋 권장 방전심도 (DoD)</span>
                       <span style={{ color: '#38bdf8', fontSize: '24px' }}>{dod} %</span>
                    </label>
                    <input type="range" min="30" max="100" step="5" value={dod} onChange={(e)=>setDod(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '16px' }}>DoD 70~80% 설계가 리튬인산철 배터리의 'Sweet Spot'입니다.</p>
                  </div>
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               <div style={{ background: '#020617', padding: '56px', borderRadius: '56px', border: '2px solid #10b981', textAlign: 'center', boxShadow: '0 0 80px rgba(16, 185, 129, 0.1)' }}>
                  <div style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '16px' }}>총 필요 배터리 용량</div>
                  <div style={{ fontSize: '80px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{requiredAh} <span style={{ fontSize: '28px', color: '#10b981' }}>Ah</span></div>
                  <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                     {[12.8, 25.6, 51.2].map(v => (
                        <button key={v} onClick={()=>setSysVolt(v)} style={{ padding: '12px 24px', borderRadius: '16px', background: sysVolt === v ? '#10b981' : '#1e293b', border: 'none', color: '#fff', fontWeight: 900, cursor: 'pointer', transition: '0.3s' }}>{v}V</button>
                     ))}
                  </div>
               </div>
               <div style={{ padding: '32px', background: '#0f172a', borderRadius: '40px', border: '1px solid #1e293b' }}>
                  <h4 style={{ fontWeight: 900, fontSize: '20px', marginBottom: '16px', color: '#fbbf24' }}>Energy Formula</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Energy (Wh):</span> <span>{totalWh} Wh</span></div>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>System Loss (Efficiency 90%):</span> <span style={{ color: '#f43f5e' }}>-{(totalWh * 0.1).toFixed(0)} Wh</span></div>
                     <div style={{ borderTop: '1px solid #334155', paddingTop: '12px', marginTop: '4px', fontSize: '18px', fontWeight: 900, display: 'flex', justifyContent: 'space-between' }}>
                        <span>최종 가용 에너지:</span> <span>{(totalWh * 0.9).toFixed(0)} Wh</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Chapter 2: Life Cycle & Environmental Physics */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '64px', alignItems: 'center' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <TrendingDown size={40} /> 수명 열화 시뮬레이션 (Aging Model)
            </h3>
            
            <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '48px' }}>
                  <div>
                     <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                        <span>🌡️ 운용 온도</span>
                        <span style={{ color: temp > 45 ? '#f43f5e' : '#10b981' }}>{temp} °C</span>
                     </label>
                     <input type="range" min="-20" max="60" value={temp} onChange={(e)=>setTemp(Number(e.target.value))} style={{ width: '100%', accentColor: '#f43f5e' }} />
                  </div>
                  <div>
                     <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                        <span>⚡ C-rate (충방전율)</span>
                        <span style={{ color: crate > 0.5 ? '#f43f5e' : '#10b981' }}>{crate} C</span>
                     </label>
                     <input type="range" min="0.1" max="2.0" step="0.1" value={crate} onChange={(e)=>setCrate(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                  </div>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', textAlign: 'center' }}>
                     <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>예상 사이클 (L80 기준)</div>
                     <div style={{ fontSize: '40px', fontWeight: 900, color: '#10b981' }}>{estimatedCycles} <span style={{ fontSize: '16px' }}>Cycles</span></div>
                  </div>
                  <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', textAlign: 'center' }}>
                     <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>기대 수명 (Years)</div>
                     <div style={{ fontSize: '40px', fontWeight: 900, color: '#fbbf24' }}>{cycleYear} <span style={{ fontSize: '16px' }}>Years</span></div>
                  </div>
               </div>
            </div>
         </div>

         <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #020617 100%)', padding: '48px', borderRadius: '48px', border: '1px solid #334155' }}>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', color: '#fff' }}>Expert Advice</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '24px', color: '#94a3b8', fontSize: '16px', lineHeight: 1.8 }}>
               <li>🔥 **60°C 이상**: 셀 내부 전해액 분해 가속화(Swelling 발생). 1개월 노출 시 수명 20% 영구 손실.</li>
               <li>❄️ **0°C 이하 충전**: 리튬 플레이팅(Dendrite) 현상으로 내부 단락 및 화재 위험 폭증. 저온 충전 제한 BMS 필수.</li>
               <li>⚡ **High C-rate**: 1.0C 이상의 고출력 방전은 내부 저항(ESR)에 의한 발열로 사이클을 급감시킵니다.</li>
            </ul>
         </div>
      </section>

      {/* Chapter 3: BMS Logic & Cell Balancing Architecture */}
      <section>
         <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '64px', textAlign: 'center' }}>BMS (Battery Management System) 프로토콜</h2>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
            <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
               <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Gauge size={48} /></div>
               <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>SOC & SOH 알고리즘</h4>
               <p style={{ color: '#cbd5e1', lineHeight: 1.9, fontSize: '15px' }}>
                 단순 전압 측정이 아닌 **전류 적산법(Coulomb Counting)** 방식을 사용하여 잔량을 정확히 계산합니다. 
                 동시에 내부 저항 변화를 추적하여 수명 점수(SOH)를 관리자에게 통보합니다.
               </p>
            </div>
            <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
               <div style={{ color: '#10b981', marginBottom: '24px' }}><Layers size={48} /></div>
               <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>Active Cell Balancing</h4>
               <p style={{ color: '#cbd5e1', lineHeight: 1.9, fontSize: '15px' }}>
                 충전 시 전압이 높은 셀의 에너지를 낮은 셀로 강제 이동시킵니다. 
                 이 기술이 없는 배터리는 1년 내에 셀 편차로 인해 실사용 용량이 30% 이상 감소하게 됩니다.
               </p>
            </div>
            <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
               <div style={{ color: '#f43f5e', marginBottom: '24px' }}><Shield size={48} /></div>
               <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>5중 보호 회로 (Safety)</h4>
               <p style={{ color: '#cbd5e1', lineHeight: 1.9, fontSize: '15px' }}>
                 과충전(OVP), 과방전(UVP), 과전류(OCP), 단락(SCP), 온도보호(OTP). 
                 단 하나의 셀이라도 범위를 벗어나면 수 밀리초(ms) 내에 전체 뱅크를 물리적으로 차단합니다.
               </p>
            </div>
         </div>
      </section>

      {/* Chapter 4: Lithium Chemistry Deep Comparison */}
      <div style={{ background: '#0f172a', padding: isMobile ? '40px' : '80px', borderRadius: '64px' }}>
         <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '48px', textAlign: 'center' }}>리튬인산철(LFP) vs 삼원계(NCM) 비교</h3>
         <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
               <thead>
                  <tr style={{ color: '#64748b', fontSize: '14px', borderBottom: '2px solid #334155' }}>
                     <th style={{ padding: '20px' }}>항목</th>
                     <th style={{ padding: '20px' }}>LiFePO4 (LFP)</th>
                     <th style={{ padding: '20px' }}>NCM (삼원계)</th>
                  </tr>
               </thead>
               <tbody style={{ fontSize: '16px' }}>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                     <td style={{ padding: '20px', color: '#94a3b8' }}>수명 (Cycle)</td>
                     <td style={{ padding: '20px', color: '#10b981', fontWeight: 900 }}>3,000 ~ 6,000</td>
                     <td style={{ padding: '20px' }}>500 ~ 1,500</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                     <td style={{ padding: '20px', color: '#94a3b8' }}>안전성 (Thermal Runway)</td>
                     <td style={{ padding: '20px', color: '#10b981', fontWeight: 900 }}>매우 높음 (불이 안 붙음)</td>
                     <td style={{ padding: '20px', color: '#f43f5e' }}>위험 (열폭주 시 폭발)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                     <td style={{ padding: '20px', color: '#94a3b8' }}>에너지 밀도</td>
                     <td style={{ padding: '20px' }}>중급 (부피가 큼)</td>
                     <td style={{ padding: '20px', color: '#38bdf8', fontWeight: 900 }}>최상 (작고 가벼움)</td>
                  </tr>
                  <tr>
                     <td style={{ padding: '20px', color: '#94a3b8' }}>추천 용도</td>
                     <td style={{ padding: '20px' }}>옥외 가로등, ESS, 선박</td>
                     <td style={{ padding: '20px' }}>전기차, 드론, 스마트폰</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      {/* Final Action Section */}
      <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)', padding: isMobile ? '40px' : '80px', borderRadius: '64px', textAlign: 'center' }}>
         <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '24px' }}>신뢰할 수 있는 에너지 솔루션의 시작 🔋</h2>
         <p style={{ fontSize: '20px', opacity: 0.8, maxWidth: '800px', margin: '0 auto 48px' }}>
            데이터 시트의 수치와 실제 현장의 변수는 다를 수 있습니다. 
            상시 모니터링 시스템과 정기적인 SOC 보정만이 무정전 시스템을 약속합니다.
         </p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px 40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
               <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>표준 공칭 전압</div>
               <div style={{ fontSize: '24px', fontWeight: 900 }}>3.2V / Cell</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px 40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
               <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>충전 종지 전압</div>
               <div style={{ fontSize: '24px', fontWeight: 900 }}>3.65V / Cell</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px 40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
               <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>방전 종지 전압</div>
               <div style={{ fontSize: '24px', fontWeight: 900 }}>2.5V / Cell</div>
            </div>
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '28px', fontWeight: 900, color: '#10b981', marginBottom: '16px' }}>Powering the Future, Protecting the Core.</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Advanced Battery Engineering Division by Antigravity</p>
      </footer>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          height: 8px;
          border-radius: 5px;
          background: #334155;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
