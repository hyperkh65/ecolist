'use client';
import React, { useState, useEffect } from 'react';
import { Lightbulb, Search, BookOpen, BarChart, Clock, ShieldCheck, Sun, Eye, CheckCircle2, Thermometer, FlaskConical, Zap, Activity, Grid3X3, Layers, Microscope, Ruler, FileText, TrendingUp } from 'lucide-react';

export default function LEDChipManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [cct, setCct] = useState(5000);
  const [cri, setCri] = useState(80);
  const [chipSize, setChipSize] = useState('3030');
  const [junctionTemp, setJunctionTemp] = useState(65);
  const [view, setView] = useState('spec');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getCctColor = (temp: number) => {
    if (temp <= 3000) return '#fbbf24';
    if (temp <= 4000) return '#fde68a';
    if (temp <= 5000) return '#fff';
    return '#bae6fd';
  };

  const lifetimePercent = Math.max(0, 100 - (junctionTemp - 25) * 1.6);

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
        <h1 style={{ fontSize: isMobile ? '32px' : '72px', fontWeight: 900, marginBottom: '32px', lineHeight: 1, letterSpacing: '-0.05em' }}>
           🛡️ <span style={{ color: '#fbbf24' }}>LED 칩 기술 사양</span> <br/> 
           <span style={{ color: '#38bdf8' }}>완벽 해독 마스터 가이드</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '24px', color: '#94a3b8', maxWidth: '1050px', margin: '0 auto', lineHeight: 1.8 }}>
          전문가는 데이터시트 이면의 물리 법칙을 읽습니다. <br/>
          단순한 밝기가 아닌 **광속 유지율(L70), 연색성(CRI), 열 저항(Rth), 비닝(Binning)**의 
          유기적 관계를 분석하여 10년 수명의 솔루션을 구축하는 100% 현장 지침서입니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {[
          { id: 'spec', label: '사양서 독해법', icon: <FileText size={18}/> },
          { id: 'size', label: '패키지 사이즈별 분석', icon: <Grid3X3 size={18}/> },
          { id: 'thermal', label: '열 역학 및 수명 예측', icon: <Thermometer size={18}/> },
          { id: 'binning', label: '비닝 및 광 품질 전략', icon: <Microscope size={18}/> },
        ].map(tab => (
          <button 
            key={tab.id} onClick={() => setView(tab.id)}
            style={{
              padding: '18px 28px', borderRadius: '24px', border: '1px solid #1e293b',
              background: view === tab.id ? '#fbbf24' : '#0f172a',
              color: view === tab.id ? '#000' : '#fff', cursor: 'pointer', fontWeight: 900, fontSize: '15px',
              display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* View: Spec Sheet Reading */}
      {view === 'spec' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#fbbf24' }}>표준 데이터시트(Datasheet) 파헤치기</h2>
              <p style={{ color: '#94a3b8', marginTop: '16px' }}>숫자 속에 숨겨진 칩의 실제 성능을 읽는 법을 공개합니다.</p>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
              <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
                 <div style={{ color: '#fbbf24', marginBottom: '24px' }}><Ruler size={40} /></div>
                 <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>광학 파라미터</h4>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <li><b>CCT (Correlated Color Temp)</b>: 빛의 색상. 5700K(주광색), 3000K(전구색).</li>
                    <li><b>CRI (Ra)</b>: 연색지수. 80Ra는 표준이며, 박물관용은 95Ra 이상 필수.</li>
                    <li><b>Luminous Flux</b>: 칩의 총 밝기. Binning 등급에 따라 ±5% 차이 발생.</li>
                    <li><b>Beam Angle</b>: 칩 자체의 각도(보통 120°). 렌즈 설계의 기초값.</li>
                 </ul>
              </div>
              <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
                 <div style={{ color: '#10b981', marginBottom: '24px' }}><Zap size={40} /></div>
                 <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>전기적 파라미터</h4>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <li><b>Forward Voltage (Vf)</b>: 칩 구동 전압. 발열 시 0.2~0.3V 하강함.</li>
                    <li><b>Test Current (If)</b>: 측정 기준 전류. 가동 중 전류가 이보다 높으면 수명 단축.</li>
                    <li><b>Reverse Current (Ir)</b>: 누설 전류. 정적 에너지 파괴를 막는 칩의 건강 지표.</li>
                    <li><b>ESD Protection</b>: 정전기 내성(보통 2kV~8kV). 품질의 척도.</li>
                 </ul>
              </div>
              <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
                 <div style={{ color: '#38bdf8', marginBottom: '24px' }}><TrendingUp size={40} /></div>
                 <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>신뢰성/수명 지수</h4>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <li><b>L70 / L90</b>: 밝기가 70%/90%로 떨어지는 시점(보통 5~10만 시간).</li>
                    <li><b>LM-80 Report</b>: 온도별 6,000시간 가동 데이터 확인 필수.</li>
                    <li><b>Thermal Resistance (Rth)</b>: 열 전달 효율. 낮을수록 하이엔드 칩.</li>
                    <li><b>Operating Temp</b>: 실제 현장에서 견딜 수 있는 주변 온도 한계.</li>
                 </ul>
              </div>
           </div>
        </div>
      )}

      {/* View: Package Size Analysis */}
      {view === 'size' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: '64px', alignItems: 'center' }}>
              <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                 <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24', marginBottom: '32px' }}>패키지 규격별 특징 분석</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { id: '3030', label: '3030 (3.0mm x 3.0mm)', desc: '가장 범용적인 사이즈. 가성비가 뛰어나며 가로등, 보안등 모듈의 90% 이상이 이 규격을 사용합니다. 6V/1W급이 메인입니다.' },
                      { id: '5050', label: '5050 (5.0mm x 5.0mm)', desc: '고출력 하이파워 칩. 9V/5W급 이상의 고광속 구현에 적합합니다. 면적이 커서 열 방출에 유리하지만 단가가 높습니다.' },
                      { id: '2835', label: '2835 (2.8mm x 3.5mm)', desc: '실내조명(방등, 오피스)의 표준. 0.2W~0.5W급 저출력 설계로 부드러운 빛을 내는 데 최적화되어 있습니다.' },
                      { id: '3535', label: '3535 Ceramic', desc: '세라믹 기판을 사용한 극한 환경용 칩. Rth가 매우 낮아 혹서기 실외 가로등이나 투광등에 사용됩니다.' },
                    ].map(s => (
                      <div key={s.id} onClick={() => setChipSize(s.id)} style={{ padding: '24px', borderRadius: '24px', border: '1px solid #334155', background: chipSize === s.id ? '#fbbf24' : 'transparent', color: chipSize === s.id ? '#000' : '#fff', cursor: 'pointer', transition: '0.3s' }}>
                         <p style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>{s.label}</p>
                         <p style={{ fontSize: '14px', opacity: 0.8 }}>{s.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div style={{ background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 100%)', height: '500px', borderRadius: '56px', border: '8px solid #1e2937', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                 <div style={{ 
                    width: chipSize === '5050' ? '150px' : chipSize === '3030' ? '100px' : '90px',
                    height: chipSize === '5050' ? '150px' : chipSize === '3030' ? '100px' : '110px',
                    background: '#fbbf24', borderRadius: '12px', boxShadow: '0 0 80px #fbbf24',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: '#000',
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }}>
                   {chipSize}
                 </div>
                 <div style={{ position: 'absolute', bottom: 40, color: '#94a3b8', fontSize: '14px' }}>규격에 따른 기판 점유 면적 및 방열 비율 가이드</div>
              </div>
           </div>
        </div>
      )}

      {/* View: Thermal Thermodynamics (The "Science" part) */}
      {view === 'thermal' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#10b981', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Thermometer size={40} /> 결합 온도(Tj)와 수명의 상관관계
                 </h3>
                 <div style={{ marginBottom: '48px' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 800 }}>
                       <span>🌡️ 예상 접합 온도 (Junction Temperature)</span>
                       <span style={{ color: junctionTemp > 85 ? '#f43f5e' : '#10b981', fontSize: '28px' }}>{junctionTemp} °C</span>
                    </label>
                    <input type="range" min="25" max="150" value={junctionTemp} onChange={(e)=>setJunctionTemp(Number(e.target.value))} style={{ width: '100%', accentColor: junctionTemp > 85 ? '#f43f5e' : '#10b981' }} />
                 </div>
                 <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
                    <h4 style={{ fontWeight: 800, color: '#fff', marginBottom: '24px' }}>LM-80 기반 수명 예측 공식</h4>
                    <p style={{ color: '#cbd5e1', lineHeight: 1.9, fontSize: '16px' }}>
                       LED 칩의 밝기가 초기 대비 70%가 되는 시간(L70)은 칩 내부 온도가 <b>10도 상승할 때마다 약 50%씩 급감</b>합니다. <br/>
                       - Tj 65℃: 예상 수명 약 100,000시간 (안정적) <br/>
                       - Tj 85℃: 예상 수명 약 50,000시간 (표준) <br/>
                       - Tj 105℃: 예상 수명 약 20,000시간 (위험) <br/>
                       <br/>
                       <b>Expert Advice:</b> 하이엔드 가로등은 실온 25℃ 기준, 칩 온도가 70℃를 넘지 않도록 방열 구성을 해야 10년 품질 보증이 가능합니다.
                    </p>
                 </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '130px', fontWeight: 900, color: junctionTemp > 85 ? '#f43f5e' : '#10b981', lineHeight: 1, textShadow: '0 0 50px rgba(0,0,0,0.5)' }}>
                    {lifetimePercent.toFixed(0)}<span style={{ fontSize: '40px' }}>%</span>
                 </div>
                 <p style={{ fontSize: '20px', fontWeight: 800, color: '#94a3b8', marginTop: '24px' }}>칩 내구도 보존율</p>
                 <div style={{ marginTop: '40px', padding: '24px', background: '#020617', borderRadius: '32px', border: '2px solid #1e293b' }}>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>현재 온도에서는 초기 성능의 <b>{lifetimePercent.toFixed(0)}%</b>를 유지하며 5만 시간 연속 가동이 가능합니다.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* View: Binning & Optics (Distribution) */}
      {view === 'binning' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px' }}>
              <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                 <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fbbf24', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Microscope size={32} /> 비닝(Binning)과 SDCM의 의미
                 </h3>
                 <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.9, marginBottom: '32px' }}>
                   칩 브랜드보다 중요한 것이 비닝 등급입니다. 
                   **MacAdam 3-Step SDCM**은 사람의 눈이 색 차이를 거의 느끼지 못하는 정밀한 선별 기준입니다. 
                   저가형 칩은 5-Step 이상을 사용하여 여러 대를 설치했을 때 어떤 가로등은 노랗고 어떤 것은 하얗게 보이는 현상이 발생합니다.
                 </p>
                 <div style={{ display: 'flex', gap: '12px' }}>
                   {[1, 3, 5, 7].map(step => (
                     <div key={step} style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ width: '100%', height: '40px', background: step <= 3 ? '#10b981' : '#f43f5e', borderRadius: '8px', marginBottom: '8px' }} />
                        <span style={{ fontSize: '12px' }}>{step} Step</span>
                     </div>
                   ))}
                 </div>
              </div>
              
              <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                 <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#38bdf8', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Sun size={32} /> 광학 지수 및 배광곡선 해독
                 </h3>
                 <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.9, marginBottom: '24px' }}>
                   **배광곡선(Distribution Curve)**은 원점에서 빛이 뻗어 나가는 강도를 각도별로 선으로 이은 그래프입니다. 
                   가로등에서 가장 중요한 것은 **Uniformity(균제도)**입니다. 
                 </p>
                 <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', border: '1px solid #334155' }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px' }}>
                       <li>📌 **I-max**: 최대 광도(cd). 운전자의 눈부심(Glare) 판단 기준.</li>
                       <li>📌 **Beam Angle**: 50%의 밝기가 유지되는 각도.</li>
                       <li>📌 **IES 파일**: 실제 현장 시뮬레이션(Dialux)에 필수적인 데이터.</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Chapter 6: Final Technical Secret (Sulfuration) */}
      <section style={{ background: 'rgba(244, 63, 94, 0.05)', padding: isMobile ? '32px' : '64px', borderRadius: '56px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
               <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#f43f5e', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <ShieldCheck size={40} /> 황화(Sulfuration) 및 정전기 방지 기술
               </h2>
               <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: 2.0 }}>
                 실외 가로등 환경의 최대 적은 아황산가스(SO2)입니다. 
                 칩 내부의 은(Ag) 도금이 황과 반응하여 검게 변하면 밝기가 50% 이하로 급감합니다. <br/>
                 또한, 겨울철 건조한 환경에서의 <b>정전기(ESD)</b>는 칩 내부 지능형 회로를 파괴하는 주범입니다. 
                 데이터시트에서 'Sulfur-Resistant' 규격과 최소 6kV 이상의 Zener Diode 내장 여부를 확인하십시오.
               </p>
            </div>
            <div style={{ background: '#020617', padding: '40px', borderRadius: '40px', border: '1px solid #f43f5e33', textAlign: 'center' }}>
               <h4 style={{ color: '#f43f5e', fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>실패하는 칩 선정의 특징</h4>
               <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8 }}>
                 - 무조건 칩 한 개의 밝기(lm)만 보는 경우 <br/>
                 - LM-80 Report 날짜가 3년 이상 지난 경우 <br/>
                 - Rth가 4.0℃/W 이상인 저가형 기판 칩 <br/>
                 - SDCM 비닝 정보가 기재되지 않은 칩
               </p>
            </div>
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24', marginBottom: '20px' }}>데이터는 신뢰의 다른 이름입니다. 🌟</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Global Technical Standardization Group by Antigravity</p>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
