'use client';
import React, { useState, useEffect } from 'react';
import { Package, Shield, Thermometer, Layers, Droplets, Info, AlertTriangle, CheckCircle2, FlaskConical } from 'lucide-react';

export default function MaterialManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [years, setYears] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('PC');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const materials = {
    PC: { name: 'PC (Polycarbonate)', uv: 8, heat: 9, impact: 10, cost: 'Medium', pros: '투명도 높음, 방탄 유리 소재, 고내열', cons: '스크래치에 취약, 약품에 민감' },
    ABS: { name: 'ABS', uv: 2, heat: 6, impact: 8, cost: 'Low', pros: '가공성 최고, 저렴한 단가, 도색 용이', cons: '옥외 노출 시 즉시 황변 및 부서짐' },
    ASA: { name: 'ASA', uv: 10, heat: 7, impact: 8, cost: 'High', pros: '최강의 내후성(UV차단), 옥외 최적', cons: 'ABS보다 비싼 단가, 가공 범위 좁음' },
    AL: { name: 'Aluminium Die-casting', uv: 10, heat: 10, impact: 9, cost: 'Premium', pros: '열 방출 최고, 영구적 내구성', cons: '비싼 금형비, 무거운 중량, 표면처리 필요' }
  };

  const getUvColor = (material: string, age: number) => {
    if (material === 'ABS') {
      const yellowVal = Math.min(255, 200 + age * 15);
      return `rgb(${yellowVal}, ${yellowVal - age * 30}, ${255 - age * 50})`;
    }
    if (material === 'PC') {
       return `rgba(186, 230, 253, ${Math.max(0.1, 0.8 - age * 0.05)})`;
    }
    return '#fff';
  };

  return (
    <div style={{
      width: '100%',
      background: '#020617',
      borderRadius: isMobile ? '0' : '24px',
      padding: isMobile ? '24px 16px' : '48px',
      color: '#f8fafc',
      fontFamily: '"Pretendard", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '32px' : '64px',
      boxShadow: '0 40px 100px rgba(0, 0, 0, 0.7)',
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.2 }}>
           🏗️ 실무 소재 백과사전 <br/>
           <span style={{ color: '#a855f7' }}>플라스틱부터 비철금속까지</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#94a3b8', maxWidth: '850px', margin: '0 auto', lineHeight: 1.6 }}>
           제품이 1년 만에 깨질지, 10년을 견딜지는 '소재'가 결정합니다. <br/>
           옥외용 가로등과 조명 기구 설계에 필수적인 4대 핵심 소재의 특징을 분석해봅시다.
        </p>
      </div>

      {/* Material Selector & Specs */}
      <section style={{ 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        padding: isMobile ? '24px' : '40px', 
        borderRadius: '32px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '48px' }}>
           
           <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                 {Object.keys(materials).map(m => (
                   <button 
                     key={m}
                     onClick={() => setSelectedMaterial(m)}
                     style={{
                       padding: '16px', borderRadius: '12px',
                       background: selectedMaterial === m ? '#a855f7' : '#1e293b',
                       color: '#fff', fontWeight: 900, cursor: 'pointer', border: 'none', transition: '0.2s'
                     }}
                   >
                     {m}
                   </button>
                 ))}
              </div>

              <div style={{ background: '#0f172a', padding: '32px', borderRadius: '24px', border: '1px solid #3b82f633' }}>
                 <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px', color: '#a855f7' }}>
                    {materials[selectedMaterial as keyof typeof materials].name}
                 </h2>
                 <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gap: '20px' }}>
                    {[
                      { label: '🛡️ 내후성 (UV Resistance)', val: materials[selectedMaterial as keyof typeof materials].uv, color: '#10b981' },
                      { label: '🔥 내열성 (Heat Resistance)', val: materials[selectedMaterial as keyof typeof materials].heat, color: '#f59e0b' },
                      { label: '🔨 충격 강도 (Impact Strength)', val: materials[selectedMaterial as keyof typeof materials].impact, color: '#3b82f6' }
                    ].map((spec, i) => (
                      <div key={i}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                            <span>{spec.label}</span>
                            <span>{spec.val} / 10</span>
                         </div>
                         <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${spec.val * 10}%`, height: '100%', background: spec.color, borderRadius: '4px' }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Material Detail Panel */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#064e3b', padding: '24px', borderRadius: '20px', border: '1px solid #10b98133' }}>
                 <h4 style={{ color: '#10b981', fontWeight: 800, marginBottom: '12px' }}>✅ 주요 장점</h4>
                 <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.6 }}>{materials[selectedMaterial as keyof typeof materials].pros}</p>
              </div>
              <div style={{ background: '#450a0a', padding: '24px', borderRadius: '20px', border: '1px solid #ef444433' }}>
                 <h4 style={{ color: '#f87171', fontWeight: 800, marginBottom: '12px' }}>⚠️ 주의 사항</h4>
                 <p style={{ fontSize: '15px', color: '#fca5a5', lineHeight: 1.6 }}>{materials[selectedMaterial as keyof typeof materials].cons}</p>
              </div>
              <div style={{ background: '#1e293b', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
                 <span style={{ fontSize: '14px', color: '#94a3b8' }}>상대적 원재료 단가</span>
                 <div style={{ fontSize: '24px', fontWeight: 900, color: '#a855f7', marginTop: '8px' }}>{materials[selectedMaterial as keyof typeof materials].cost}</div>
              </div>
           </div>
        </div>
      </section>

      {/* UV Aging Simulator */}
      <section style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '40px', borderRadius: '32px' }}>
         <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#a855f7', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FlaskConical size={30} /> 자외선(UV) 노출 시뮬레이션
         </h3>
         <div style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 700 }}>
               <span>옥외 노출 기간</span>
               <span style={{ color: '#a855f7' }}>{years}년 경과</span>
            </label>
            <input type="range" min="0" max="10" value={years} onChange={(e)=>setYears(Number(e.target.value))} style={{ width: '100%', accentColor: '#a855f7' }} />
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '20px' }}>
            {['ABS', 'PC', 'ASA'].map(m => (
               <div key={m} style={{ background: '#0f172a', padding: '32px', borderRadius: '24px', textAlign: 'center', border: '1px solid #1e293b' }}>
                  <div style={{ 
                    width: '100%', height: '100px', borderRadius: '12px', marginBottom: '20px',
                    background: getUvColor(m, years),
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.5s'
                  }} />
                  <div style={{ fontWeight: 800, fontSize: '18px' }}>{m}</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '10px' }}>
                     {m === 'ABS' ? (years > 2 ? '⚠️ 황변 및 크랙 발생' : '상태 양호') : 
                      m === 'PC' ? (years > 7 ? '⚠️ 백화 현상 시작' : '상태 양호') : '✨ 변화 없음 (내후성 최강)'}
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Final Summary Table */}
      <div style={{ overflowX: 'auto' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
               <tr style={{ borderBottom: '2px solid #334155' }}>
                  <th style={{ textAlign: 'left', padding: '20px', color: '#94a3b8' }}>구분</th>
                  <th style={{ textAlign: 'left', padding: '20px' }}>등기구 케이스</th>
                  <th style={{ textAlign: 'left', padding: '20px' }}>커버 (Lens)</th>
                  <th style={{ textAlign: 'left', padding: '20px' }}>브라켓/지주</th>
               </tr>
            </thead>
            <tbody>
               <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '20px', fontWeight: 700 }}>권장 소재</td>
                  <td style={{ padding: '20px', color: '#10b981' }}>Aluminium / ASA</td>
                  <td style={{ padding: '20px', color: '#38bdf8' }}>PC (UV Treated)</td>
                  <td style={{ padding: '20px', color: '#fbbf24' }}>Steel (HDG) / AL</td>
               </tr>
               <tr>
                  <td style={{ padding: '20px', fontWeight: 700 }}>이유</td>
                  <td style={{ padding: '20px', fontSize: '14px', color: '#94a3b8' }}>방열 및 내후성 확보</td>
                  <td style={{ padding: '20px', fontSize: '14px', color: '#94a3b8' }}>광투과율 및 충격보호</td>
                  <td style={{ padding: '20px', fontSize: '14px', color: '#94a3b8' }}>구조적 강도 및 부식방지</td>
               </tr>
            </tbody>
         </table>
      </div>

      <footer style={{ textAlign: 'center', padding: '40px 0' }}>
         <p style={{ fontSize: '20px', fontWeight: 800, color: '#a855f7' }}>디자인보다 중요한 것은 10년을 견디는 소재의 선택입니다. 🏗️</p>
      </footer>
    </div>
  );
}
