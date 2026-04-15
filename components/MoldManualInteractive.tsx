'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Settings, Workflow, Zap, Box, Activity, AlertTriangle, CheckCircle2, Sliders, Layout, Layers, Info, Hammer, Minimize2, Maximize2, Gauge, HardHat, Pipette, Scissors } from 'lucide-react';

export default function MoldManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('process');
  const [thickness, setThickness] = useState(3.0);
  const [material, setMaterial] = useState('PC');
  const [area, setArea] = useState(250); // cm2
  const [pressure, setPressure] = useState(800); // bar

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Professional Calculations
  const calculations = useMemo(() => {
    // Clamping Force (Tons) = Projected Area (cm2) * Cavity Pressure (kg/cm2) / 1000
    // simplified: Area * (Pressure / 10) / 1000
    const clampForce = (area * (pressure / 10)) / 1000;
    
    // Cycle Time (Theoretical)
    const coolingTime = thickness * thickness * 2.5; // proportional to thickness squared
    const cycleTime = 5 + 3 + coolingTime; // mold move + inject + cooling

    // Shrinkage Factor
    const shrinkMap: Record<string, number> = { 'PC': 0.006, 'ABS': 0.005, 'ASA': 0.005, 'PC+ABS': 0.0055, 'PMMA': 0.004 };
    const shrinkVal = shrinkMap[material] || 0.005;

    return { clampForce, cycleTime, shrinkVal };
  }, [area, pressure, thickness, material]);

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
        <h1 style={{ fontSize: isMobile ? '32px' : '68px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
           ⚙️ <span style={{ color: '#ec4899' }}>정밀 금형 설계</span> 및 <br/>
           다축 성형 공학 <span style={{ color: '#38bdf8' }}>마스터 가이드</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '24px', color: '#94a3b8', maxWidth: '1000px', margin: '0 auto', lineHeight: 1.8 }}>
           단순한 금형을 넘어 **이중 사출(2-Shot)**과 **다중 압출(Co-Extrusion)**을 아우르는 
           100% 현장 실무 통합 지침서입니다. <br/> 제품의 수명과 단가는 '0.1mm'의 설계 차이에서 시작됩니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {[
          { id: 'process', label: '성형 공법 분석', icon: <Workflow size={18}/> },
          { id: 'dual', label: '이중 사출/압출 특수공정', icon: <Layers size={18}/> },
          { id: 'calc', label: '정밀 계산기 (Clamping Force)', icon: <Gauge size={18}/> },
          { id: 'trouble', label: '불량 해결 솔루션', icon: <AlertTriangle size={18}/> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '16px 24px', borderRadius: '20px', border: '1px solid #1e293b',
              background: activeTab === tab.id ? '#ec4899' : '#0f172a',
              color: '#fff', cursor: 'pointer', fontWeight: 800, fontSize: '15px',
              display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Section: Common Processes */}
      {activeTab === 'process' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            <div style={{ padding: '48px', borderRadius: '48px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.1)' }}>
               <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#ec4899', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HardHat size={32} /> 정밀 사출 (Injection)
               </h3>
               <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: 1.9, marginBottom: '32px' }}>
                  금형 공간에 고온 고압의 수지를 주입하여 복잡한 형상을 만드는 핵심 기법입니다. 
                  가로등 헤드 브라켓, 등기구 바디 등에 쓰이며, **냉각 통로(Cooling Channel)**의 균일한 배치가 사출 후 휨(Warpage) 방지의 핵심입니다.
               </p>
               <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                  <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px', fontWeight: 700 }}>사출 단계별 핵심 기술</p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ fontSize: '15px', color: '#fff' }}>✅ **가소화**: 스크류 회전으로 수지를 균일하게 용융</li>
                    <li style={{ fontSize: '15px', color: '#fff' }}>✅ **보압**: 수축을 막기 위해 게이트 고화 전까지 압력 유지</li>
                    <li style={{ fontSize: '15px', color: '#fff' }}>✅ **이젝트**: 취출 핀이 제품의 응력이 없는 곳을 밀어야 함</li>
                  </ul>
               </div>
            </div>
            <div style={{ padding: '48px', borderRadius: '48px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
               <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#38bdf8', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Scissors size={24} /> 정밀 압출 (Extrusion)
               </h3>
               <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: 1.9, marginBottom: '32px' }}>
                  일정한 단면을 가진 긴 형태(프로파일)를 연속적으로 뽑아내는 공정입니다. 
                  알루미늄 방열 프레임, PC 광학 커버 파이프 제작에 필수적이며, **다이(Die)** 출구에서의 수지 팽창(Die Swell)을 제어하는 것이 기술력입니다.
               </p>
               <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
                  <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px', fontWeight: 700 }}>압출 라인 핵심 구성</p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ fontSize: '15px', color: '#fff' }}>✅ **Feeding**: 호퍼에서 재료의 정량 투입</li>
                    <li style={{ fontSize: '15px', color: '#fff' }}>✅ **Cooling Bath**: 냉각 수조를 통한 형상 고정</li>
                    <li style={{ fontSize: '15px', color: '#fff' }}>✅ **Haul-off**: 일정 속도로 잡아당기는 인취 공정</li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Section: Special Dual Processes (The "Long" part) */}
      {activeTab === 'dual' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>하이엔드 특수 성형 솔루션</h2>
            <p style={{ color: '#94a3b8' }}>방수 성능과 외관 품질을 동시에 잡는 2-Shot & Co-Ex 기술을 분석합니다.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px' }}>
             {/* 2-Shot Injection */}
             <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                <div style={{ color: '#ec4899', marginBottom: '24px' }}><Layers size={48} /></div>
                <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px' }}>이중 사출 (2-Shot Molding)</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '16px', marginBottom: '32px' }}>
                   하나의 금형 내에서 두 대의 사출기를 사용, 서로 다른 소재나 색상을 순차적으로 결합합니다. 
                   **회전판(Rotate Path)** 또는 **코어 무빙** 방식을 사용하여 1차 사출물이 굳기 전 2차 수지를 쏴서 화학적 결합을 유도합니다.
                </p>
                <div style={{ background: '#020617', padding: '32px', borderRadius: '32px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>실무 적용 사례</h4>
                  <ul style={{ color: '#64748b', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>📌 **방수 실링(Gasket)**: 외함(PC) + 고무(TPE/TPU) 일체화</li>
                    <li>📌 **투과형 버튼**: 불투명 Body + 반투명 Icon 결합</li>
                    <li>📌 **디자인 강화**: 서로 다른 질감의 소재 배합</li>
                  </ul>
                </div>
             </div>

             {/* Co-Extrusion */}
             <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
                <div style={{ color: '#38bdf8', marginBottom: '24px' }}><Activity size={48} /></div>
                <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px' }}>이중/다중 압출 (Co-Extrusion)</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '16px', marginBottom: '32px' }}>
                   두 개 이상의 압출 헤드를 결합하여 층(Layer)을 쌓는 방식입니다. 
                   주로 표면 내구성을 강화하거나 빛의 확산 효과를 극대화할 때 활용됩니다.
                </p>
                <div style={{ background: '#020617', padding: '32px', borderRadius: '32px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>기술적 우위</h4>
                  <ul style={{ color: '#64748b', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>📌 **UV 차단층**: 비싼 ASA 소재를 표면에만 얇게 배치 (원가 절감)</li>
                    <li>📌 **광확산 커버**: 안쪽 투명층 + 바깥쪽 확산층 적층</li>
                    <li>📌 **강성 보완**: 유연한 소재와 단단한 소재의 복합 압출</li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Section: Calculator (Professional Engineering) */}
      {activeTab === 'calc' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ background: 'linear-gradient(135deg, #0b213f 0%, #020617 100%)', padding: isMobile ? '32px' : '64px', borderRadius: '56px', border: '1px solid #1e293b' }}>
             <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24', marginBottom: '48px', textAlign: 'center' }}>엔지니어링 사출 파라미터 계산기</h2>
             
             <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '64px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                   <div>
                      <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 800 }}>
                         <span>📏 제품 투영 면적 (Projected Area)</span>
                         <span style={{ color: '#fbbf24' }}>{area} cm²</span>
                      </label>
                      <input type="range" min="50" max="2000" value={area} onChange={(e)=>setArea(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
                   </div>
                   <div>
                      <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 800 }}>
                         <span>⚡ 캐비티 내압 (Cavity Pressure)</span>
                         <span style={{ color: '#fbbf24' }}>{pressure} bar</span>
                      </label>
                      <input type="range" min="300" max="1500" value={pressure} onChange={(e)=>setPressure(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
                   </div>
                   <div>
                      <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 800 }}>
                         <span>🧵 제품 벽두께 (Wall Thickness)</span>
                         <span style={{ color: '#fbbf24' }}>{thickness.toFixed(1)} mm</span>
                      </label>
                      <input type="range" min="0.5" max="10.0" step="0.1" value={thickness} onChange={(e)=>setThickness(Number(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
                   </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                   <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center' }}>
                      <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>필요 형체력 (Clamping Force)</p>
                      <div style={{ fontSize: '42px', fontWeight: 900, color: '#f43f5e' }}>{calculations.clampForce.toFixed(1)} Ton</div>
                      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }}>* 안전율 10~20% 고려 사출기 선정 권장</p>
                   </div>
                   <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', textAlign: 'center' }}>
                      <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>예상 사이클 타임</p>
                      <div style={{ fontSize: '32px', fontWeight: 900, color: '#38bdf8' }}>{calculations.cycleTime.toFixed(1)} sec</div>
                      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }}>냉각이 사이클의 70%를 차지함</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Section: Troubleshooting (The "Detail" part) */}
      {activeTab === 'trouble' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '40px', textAlign: 'center' }}>실전! 사출 불량 5대 원인 및 메커니즘</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { title: 'Sink Mark (수축)', icon: <Minimize2 />, cause: '두께 편차, 냉각 부족', fix: '두꺼운 부위 살빼기, 리브 설계 최적화' },
              { title: 'Flash / Burj (찌꺼기)', icon: <Maximize2 />, cause: '금형 벌어짐, 보압 과다', fix: '형체력 증대, 금형 퍼팅면 정밀 가공' },
              { title: 'Warp (휨/변형)', icon: <Activity />, cause: '냉각 온도차, 잔류 응력', fix: '금형 온도 균일화, 냉각 시간 연장' },
              { title: 'Weld Line (융합선)', icon: <Workflow />, cause: '수지 온도 저하, 가스 미배출', fix: '에어 벤트 추가, 수지 온도 상향' },
              { title: 'Burn Mark (탄화)', icon: <Zap />, cause: '압축 실린더 과열, 가스 연소', fix: '사출 속도 조절, 가스 벤팅 강화' },
              { title: 'Silver Streak (은줄)', icon: <Pipette />, cause: '수지 건조 부족 (수분)', fix: '제습 건조기 온도/시간 확인' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #334155' }}>
                <div style={{ color: '#ec4899', marginBottom: '16px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '12px' }}>{item.title}</h4>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>**원인**: {item.cause}</p>
                <p style={{ fontSize: '14px', color: '#fff' }}>**해결**: {item.fix}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer / Summary */}
      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
        <p style={{ fontSize: '32px', fontWeight: 900, color: '#ec4899', marginBottom: '20px' }}>금형에 대한 통찰이 제품의 경쟁력을 완성합니다. ⚙️</p>
        <p style={{ color: '#64748b', fontSize: '18px' }}>100% Practical Mold Engineering Guide</p>
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
