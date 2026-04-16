'use client';
import React, { useState } from 'react';
import { 
  Zap, Sun, Thermometer, Activity, Layers, 
  Settings, CheckCircle2, FlaskConical, BarChart3,
  Dna, Shield, Maximize2, Sparkles, Database
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

export default function LEDChipManualInteractive() {
  const [junctionTemp, setJunctionTemp] = useState(65);

  const getLumenMaintenance = (temp: number) => {
    // Simplified L70 projection model
    if (temp < 60) return 99.2;
    if (temp < 85) return 97.5;
    return 94.8;
  };

  return (
    <div style={{ background: '#000', color: '#fff', padding: '120px 40px', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 150 }}
      >
        <div style={{ display: 'inline-block', padding: '10px 24px', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', fontSize: 13, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.4em' }}>
          OPTO-SEMICONDUCTOR PHYSICS
        </div>
        <h1 style={{ fontSize: '7vw', fontWeight: 950, letterSpacing: '-0.05em', color: '#f1f5f9', lineHeight: 0.9 }}>
          PHOTONIC <br/> <span style={{ color: '#ec4899' }}>EFFICIENCY</span>
        </h1>
        <p style={{ fontSize: 22, color: '#64748b', marginTop: 40, maxWidth: 900, margin: '40px auto', lineHeight: 1.8 }}>
          본 매뉴얼은 광원의 물리적 특성과 장기 신뢰성을 분석한 기술 문서입니다. <br/>
          서울반도체의 9V 하이파워 2835 플랫폼을 기반으로, 온도에 따른 광속 유지율과 색좌표 관리(SDCM) 공학 데이터를 다룹니다.
        </p>
      </motion.div>

      {/* 2. OPTICAL PERFORMANCE ANALYZER */}
      <section style={{ marginBottom: 200 }}>
        <div style={{ ...S.glass }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 100, alignItems: 'center' }}>
            <div>
               <h2 style={{ fontSize: 36, fontWeight: 950, marginBottom: 32 }}>Junction Temp vs Luminous Flux</h2>
               <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.9, marginBottom: 48 }}>
                 LED의 수명과 광효율은 **정션 온도(Tj)**에 의해 결정됩니다. <br/>
                 Tj가 낮을수록 형광체 열화를 억제하여 100,000시간 이상의 L70 수명을 보장할 수 있습니다. 
                 당사는 실제 구동 상태에서 Tj를 75°C 이하로 관리하는 서멀 아키텍처를 적용하고 있습니다.
               </p>
               
               <div style={{ marginBottom: 48 }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                     <span style={{ fontWeight: 800 }}>Junction Temperature (Tj)</span>
                     <span style={{ color: junctionTemp > 80 ? '#f43f5e' : '#ec4899', fontWeight: 900 }}>{junctionTemp} °C</span>
                  </label>
                  <input 
                    type="range" 
                    min="30" 
                    max="105" 
                    value={junctionTemp} 
                    onChange={(e)=>setJunctionTemp(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: '#ec4899' }} 
                  />
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div style={{ background: '#020617', padding: 32, borderRadius: 24, textAlign: 'center' }}>
                     <div style={{ fontSize: 12, color: '#64748b' }}>FLUX MAINTENANCE (Expected)</div>
                     <div style={{ fontSize: 32, fontWeight: 950, color: '#fff' }}>{getLumenMaintenance(junctionTemp)}%</div>
                  </div>
                  <div style={{ background: '#020617', padding: 32, borderRadius: 24, textAlign: 'center' }}>
                     <div style={{ fontSize: 12, color: '#64748b' }}>EFFICACY</div>
                     <div style={{ fontSize: 32, fontWeight: 950, color: '#10b981' }}>184 lm/W (Ch.)</div>
                  </div>
               </div>
            </div>

            <div style={{ background: '#020617', padding: 56, borderRadius: 48, border: '1px solid rgba(236, 72, 153, 0.2)' }}>
               <Sparkles size={48} color="#ec4899" style={{ marginBottom: 32 }} />
               <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>Core Optic Metrics</h3>
               <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <CheckPoint title="SDCM < 3 (MacAdam Ellipse)" desc="동일 생산 로트 내 전구 간의 색좌표 오차를 육안으로 식별 불가한 수준으로 관리" />
                  <CheckPoint title="CRI Ra > 80 / R9 > 0" desc="산업 현장의 시인성 확보를 위한 고연색 지수 확보 및 붉은색 재현력 최적화" />
                  <CheckPoint title="9V High-Drive Structure" desc="고전압 저전류 구동을 통해 회로 손실을 줄이고 발광 균일도를 극대화" />
                  <CheckPoint title="Gold-Wire Bonding" desc="고순도 Aurum-wire 본딩을 통해 열충격에 의한 오픈 불량을 0%로 수렴" />
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL ARCHIVE */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 200 }}>
         <DataCard 
            icon={Database} 
            title="LM-80 TM-21 Reporting" 
            desc="IESNA 규격에 따른 실측 데이터를 바탕으로 TM-21 외삽법을 적용하여, 실사용 환경에서 105,000시간 이상의 잔존 광속을 보증합니다." 
         />
         <DataCard 
            icon={FlaskConical} 
            title="Phosphor Engineering" 
            desc="고내열성 형광체 배합을 통해 초기 광학 특성의 변위(Shift)를 억제하고, 청색광 유해성(Blue light hazard) 안전 등급 RG1을 획득하였습니다." 
         />
         <DataCard 
            icon={Maximize2} 
            title="Beam Angle Control" 
            desc="광원의 지향각을 120°로 설계하여 배광 렌즈와의 결합 시 광학적 손실을 3% 이하로 억제하는 정밀 패키지 구조를 가집니다." 
         />
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.8em', fontWeight: 950 }}>PHOTONIC SEMICONDUCTOR RELIABILITY STANDARD</p>
      </footer>
    </div>
  );
}

function CheckPoint({ title, desc }: any) {
  return (
    <li style={{ display: 'flex', gap: 16 }}>
       <CheckCircle2 size={24} color="#ec4899" style={{ flexShrink: 0, marginTop: 4 }} />
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
       <div style={{ color: '#ec4899', marginBottom: 24 }}><Icon size={32} /></div>
       <h4 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>{title}</h4>
       <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}
