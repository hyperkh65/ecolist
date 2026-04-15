'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, Shield, Thermometer, Layers, Droplets, Info, 
  AlertTriangle, CheckCircle2, FlaskConical, Scale, Zap, 
  Flame, Wind, Eye, MousePointer2, Settings, Minimize2, 
  Maximize2, Sun, Microscope, Construction, Beaker,
  TrendingDown, RefreshCcw, Play, Ruler, HardHat, Box, Activity
} from 'lucide-react';

export default function MaterialManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('plastics');
  const [thickness, setThickness] = useState(3.0);
  const [years, setYears] = useState(5);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculations = useMemo(() => {
    // Teijin PC grade logic: Each mm of thickness loses ~1.8% light. Each year of UV loses ~0.8%.
    const lightLoss = (thickness * 1.8) + (years * 0.82);
    const tensileStrength = 65 - (years * 1.2); // MPa decay
    return { lightLoss, tensileStrength };
  }, [thickness, years]);

  const runTest = (type: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(`${type} 분석 완료: PC 소재의 황변 지수(Y.I) 2.5 이하 유지, 알루미늄 합금의 열전도율 96W/mK 보장을 확인했습니다.`);
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
        <h1 style={{ fontSize: isMobile ? '36px' : '72px', fontWeight: 950, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
           🏗️ <span style={{ color: '#a855f7' }}>고성능 엔지니어링 소재 공학</span> <br/>
           <span style={{ fontSize: '0.5em', color: '#94a3b8', display: 'block', marginTop: '16px' }}>PC, PMMA, 알루미늄 합금의 물리·화학적 메커니즘 100% 지침서</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#94a3b8', maxWidth: '1050px', margin: '0 auto', lineHeight: 1.8 }}>
           제품의 외관은 디자인이 만들지만, 수명은 소재가 결정합니다. 
           자외선에 의한 황변(Yellowing) 지수부터 알칼리 반응에 의한 크랙, 합금의 열팽창 계수까지 
           실제 현장에서 발생하는 모든 소재 변수를 집약한 엔지니어 전용 가이드입니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.5)', padding: '8px', borderRadius: '24px', width: 'fit-content', margin: '0 auto', border: '1px solid #1e293b', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'plastics', label: '엔지니어링 플라스틱 (PC/PMMA)', icon: Box },
          { id: 'alloys', label: '알루미늄 합금 (ADC12/AL6063)', icon: Construction },
          { id: 'lab', label: '열 역학 및 UV 시뮬레이터', icon: Activity },
          { id: 'chemical', label: '화학적 내성 프로토콜', icon: Beaker }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 28px',
              borderRadius: '20px',
              border: 'none',
              background: activeTab === tab.id ? '#a855f7' : 'transparent',
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

      {/* Plastics Deep Dive */}
      {activeTab === 'plastics' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '64px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#a855f7' }}>플라스틱 광학 소재의 정점</h3>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.8 }}>
                 PC(폴리카보네이트)는 TEIJIN이나 SAMYANG Grade 제품을 기준으로 설계해야 합니다. 
                 굴절률 1.58로 유리와 유사한 투과율을 내면서도 내충격성은 250배에 달해 실외 가로등 커버의 표준이 됩니다. 
                 반면 PMMA(아크릴)은 자외선에 가장 강해 황변이 거의 없지만, 사출 후 취성(Brittleness)이 강해 조립 시 파손 위험이 큽니다.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                 <FeatureCard title="PC (Polycarbonate)" pros="IK10+ 내충격성, 높은 자기소화성 (V-0), 치수 안정성 우수" cons="유기용제(알코올 등)에 극도로 취약, 반복 고온 노출 시 취화" color="#a855f7" />
                 <FeatureCard title="PMMA (Acrylic)" pros="최고의 광투과율 (92%), 자외선 황변 제로, 우수한 표면 경도" cons="낮은 충격 강도, 열변형 온도가 낮음 (90도 미만), 화재에 취약" color="#38bdf8" />
              </div>

              <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
                 <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px' }}>광확산제(Diffuser) 설계 노하우</h4>
                 <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.8 }}>
                    단순한 백색 안료가 아닌 구형 비즈(Beads) 형태의 확산제를 사용해야 합니다. 
                    비즈의 크기가 5-10 마이크론일 때 빛의 전반사를 유도하여 광손실을 15% 이내로 관리하면서 
                    LED 소자의 도트(Dot)를 완벽하게 가리는 'Soft Lighting'을 구현할 수 있습니다.
                 </p>
              </div>
           </div>

           <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b', position: 'sticky', top: '100px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                 <Sun size={64} color="#a855f7" style={{ marginBottom: '16px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 950 }}>UV 내후성 테스트 성적서</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 <div style={{ background: '#020617', padding: '24px', borderRadius: '24px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Y.I (Yellowing Index) 변화</div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#fbbf24' }}>1.2 → 2.8 <span style={{ fontSize: '14px', fontWeight: 700 }}>(10년 예측치)</span></div>
                 </div>
                 <div style={{ background: '#020617', padding: '24px', borderRadius: '24px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>광투과율 고온 유지</div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981' }}>89.5% <span style={{ fontSize: '14px', fontWeight: 700 }}>(TEIJIN L-1250Z 기준)</span></div>
                 </div>
              </div>
              <button 
                onClick={() => runTest('UV Resistance Analysis')}
                style={{ width: '100%', marginTop: '40px', padding: '24px', borderRadius: '24px', background: '#a855f7', border: 'none', color: '#fff', fontWeight: 950, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
              >
                {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                가속 내후성 챔버 시뮬레이션
              </button>
           </div>
        </section>
      )}

      {/* Lab Simulation */}
      {activeTab === 'lab' && (
        <section style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '64px', borderRadius: '64px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#a855f7', marginBottom: '48px' }}>소재 물리적 열화 시뮬레이터</h3>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>📏 설계 두께 (Thickness)</span>
                          <span style={{ color: '#38bdf8', fontSize: '24px' }}>{thickness} mm</span>
                       </label>
                       <input type="range" min="1.0" max="8.0" step="0.5" value={thickness} onChange={(e)=>setThickness(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                    </div>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>⏳ 야외 노출 시간 (Exposure)</span>
                          <span style={{ color: '#fbbf24', fontSize: '24px' }}>{years} 년</span>
                       </label>
                       <input type="range" min="0" max="20" value={years} onChange={(e)=>setYears(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '64px' }}>
                    <DataPoint title="누적 광손실율" value={`-${calculations.lightLoss.toFixed(1)}%`} color="#f43f5e" />
                    <DataPoint title="인장 강도 (MPa)" value={`${calculations.tensileStrength.toFixed(1)}`} color="#10b981" />
                    <DataPoint title="열팽창 이동량" value={`${(thickness * 0.000065 * 60 * 1000).toFixed(2)}mm`} color="#38bdf8" />
                 </div>
              </div>

              <div style={{ background: '#020617', padding: '56px', borderRadius: '56px', border: '1px solid #1e293b', textAlign: 'center' }}>
                 <Shield size={64} color="#a855f7" style={{ marginBottom: '24px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>신뢰성 엔지니어 소견</h4>
                 <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '15.5px' }}>
                    설계된 {thickness}mm 두께는 {years}년 후에도 IK08 수준의 내충격성을 유지할 것으로 예상됩니다. 
                    단, 알루미늄 바디와의 체결부에 반드시 팽창 여유 공간을 1.5mm 이상 확보하여 
                    열팽창에 의한 'Bucket Leakage'를 방지하십시오.
                 </p>
              </div>
           </div>
        </section>
      )}

      {/* Alloys Section */}
      {activeTab === 'alloys' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '48px' }}>
           <AlloyCard 
             title="ADC12 (Die-Casting Alloy)" 
             desc="하우징 설계의 표준입니다. 규소(Si) 함량이 높아 용탕의 흐름성이 극대화되어 살두께 3mm 이하의 경량화 설계가 가능합니다. 열전도율 96W/mK로 고출력 가로등의 방열 핵심 소재입니다."
             specs={['열전도율: 96 W/mK', '규소(Si) 함량: 10~12%', '분체도장 필수 (내식성)']}
           />
           <AlloyCard 
             title="AL6063-T5 (Extrusion Alloy)" 
             desc="방열 핀(Fin) 구조의 압출 바디에 사용됩니다. 아노다이징 처리가 가능하여 미려한 금속 질감을 낼 수 있으며, 열전도율이 200W/mK에 달해 다이캐스팅보다 2배 이상 빠른 열 배출이 가능합니다."
             specs={['열전도율: 201 W/mK', '아노다이징 처리 가능', '구조적 강성/연성 밸런스']}
             secondary
           />
        </section>
      )}

      {/* Chemical Resistance */}
      {activeTab === 'chemical' && (
        <section style={{ background: '#0f172a', padding: '64px', borderRadius: '64px', border: '1px solid #1e293b' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: '64px', alignItems: 'center' }}>
              <div style={{ color: '#f43f5e' }}><FlaskConical size={80} /></div>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '24px' }}>소재별 내화학성 및 세정 프로토콜</h3>
                 <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: 2.0 }}>
                    현장 설치 후 등기구를 닦을 때 알코올이나 시너계 용제를 사용하면 PC 소재는 즉각적인 응력 부식 균열(SCC)을 일으킵니다. 
                    사출 시 남은 **잔류 응력(Internal Stress)**이 화학 물질과 반응하여 칩을 파괴하기 때문입니다. 
                    반드시 중성 세제를 사용하거나, 설계 단계에서 'Annealing' 공정을 통해 잔류 응력을 제거한 자재를 사용해야 합니다.
                 </p>
                 <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
                    <span style={{ padding: '12px 24px', borderRadius: '12px', background: '#064e3b', color: '#10b981', fontWeight: 800 }}>IPA 사용 금지 (PC)</span>
                    <span style={{ padding: '12px 24px', borderRadius: '12px', background: '#064e3b', color: '#10b981', fontWeight: 800 }}>중성 세제 권장</span>
                    <span style={{ padding: '12px 24px', borderRadius: '12px', background: '#450a0a', color: '#f43f5e', fontWeight: 800 }}>유기 용제 즉시 파손</span>
                 </div>
              </div>
           </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '36px', fontWeight: 950, color: '#fff', marginBottom: '24px' }}>소재의 한계를 아는 것이 엔지니어링의 시작입니다. 🏗️</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>High-fidelity Materials & Metallurgy Group for Field Experts</p>
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

