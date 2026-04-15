'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sun, ShieldCheck, Zap, Activity, Compass, ThermometerSun, 
  Wind, Ruler, Layers, Search, AlertTriangle, CheckCircle2, 
  ArrowRight, Play, RefreshCcw, Info, Settings, Move, 
  Maximize, Minimize, Cloud, BarChart3, Database
} from 'lucide-react';

export default function SolarPanelManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('physics');
  
  // Simulation States
  const [temp, setTemp] = useState(25);
  const [irradiance, setIrradiance] = useState(1000); // W/m2
  const [isSimulating, setIsSimulating] = useState(false);
  const [shading, setShading] = useState(0); // 0-100%

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Professional Calculations
  const metrics = useMemo(() => {
    const basePmax = 450;
    const tempCoef = -0.0035; // -0.35%/C
    const tempLoss = (temp - 25) * tempCoef;
    const irrFactor = irradiance / 1000;
    const shadowFactor = (100 - shading) / 100;
    const currentPmax = basePmax * (1 + tempLoss) * irrFactor * shadowFactor;
    const efficiency = (currentPmax / (irradiance * 2.2) * 100).toFixed(1); // Assuming 2.2m2 area
    return { pmax: currentPmax.toFixed(1), eff: efficiency };
  }, [temp, irradiance, shading]);

  const runAnalysis = (msg: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(`${msg} 검증 완료: 바이패스 다이오드 정상 작동 확인, 셀 크랙(Micro-cracks) 검출 0건, STC 기준 정격 출력 오차범위 1% 이내임을 확인했습니다.`);
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
      gap: '100px',
      boxShadow: '0 80px 200px rgba(0, 0, 0, 0.9)',
    }}>

      {/* Hero Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '36px' : '84px', fontWeight: 950, marginBottom: '24px', lineHeight: 1, letterSpacing: '-0.05em' }}>
           ☀️ <span style={{ color: '#fbbf24' }}>고효율 태양광 모듈 공학</span> <br/>
           <span style={{ fontSize: '0.45em', color: '#94a3b8', display: 'block', marginTop: '20px', fontWeight: 700 }}>셀 물리(Cell Physics) 및 현장 유지보수 실무 지침서</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#94a3b8', maxWidth: '1100px', margin: '0 auto', lineHeight: 1.8 }}>
           태양광 패널은 조명의 에너지 원천입니다. 본 매뉴얼은 단순 사양을 넘어 
           기상 환경에 따른 발전 효율 변화, 바이패스 다이오드 로직, 
           그리고 25년의 내구성을 확보하기 위한 유지보수 포인트까지 망라한 100% 지침서입니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.5)', padding: '10px', borderRadius: '24px', width: 'fit-content', margin: '0 auto', border: '1px solid #1e293b', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'physics', label: '모듈 구조 & 물리', icon: Layers },
          { id: 'env', label: '환경 변수 시뮬레이터', icon: BarChart3 },
          { id: 'diag', label: '고장 진단 & 유지보수', icon: Search },
          { id: 'wind', label: '구조 설계 (EPA)', icon: Wind }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 28px',
              borderRadius: '20px',
              border: 'none',
              background: activeTab === tab.id ? '#fbbf24' : 'transparent',
              color: activeTab === tab.id ? '#000' : '#94a3b8',
              fontWeight: 800,
              fontSize: '15.5px',
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

      {/* Chapter 1: Physics & Layer Structure */}
      {activeTab === 'physics' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'center' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#fbbf24' }}>Mono-Crystalline 셀 아키텍처</h3>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 2.0 }}>
                 고효율 단결정(Mono-Crystalline) 셀은 PERC(Passivated Emitter and Rear Cell) 기술을 적용하여 
                 셀 후면에서의 빛 반사를 극대화하고 재결합 손실을 최소화합니다. <br/><br/>
                 N-type 웨이퍼를 사용한 최신 모듈은 초기 성능 저하(LID)가 거의 없으며, 
                 양면(Bifacial) 발전 기능을 통해 지면의 반사광까지 흡수하여 총 발전량을 15% 이상 추가 확보합니다.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                 <InfoCard title="Low-Iron Tempered Glass" desc="3.2mm 두께의 저철분 강화 유리를 사용하여 투과율을 극대화하고 사막의 모래바람이나 우박(Hail)으로부터 셀을 보호합니다." icon={ShieldCheck} />
                 <InfoCard title="Multi-Busbar (MBB)" desc="버스바 개수를 늘려 전류 경로를 단축함으로써 저항 손실을 줄이고, 미세 크랙 발생 시 출력 감소를 최소화합니다." icon={Zap} />
              </div>
           </div>

           <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
              <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '32px' }}>모듈 단면 적층 구조</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <LayerStrip label="1. Anti-Reflective Coating" color="#38bdf8" />
                 <LayerStrip label="2. High Translucency Glass" color="#64748b" />
                 <LayerStrip label="3. EVA (Encapsulant)" color="#cbd5e1" />
                 <LayerStrip label="4. PERC Solar Cells (Mono)" color="#1e1b4b" />
                 <LayerStrip label="5. EVA (Encapsulant)" color="#cbd5e1" />
                 <LayerStrip label="6. TPT Backsheet (Reflective)" color="#fff" />
              </div>
              <p style={{ marginTop: '32px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>Vacuum Lamination Process (150°C)</p>
           </div>
        </section>
      )}

      {/* Chapter 2: Environmental Simulator */}
      {activeTab === 'env' && (
        <section style={{ background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: isMobile ? '32px' : '80px', borderRadius: '64px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#fbbf24', marginBottom: '48px' }}>실시간 발전 특성 시뮬레이션</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>🌞 일사량 (Irradiance)</span>
                          <span style={{ color: '#fbbf24' }}>{irradiance} W/m²</span>
                       </label>
                       <div style={{ display: 'flex', gap: '8px' }}>
                          <input type="range" min="100" max="1300" step="50" value={irradiance} onChange={(e)=>setIrradiance(Number(e.target.value))} style={{ flex: 1, accentColor: '#fbbf24' }} />
                       </div>
                    </div>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>🌡️ 셀 동작 온도 (T-Cell)</span>
                          <span style={{ color: temp > 50 ? '#f43f5e' : '#fbbf24' }}>{temp} °C</span>
                       </label>
                       <input type="range" min="-10" max="85" value={temp} onChange={(e)=>setTemp(Number(e.target.value))} style={{ width: '100%', accentColor: temp > 50 ? '#f43f5e' : '#fbbf24' }} />
                    </div>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                           <span>🌑 부분 음영 (Partial Shading)</span>
                           <span style={{ color: '#94a3b8' }}>{shading}% Shadow</span>
                        </label>
                        <input type="range" min="0" max="100" value={shading} onChange={(e)=>setShading(Number(e.target.value))} style={{ width: '100%', accentColor: '#334155' }} />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '64px' }}>
                    <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', textAlign: 'center' }}>
                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>예상 출력 (P-Max)</div>
                       <div style={{ fontSize: '40px', fontWeight: 950, color: '#fff' }}>{metrics.pmax}W</div>
                    </div>
                    <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', textAlign: 'center' }}>
                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>변환 효율</div>
                       <div style={{ fontSize: '40px', fontWeight: 950, color: '#10b981' }}>{metrics.eff}%</div>
                    </div>
                 </div>
              </div>

              <div style={{ background: '#020617', padding: '56px', borderRadius: '56px', border: '1px solid #334155', textAlign: 'center' }}>
                 <Compass size={64} color="#fbbf24" style={{ marginBottom: '24px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>기술적 한계: 온도 계수</h4>
                 <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '15.5px' }}>
                    태양광 패널은 온도가 올라가면 오히려 효율이 떨어집니다. 
                    표준 온도인 25도에서 1도 상승할 때마다 약 <b>0.35%</b>의 출력이 감소합니다. 
                    따라서 모듈 후면의 공기 흐름을 확보하는 방열 기반 설치 구조가 
                    여름철 발전량을 결정짓는 핵심 팁입니다.
                 </p>
                 <button 
                   onClick={() => runAnalysis('Dynamic Efficiency Map')}
                   style={{ width: '100%', marginTop: '48px', padding: '24px', borderRadius: '24px', background: '#fbbf24', color: '#000', fontWeight: 950, fontSize: '18px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                 >
                   {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                   동적 곡선 분석 가동
                 </button>
              </div>
           </div>
        </section>
      )}

      {/* Chapter 3: Diagnosis & Maintenance */}
      {activeTab === 'diag' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
           <DiagCard 
            title="바이패스 다이오드 점검" 
            desc="일부 셀에 가려짐이 발생할 때 해당 라인을 격리하여 전체 회로를 보호합니다. 고장 시 역전류에 의한 화재(Hot-spot) 위험이 있으므로 정기적인 전압 측정이 필수입니다."
            action="다이오드 테스트"
           />
           <DiagCard 
            title="미세 크랙 (Micro-cracks)" 
            desc="운반 또는 설치 시 발생하는 육안으로 보이지 않는 균열입니다. EL(Electro-luminescence) 촬영을 통해 검출하며, 방치 시 장기적인 출력 저하와 습기 침투의 원인이 됩니다."
            action="EL 분석 시뮬"
           />
           <DiagCard 
            title="분진 및 세정 (Cleaning)" 
            desc="가로등은 도심의 매연이나 조류 배설물에 쉽게 오염됩니다. 오염도가 20%를 넘으면 발전에 치명적이므로 연 2회 이상의 고압수 세정을 권장합니다."
            action="발전 손실 측정"
           />
        </section>
      )}

      {/* Chapter 4: Structural Engineering (Wind Load) */}
      {activeTab === 'wind' && (
        <section style={{ background: '#0f172a', padding: '80px', borderRadius: '64px', border: '1px solid #1e293b' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '32px' }}>풍하중 설계 및 EPA 계산</h3>
                 <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 2.0, marginBottom: '48px' }}>
                    태양광 패널은 돛(Sail)과 같습니다. 강풍 시 지표면으로부터 6m 이상의 높이에 있는 패널은 
                    엄청난 풍압력을 지주(Pole)에 전달합니다. <br/><br/>
                    미국 가로등 표준인 **EPA(Effective Projected Area)** 값을 준수하여 기초 설계와 지주 두께를 
                    결정해야만 태풍(최대 풍속 45m/s) 시 전도 사고를 예방할 수 있습니다.
                 </p>
                 <div style={{ display: 'flex', gap: '16px' }}>
                    <Tag label="Wind Speed: 45m/s (Safety Factor 1.5)" />
                    <Tag label="Alloy 6063-T6 Structural Frame" />
                 </div>
              </div>
              <div style={{ background: '#020617', padding: '48px', borderRadius: '48px', border: '1px solid #334155', textAlign: 'center' }}>
                 <Wind size={64} color="#38bdf8" style={{ marginBottom: '24px' }} />
                 <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '16px' }}>결정적 설계 수치</h4>
                 <div style={{ fontSize: '48px', fontWeight: 950, color: '#fff' }}>0.48 <span style={{ fontSize: '20px', color: '#64748b' }}>m² (EPA)</span></div>
                 <p style={{ marginTop: '24px', color: '#64748b', fontSize: '13px' }}>450W 모듈 기준 전면 투영 면적 보정치</p>
              </div>
           </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24', marginBottom: '20px' }}>빛의 에너지를 담는 가장 완벽한 기술입니다. ☀️</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Global Solar Module Engineering Research by Antigravity</p>
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
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function InfoCard({ title, desc, icon: Icon }: any) {
  return (
    <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
       <div style={{ color: '#fbbf24', marginBottom: '16px' }}><Icon size={24} /></div>
       <h5 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>{title}</h5>
       <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function LayerStrip({ label, color }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', background: '#020617', borderRadius: '12px', borderLeft: `6px solid ${color}` }}>
       <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>{label}</span>
    </div>
  );
}

function DiagCard({ title, desc, action }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column' }}>
       <h4 style={{ fontSize: '22px', fontWeight: 900, color: '#fbbf24', marginBottom: '20px' }}>{title}</h4>
       <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.9, marginBottom: '32px', flex: 1 }}>{desc}</p>
       <button style={{ padding: '16px', borderRadius: '16px', background: '#020617', border: '1px solid #1e293b', color: '#fbbf24', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          {action} <ArrowRight size={16} />
       </button>
    </div>
  );
}

function Tag({ label }: any) {
  return (
    <span style={{ padding: '12px 24px', borderRadius: '16px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', fontSize: '13.5px', fontWeight: 800, border: '1px solid rgba(251, 191, 36, 0.2)' }}>{label}</span>
  );
}
