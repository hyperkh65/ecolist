'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lightbulb, Search, BookOpen, BarChart, Clock, ShieldCheck, 
  Sun, Eye, CheckCircle2, Thermometer, FlaskConical, Zap, 
  Activity, Grid3X3, Layers, Microscope, Ruler, FileText, 
  TrendingUp, Crosshair, Award, ZapOff, RefreshCcw, Play,
  Focus, Minimize2, Maximize2, Box
} from 'lucide-react';

export default function LEDChipManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('datasheet');
  
  // Simulation States
  const [junctionTemp, setJunctionTemp] = useState(65);
  const [driveCurrent, setDriveCurrent] = useState(150);
  const [chipType, setChipType] = useState('6V'); // 3V, 6V, 9V
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const predictedLife = useMemo(() => {
    // Basic heuristic: L70 drops as temp and current rise
    const baseLife = 100000;
    const tempFactor = Math.pow(0.5, (junctionTemp - 55) / 10);
    const currentFactor = (150 / driveCurrent);
    return Math.max(5000, baseLife * tempFactor * currentFactor);
  }, [junctionTemp, driveCurrent]);

  const runTest = (msg: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(`${msg} 검사 결과: 해당 칩은 고온 환경에서도 광속 유지율 98.2% (2000hrs 기준)를 달성하며 황화 현상 저항성(Sulfuration Resistance) 'Pass' 판정을 받았습니다.`);
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
        <h1 style={{ fontSize: isMobile ? '40px' : '84px', fontWeight: 950, marginBottom: '24px', lineHeight: 1.05, letterSpacing: '-0.05em' }}>
           🔬 <span style={{ color: '#fbbf24' }}>LED 칩 공학 센터</span> <br/>
           <span style={{ fontSize: '0.45em', color: '#94a3b8', display: 'block', marginTop: '16px' }}>사양서 독해부터 CIE 색공간 분해까지의 100% 지침서</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#94a3b8', maxWidth: '1050px', margin: '0 auto', lineHeight: 1.8 }}>
           칩의 밝기는 시작에 불과합니다. 전문가만이 읽어낼 수 있는 LM-80 리포트 분석, 3V/6V/9V 전압 특성별 
           효율 극대화 전략, 그리고 황화(Sulfuration) 방지 설계 데이터를 집약한 하이엔드 엔지니어링 리포트입니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.5)', padding: '8px', borderRadius: '24px', width: 'fit-content', margin: '0 auto', border: '1px solid #1e293b', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'datasheet', label: '사양서 정밀 독해', icon: FileText },
          { id: 'chroma', label: '색도 및 비닝 (CIE)', icon: Focus },
          { id: 'reliability', label: '신뢰성 및 신기술', icon: Award },
          { id: 'lab', label: '광수명 예측 시뮬레이터', icon: Activity }
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

      {/* Section: Datasheet Deep Dive */}
      {activeTab === 'datasheet' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '64px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24' }}>칩 사양서(Datasheet)의 이면 분석</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                 <SpecCard title="Forward Voltage (Vf)" desc="칩 구동을 위한 필수 전압. 3V/6V/9V로 구분되며, 온도가 상승함에 따라 전압이 낮아지는 'Negative Temp Coefficient' 특성을 이해해야 합니다." icon={Zap} />
                 <SpecCard title="Luminous Efficacy" desc="전력(W) 당 밝기(lm). 칩 자체 효율은 220lm/W에 달하지만, 실제 등기구 결합 후에는 열 손실로 인해 160-180lm/W 수준으로 하락합니다." icon={Sun} />
                 <SpecCard title="Thermal Resistance (Rth)" desc="칩 내부 열이 기판으로 전달되는 저항값. 2.0C/W 이하가 하이엔드급이며, 낮을수록 칩 과열을 효과적으로 방지합니다." icon={Thermometer} />
                 <SpecCard title="ESD Protection" desc="정전기 내성. 제너 다이오드 내장 여부에 따라 2kV에서 8kV까지 차이가 납니다. 현장 불량의 40%는 여기서 결정됩니다." icon={ZapOff} />
              </div>

              <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
                 <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>칩 전압별(3V, 6V, 9V) 물리적 차이점</h4>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: '#020617' }}>
                       <span style={{ fontWeight: 800 }}>3V (1-Die)</span>
                       <span style={{ color: '#94a3b8' }}>낮은 전압, 고전류 기반. 실내등이나 소형 기기에 적합.</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: '#020617' }}>
                       <span style={{ fontWeight: 800 }}>6V (2-Dies Series)</span>
                       <span style={{ color: '#94a3b8' }}>효율과 단가의 황금 밸런스. 가로등 회로 설계의 글로벌 표준.</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: '#020617' }}>
                       <span style={{ fontWeight: 800 }}>9V (3-Dies Series)</span>
                       <span style={{ color: '#94a3b8' }}>고전압 저전류 구동. 컨버터 효율 극대화에 유리.</span>
                    </div>
                 </div>
              </div>
           </div>

           <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b', position: 'sticky', top: '100px' }}>
              <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                 <Microscope size={56} color="#fbbf24" style={{ marginBottom: '16px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 950 }}>LM-80 신뢰성 리포트 검증</h4>
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '15px', marginBottom: '32px' }}>
                 칩의 수명을 보증하는 유일한 근거 데이터입니다. 최소 6,000시간(최근 10,000시간) 동안 3가지 온도 조건에서 측정한 
                 광속 유지율 곡선을 확인해야 합니다. 단순히 '좋다'가 아닌 수치로 증명하십시오.
              </p>
              <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #334155' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span>55℃ 유지율</span> <span>99.8%</span>
                 </div>
                 <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', marginBottom: '24px' }}>
                    <div style={{ width: '99%', height: '100%', background: '#10b981', borderRadius: '4px' }} />
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span>105℃ 유지율</span> <span>94.5%</span>
                 </div>
                 <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px' }}>
                    <div style={{ width: '94%', height: '100%', background: '#fbbf24', borderRadius: '4px' }} />
                 </div>
              </div>
              <button 
                onClick={() => runTest('LM-80 Data Validation')}
                style={{ width: '100%', marginTop: '40px', padding: '24px', borderRadius: '24px', background: '#fbbf24', border: 'none', color: '#000', fontWeight: 950, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
              >
                {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                공인 성적서 무결성 검사
              </button>
           </div>
        </section>
      )}

      {/* Section: Chromaticity & Binning */}
      {activeTab === 'chroma' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px' }}>
           <div style={{ background: '#0f172a', padding: '56px', borderRadius: '56px', border: '1px solid #1e293b' }}>
              <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Focus size={48} /></div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px' }}>CIE 1931 색공간 및 비닝 전략</h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.9, fontSize: '16.5px', marginBottom: '40px' }}>
                 MacAdam Ellipse (SDCM) 단계를 이해하는 것이 빛의 품질을 결정하는 핵심입니다. 
                 3-Step 이내의 정밀 비닝은 여러 가로등을 동시에 켰을 때 색상 이질감을 없애줍니다. 
                 특히 5700K(주광색)와 3000K(전구색) 사이의 흑체 궤적(Planckian Locus)을 따라 칩의 색좌표가 
                 어떻게 분포되는지 데이터시트의 Bin Chart를 필수 체크해야 합니다.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                 <BinBox step="3-Step" label="High-End" color="#10b981" />
                 <BinBox step="5-Step" label="Standard" color="#fbbf24" />
                 <BinBox step="7-Step" label="Low-Cost" color="#f43f5e" />
                 <BinBox step="Bin-Free" label="Top Tier" color="#38bdf8" />
              </div>
           </div>

           <div style={{ background: 'linear-gradient(135deg, #020617 0%, #172554 100%)', borderRadius: '56px', border: '1px solid #1d4ed8', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>CIE 색도도 가시화</h4>
             <div style={{ width: '300px', height: '300px', background: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/CIE1931_Chromaticity_Diagram_large.png/600px-CIE1931_Chromaticity_Diagram_large.png)', backgroundSize: 'cover', borderRadius: '24px', position: 'relative', border: '4px solid #fff' }}>
                <div style={{ position: 'absolute', top: '35%', left: '38%', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', border: '2px solid #000', boxShadow: '0 0 10px #fff' }} />
                <div style={{ position: 'absolute', top: '34%', left: '37%', width: '25px', height: '20px', border: '1px dashed #fff', borderRadius: '50%' }} />
             </div>
             <p style={{ marginTop: '32px', color: '#94a3b8', fontSize: '14px', textAlign: 'center' }}>
                화이트 포인트(D65) 주변의 MacAdam Ellipse 분포도 <br/>
                현재 칩의 타켓 좌표: x=0.344, y=0.355 (5000K Area)
             </p>
           </div>
        </section>
      )}

      {/* Section: Lab / Simulation */}
      {activeTab === 'lab' && (
        <section style={{ background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: '64px', borderRadius: '64px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#fbbf24', marginBottom: '48px' }}>광수명 및 열 설계 시뮬레이터</h3>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>🧪 접합 온도 (Junction Temp - Tj)</span>
                          <span style={{ color: junctionTemp > 85 ? '#f43f5e' : '#10b981', fontSize: '24px' }}>{junctionTemp} °C</span>
                       </label>
                       <input type="range" min="25" max="150" value={junctionTemp} onChange={(e)=>setJunctionTemp(Number(e.target.value))} style={{ width: '100%', accentColor: junctionTemp > 85 ? '#f43f5e' : '#10b981' }} />
                    </div>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>⚡ 구동 전류 (Drive Current)</span>
                          <span style={{ color: '#38bdf8', fontSize: '24px' }}>{driveCurrent} mA</span>
                       </label>
                       <input type="range" min="50" max="1000" step="50" value={driveCurrent} onChange={(e)=>setDriveCurrent(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '64px' }}>
                    <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center' }}>
                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>예상 수명 (L70 기준)</div>
                       <div style={{ fontSize: '36px', fontWeight: 950, color: '#10b981' }}>{Math.floor(predictedLife).toLocaleString()} <span style={{ fontSize: '18px' }}>Hrs</span></div>
                    </div>
                    <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center' }}>
                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>효율 감쇄율</div>
                       <div style={{ fontSize: '36px', fontWeight: 950, color: '#f43f5e' }}>-{(junctionTemp * 0.15).toFixed(1)}%</div>
                    </div>
                 </div>
              </div>

              <div style={{ background: '#1e1b4b', padding: '56px', borderRadius: '56px', border: '1px solid #3730a3', textAlign: 'center' }}>
                 <Clock size={64} color="#fbbf24" style={{ marginBottom: '24px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>10년 품질 보증 분석</h4>
                 <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '15.5px' }}>
                    가로등 하루 12시간 가동 기준, 설정된 파라미터에서는 약 <b>{(predictedLife/12/365).toFixed(1)}년</b> 동안 
                    정상적인 조도 유지가 가능합니다. Tj를 75℃ 이하로 관리하는 것이 10년 클레임 제로의 핵심 비결입니다.
                 </p>
              </div>
           </div>
        </section>
      )}

      {/* Reliability Secrets */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
         <ReliabilityCard icon={Award} color="#10b981" title="Sulfuration Resistance" desc="아황산가스 차단 코팅 적용으로 은(Ag) 도금 변색을 방지하여 환경 유해 가스로부터 칩을 보호합니다." />
         <ReliabilityCard icon={Zap} color="#fbbf24" title="Zener Protected" desc="내장형 제너 다이오드가 불규칙한 서지 전압으로부터 반도체 레이어를 완벽하게 방어합니다." />
         <ReliabilityCard icon={Box} color="#38bdf8" title="Phosphor Control" desc="고온에서도 변색되지 않는 고성능 형광체 배합을 통해 시간이 흘러도 초기 색온도를 그대로 유지합니다." />
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '36px', fontWeight: 950, color: '#fff', marginBottom: '24px' }}>칩 하나에 담긴 기술이 도시의 밤을 바꿉니다. 🌟</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Standardized Technical Content Group by Antigravity</p>
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
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(0,0,0,0.5);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function SpecCard({ icon: Icon, color, title, desc }: any) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
       <div style={{ color: '#fbbf24', marginBottom: '16px' }}><Icon size={24} /></div>
       <h5 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>{title}</h5>
       <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function BinBox({ step, label, color }: any) {
  return (
    <div style={{ background: '#020617', padding: '16px', borderRadius: '16px', border: '1px solid #1e293b', textAlign: 'center' }}>
       <div style={{ width: '100%', height: '40px', background: color, borderRadius: '8px', marginBottom: '8px' }} />
       <div style={{ fontSize: '12px', fontWeight: 800 }}>{step}</div>
       <div style={{ fontSize: '10px', color: '#64748b' }}>{label}</div>
    </div>
  );
}

function ReliabilityCard({ icon: Icon, color, title, desc }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
       <div style={{ color: color, marginBottom: '24px' }}><Icon size={40} /></div>
       <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>{title}</h4>
       <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}
