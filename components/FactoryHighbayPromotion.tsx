'use client';
import React, { useRef } from 'react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  Activity, 
  BarChart3, 
  Eye, 
  Maximize2,
  Settings,
  HardDrive,
  CheckCircle2,
  ArrowDownCircle,
  Thermometer,
  Waves,
  Ruler
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import HighbayRemotion from './HighbayRemotion';

const S = {
  container: {
    background: '#000000',
    color: '#ffffff',
    fontFamily: '"Inter", sans-serif',
    overflowX: 'hidden' as const
  },
  glass: {
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: 32
  },
  title: {
    fontSize: 'clamp(50px, 8vw, 120px)',
    fontWeight: 950,
    letterSpacing: '-0.05em',
    lineHeight: 0.85,
    margin: 0
  },
  sectionTitle: {
    fontSize: 'clamp(32px, 4vw, 64px)',
    fontWeight: 900,
    letterSpacing: '-0.03em',
    marginBottom: 40,
    color: '#f8fafc'
  }
};

const ProductNukki = ({ src, size = 600, glowColor = 'rgba(14, 165, 233, 0.2)' }: { src: string, size?: number, glowColor?: string }) => (
  <div style={{ position: 'relative', width: size, height: size, zIndex: 5 }}>
    <motion.div 
      animate={{ 
        boxShadow: [`0 0 60px ${glowColor}`, `0 0 120px ${glowColor}`, `0 0 60px ${glowColor}`] 
      }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '90%', 
        height: '90%', 
        borderRadius: '50%', 
        background: 'transparent',
        zIndex: -1
      }}
    />
    <div style={{ 
      width: '100%', 
      height: '100%', 
      borderRadius: '50%', 
      overflow: 'hidden',
      position: 'relative',
      maskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.8) 70%, transparent 95%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.8) 70%, transparent 95%)',
      boxShadow: '0 0 100px rgba(0,0,0,0.9) inset'
    }}>
      <img src={src} style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        filter: 'contrast(1.1) brightness(1.05)'
       }} alt="Product" />
    </div>
  </div>
);

