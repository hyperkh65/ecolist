'use client';
import React, { useState } from 'react';
import { 
  Zap, ShieldAlert, Cpu, Activity, Thermometer, 
  Settings, CheckCircle2, Sliders, Battery, 
  Clock, Gauge, Database, Power, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const S = {
  glass: {
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 40,
    padding: 60
  }
};

export default function SmartSMPSManual() {
  const [load, setLoad] = useState(100);

  const getEfficiency = (l: number) => {
    if (l < 50) return 92.5;
    if (l < 80) return 94.8;
    return 95.2;
  };

  return (
    <div style={{ background: '#000', color: '#fff', padding: '120px 40px', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 150 }}
      >
        <div style={{ display: 'inline-block', padding: '10px 24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: 13, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.4em' }}>
          POWER ELECTRONICS & SMPS ARCHITECTURE
        </div>
        <h1 style={{ fontSize: '7vw', fontWeight: 950, letterSpacing: '-0.05em', color: '#f1f5f9', lineHeight: 0.9 }}>
          ENERGY <br/> <span style={{ color: '#ef4444' }}>INTELLIGENCE</span>
        </h1>
        <p style={{ fontSize: 22, color: '#64748b', marginTop: 40, maxWidth: 900, margin: '40px auto', lineHeight: 1.8 }}>
          본 매뉴얼은 AC/DC 전력 변환의 안정성을 극대화하기 위한 회로 설계 데이터를 제공합니다. <br/>
          필립스 자이타늄(Xitanium) 드라이버의 토볼로지를 기반으로 10kV 서지 보호와 능동형 PFC 제어 로직을 분석합니다.
        </p>
      </motion.div>

      {/* 2. POWER PERFORMANCE ANALYZER */}
      <section style={{ marginBottom: 200 }}>
        <div style={{ ...S.glass }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 100, alignItems: 'center' }}>
            <div>
               <h2 style={{ fontSize: 36, fontWeight: 950, marginBottom: 32 }}>능동형 전력 효율 시뮬레이션</h2>
               <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.9, marginBottom: 48 }}>
                 SMPS는 부하(Load) 상태에 따라 효율 곡선이 변동합니다. 80-100% 부하 구간에서 <b>95% 이상의 최대 효율</b>을 달성하여 열 손실을 최소화하고 등기구 수명을 연장합니다.
               </p>
               
               <div style={{ marginBottom: 48 }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                     <span style={{ fontWeight: 800 }}>Output Load (부하율)</span>
                     <span style={{ color: '#ef4444', fontWeight: 900 }}>{load}%</span>
                  </label>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={load} 
                    onChange={(e)=>setLoad(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: '#ef4444' }} 
                  />
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div style={{ background: '#020617', padding: 32, borderRadius: 24, textAlign: 'center' }}>
                     <div style={{ fontSize: 12, color: '#64748b' }}>EFFICIENCY</div>
                     <div style={{ fontSize: 32, fontWeight: 950, color: '#fff' }}>{getEfficiency(load)}%</div>
                  </div>
                  <div style={{ background: '#020617', padding: 32, borderRadius: 24, textAlign: 'center' }}>
                     <div style={{ fontSize: 12, color: '#64748b' }}>POWER FACTOR</div>
                     <div style={{ fontSize: 32, fontWeight: 950, color: '#10b981' }}>0.98+</div>
                  </div>
               </div>
            </div>

            <div style={{ background: '#020617', padding: 56, borderRadius: 48, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
               <ShieldAlert size={48} color="#ef4444" style={{ marginBottom: 32 }} />
               <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>4중 보호 회로 설계 (Protection)</h3>
               <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <CheckPoint title="OVP (Over Voltage)" desc="입력 전압 서지 발생 시 320V AC 이상에서 출력을 즉시 차단" />
                  <CheckPoint title="OCP (Over Current)" desc="과전류 유입 시 능동형 정전류(CC) 제어 모드로 전환" />
                  <CheckPoint title="OTP (Over Temp)" desc="내부 발열 90°C 감지 시 50% 디밍 또는 셧다운 보호" />
                  <CheckPoint title="SCP (Short Circuit)" desc="단락 감지 시 Hiccup 모드 가동 및 0.5초 이내 자동 복구" />
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL DEEP DIVE */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 200 }}>
         <DataCard 
            icon={Activity} 
            title="Total Harmonic Distortion" 
            desc="능동형 PFC 회로를 통해 가로등 집단 설치 시 발생하는 THD(전고조파왜곡)를 10% 미만으로 관리하여 전력 품질을 유지합니다." 
         />
         <DataCard 
            icon={Zap} 
            title="Surge Immunity (SPD)" 
            desc="낙뢰가 잦은 실외 환경을 고려하여 L-N 6kV, L-GND 10kV의 산업용 서지 보호 등급을 기본 탑재하여 신뢰성을 확보합니다." 
         />
         <DataCard 
            icon={Clock} 
            title="Electrolytic Capacitor" 
            desc="Rubycon/NCC 등 고수준 전해 콘덴서를 채택하여 Tamb=60°C 기준 50,000시간 이상의 설계 수명을 보장합니다." 
         />
      </section>

      {/* 4. DRIVER SPEC TABLE */}
      <section style={{ ...S.glass, padding: 80, marginBottom: 200 }}>
         <h2 style={{ fontSize: 40, fontWeight: 950, marginBottom: 60, textAlign: 'center' }}>Driver Logical Specifications</h2>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 100px' }}>
            <SpecRow label="Input Voltage Range" value="100-277V AC (Free Volt)" />
            <SpecRow label="Output Voltage Range" value="20-56V DC (Safety Low)" />
            <SpecRow label="Nominal Output Power" value="150.0 Watts" />
            <SpecRow label="Startup Time" value="< 500ms" />
            <SpecRow label="Dimming Protocols" value="1-10V / PWM / Resistance" />
            <SpecRow label="Isolation Rating" value="3.75kV AC (Reinforced)" />
            <SpecRow label="Ripple Current" value="< 5% (Flicker Free)" />
            <SpecRow label="Inrush Current" value="65A / 250μs" />
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.8em', fontWeight: 950 }}>POWER CONVERSION ENGINEERING STANDARD</p>
      </footer>
    </div>
  );
}

function CheckPoint({ title, desc }: any) {
  return (
    <li style={{ display: 'flex', gap: 16 }}>
       <CheckCircle2 size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: 4 }} />
       <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc' }}>{title}</div>
          <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
       </div>
    </li>
  );
}

function DataCard({ icon: Icon, title, desc }: any) {
  return (
    <div style={S.glass}>
       <div style={{ color: '#ef4444', marginBottom: 24 }}><Icon size={32} /></div>
       <h4 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>{title}</h4>
       <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}

function SpecRow({ label, value }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
       <span style={{ color: '#64748b', fontSize: 16 }}>{label}</span>
       <span style={{ color: '#f8fafc', fontSize: 18, fontWeight: 800 }}>{value}</span>
    </div>
  );
}
