'use client';
import React, { useState, useEffect } from 'react';
import { Package, Shield, Thermometer, Layers, Droplets, Info, AlertTriangle, CheckCircle2, FlaskConical, Scale, Zap, Flame, Wind, Eye, MousePointer2, Settings, Minimize2, Maximize2, Sun } from 'lucide-react';

export default function MaterialManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [years, setYears] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('PC');
  const [thickness, setThickness] = useState(3.0);
  const [temp, setTemp] = useState(25);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const materials = {
    PC: { 
      name: 'Polycarbonate (PC) - Teijin/Samyang Grade', 
      uv: 8.5, heat: 9.2, impact: 10, cost: 'Medium', weight: 1.2,
      physical: '엔지니어링 플라스틱의 제왕. 굴절률 1.58로 유리와 유사하나 내충격성은 250배.',
      pros: '방탄 유리 수준의 강도(IK10 가능), 높은 광투과율(90% 이상), 높은 비결정성으로 치수 정밀도 우수, 뛰어난 자기소화성.', 
      cons: '알칼리 성분에 노출 시 미세 크랙(Crazing) 발생, 유기용제(알코올 등)에 극도로 취약, 반복 가열 시 취성 발생.',
      thermal: '125~145°C (Glass Transition Temp)',
      flame: 'UL94 V-0 ~ V-2 (난연제 처방 필수)',
      ik: 'IK08 ~ IK10+ (두께 3mm 기준)',
      cte: '65 x 10^-6 /K (알루미늄의 약 3배)'
    },
    PMMA: { 
      name: 'Acrylic (PMMA) - Sumitomo Grade', 
      uv: 10, heat: 6.5, impact: 4, cost: 'Low-Medium', weight: 1.18,
      physical: '광학용 플라스틱의 정점. 자외선에 가장 강하며 변색이 거의 없음.',
      pros: '최고의 투과율(92~93%), 황변 현상 거의 없음(내후성 최강), 표면 경도가 높음, 연마(Polishing) 용이.', 
      cons: '충격에 매우 약함(잘 깨짐), 취성이 강해 조립 시 피스 체결 주의, 열변형 온도가 낮음(90도 미만).',
      thermal: '85~105°C (장시간 고출력 LED 적용 시 변형 위험)',
      flame: 'HB (가연성, 화재에 매우 취약)',
      ik: 'IK02 ~ IK04 (낙하 충격에 파손 가능성 높음)',
      cte: '70 x 10^-6 /K'
    },
    ADC12: { 
      name: 'Aluminium Die-casting (ADC12/A383)', 
      uv: 10, heat: 10, impact: 10, cost: 'High (Tooling)', weight: 2.7,
      physical: '비철금속 중 가장 경제적인 고방열 소재. 가로등 하우징의 표준.',
      pros: '압도적인 방열 성능(96W/mK), 구조적 강성 매우 높음, 대량 생산성(사이클 타임 짧음), 반영구적 수명.', 
      cons: '초기 금형비용이 매우 비쌈, 염수 분무 시 백화 현상 발생(분체 도장 필수), 정밀 나사산 가공 필요.',
      thermal: '580°C (구조 유지), 방열 설계의 핵심',
      flame: '불연 (A1 등급)',
      ik: 'IK10++ (변형 없을 정도의 강도)',
      cte: '21 x 10^-6 /K (플라스틱과의 매칭 설계 필수)'
    },
    AL6063: { 
      name: 'Aluminium Extrusion (AL6063-T5)', 
      uv: 10, heat: 10, impact: 9, cost: 'Medium', weight: 2.7,
      physical: '압출 성형용 고급 알루미늄 합금. 표면 조도가 뛰어나고 아노다이징 품질 우수.',
      pros: 'ADC12보다 높은 열전도율(200W/mK), 표면 미려함(고급 투광등), 길이 연장 자유로움, 금형비 저렴.', 
      cons: '복잡한 3D 형상 구현 불가(단면 형태 고정), 표면 부식 방지 처리 필수, 강도는 ADC12보다 낮음.',
      thermal: '600°C+',
      flame: '불연',
      ik: 'IK10 (두께 설계에 따라 다름)',
      cte: '23 x 10^-6 /K'
    }
  };

  const getUvEffect = (material: string, age: number) => {
    if (material === 'PMMA') return 'rgba(255, 255, 255, 0.9)';
    if (material === 'PC') {
      const yellow = age * 2;
      return `rgba(255, 255, ${255 - yellow * 5}, ${Math.max(0.2, 0.9 - age * 0.03)})`;
    }
    return '#fff';
  };

  const transLoss = selectedMaterial === 'PC' ? (thickness * 1.5).toFixed(1) : (thickness * 0.8).toFixed(1);

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
      gap: '100px',
      boxShadow: '0 60px 150px rgba(0, 0, 0, 0.9)',
    }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '36px' : '80px', fontWeight: 900, marginBottom: '32px', lineHeight: 1, letterSpacing: '-0.04em' }}>
           🧩 <span style={{ color: '#a855f7' }}>엔지니어링 소재</span> <br/>
           <span style={{ color: '#38bdf8' }}>실무 메커니즘과 설계 전략</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '26px', color: '#94a3b8', maxWidth: '1100px', margin: '0 auto', lineHeight: 1.8 }}>
           단순한 선택이 아닌 **'신뢰성 설계'**의 시작입니다. <br/>
           두께 0.5mm의 차이, 소재 1g의 배합이 10년 후의 제품 운명을 결정합니다. 
           물리적 특성을 넘어 화학적 내성까지 분석하는 100% 실무 프로토콜입니다.
        </p>
      </div>

      {/* Chapter 1: Material Deep-Dive Dashboard */}
      <section>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: '60px' }}>
            {/* Control Panel */}
            <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
               <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '40px', color: '#a855f7' }}>핵심 소재 레이더 차트</h3>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '48px' }}>
                  {Object.keys(materials).map(m => (
                    <button 
                      key={m} onClick={() => setSelectedMaterial(m)}
                      style={{
                        padding: '28px 16px', borderRadius: '24px',
                        background: selectedMaterial === m ? '#a855f7' : 'transparent',
                        border: '2px solid' + (selectedMaterial === m ? '#a855f7' : '#1e293b'),
                        color: '#fff', fontWeight: 900, cursor: 'pointer', transition: '0.3s',
                        boxShadow: selectedMaterial === m ? '0 20px 40px rgba(168, 85, 247, 0.4)' : 'none'
                      }}
                    >
                      {m}
                    </button>
                  ))}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {[
                    { label: '🛡️ 내후성 (UV)', val: materials[selectedMaterial as keyof typeof materials].uv, color: '#10b981' },
                    { label: '🔥 내열성 (Heat)', val: materials[selectedMaterial as keyof typeof materials].heat, color: '#f59e0b' },
                    { label: '🔨 강도 (IK Rating)', val: materials[selectedMaterial as keyof typeof materials].impact, color: '#3b82f6' }
                  ].map((s, idx) => (
                    <div key={idx}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 800 }}>
                          <span>{s.label}</span>
                          <span style={{ color: s.color }}>{s.val} / 10</span>
                       </div>
                       <div style={{ height: '14px', background: '#020617', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ width: `${s.val * 10}%`, height: '100%', background: s.color, transition: '0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Insight Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               <div style={{ background: 'linear-gradient(135deg, #a855f711 0%, #38bdf811 100%)', padding: '56px', borderRadius: '56px', border: '1px solid #ffffff11' }}>
                  <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '24px' }}>{materials[selectedMaterial as keyof typeof materials].name}</h2>
                  <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: 2.0, marginBottom: '40px' }}>
                     {materials[selectedMaterial as keyof typeof materials].physical}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px' }}>
                     <div style={{ background: '#064e3b55', padding: '32px', borderRadius: '32px', borderLeft: '8px solid #10b981' }}>
                        <h4 style={{ color: '#10b981', fontWeight: 900, marginBottom: '16px' }}>엔지니어링 강점</h4>
                        <p style={{ fontSize: '15px', lineHeight: 1.8 }}>{materials[selectedMaterial as keyof typeof materials].pros}</p>
                     </div>
                     <div style={{ background: '#450a0a55', padding: '32px', borderRadius: '32px', borderLeft: '8px solid #f43f5e' }}>
                        <h4 style={{ color: '#f43f5e', fontWeight: 900, marginBottom: '16px' }}>설계시 치명적 결함</h4>
                        <p style={{ fontSize: '15px', lineHeight: 1.8 }}>{materials[selectedMaterial as keyof typeof materials].cons}</p>
                     </div>
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
                  <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                     <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>열팽창 계수 (CTE)</div>
                     <div style={{ fontSize: '20px', fontWeight: 900, color: '#fbbf24' }}>{materials[selectedMaterial as keyof typeof materials].cte}</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                     <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>난연 인증</div>
                     <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>{materials[selectedMaterial as keyof typeof materials].flame}</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                     <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>최고 가용 온도</div>
                     <div style={{ fontSize: '20px', fontWeight: 900, color: '#38bdf8' }}>{materials[selectedMaterial as keyof typeof materials].thermal}</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Chapter 2: Interactive Thickness & Efficiency Simulator */}
      <section style={{ background: '#0f172a', padding: isMobile ? '40px' : '80px', borderRadius: '64px', border: '1px solid #a855f733' }}>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
               <h3 style={{ fontSize: '36px', fontWeight: 900, color: '#fbbf24', marginBottom: '32px' }}>재질 두께별 광학 효율 손실</h3>
               <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.9, marginBottom: '48px' }}>
                  보호판의 두께가 1.0mm 증가할 때마다 투과율은 선형적으로 감소하지 않습니다. 
                  재질 내부의 입자 밀도와 굴절률에 의해 발생하는 **'에너지 감쇄(Attenuation)'** 현상을 
                  설계 단계에서 반드시 고려해야 전체 등기구의 lm/W 목표를 달성할 수 있습니다.
               </p>
               
               <div style={{ marginBottom: '40px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, marginBottom: '20px' }}>
                     <span>📏 기판/보호판 두께 (mm)</span>
                     <span style={{ color: '#a855f7', fontSize: '24px' }}>{thickness} mm</span>
                  </label>
                  <input type="range" min="1.0" max="6.0" step="0.1" value={thickness} onChange={(e)=>setThickness(Number(e.target.value))} style={{ width: '100%', accentColor: '#a855f7' }} />
               </div>

               <div style={{ background: '#020617', padding: '40px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#ef4444' }}>
                     <AlertTriangle size={32} />
                     <div>
                        <p style={{ fontWeight: 900, fontSize: '18px' }}>예상 측정 효율 손실: {transLoss}%</p>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>해당 두께 적용 시 최종 등기구 광효율이 기준 대비 약 {transLoss}% 낮아집니다. (Diffusion 혼합률 별도)</p>
                     </div>
                  </div>
               </div>
            </div>

            <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ 
                  width: '300px', height: `${thickness * 30}px`, background: 'rgba(168, 85, 247, 0.4)', borderRadius: '16px',
                  border: '4px solid #a855f7', boxShadow: '0 0 100px rgba(168, 85, 247, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '24px',
                  transition: 'all 0.5s ease'
               }}>
                  MATERIAL LAYER
               </div>
               <div style={{ position: 'absolute', top: 0, color: '#fbbf24' }}><Sun size={64} /></div>
               <div style={{ position: 'absolute', bottom: -20, color: '#10b981', opacity: 1 - Number(transLoss)/100 }}><Eye size={48} /></div>
            </div>
         </div>
      </section>

      {/* Chapter 3: Advanced Material Physics (Thermal & Chemical) */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
         <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#fbbf24', marginBottom: '24px' }}><Scale size={48} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>CTE 불일치 (Thermal Stress)</h4>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 2.0 }}>
               알루미늄 바디에 PC 커버를 직접 체결할 때 가장 많이 실수하는 부분입니다. 
               여름철 직사광선 아래에서 PC는 알루미늄보다 **3배 이상 팽창**합니다. 
               고정 홀에 유격(Gap)을 주지 않으면 커버가 휘거나 피스 홀 부분이 파손되는 'Stress Crack'이 발생합니다.
            </p>
         </div>
         <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Droplets size={48} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>내화학성 (Solvent Danger)</h4>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 2.0 }}>
               사출 시 발생하는 **잔류 응력(Residual Stress)**은 보이지 않는 시한폭탄입니다. 
               작업자가 알코올 헝겊으로 지문을 닦는 순간, PC 소재의 고분자 사슬이 끊어지며 
               수일 내에 거미줄 같은 균열이 발생합니다. 어닐링(Annealing) 공정을 통해 응력을 제거하십시오.
            </p>
         </div>
         <div style={{ background: '#0f172a', padding: '56px', borderRadius: '48px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#10b981', marginBottom: '24px' }}><Maximize2 size={48} /></div>
            <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>확산제(Diffuser) 설계</h4>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 2.0 }}>
               LED 소자의 도트(Dot)를 가리기 위해 White Pigment를 섞으면 빛은 부드러워지지만 효율이 급감합니다. 
               최근에는 빛을 **전반사**시키는 구형 비즈(Beads) 형태의 확산제를 사용하여 
               투과율 80% 이상을 유지하면서 높은 확산성을 구현하는 기술이 대세입니다.
            </p>
         </div>
      </section>

      {/* Chapter 4: Aluminium Alloys for Master Engineers */}
      <section style={{ background: 'rgba(56, 189, 248, 0.05)', padding: isMobile ? '40px' : '80px', borderRadius: '64px', border: '1px solid #38bdf833' }}>
         <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '48px', textAlign: 'center' }}>알루미늄 합금(Alloy) 선정 가이드</h2>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px' }}>
            <div style={{ background: '#020617', padding: '48px', borderRadius: '40px', border: '2px solid #38bdf8' }}>
               <h4 style={{ fontSize: '24px', fontWeight: 900, color: '#38bdf8', marginBottom: '24px' }}>ADC12 vs ADC10 (다이캐스팅)</h4>
               <p style={{ color: '#cbd5e1', lineHeight: 2.0, fontSize: '16px' }}>
                  국내외 가로등 시장의 95%는 ADC12를 사용합니다. 규소(Si) 함량이 높아 용탕 흐름성이 좋고 정밀한 살빼기가 가능하기 때문입니다. 
                  하지만 더 높은 연성(Extension)이 필요한 브라켓이나 가공 부위에는 ADC10을 검토하십시오. 구리 함량이 높아 절삭 가공성이 우수합니다.
               </p>
            </div>
            <div style={{ background: '#020617', padding: '48px', borderRadius: '40px', border: '2px solid #10b981' }}>
               <h4 style={{ fontSize: '24px', fontWeight: 900, color: '#10b981', marginBottom: '24px' }}>AL6063-T5 (압출)</h4>
               <p style={{ color: '#cbd5e1', lineHeight: 2.0, fontSize: '16px' }}>
                  벽등이나 슬림한 경관 조명에서 아노다이징(Anodizing) 처리를 할 계획이라면 반드시 6000계열을 써야 합니다. 
                  다이캐스팅 소재는 규소 때문에 아노다이징 시 표면이 검게 변하여 불가능합니다. 
                  결정립이 고운 6063-T5는 은빛 금속 광택을 내는 최상의 소재입니다.
               </p>
            </div>
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '36px', fontWeight: 900, color: '#a855f7', marginBottom: '24px' }}>소재는 거짓말을 하지 않습니다. 🏗️</p>
         <p style={{ color: '#64748b', fontSize: '20px' }}>Technical Material Reference Guide by Antigravity Engineering</p>
      </footer>
    </div>
  );
}