const SpecRow = ({ label, value, unit }: { label: string, value: string, unit?: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <span style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>{label}</span>
    <span style={{ color: '#f8fafc', fontSize: 18, fontWeight: 800 }}>{value} <span style={{ color: '#0ea5e9', fontSize: 14 }}>{unit}</span></span>
  </div>
);

export default function FactoryHighbayPromotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div style={S.container} ref={containerRef}>
      
      {/* 1. HERO SECTION: 웅장한 본체 샷 */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative',
        padding: '100px 40px',
        overflow: 'hidden'
      }}>
        {/* 거대한 배경 텍스트 */}
        <div style={{ position: 'absolute', top: '10%', whiteSpace: 'nowrap', opacity: 0.03, fontSize: '25vw', fontWeight: 900, pointerEvents: 'none' }}>
          INDUSTRIAL APEX
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          style={{ textAlign: 'center', zIndex: 10, marginBottom: 60 }}
        >
          <div style={{ display: 'inline-block', padding: '8px 24px', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', fontSize: 14, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.3em' }}>
            ENGINEERING EXCELLENCE
          </div>
          <h1 style={S.title}>
            UFO-AM6 <span style={{ color: '#0ea5e9' }}>150W</span>
          </h1>
          <p style={{ fontSize: 28, color: '#94a3b8', marginTop: 24, letterSpacing: '0.4em', fontWeight: 200 }}>
            LUMINOUS FLUX CONTROL SYSTEM
          </p>
        </motion.div>

        {/* 메인 제품 샷: 존재하는 파일로 연결 (gallery_010.jpeg) */}
        <ProductNukki src="/promotion_assets/gallery/gallery_010.jpeg" size={Math.min(800, 900)} />
        
        <div style={{ position: 'absolute', bottom: 60, textAlign: 'center' }}>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ color: '#0ea5e9', marginBottom: 12 }}
          >
            <ArrowDownCircle size={32} />
          </motion.div>
          <div style={{ color: '#475569', fontSize: 13, letterSpacing: '0.4em' }}>SCROLL TO EXPLORE SPECS</div>
        </div>
      </section>

      {/* 2. 핵심 기술 영상 브리핑 */}
      <section style={{ padding: '160px 0', background: '#050505', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: 80, textAlign: 'center' }}>
            <h2 style={S.sectionTitle}>Field Intelligence</h2>
            <p style={{ color: '#64748b', fontSize: 20 }}>실제 공장 환경에서의 18m 조도 시뮬레이션 데이터</p>
          </div>
          <div style={{ borderRadius: 48, overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 50px 100px -20px rgba(0,0,0,1)', background: '#000' }}>
            <HighbayRemotion />
          </div>
        </div>
      </section>

      {/* 3. 무한 스크롤 기술 사양 섹션 (그리드로 상세 확장) */}
      <section style={{ padding: '160px 0', background: '#000' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={S.sectionTitle}>Key Factors <span style={{ color: '#0ea5e9', fontSize: 24 }}>/ Technical Data Sheet</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 100, marginTop: 100 }}>
            {/* 왼쪽: 고해상도 제품 디테일 (gallery_013.jpeg) */}
            <div>
              <div style={{ position: 'sticky', top: 100 }}>
                <ProductNukki src="/promotion_assets/gallery/gallery_013.jpeg" size={600} glowColor="rgba(14, 165, 233, 0.1)" />
                <div style={{ marginTop: 60, ...S.glass, padding: 40 }}>
                   <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Engineering Summary</div>
                   <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                     YNK의 공장등은 단순 외형을 넘어 광학적 산란을 억제하고 
                     수동 냉각 구조를 극대화하여 100,000시간 이상의 
                     구동 안정성을 확보한 산업용 머신입니다.
                   </p>
                </div>
              </div>
            </div>

            {/* 오른쪽: 방대한 데이터 시트 */}
            <div>
              <div style={{ marginBottom: 100 }}>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Zap color="#0ea5e9" size={32} /> Electrical Architecture
                </h3>
                <SpecRow label="Nominal Power Cons." value="150" unit="Watts" />
                <SpecRow label="Input Voltage Range" value="100 ~ 305" unit="V AC" />
                <SpecRow label="Power Factor (PF)" value="> 0.98" unit="@ Full Load" />
                <SpecRow label="THD (Total Harmonic Dist.)" value="< 10%" unit="%" />
                <SpecRow label="Driver Protection" value="6kV / 10kV" unit="Surge Resistance" />
                <SpecRow label="Driver Life Expectancy" value="50,000" unit="Hours" />
              </div>

              <div style={{ marginBottom: 100 }}>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Eye color="#0ea5e9" size={32} /> Luminous & Optical Specs
                </h3>
                <SpecRow label="Luminous Flux (Output)" value="21,000" unit="Lumens" />
                <SpecRow label="Luminous Efficacy" value="140" unit="lm/W" />
                <SpecRow label="CCT (Color Temp.)" value="5700" unit="K (Daylight)" />
                <SpecRow label="CRI (Color Rendering)" value="> 80" unit="Ra" />
                <SpecRow label="Beam Distribution" value="120" unit="Degrees" />
                <SpecRow label="Light Engine" value="Seoul Semi" unit="SSC 2835" />
              </div>

              <div style={{ marginBottom: 100 }}>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Maximize2 color="#0ea5e9" size={32} /> Physical Construction
                </h3>
                <SpecRow label="Housing Material" value="ADC12" unit="Die-Cast Alum." />
                <SpecRow label="Outer Diameter" value="260" unit="mm" />
                <SpecRow label="Total Height" value="185" unit="mm" />
                <SpecRow label="Body Finish" value="Powder Coated" unit="Dark Gray" />
                <SpecRow label="Net Weight" value="3.8" unit="kg" />
                <SpecRow label="Ingress Protection" value="IP65" unit="Waterproof" />
              </div>

              <div style={{ marginBottom: 100 }}>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Waves color="#0ea5e9" size={32} /> Sensing & Intelligence
                </h3>
                <SpecRow label="Sensor Frequency" value="5.8" unit="GHz Microwave" />
                <SpecRow label="Max Mounting Height" value="18" unit="Meters" />
                <SpecRow label="Detection Range" value="15" unit="Meters Radius" />
                <SpecRow label="Hold Time" value="30s ~ 10min" unit="Adjustable" />
                <SpecRow label="Dimming Logic" value="0-100%" unit="Seamless" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BLACK SIGNATURE (The Cap Detail) - gallery_018.png 적용 */}
      <section style={{ padding: '200px 0', background: 'radial-gradient(circle at center, #0a0a0a 0%, #000 70%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ marginBottom: 100 }}>
            <span style={{ color: '#0ea5e9', fontSize: 16, fontWeight: 900, letterSpacing: '0.4em' }}>K-EXCLUSIVE SIGNATURE</span>
            <h2 style={{ fontSize: 80, fontWeight: 950, marginTop: 24, letterSpacing: '-0.04em' }}>The Black Cap</h2>
            <p style={{ color: '#64748b', fontSize: 22, maxWidth: 800, margin: '32px auto 0', lineHeight: 1.8 }}>
              화이트 위주의 범용 센서 캡을 거부합니다. 
              국내 프리미엄 시장을 위해 특수 제작된 매트 블랙 센서 캡은 
              공장등 본체와의 완벽한 시각적 일체감을 완성합니다.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
             <ProductNukki src="/promotion_assets/gallery/gallery_018.png" size={600} glowColor="rgba(255,255,255,0.03)" />
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </section>

      {/* 5. CLEAN FINAL GALLERY (선별된 고화질 사진만) */}
      <section style={{ padding: '160px 0', background: '#050505' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: 80, textAlign: 'center' }}>
            <h2 style={S.sectionTitle}>Precision in Action</h2>
            <p style={{ color: '#64748b' }}>현장의 조도를 정복한 실제 적용 사례</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div style={{ borderRadius: 40, overflow: 'hidden', border: '1px solid #1e293b' }}>
              <img src="/promotion_assets/gallery/gallery_009.jpeg" style={{ width: '100%', height: 600, objectFit: 'cover' }} alt="Detail 1" />
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 40 }}>
              <div style={{ borderRadius: 40, overflow: 'hidden', border: '1px solid #1e293b' }}>
                <img src="/promotion_assets/gallery/gallery_011.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Detail 2" />
              </div>
              <div style={{ borderRadius: 40, overflow: 'hidden', border: '1px solid #1e293b' }}>
                <img src="/promotion_assets/gallery/gallery_016.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Detail 3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '160px 24px', textAlign: 'center', background: '#000', borderTop: '1px solid #111' }}>
         <h2 style={{ fontSize: 32, fontWeight: 950, marginBottom: 32, letterSpacing: '0.2em' }}>YNK ENGINEERING LAB</h2>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 60, marginBottom: 60, color: '#475569', fontSize: 13 }}>
            <span>CAD ANALYSIS</span>
            <span>THERMAL SIMULATION</span>
            <span>LM-80 CERTIFIED</span>
         </div>
         <p style={{ color: '#1e293b', fontSize: 12 }}>© 2026 YNK LIGHTING ARCHITECTURE. THE APEX OF INDUSTRIAL LIGHTING.</p>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { margin: 0; background: #000; }
      `}</style>
    </div>
  );
}
