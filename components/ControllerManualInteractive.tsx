'use client';
import React, { useState } from 'react';
import { 
  Cpu, Zap, Waves, Settings, Activity, Clock, 
  Database, ShieldCheck, Sun, Moon, Sliders,
  CheckCircle2, AlertCircle, Terminal, BarChart4
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const S = {
  glass: {
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 40,
    padding: 60
  }
};

export default function ControllerManualInteractive() {
  const [sensorRange, setSensorRange] = useState(12);

  return (
    <div style={{ background: '#000', color: '#fff', padding: '120px 40px', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 150 }}
      >
        <div style={{ display: 'inline-block', padding: '10px 24px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: 13, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.4em' }}>
          INTELLIGENT MPPT & SENSOR LOGIC
        </div>
        <h1 style={{ fontSize: '7vw', fontWeight: 950, letterSpacing: '-0.05em', color: '#f1f5f9', lineHeight: 0.9 }}>
          SYSTEM <br/> <span style={{ color: '#3b82f6' }}>AUTONOMY</span>
        </h1>
        <p style={{ fontSize: 22, color: '#64748b', marginTop: 40, maxWidth: 900, margin: '40px auto', lineHeight: 1.8 }}>
          본 매뉴얼은 독립형 태양광 시스템의 '두뇌'인 컨트롤러의 제어 로직을 다룹니다. <br/>
          초정밀 MPPT 알고리즘과 5.8GHz 마이크로웨이브 알고리즘을 통한 지능형 에너지 관리 데이터를 분석합니다.
        </p>
      </motion.div>

      {/* 2. MPPT & SENSOR ANALYZER */}
      <section style={{ marginBottom: 200 }}>
        <div style={{ ...S.glass }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 100, alignItems: 'center' }}>
              <div>
                  <h3 style={{ fontSize: 36, fontWeight: 950, marginBottom: 32 }}>MPPT Tracking Analysis</h3>
                  <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.9, marginBottom: 48 }}>
                    일사량 변화에 따라 태양광 패널의 최적 동작점(Vmp, Imp)을 초당 100회 이상 추적합니다. <br/>
                    **99.9%의 추적 효율**을 통해 구름 낀 날씨(저조도) 환경에서도 충전 전류를 20-30% 추가 확보하며, 리튬 배터리의 충전 곡선(CC-CV)을 정밀 제어합니다.
                  </p>
                  
                  <div style={{ background: '#020617', padding: 48, borderRadius: 32, border: '1px solid #1e293b' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                        <Terminal size={24} color="#3b82f6" />
                        <span style={{ fontWeight: 800, fontSize: 18 }}>Algorithm Core Specs</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <SpecBox label="Tracking Efficiency" val="99.9%" />
                        <SpecBox label="Conversion Eff." val="98.2%" />
                        <SpecBox label="Static Current" val="< 10mA" />
                        <SpecBox label="Response Time" val="< 0.1s" />
                     </div>
                  </div>
              </div>

              <div style={{ background: '#020617', padding: 56, borderRadius: 48, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <Waves size={48} color="#3b82f6" style={{ marginBottom: 32 }} />
                  <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>5.8GHz Microwave Algorithm</h3>
                  <div style={{ marginBottom: 40 }}>
                     <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <span style={{ fontSize: 14, color: '#64748b' }}>Detection Range (Height)</span>
                        <span style={{ color: '#3b82f6', fontWeight: 900 }}>{sensorRange} m</span>
                     </label>
                     <input type="range" min="3" max="18" value={sensorRange} onChange={(e)=>setSensorRange(Number(e.target.value))} style={{ width: '100%', accentColor: '#3b82f6' }} />
                  </div>
                  <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}>
                     <CheckPoint title="Doppler Digital Filter" desc="바람에 흔들리는 나무나 빗줄기를 필터링하여 오작동 없는 정밀 감지 수행" />
                     <CheckPoint title="Dynamic Brightness Control" desc="감지 시 100% 가동, 미감지 시 10~30% 대기 모드 자동 전환" />
                     <CheckPoint title="Long Range Coverage" desc="직경 최대 20m 구역의 이동체를 사전에 감지하여 보행자 안전 확보" />
                  </ul>
              </div>
           </div>
        </div>
      </section>

      {/* 3. TIMING & SCENARIOS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 200 }}>
         <FeatureCard 
            icon={Moon} 
            title="Dusk-to-Dawn Sync" 
            desc="일몰을 자동으로 감지하여 부팅되며, 계절별 밤 길이를 계산하여 일출 시까지 일관된 조도를 유지하는 스마트 타이머를 내장합니다." 
         />
         <FeatureCard 
            icon={Clock} 
            title="Time-Phased Dimming" 
            desc="심야 시간대(자정~새벽 4시)에는 기본 조도를 50%로 낮추어 배터리 소모를 줄이되, 센서 작동 시 즉각 100%로 복귀하는 로직입니다." 
         />
         <FeatureCard 
            icon={ShieldCheck} 
            title="LVD / OVD Logic" 
            desc="저전압(LVD)/과전압(OVD) 보호를 통해 배터리의 과방전/과충전을 0.01V 단위로 정밀 차단하여 시스템 수명을 보호합니다." 
         />
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.8em', fontWeight: 950 }}>MPPT CONTROL & SENSING ALGORITHM STANDARD</p>
      </footer>
    </div>
  );
}

function SpecBox({ label, val }: any) {
  return (
    <div>
       <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
       <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{val}</div>
    </div>
  );
}

function CheckPoint({ title, desc }: any) {
  return (
    <li style={{ display: 'flex', gap: 16 }}>
       <CheckCircle2 size={24} color="#3b82f6" style={{ flexShrink: 0, marginTop: 4 }} />
       <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc' }}>{title}</div>
          <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
       </div>
    </li>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div style={S.glass}>
       <div style={{ color: '#3b82f6', marginBottom: 24 }}><Icon size={32} /></div>
       <h4 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>{title}</h4>
       <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}
