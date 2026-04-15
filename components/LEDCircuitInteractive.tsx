'use client';
import React, { useState, useEffect } from 'react';
import { Zap, Activity, Info, AlertCircle, CheckCircle2, Sliders, Cpu, Workflow } from 'lucide-react';

export default function LEDCircuitInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [seriesCount, setSeriesCount] = useState(10);
  const [parallelCount, setParallelCount] = useState(2);
  const [chipVoltage, setChipVoltage] = useState(6); // 6V chips are common in street lights
  const [chipCurrent, setChipCurrent] = useState(150); // 150mA chips
  const [converterType, setConverterType] = useState('CC'); // CC or CV

  const totalVoltage = seriesCount * chipVoltage;
  const totalCurrent = parallelCount * chipCurrent;
  const totalPower = (totalVoltage * totalCurrent) / 1000;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6)',
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.2 }}>
           💡 LED 회로 설계 솔루션 <br/>
           <span style={{ color: '#10b981' }}>직·병렬 계산 및 컨버터 매칭</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#94a3b8', maxWidth: '850px', margin: '0 auto', lineHeight: 1.6 }}>
          전압이 높아야 할까요, 전류가 높아야 할까요? 
          LED 수명을 결정짓는 '정전류(CC)'와 '정전압(CV)'의 차이를 이해하고, 
          칩 구성에 딱 맞는 최적의 전원을 직접 설계해보세요.
        </p>
      </div>

      {/* Main Simulation Section */}
      <section style={{ 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        padding: isMobile ? '24px' : '48px', 
        borderRadius: '32px' 
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '48px' }}>
          
          {/* Left: Interactive Controls */}
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#10b981', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sliders size={28} /> 회로 구성 파라미터
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 700 }}>
                  <span>⛓️ 직렬 연결 (Series)</span>
                  <span style={{ color: '#10b981' }}>{seriesCount} S</span>
                </label>
                <input 
                  type="range" min="1" max="20" value={seriesCount} 
                  onChange={(e) => setSeriesCount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981' }}
                />
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>* 직렬이 늘어나면 <b>전압(V)</b>이 올라갑니다.</p>
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 700 }}>
                  <span> paralelo 병렬 연결 (Parallel)</span>
                  <span style={{ color: '#10b981' }}>{parallelCount} P</span>
                </label>
                <input 
                  type="range" min="1" max="10" value={parallelCount} 
                  onChange={(e) => setParallelCount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981' }}
                />
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>* 병렬이 늘어나면 <b>전류(A)</b>가 올라갑니다.</p>
              </div>

              <div style={{ background: '#0f172a', padding: '24px', borderRadius: '20px', border: '1px solid #1e293b' }}>
                 <p style={{ marginBottom: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Cpu size={20} color="#10b981" /> 칩 기본 사양 선택
                 </p>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                   <button 
                     onClick={() => { setChipVoltage(3); setChipCurrent(150); }}
                     style={{ padding: '12px', borderRadius: '8px', border: chipVoltage === 3 ? '2px solid #10b981' : '1px solid #334155', background: chipVoltage === 3 ? '#064e3b' : 'transparent', color: '#fff', cursor: 'pointer' }}
                   >
                     3V 150mA (고효율)
                   </button>
                   <button 
                     onClick={() => { setChipVoltage(6); setChipCurrent(150); }}
                     style={{ padding: '12px', borderRadius: '8px', border: chipVoltage === 6 ? '2px solid #10b981' : '1px solid #334155', background: chipVoltage === 6 ? '#064e3b' : 'transparent', color: '#fff', cursor: 'pointer' }}
                   >
                     6V 150mA (고출력)
                   </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Monitoring & Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Activity size={28} /> 시스템 요구 제원
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#020617', padding: '24px', borderRadius: '20px', border: '2px solid #1e293b', textAlign: 'center' }}>
                 <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>총 구동 전압</div>
                 <div style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24' }}>{totalVoltage} V</div>
              </div>
              <div style={{ background: '#020617', padding: '24px', borderRadius: '20px', border: '2px solid #1e293b', textAlign: 'center' }}>
                 <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>총 구동 전류</div>
                 <div style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24' }}>{totalCurrent} mA</div>
              </div>
            </div>

            <div style={{ background: '#020617', padding: '24px', borderRadius: '20px', border: '2px solid #10b981', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>예상 총 전력 소비</div>
              <div style={{ fontSize: '40px', fontWeight: 900, color: '#10b981' }}>{totalPower.toFixed(1)} W</div>
            </div>

            {/* Converter Recommendation */}
            <div style={{ background: '#1e293b', padding: '24px', borderRadius: '20px', border: '1px solid #334155' }}>
               <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <CheckCircle2 size={24} color="#10b981" /> 추천 컨버터 사양
               </h3>
               <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.6 }}>
                  이 회로를 구동하려면 <b>{totalCurrent}mA 정전류(CC)</b> 출력을 지원하며, 전압 가변 범위가 <b>{totalVoltage - 5}V ~ {totalVoltage + 5}V</b> 이상인 컨버터가 필요합니다.
               </div>
               <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  <span style={{ padding: '6px 12px', background: '#064e3b', borderRadius: '20px', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>#IP67_방수</span>
                  <span style={{ padding: '6px 12px', background: '#064e3b', borderRadius: '20px', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>#정전류_CC</span>
                  <span style={{ padding: '6px 12px', background: '#064e3b', borderRadius: '20px', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>#서지_방호</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: CC vs CV Deep Dive */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px' }}>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.05)', 
          border: '1px solid rgba(59, 130, 246, 0.2)', 
          padding: '32px', 
          borderRadius: '24px',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '-15px', right: '20px', background: '#3b82f6', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 900 }}>PRO CHOICE</div>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#60a5fa', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             🚀 정전류 (CC: Constant Current)
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '15px' }}>
            LED는 열이 나면 저항이 낮아져 더 많은 전류를 빨아들이는 성질이 있습니다. <br/>
            <b>정전류 컨버터</b>는 전압을 유동적으로 조절하여 전류를 <b>강제로 고정</b>시킵니다. <br/>
            가로등처럼 극한의 환경에서 LED가 타지 않게 보호하는 가장 확실한 방법입니다.
          </p>
        </div>

        <div style={{ 
          background: 'rgba(234, 179, 8, 0.03)', 
          border: '1px solid rgba(234, 179, 8, 0.1)', 
          padding: '32px', 
          borderRadius: '24px' 
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fbbf24', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             💡 정전압 (CV: Constant Voltage)
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '15px' }}>
            12V 또는 24V로 전압을 딱 고정해서 줍니다. <br/>
            주로 <b>LED 스트립</b>이나 병렬로 수십 개를 연결하는 인테리어 조명에 쓰입니다. <br/>
            단, 각 LED마다 전류를 조절해줄 <b>저항</b>이나 소자가 따로 달려있어야 폭주를 막을 수 있습니다.
          </p>
        </div>
      </div>

      {/* Advanced Logic Section */}
      <section style={{ 
        background: '#1e293b', 
        padding: isMobile ? '24px' : '40px', 
        borderRadius: '32px',
        border: '1px solid #334155'
      }}>
        <h2 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Workflow size={30} color="#10b981" /> 실무 설계 시 주의사항 (Critical Points)
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '20px' }}>
           {[
             { title: "전압 여유 (Headroom)", desc: "컨버터 최대 전압의 90% 이내로 LED 직렬을 설계하세요. 전압 여유가 없으면 온도에 따라 깜빡임이 발생합니다.", color: "#38bdf8" },
             { title: "병렬 균형 (Matching)", desc: "병렬 라인간의 선 길이를 똑같이 맞추세요. 한쪽 라인 저항이 낮으면 그쪽으로 전류가 몰려 LED가 소실됩니다.", color: "#10b981" },
             { title: "과전압 보호 (OVP)", desc: "컨버터가 낼 수 있는 최대 전압이 LED 칩의 파괴 전압을 넘지 않도록 설정 범위를 확인해야 합니다.", color: "#f43f5e" }
           ].map((item, idx) => (
             <div key={idx} style={{ background: '#0f172a', padding: '24px', borderRadius: '20px', border: `1px solid ${item.color}33` }}>
                <h4 style={{ color: item.color, fontWeight: 800, marginBottom: '12px' }}>{item.title}</h4>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px 0' }}>
         <p style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>회로 설계의 정답은 '안정성'과 '효율'의 황금 비율을 찾는 것입니다. 📐</p>
      </footer>
    </div>
  );
}
