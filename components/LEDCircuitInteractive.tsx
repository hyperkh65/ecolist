'use client';
import React from 'react';
import { 
  Zap, Layers, Thermometer, Database, Settings, 
  CheckCircle2, Cpu, Ruler, Shield, Move, Maximize
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

export default function LEDCircuitInteractive() {
  return (
    <div style={{ background: '#000', color: '#fff', padding: '120px 40px', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 150 }}
      >
        <div style={{ display: 'inline-block', padding: '10px 24px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', fontSize: 13, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.4em' }}>
          PCB ARCHITECTURE & THERMAL INTERFACE
        </div>
        <h1 style={{ fontSize: '7vw', fontWeight: 950, letterSpacing: '-0.05em', color: '#f1f5f9', lineHeight: 0.9 }}>
          THERMAL <br/> <span style={{ color: '#8b5cf6' }}>PATHWAY</span>
        </h1>
        <p style={{ fontSize: 22, color: '#64748b', marginTop: 40, maxWidth: 900, margin: '40px auto', lineHeight: 1.8 }}>
          본 매뉴얼은 LED의 열을 하우징으로 전달하는 핵심 경로인 MCPCB의 설계 기준을 다룹니다. <br/>
          고전도성 절연층과 2oz 구리 박(Copper Foil) 설계를 통해 열 저항을 극소화한 정밀 회로 설계를 분석합니다.
        </p>
      </motion.div>

      {/* 2. PCB STACK-UP DETAIL */}
      <section style={{ marginBottom: 200 }}>
        <div style={{ ...S.glass }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 100, alignItems: 'center' }}>
              <div>
                  <h3 style={{ fontSize: 32, fontWeight: 950, marginBottom: 32 }}>MCPCB 적층 구조 및 물성</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                     <LayerItem label="White Solder Mask" detail="98% Reflectivity for Light Extraction" color="#fff" />
                     <LayerItem label="Copper Foil (2oz)" detail="70μm Thickness for High Current & Heat" color="#b45309" />
                     <LayerItem label="Dielectric Layer" detail="2.0 W/m·K High Thermal Conductivity" color="#1e3a8a" />
                     <LayerItem label="Aluminum Base (1.6mm)" detail="Alloy 5052 - Heat Dissipation Pillar" color="#64748b" />
                  </div>
              </div>
              <div style={{ background: '#020617', padding: 56, borderRadius: 48, border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <Thermometer size={48} color="#8b5cf6" style={{ marginBottom: 32 }} />
                  <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>신뢰성 지표 (Reliability)</h3>
                  <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24 }}>
                     <CheckPoint title="Thermal Ohms Control" desc="LED 패키지부터 알루미늄 하부까지의 열 저항을 1.2°C/W 이하로 유지" />
                     <CheckPoint title="Breakdown Voltage > 3.0kV" desc="정밀 절연층 설계를 통해 고전압 입력 시에도 쇼트 가능성 원천 차단" />
                     <CheckPoint title="UL-94 V0 Flame Rating" desc="화재 방지를 위한 최상위 난연 규격 기반 소재 채택" />
                     <CheckPoint title="Thermal Grease TIM-3" desc="하우징 결합 시 공기층을 제거하는 3.0W/m·K급 써멀 컴파운드 도포 가이드" />
                  </ul>
              </div>
           </div>
        </div>
      </section>

      {/* 3. DESIGN PRINCIPLES */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 200 }}>
         <FeatureCard 
            icon={Layers} 
            title="Pattern Geometry" 
            desc="전압 강하를 방지하기 위한 최적의 배턴 폭(Width) 설계를 적용하여, 기판 전체의 전류 균일도를 99.5% 이상으로 유지합니다." 
         />
         <FeatureCard 
            icon={Zap} 
            title="Solder Joint Integ." 
            desc="SAC305(무연납) 기준의 리플로우 프로파일 관리를 통해 열충격 시에도 냉납이나 크랙이 발생하지 않는 접합부 강성을 확보합니다." 
         />
         <FeatureCard 
            icon={Shield} 
            title="Anti-Corrosion" 
            desc="습기와 부식성 가스로부터 패턴을 보호하기 위해 수분 흡수율이 제로에 가까운 고밀도 솔더 레지스트 공정을 수행합니다." 
         />
      </section>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.8em', fontWeight: 950 }}>CIRCUIT THERMAL PATHWAY ENGINEERING</p>
      </footer>
    </div>
  );
}

function LayerItem({ label, detail, color }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: 20, background: '#020617', borderRadius: 16, borderLeft: `6px solid ${color}` }}>
       <div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{label}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{detail}</div>
       </div>
    </div>
  );
}

function CheckPoint({ title, desc }: any) {
  return (
    <li style={{ display: 'flex', gap: 16 }}>
       <CheckCircle2 size={24} color="#8b5cf6" style={{ flexShrink: 0, marginTop: 4 }} />
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
       <div style={{ color: '#8b5cf6', marginBottom: 24 }}><Icon size={32} /></div>
       <h4 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>{title}</h4>
       <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}
