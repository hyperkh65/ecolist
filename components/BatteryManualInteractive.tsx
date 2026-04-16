'use client';
import React, { useState, useMemo } from 'react';
import { 
  Battery, Zap, ShieldCheck, Thermometer, Activity, 
  Clock, Database, Sliders, CheckCircle2, AlertTriangle,
  RefreshCcw, Gauge, Ruler, BarChart3, Calculator as CalcIcon
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

export default function BatteryManualInteractive() {
  const [capacityAh, setCapacityAh] = useState(60); // Ah
  const [voltage, setVoltage] = useState(12.8); // V
  const [loadWatts, setLoadWatts] = useState(30); // W

  const autonomy = useMemo(() => {
    const totalWh = capacityAh * voltage;
    const hours = (totalWh * 0.9) / loadWatts; // 90% DOD
    return { wh: totalWh.toFixed(1), hours: hours.toFixed(1), days: (hours/12).toFixed(1) };
  }, [capacityAh, voltage, loadWatts]);

  return (
    <div style={{ background: '#000', color: '#fff', padding: '120px 40px', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 150 }}
      >
        <div style={{ display: 'inline-block', padding: '10px 24px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: 13, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.4em' }}>
          ELECTROCHEMICAL ENERGY STORAGE
        </div>
        <h1 style={{ fontSize: '7vw', fontWeight: 950, letterSpacing: '-0.05em', color: '#f1f5f9', lineHeight: 0.9 }}>
          LITHIUM <br/> <span style={{ color: '#10b981' }}>STABILITY</span>
        </h1>
        <p style={{ fontSize: 22, color: '#64748b', marginTop: 40, maxWidth: 900, margin: '40px auto', lineHeight: 1.8 }}>
          본 매뉴얼은 세계 최고 수준의 안정성을 가진 **LiFePO4(리튬 인산철)** 배터리 팩 설계 사양을 다룹니다. <br/>
          폭발 위험이 없는 화학 구조와 2,000회 이상의 긴 수명 주기를 보장하는 BMS 제어 데이터를 분석합니다.
        </p>
      </motion.div>

      {/* 2. ENERGY AUTONOMY CALCULATOR */}
      <section style={{ marginBottom: 200 }}>
        <div style={{ ...S.glass }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 100, alignItems: 'center' }}>
            <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
                  <CalcIcon size={40} color="#10b981" />
                  <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Storage System Estimator</h2>
               </div>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  <div>
                     <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#94a3b8' }}>
                        <span>Battery Capacity (Ah)</span>
                        <span style={{ color: '#10b981', fontWeight: 900 }}>{capacityAh} Ah</span>
                     </label>
                     <input type="range" min="20" max="200" step="10" value={capacityAh} onChange={(e)=>setCapacityAh(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                  </div>
                  <div>
                     <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#94a3b8' }}>
                        <span>Avg. Load Power (W)</span>
                        <span style={{ color: '#10b981', fontWeight: 900 }}>{loadWatts} W</span>
                     </label>
                     <input type="range" min="10" max="150" step="10" value={loadWatts} onChange={(e)=>setLoadWatts(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                  </div>
               </div>
            </div>

            <div style={{ background: '#020617', padding: 56, borderRadius: 48, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
               <div style={{ marginBottom: 40 }}>
                  <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Total Storage Capacity</div>
                  <div style={{ fontSize: 48, fontWeight: 950, color: '#fff' }}>{autonomy.wh} Wh</div>
               </div>
               <div style={{ marginBottom: 40 }}>
                  <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Autonomous Days (No Sun)</div>
                  <div style={{ fontSize: 64, fontWeight: 950, color: '#10b981' }}>{autonomy.days} <span style={{ fontSize: 24 }}>Days</span></div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>* Based on 12-hour Night Duty Cycle</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BMS & CHEMISTRY DEEP TECH */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 200 }}>
         <DataCard 
            icon={ShieldCheck} 
            title="Non-Explosive Safety" 
            desc="인산철 결정 구조(Olivine)는 강한 P-O 결합을 통해 과충전이나 단락 시에도 산소 방출을 억제하여 화재 및 폭발 사고를 근본적으로 차단합니다." 
         />
         <DataCard 
            icon={Activity} 
            title="Active Cell Balancing" 
            desc="내장된 BMS는 각 셀 간의 전압 편차를 0.05V 이내로 능동 보정하여, 특정 셀의 국부 열화를 방지하고 전체 팩의 유효 용량을 100% 활용합니다." 
         />
         <DataCard 
            icon={Thermometer} 
            title="Extreme Environment" 
            desc="군사용 Grade의 실리콘 히팅 패드와 단열 케이스 기술을 적용하여 영하 20도의 혹한에서도 충방전 효율 저하를 최소화합니다." 
         />
      </section>

      {/* 4. PERFORMANCE TABLE */}
      <section style={{ ...S.glass, padding: 80, marginBottom: 200 }}>
         <h2 style={{ fontSize: 40, fontWeight: 950, marginBottom: 60, textAlign: 'center' }}>Electrochemical Characteristics</h2>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 100px' }}>
            <SpecRow label="Chemistry" value="Lithium Iron Phosphate (LiFePO4)" />
            <SpecRow label="Cycle Life (80% DOD)" value="> 2,000 Cycles" />
            <SpecRow label="Float Charge Voltage" value="14.4 V (±0.1)" />
            <SpecRow label="Discharge Cut-off" value="10.8 V (LVD)" />
            <SpecRow label="Max Discharge Current" value="40A (Continuous)" />
            <SpecRow label="Operating Temp (Discharge)" value="-20°C ~ 65°C" />
            <SpecRow label="Self-Discharge Rate" value="< 3% per Month" />
            <SpecRow label="Housing IP Rating" value="IP67 (Sealed Aluminum Case)" />
         </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.8em', fontWeight: 950 }}>ENERGY STORAGE SYSTEM ENGINEERING STANDARD</p>
      </footer>
    </div>
  );
}

function CheckPoint({ title, desc }: any) {
  return (
    <li style={{ display: 'flex', gap: 16 }}>
       <CheckCircle2 size={24} color="#10b981" style={{ flexShrink: 0, marginTop: 4 }} />
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
       <div style={{ color: '#10b981', marginBottom: 24 }}><Icon size={32} /></div>
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
