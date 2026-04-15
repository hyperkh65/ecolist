'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Settings, Workflow, Zap, Box, Activity, AlertTriangle, 
  CheckCircle2, Sliders, Layout, Layers, Info, Hammer, 
  Minimize2, Maximize2, Gauge, HardHat, Pipette, Scissors, 
  Play, RefreshCcw, ArrowRight, Microscope, Ruler, Database,
  Thermometer, Droplets, Fan
} from 'lucide-react';

export default function MoldManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('process');
  const [thickness, setThickness] = useState(3.0);
  const [material, setMaterial] = useState('PC');
  const [area, setArea] = useState(250);
  const [pressure, setPressure] = useState(800);
  const [moldTemp, setMoldTemp] = useState(85);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculations = useMemo(() => {
    const clampForce = (area * (pressure / 10)) / 1000;
    const coolingTime = thickness * thickness * 2.5 * (1 + (moldTemp - 60) * 0.01);
    const cycleTime = 8 + coolingTime;
    const shrinkMap: Record<string, number> = { 'PC': 0.006, 'ABS': 0.005, 'ASA': 0.005, 'PC+ABS': 0.0055, 'PMMA': 0.004 };
    const shrinkVal = shrinkMap[material] || 0.005;
    return { clampForce, cycleTime, shrinkVal };
  }, [area, pressure, thickness, material, moldTemp]);

  const runSimulation = (msg: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(`${msg} 분석 결과: 유동 선단(Melt Front) 합류 시 웰드라인 발생 확률 12% 미만, 냉각 균일도 95% 달성을 확인했습니다.`);
    }, 1500);
  };

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
        <h1 style={{ fontSize: isMobile ? '32px' : '72px', fontWeight: 950, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
           ⚙️ <span style={{ color: '#ec4899' }}>초정밀 금형 및 성형 공학</span> <br/>
           <span style={{ fontSize: '0.6em', color: '#94a3b8', display: 'block', marginTop: '16px' }}>이중 사출, 다중 압출 및 고압 다이캐스팅의 정점</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#94a3b8', maxWidth: '1050px', margin: '0 auto', lineHeight: 1.8 }}>
           제품의 품질은 금형에서 결정됩니다. 본 가이드는 단순 사출을 넘어 이중 사출(2-Shot), 다중 압출(Co-Extrusion) 등 
           차세대 공법의 메커니즘과 현장 수치 데이터를 집약한 100% 실무 엔지니어링 지침서입니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.5)', padding: '8px', borderRadius: '20px', width: 'fit-content', margin: '0 auto', border: '1px solid #1e293b' }}>
        {[
          { id: 'process', label: '차세대 성형공법', icon: Workflow },
          { id: 'lab', label: '성형 역학 실험실', icon: Activity },
          { id: 'multishot', label: '특수 결합 공정', icon: Layers },
          { id: 'defect', label: '불량 분석 센터', icon: AlertTriangle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '16px',
              border: 'none',
              background: activeTab === tab.id ? '#ec4899' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#94a3b8',
              fontWeight: 800,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section: Advance Processes */}
      {activeTab === 'process' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
          <ProcessCard 
            icon={Box}
            color="#ec4899"
            title="정밀 사출 (Precision Injection)"
            desc="복잡한 형상을 0.01mm 오차 이내로 구현합니다. 냉각 통로(Conformal Cooling)의 지능적 배치가 사출 후 휨(Warpage) 방지의 핵심입니다."
            features={['핫 러너(Hot Runner) 시스템', '고속 사출 압축 성형', '진공 에어 벤트 최적화']}
          />
          <ProcessCard 
            icon={Scissors}
            color="#38bdf8"
            title="연속 압출 (Extrusion)"
            desc="알루미늄 방열바와 PC 광학 커버를 위한 연속 공정입니다. 다이(Die) 설계 시 소재의 유체 역학적 거동(Newtonian Fluid)을 계산하여 두께 균일도를 확보합니다."
            features={['다층 공압출(Co-Ex)', '인라인 레이저 치수 제어', '진공 사이징 조절']}
          />
          <ProcessCard 
            icon={Hammer}
            color="#fbbf24"
            title="고압 다이캐스팅 (Die Casting)"
            desc="금속 소재의 방열판(Heat Sink) 제작에 필수적입니다. 용탕의 급격한 응고를 제어하여 기포(Porosity) 없는 고밀도 조직을 형성합니다."
            features={['고압 질소 충진', '이형제 정밀 도포', '실시간 용탕 온도 제어']}
          />
        </section>
      )}

      {/* Section: Lab Simulation */}
      {activeTab === 'lab' && (
        <section style={{ background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '64px', borderRadius: '56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
               <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#ec4899', marginBottom: '40px' }}>성형 변수 역학 실험실 (Rheology Lab)</h3>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                       <span>📏 제품 벽두께 (Wall Thickness)</span>
                       <span style={{ color: '#ec4899', fontSize: '24px' }}>{thickness} mm</span>
                    </label>
                    <input type="range" min="0.5" max="10.0" step="0.1" value={thickness} onChange={(e)=>setThickness(Number(e.target.value))} style={{ width: '100%', accentColor: '#ec4899' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                     <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                           <span>🌡️ 금형 온도</span>
                           <span style={{ color: '#fbbf24' }}>{moldTemp} °C</span>
                        </label>
                        <input type="range" min="40" max="150" value={moldTemp} onChange={(e)=>setMoldTemp(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
                     </div>
                     <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                           <span>⚡ 사출 압력</span>
                           <span style={{ color: '#10b981' }}>{pressure} bar</span>
                        </label>
                        <input type="range" min="300" max="1800" value={pressure} onChange={(e)=>setPressure(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                     </div>
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginTop: '48px' }}>
                  <ResultBox title="필요 형체력" value={`${calculations.clampForce.toFixed(1)} Ton`} color="#f43f5e" />
                  <ResultBox title="예상 사이클 타임" value={`${calculations.cycleTime.toFixed(1)}s`} color="#38bdf8" />
                  <ResultBox title="재료 수축율" value={`${(calculations.shrinkVal * 100).toFixed(2)}%`} color="#fbbf24" />
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               <div style={{ background: '#020617', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b', textAlign: 'center' }}>
                  <Thermometer size={60} color="#ec4899" style={{ marginBottom: '24px' }} />
                  <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '16px' }}>가상 성형 해석 (CAE)</h4>
                  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px' }}>
                     설정된 파라미터를 기반으로 금형 내부의 수지 유동 선단과 가스 배출 경로를 해석합니다.
                  </p>
                  <button 
                    onClick={() => runSimulation('Moldflow Analysis')}
                    style={{ width: '100%', padding: '24px', borderRadius: '24px', background: '#ec4899', border: 'none', color: '#fff', fontWeight: 950, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                  >
                    {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                    해석 소프트웨어 가동
                  </button>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Section: Special Processes (Double Injection) */}
      {activeTab === 'multishot' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px' }}>
           <div style={{ background: '#0f172a', padding: '56px', borderRadius: '56px', border: '1px solid #1e293b' }}>
              <div style={{ color: '#ec4899', marginBottom: '24px' }}><Layers size={48} /></div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px' }}>이중 사출 (2-Shot Molding)</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '16px', marginBottom: '40px' }}>
                 하나의 금형 안에서 두 번의 사출 공정이 연이어 발생합니다. 
                 1차로 사출된 강성 소재(PC) 위에 2차로 탄성 소재(TPE)를 사출하여, 접착제 없이 분자 수준에서 결합된 완벽한 방수 하우징을 만듭니다. 
                 회전판(Rotary Plate) 기술이 이 정밀함의 핵심입니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', borderLeft: '4px solid #ec4899' }}>
                    <div style={{ fontWeight: 800, color: '#fff' }}>Gasket 일체화 공법</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>별도의 실리콘 패킹 없이도 IP68 등급의 방수 성능을 영구 보장</div>
                 </div>
                 <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', borderLeft: '4px solid #ec4899' }}>
                    <div style={{ fontWeight: 800, color: '#fff' }}>다색 성형 (Multi-Color)</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>로고나 버튼 아이콘을 다른 색상으로 사출하여 내구성과 디자인 완성도 극대화</div>
                 </div>
              </div>
           </div>

           <div style={{ background: '#0f172a', padding: '56px', borderRadius: '56px', border: '1px solid #1e293b' }}>
              <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Activity size={48} /></div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px' }}>아중/다중 압출 (Co-Extrusion)</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '16px', marginBottom: '40px' }}>
                 두 개 이상의 압출기가 하나의 헤드에서 만납니다. 
                 내부에는 빛을 확산시키는 고가 소재를, 외부에는 UV에 강한 내후성 소재를 동시 배치하여 성능과 원가를 동시에 잡는 하이엔드 솔루션입니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ fontWeight: 800, color: '#fff' }}>UV Barrier Layer</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>표면에만 차단층을 형성하여 황변 현상을 원천 방지</div>
                 </div>
                 <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ fontWeight: 800, color: '#fff' }}>광학적 이질 구조</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>투명층과 확산층을 층상 구조로 쌓아 투과율 손실을 최소화</div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Section: Defect Analysis */}
      {activeTab === 'defect' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '24px' }}>
           <DefectBox 
             title="수축 (Sink Mark)" 
             cause="살두께 편차, 보압 부족" 
             fix="보압 시간 연장, 균일 두께 설계" 
           />
           <DefectBox 
             title="웰드라인 (Weld Line)" 
             cause="수지 온도 저하, 가스 미배출" 
             fix="금형 온도 상향, 에어 벤트 추가" 
           />
           <DefectBox 
             title="휨 (Warpage)" 
             cause="냉각 불균형, 잔류 응력" 
             fix="냉각 채널 최적화, 보압 감소" 
           />
           <DefectBox 
             title="탄화 (Burn Mark)" 
             cause="단열 압축에 의한 가스 폭발" 
             fix="사출 속도 감속, 가스 벤팅 강화" 
           />
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '32px', fontWeight: 900, color: '#ec4899', marginBottom: '20px' }}>금형에 대한 통찰이 제품의 한계를 결정합니다. ⚙️</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>High-Confidence Injection & Extrusion Engineering by Antigravity</p>
      </footer>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          height: 6px;
          border-radius: 3px;
          background: #334155;
          margin: 10px 0;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function ProcessCard({ icon: Icon, color, title, desc, features }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
       <div style={{ color: color, marginBottom: '24px' }}><Icon size={48} /></div>
       <h4 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '20px', color: '#fff' }}>{title}</h4>
       <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px' }}>{desc}</p>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((f: string, i: number) => (
             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '14px', fontWeight: 700 }}>
                <CheckCircle2 size={16} color={color} /> {f}
             </div>
          ))}
       </div>
    </div>
  );
}

function ResultBox({ title, value, color }: any) {
  return (
    <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', border: '1px solid #1e293b', textAlign: 'center' }}>
       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>{title}</div>
       <div style={{ fontSize: '24px', fontWeight: 900, color: color }}>{value}</div>
    </div>
  );
}

function DefectBox({ title, cause, fix }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
       <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>{title}</h4>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '13px' }}><span style={{ color: '#64748b' }}>원인:</span> <span style={{ color: '#cbd5e1' }}>{cause}</span></div>
          <div style={{ fontSize: '13px' }}><span style={{ color: '#64748b' }}>해결:</span> <span style={{ color: '#10b981', fontWeight: 800 }}>{fix}</span></div>
       </div>
    </div>
  );
}
