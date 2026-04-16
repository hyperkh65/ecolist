'use client';
import React, { useState } from 'react';
import { 
  Dna, Shield, Thermometer, Wind, Zap, Layers, 
  Settings, CheckCircle2, FlaskConical, Beaker,
  Droplets, Sun, Ruler, BarChart4
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

export default function MaterialManualInteractive() {
  const [material, setMaterial] = useState('adc12');

  const specs = {
    adc12: {
      title: 'ADC12 Die-Casting Aluminum',
      desc: '우수한 열 전도율과 정밀 치수 안정성을 가진 고강도 알루미늄 합금입니다.',
      thermal: '96 W/m·K',
      corrosion: '염수 분무 테스트 1,000시간 패스',
      strength: '250 MPa',
      usage: '등기구 하우징, 히트싱크, 브래킷'
    },
    pc: {
      title: 'Outdoor PC (Polycarbonate)',
      desc: '자외선 안정제가 강화된 고성능 엔지니어링 플라스틱입니다.',
      thermal: '0.2 W/m·K',
      corrosion: 'UV 저항성 (Yellowing 5년 보증)',
      strength: 'IK10 충격 등급',
      usage: '광학 렌즈, 센서 커버, 보호 쉘'
    }
  };

  const selectedSpec = material === 'adc12' ? specs.adc12 : specs.pc;

  return (
    <div style={{ background: '#000', color: '#fff', padding: '120px 40px', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 150 }}
      >
        <div style={{ display: 'inline-block', padding: '10px 24px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: 13, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.4em' }}>
          ADVANCED MATERIAL SCIENCE
        </div>
        <h1 style={{ fontSize: '7vw', fontWeight: 950, letterSpacing: '-0.05em', color: '#f1f5f9', lineHeight: 0.9 }}>
          DURABILITY <br/> <span style={{ color: '#38bdf8' }}>ENGINEERING</span>
        </h1>
        <p style={{ fontSize: 22, color: '#64748b', marginTop: 40, maxWidth: 900, margin: '40px auto', lineHeight: 1.8 }}>
          가혹한 실외 환경에서 20년 이상의 수명을 보장하기 위한 하이테크 소재 분석 매뉴얼입니다.
          금속 합금의 부식 보호 메커니즘과 고분자 화합물의 분자 구조 안정성을 기반으로 설계되었습니다.
        </p>
      </motion.div>

      {/* 2. MATERIAL SELECTOR & ANALYSIS */}
      <section style={{ marginBottom: 200 }}>
        <div style={{ ...S.glass }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 60 }}>
            {['adc12', 'pc'].map(id => (
              <button 
                key={id}
                onClick={() => setMaterial(id)}
                style={{ 
                  padding: '20px 48px', 
                  borderRadius: 20, 
                  border: material === id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  background: material === id ? '#38bdf8' : 'transparent',
                  color: material === id ? '#000' : '#fff',
                  fontWeight: 950,
                  fontSize: 18,
                  cursor: 'pointer'
                }}
              >
                {id.toUpperCase()} ANALYSIS
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
            <motion.div 
              key={material}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 style={{ fontSize: 48, fontWeight: 950, color: '#f8fafc', marginBottom: 24 }}>{selectedSpec.title}</h2>
              <p style={{ fontSize: 20, color: '#94a3b8', lineHeight: 1.8, marginBottom: 48 }}>{selectedSpec.desc}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <SpecItem label="Thermal Cond." val={selectedSpec.thermal} />
                <SpecItem label="Corrosion Res." val={selectedSpec.corrosion} />
                <SpecItem label="Tensile Strength" val={selectedSpec.strength} />
                <SpecItem label="Application" val={selectedSpec.usage} />
              </div>
            </motion.div>

            <div style={{ background: '#020617', padding: 48, borderRadius: 32, border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              <FlaskConical size={48} color="#38bdf8" style={{ marginBottom: 32 }} />
              <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>신뢰성 테스트 프로세스</h3>
              <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
                 <CheckLine text="ASTM B117 염수 분무 시험 1,000시간 (부식 침투 깊이 < 0.1mm)" />
                 <CheckLine text="-40°C ~ 80°C 열충격 사이클 테스트 200회 반복" />
                 <CheckLine text="Quv Weatherometer 가속 내후성 시험 3,000시간" />
                 <CheckLine text="정전 분체 도장 (AkzoNobel Grade) 도막 두께 80~120μm" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEEP TECHNICAL SECTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 200 }}>
         <FeatureCard 
            icon={Thermometer} 
            title="Heat Management" 
            desc="ADC12의 최적화된 마그네슘 함량은 주조성뿐만 아니라 LED 패키지에서 발생하는 열을 하우징 전체로 분산시키는 최적의 격자 구조를 형성합니다." 
         />
         <FeatureCard 
            icon={Sun} 
            title="UV Stabilization" 
            desc="PC 소재 내부의 UV 흡수제(UVA) 배합은 태양광 노출 시 폴리머 사슬의 파괴를 억제하여 고투과율을 영구적으로 유지하도록 돕습니다." 
         />
         <FeatureCard 
            icon={Shield} 
            title="Surface Protection" 
            desc="화성 처리 후 진행되는 폴리에스테르 분체 도장은 산성비와 해안가 염해 환경으로부터 내부 금속 기재를 완벽하게 격리합니다." 
         />
      </div>

      <footer style={{ textAlign: 'center', padding: '100px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.8em', fontWeight: 950 }}>CERTIFIED INDUSTRIAL MATERIAL DATA SHEET</p>
      </footer>
    </div>
  );
}

function SpecItem({ label, val }: any) {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
       <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
       <div style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc' }}>{val}</div>
    </div>
  );
}

function CheckLine({ text }: any) {
  return (
    <li style={{ display: 'flex', gap: 12, color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>
       <CheckCircle2 size={18} color="#38bdf8" style={{ flexShrink: 0 }} /> {text}
    </li>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div style={S.glass}>
       <div style={{ color: '#38bdf8', marginBottom: 24 }}><Icon size={32} /></div>
       <h4 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>{title}</h4>
       <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}
