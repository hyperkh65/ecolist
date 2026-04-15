'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sun, Moon, Move, Settings, Zap, Eye, BarChart3, CloudRain, 
  Cpu, Network, Radio, Bell, Activity, ShieldCheck, Thermometer, 
  Clock, Gauge, Share2, Globe, Database, Smartphone,
  RefreshCcw, Play, History, ShieldAlert, Wifi, Bluetooth,
  Maximize2, Minimize2, ThermometerSnowflake, Power
} from 'lucide-react';

export default function ControllerManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('algorithm');
  
  // Power Simulation States
  const [weather, setWeather] = useState('sunny'); // sunny, cloudy, rainy
  const [mpptTracking, setMpptTracking] = useState(98.5);
  const [dimmingLevel, setDimmingLevel] = useState(100);
  const [soc, setSoc] = useState(85);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const energyLog = useMemo(() => {
    const gain = weather === 'sunny' ? 450 : weather === 'cloudy' ? 120 : 30;
    const loss = (dimmingLevel / 100) * 180;
    const net = gain - loss;
    return { gain, loss, net };
  }, [weather, dimmingLevel]);

  const runSystemTest = (msg: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert(`${msg} 실행 결과: MPPT 정밀 추적 효율 99.2% 달성, LVD(저전압 차단) 회로 정상 작동, RS485 마스터/슬레이브 패킷 손실률 0%를 확인하였습니다.`);
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
        <h1 style={{ fontSize: isMobile ? '36px' : '76px', fontWeight: 950, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
           🧠 <span style={{ color: '#fbbf24' }}>지능형 전력 컨트롤러(CCU)</span> <br/>
           <span style={{ fontSize: '0.5em', color: '#94a3b8', display: 'block', marginTop: '16px' }}>MPPT 알고리즘 및 스마트 EMS 관제 100% 지침서</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#94a3b8', maxWidth: '1050px', margin: '0 auto', lineHeight: 1.8 }}>
           컨트롤러는 시스템의 두뇌입니다. 단순한 On/Off를 넘어 기상 데이터 기반의 자율 디밍 전략, 
           고발전 MPPT 하이퍼 알고리즘(P&O), 그리고 딥슬립(&lt; 1mA) 설계를 통한 
           최장수 춘추 방전을 실현하는 최첨단 엔지니어링 리포트입니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.5)', padding: '8px', borderRadius: '24px', width: 'fit-content', margin: '0 auto', border: '1px solid #1e293b', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'algorithm', label: 'MPPT 추적 알고리즘', icon: Cpu },
          { id: 'ems', label: '에너지 관리 시스템 (EMS)', icon: BarChart3 },
          { id: 'protection', label: '회로 보호 및 신뢰성', icon: ShieldCheck },
          { id: 'iot', label: '스마트 시티 통신 (IoT)', icon: Globe }
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

      {/* MPPT Algorithm Deep Dive */}
      {activeTab === 'algorithm' && (
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '64px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24' }}>Hyper MPPT (P&O) 기술 분석</h3>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.8 }}>
                 Perturb and Observe(P&O) 알고리즘은 태양광 패널의 최대 전력점(MPP)을 찾기 위해 초당 수백 회 전압을 미세 조정합니다. 
                 특히 구름이 낀 날이나 부분 음영(Partial Shading) 발생 시, 
                 기존 PWM 방식 대비 최대 40% 이상의 발전량 증대를 가져옵니다. 
                 또한, 겨울철 패널 전압이 배터리 전압보다 훨씬 높을 때 이를 '전류'로 변환하여 
                 강한 충전 압력을 형성하는 것이 기술의 정점입니다.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                 <InfoCard title="PWM (Standard)" desc="패널 전압을 배터리 전압에 고정(Clamping)하여 연결. 발전 손실이 크지만 구조가 간단함." icon={Minimize2} color="#94a3b8" />
                 <InfoCard title="MPPT (Advanced)" desc="전압과 전류의 실시간 매칭(Buck-Boost)을 통해 가용 에너지의 98% 이상을 회수." icon={Maximize2} color="#fbbf24" />
              </div>

              <div style={{ background: '#0f172a', padding: '40px', borderRadius: '40px', border: '1px solid #1e293b' }}>
                 <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px' }}>자율 충전 단계 프로토콜 (4-Stage)</h4>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: '#020617' }}>
                       <span style={{ fontWeight: 800, color: '#fbbf24' }}>Bulk Charge</span>
                       <span style={{ color: '#94a3b8' }}>최대 전류 투입하여 80% SOC까지 급속 충전</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: '#020617' }}>
                       <span style={{ fontWeight: 800, color: '#38bdf8' }}>Absorption</span>
                       <span style={{ color: '#94a3b8' }}>정전압(CV) 제어로 95%까지 완속 정밀 충전</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: '#020617' }}>
                       <span style={{ fontWeight: 800, color: '#10b981' }}>Float</span>
                       <span style={{ color: '#94a3b8' }}>자기 방전을 보상하며 만충 상태 유지</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', background: '#020617' }}>
                       <span style={{ fontWeight: 800, color: '#f43f5e' }}>Equalization</span>
                       <span style={{ color: '#94a3b8' }}>정기적 고압 충전으로 전해질 불균형 해소</span>
                    </div>
                 </div>
              </div>
           </div>

           <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b', position: 'sticky', top: '100px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                 <Gauge size={64} color="#fbbf24" style={{ marginBottom: '16px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 950 }}>MPPT 실시간 추적 시뮬레이터</h4>
              </div>
              <div style={{ height: '300px', background: '#020617', borderRadius: '32px', border: '2px solid #334155', position: 'relative', overflow: 'hidden', padding: '24px' }}>
                 <div style={{ position: 'absolute', left: '10%', bottom: '10%', width: '80%', height: '80%', borderLeft: '2px solid #334155', borderBottom: '2px solid #334155' }} />
                 <svg width="100%" height="100%" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
                    <path d="M 20 90 Q 100 10 180 90" fill="none" stroke="#334155" strokeWidth="2" />
                    <circle cx="100" cy="50" r="4" fill="#fbbf24">
                       <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <text x="110" y="45" fill="#fbbf24" fontSize="8" fontWeight="bold">MAX PEAK (P&O)</text>
                 </svg>
                 <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: '#64748b', fontSize: '11px' }}>
                    현 전압 대비 최적 전력 점 스캔 중...
                 </div>
              </div>
              <button 
                onClick={() => runSystemTest('MPPT Dynamic Search')}
                style={{ width: '100%', marginTop: '40px', padding: '24px', borderRadius: '24px', background: '#fbbf24', border: 'none', color: '#000', fontWeight: 950, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
              >
                {isSimulating ? <RefreshCcw size={20} className="animate-spin" /> : <Play size={20} />}
                알고리즘 무결성 테스트
              </button>
           </div>
        </section>
      )}

      {/* Energy Management Simulator */}
      {activeTab === 'ems' && (
        <section style={{ background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: '64px', borderRadius: '64px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '80px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#fbbf24', marginBottom: '48px' }}>24시간 에너지 수지 시뮬레이터</h3>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>☁️ 기상 조건 (Weather Patterns)</span>
                          <span style={{ color: '#fbbf24', textTransform: 'uppercase' }}>{weather}</span>
                       </label>
                       <div style={{ display: 'flex', gap: '12px' }}>
                          {['sunny', 'cloudy', 'rainy'].map(w => (
                            <button key={w} onClick={()=>setWeather(w)} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: weather === w ? '#fbbf24' : '#0f172a', color: weather === w ? '#000' : '#fff', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>{w.toUpperCase()}</button>
                          ))}
                       </div>
                    </div>
                    <div>
                       <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 800 }}>
                          <span>💡 디밍 출력 (Dimming Power)</span>
                          <span style={{ color: '#38bdf8' }}>{dimmingLevel} %</span>
                       </label>
                       <input type="range" min="10" max="100" step="5" value={dimmingLevel} onChange={(e)=>setDimmingLevel(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '64px' }}>
                    <DataPoint title="일일 생성 전력" value={`+${energyLog.gain}Wh`} color="#10b981" />
                    <DataPoint title="일일 소모 전력" value={`-${energyLog.loss.toFixed(0)}Wh`} color="#f43f5e" />
                    <DataPoint title="최종 에너지 수지" value={`${energyLog.net > 0 ? '+' : ''}${energyLog.net.toFixed(0)}Wh`} color="#fbbf24" />
                 </div>
              </div>

              <div style={{ background: '#020617', padding: '56px', borderRadius: '56px', border: '1px solid #1e293b', textAlign: 'center' }}>
                 <Clock size={64} color="#fbbf24" style={{ marginBottom: '24px' }} />
                 <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>가용 야간 가동 시간</h4>
                 <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '15.5px' }}>
                    현재 설정된 {weather} 날씨와 {dimmingLevel}% 출력 기준, 보조 충전 없이 최장 <b>{(soc * 2.5 / (dimmingLevel/100)).toFixed(1)}일</b> 동안 
                    무일조 상시 가동이 가능합니다. EMS는 야간 SOC가 30% 미만으로 떨어질 경우 강제 절전 모드로 진입합니다.
                 </p>
              </div>
           </div>
        </section>
      )}

      {/* Advanced Logic Sections */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
         <LogicCard icon={ShieldCheck} color="#10b981" title="6-Fold Protection" desc="OVP(과전압), OCP(과전류), OTP(과열), LVD(저전류차단), SCP(단락보호), 역극성 보호회로 완비." />
         <LogicCard icon={Radio} color="#38bdf8" title="Hybrid Dimming" desc="PIR/마이크로웨이브 모션 센서와 시간대별 스케줄을 융합하여 보행자 부재 시 전력을 90% 절감합니다." />
         <LogicCard icon={Network} color="#a855f7" title="Self-Diagnostic" desc="컨트롤러 자가 진단 패킷을 매시간 서버로 전송하여 고장 징후를 사전 탐지하고 관리자 앱에 경보를 보냅니다." />
      </section>

      {/* IoT Integration */}
      {activeTab === 'iot' && (
        <section style={{ background: '#0f172a', padding: '64px', borderRadius: '64px', border: '1px solid #1e293b' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#38bdf8', marginBottom: '24px' }}>차세대 스마트 시티 관제 노드</h3>
                 <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: 2.0 }}>
                    각 가로등은 LoRaWAN 또는 NB-IoT를 통해 반경 10km 이내의 데이터를 CMS 서버와 주고받습니다. 
                    관제 센터에서는 구글 맵 기반 인터페이스를 통해 개별 가로등의 배터리 전압, 충전 전력, 고장 유무를 
                    실시간으로 모니터링하며 원격으로 디밍 스케줄을 일괄 수정(Group Control)할 수 있습니다. 
                    또한 RS485 산업용 통신기능으로 주변 센서 노드와의 확장성을 보장합니다.
                 </p>
                 <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Tag label="LoRa 920MHz" color="#818cf8" />
                    <Tag label="NB-IoT / Cat.M1" color="#818cf8" />
                    <Tag label="Bluetooth 5.0 (App Config)" color="#818cf8" />
                    <Tag label="RS485 Master/Slave" color="#818cf8" />
                 </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                 <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
                    <div style={{ position: 'absolute', inset: 0, border: '4px dashed #38bdf8', borderRadius: '50%', animation: 'spin 10s linear infinite' }} />
                    <Wifi size={100} color="#38bdf8" style={{ marginTop: '50px' }} />
                 </div>
                 <h5 style={{ fontSize: '18px', fontWeight: 900, marginTop: '24px' }}>CONNECTED SYSTEM</h5>
              </div>
           </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #1e293b' }}>
         <p style={{ fontSize: '36px', fontWeight: 950, color: '#fff', marginBottom: '24px' }}>지능은 경험과 데이터를 통해 완성됩니다. 🧠</p>
         <p style={{ color: '#64748b', fontSize: '18px' }}>Global Intelligent EMS Standardization Group by Antigravity</p>
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

function InfoCard({ title, desc, icon: Icon, color }: any) {
  return (
    <div style={{ background: '#020617', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
       <div style={{ color: color, marginBottom: '16px' }}><Icon size={24} /></div>
       <h5 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>{title}</h5>
       <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
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

function LogicCard({ icon: Icon, color, title, desc }: any) {
  return (
    <div style={{ background: '#0f172a', padding: '48px', borderRadius: '48px', border: '1px solid #1e293b' }}>
       <div style={{ color: color, marginBottom: '24px' }}><Icon size={40} /></div>
       <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>{title}</h4>
       <p style={{ color: '#cbd5e1', fontSize: '15.5px', lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}

function Tag({ label, color }: any) {
  return (
    <span style={{ padding: '10px 20px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', color: color, fontWeight: 800, fontSize: '14px', border: `1px solid ${color}33` }}>{label}</span>
  );
}
