'use client';
import React, { useState, useEffect } from 'react';
import { Battery, Zap, Shield, AlertTriangle, RefreshCcw, Search, Ruler, Settings } from 'lucide-react';

export default function BatteryManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('calc'); // 'calc' or 'cells'
  
  // States for Capacity Calculator
  const [wattage, setWattage] = useState(60);
  const [hours, setHours] = useState(12);
  const [days, setDays] = useState(3);
  const [efficiency, setEfficiency] = useState(0.85);

  // States for Cell Simulation
  const [cells, setCells] = useState([
    { id: 1, voltage: 3.2, health: 100, status: 'good' },
    { id: 2, voltage: 3.2, health: 100, status: 'good' },
    { id: 3, voltage: 3.2, health: 100, status: 'good' },
    { id: 4, voltage: 3.2, health: 100, status: 'good' },
  ]);
  const [bmsStatus, setBmsStatus] = useState('Safe');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculateAh = () => {
    // Wh = W * h * days / efficiency
    // Ah = Wh / 12.8 (for 4S LifePO4 system)
    const wh = (wattage * hours * days) / efficiency;
    return (wh / 12.8).toFixed(1);
  };

  const damageCell = (id: number) => {
    setCells(prev => prev.map(cell => {
      if (cell.id === id) {
        return { ...cell, voltage: 2.1, status: 'dead', health: 20 };
      }
      return cell;
    }));
    setBmsStatus('Critical Error: Low Voltage Protection!');
  };

  const resetCells = () => {
    setCells([
      { id: 1, voltage: 3.2, health: 100, status: 'good' },
      { id: 2, voltage: 3.2, health: 100, status: 'good' },
      { id: 3, voltage: 3.2, health: 100, status: 'good' },
      { id: 4, voltage: 3.2, health: 100, status: 'good' },
    ]);
    setBmsStatus('Safe');
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
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
    }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.2 }}>
           🔋 태양광 배터리의 모든 것 <br/>
           <span style={{ color: '#10b981' }}>용량 산출부터 셀 관리까지!</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#94a3b8', maxWidth: '850px', margin: '0 auto', lineHeight: 1.6 }}>
          태양광 가로등의 '심장'인 배터리! 어떻게 하면 10년을 쓸 수 있을까요? 
          초보자도 쉽게 계산하는 용량 산출기와 실제 배터리 팩 내부를 들여다보는 시뮬레이션으로 완벽하게 마스터해봅시다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button 
          onClick={() => setActiveTab('calc')}
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            background: activeTab === 'calc' ? '#10b981' : '#1e293b',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Ruler size={20} /> 용량 산출기
        </button>
        <button 
          onClick={() => setActiveTab('cells')}
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            background: activeTab === 'cells' ? '#10b981' : '#1e293b',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Search size={20} /> 셀 정밀 점검
        </button>
      </div>

      {activeTab === 'calc' ? (
        <section style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          padding: isMobile ? '20px' : '40px', 
          borderRadius: '24px' 
        }}>
          <h2 style={{ fontSize: isMobile ? '20px' : '32px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Zap size={32} /> 1단계: 우리 동네에 필요한 배터리 용량은?
          </h2>
          
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '40px' }}>
            {/* Input Controls */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>💡 조명 소비전력 (W): {wattage}W</label>
                <input type="range" min="10" max="200" step="10" value={wattage} onChange={(e)=>setWattage(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>🌙 매일 켜지는 시간 (h): {hours}시간</label>
                <input type="range" min="4" max="15" value={hours} onChange={(e)=>setHours(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1' }}>🌧️ 무일조(비오는 날) 보장일수: {days}일</label>
                <input type="range" min="1" max="7" value={days} onChange={(e)=>setDays(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
              </div>
            </div>

            {/* Result Display */}
            <div style={{ 
              flex: 1, 
              background: '#0f172a', 
              borderRadius: '20px', 
              padding: '32px', 
              border: '1px solid #1e293b',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '12px' }}>권장 배터리 용량 (LifePO4 12V 기준)</div>
              <div style={{ fontSize: isMobile ? '48px' : '64px', fontWeight: 900, color: '#10b981' }}>{calculateAh()} Ah</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '16px' }}>
                 * 안전마진 및 컨버터 효율 {efficiency * 100}% 반영된 수치입니다.
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          padding: isMobile ? '20px' : '40px', 
          borderRadius: '24px' 
        }}>
          <h2 style={{ fontSize: isMobile ? '20px' : '32px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Battery size={32} /> 2단계: 배터리 내부 '셀'을 고쳐봅시다!
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: '32px' }}>
            배터리 통 안에는 4개(12V) 또는 8개(24V)의 '셀(Cell)'이 기차처럼 길게 연결되어 있어요. 
            그중 <b>하나라도 아프면(전압 낮아짐)</b> BMS(보호회로)가 전체 전원을 차단해버립니다. 
            문제가 생긴 셀을 찾아서 교체하는 시뮬레이션을 해보세요!
          </p>

          <div style={{ 
            background: '#0f172a', 
            padding: '30px', 
            borderRadius: '20px', 
            border: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: isMobile ? '10px' : '30px',
              flexWrap: 'wrap'
            }}>
              {cells.map(cell => (
                <div 
                  key={cell.id} 
                  onClick={() => damageCell(cell.id)}
                  style={{
                    width: isMobile ? '70px' : '100px',
                    height: isMobile ? '100px' : '140px',
                    background: cell.status === 'dead' ? '#ef4444' : '#1e293b',
                    borderRadius: '12px',
                    border: `2px solid ${cell.status === 'dead' ? '#f87171' : '#334155'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Cell {cell.id}</div>
                  <Battery size={isMobile ? 24 : 40} color={cell.status === 'dead' ? '#fff' : '#10b981'} />
                  <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '8px' }}>{cell.voltage}V</div>
                  {cell.status === 'dead' && <AlertTriangle size={20} color="#fff" style={{ position: 'absolute', top: 5, right: 5 }} />}
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
               <div style={{ 
                 display: 'inline-block', 
                 padding: '12px 24px', 
                 borderRadius: '30px', 
                 background: bmsStatus === 'Safe' ? '#065f46' : '#991b1b',
                 color: '#fff',
                 fontWeight: 'bold',
                 marginBottom: '20px'
               }}>
                 BMS 상태: {bmsStatus}
               </div>
               <br/>
               <button 
                 onClick={resetCells}
                 style={{
                   padding: '10px 20px',
                   background: '#334155',
                   color: '#fff',
                   border: 'none',
                   borderRadius: '8px',
                   cursor: 'pointer',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px',
                   margin: '0 auto'
                 }}
               >
                 <RefreshCcw size={16} /> 전체 셀 초기화 (수리완료)
               </button>
            </div>
          </div>
        </section>
      )}

      {/* Chapter 3: Knowledge Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
         <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#60a5fa', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={24} /> 왜 LifePO4(리튬인산철) 인가요?
            </h3>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '15px', lineHeight: 1.8 }}>
              <li><b>폭발 위험성 제로:</b> 과충전되거나 손상되어도 불이 붙지 않습니다.</li>
              <li><b>압도적 수명:</b> Li-ion(500회)보다 6배 이상(3,000회 이상) 오래 씁니다.</li>
              <li><b>겨울에 강함:</b> 영하의 기온에서도 안정적인 출력을 유지합니다.</li>
            </ul>
         </div>
         <div style={{ background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#facc15', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={24} /> 셀 밸런싱(Cell Balancing)의 비밀
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.8 }}>
              4개의 셀이 사이좋게 전압을 나눠 가져야 합니다. 만약 1번 셀만 3.6V로 높고 나머지가 3.2V라면? 
              BMS는 1번 셀을 기준으로 충전을 중단해버려 전체 배터리의 절반밖에 못 쓰게 됩니다. 
              품질 좋은 BMS는 '밸런싱' 기능을 통해 모든 셀의 전압을 똑같이 맞춰줍니다.
            </p>
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px 0' }}>
         <p style={{ fontSize: '24px', fontWeight: 800, color: '#10b981' }}>🌱 건강한 배터리가 지구를 살립니다! 🌱</p>
      </footer>
    </div>
  );
}