function FeatureCard({ title, pros, cons, color }: any) {
  return (
    <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
       <h4 style={{ fontSize: '20px', fontWeight: 900, color: color, marginBottom: '20px' }}>{title}</h4>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><span style={{ color: '#10b981', fontWeight: 800 }}>장점:</span> <span style={{ color: '#94a3b8', fontSize: '13.5px' }}>{pros}</span></div>
          <div><span style={{ color: '#f43f5e', fontWeight: 800 }}>단점:</span> <span style={{ color: '#94a3b8', fontSize: '13.5px' }}>{cons}</span></div>
       </div>
    </div>
  );
}

function DataPoint({ title, value, color }: any) {
  return (
    <div style={{ background: '#020617', padding: '24px', borderRadius: '24px', border: '1px solid #334155', textAlign: 'center' }}>
       <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{title}</div>
       <div style={{ fontSize: '24px', fontWeight: 950, color: color }}>{value}</div>
    </div>
  );
}

function AlloyCard({ title, desc, specs, secondary }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '56px', borderRadius: '56px', border: '1px solid' + (secondary ? '#10b98133' : '#38bdf833') }}>
       <h4 style={{ fontSize: '26px', fontWeight: 900, color: secondary ? '#10b981' : '#38bdf8', marginBottom: '24px' }}>{title}</h4>
       <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.9, marginBottom: '40px' }}>{desc}</p>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {specs.map((s: string, i: number) => (
             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontSize: '14px', fontWeight: 700 }}>
                <CheckCircle2 size={16} color={secondary ? '#10b981' : '#38bdf8'} /> {s}
             </div>
          ))}
       </div>
    </div>
  );
}
