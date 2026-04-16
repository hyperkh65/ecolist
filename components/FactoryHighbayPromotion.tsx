'use client';
import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Download, 
  Activity,
  Wind,
  Zap,
  Microscope,
  Box,
  Eye,
  TrendingUp,
  Settings,
  HardDrive,
  CheckCircle2
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Player } from '@remotion/player';
import { HighbaySequence } from './HighbayRemotion';

const S = {
  container: { background: '#000000', color: '#f8fafc', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' as const },
  section: { maxWidth: 1400, margin: '0 auto', padding: '160px 24px', position: 'relative' as const },
  label: { fontSize: 14, fontWeight: 900, color: '#0ea5e9', letterSpacing: 6, marginBottom: 24, display: 'block', textTransform: 'uppercase' as const },
  title: { fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 950, marginBottom: 40, letterSpacing: '-0.05em', lineHeight: 1.05 },
  text: { color: '#94a3b8', fontSize: 20, lineHeight: 1.8, marginBottom: 48, maxWidth: 800 },
  glass: { background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 40, padding: 48 },
  glow: { position: 'absolute' as const, borderRadius: '50%', filter: 'blur(120px)', zIndex: 0 }
};

const ProductNukki = ({ src, size = 600, glowColor = 'rgba(14, 165, 233, 0.15)', delay = 0 }: { src: string, size?: number, glowColor?: string, delay?: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay }}
      viewport={{ once: true }}
      style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ ...S.glow, width: size * 1.2, height: size * 1.2, background: glowColor, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      <div style={{ 
        width: '100%', 
        height: '100%', 
        borderRadius: '50%', 
        overflow: 'hidden',
        position: 'relative',
        // 정교한 누끼 효과를 위한 다중 마스킹
        maskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.8) 65%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.8) 65%, transparent 90%)',
        // 암부 디테일을 살리는 인셋 섀도우
        boxShadow: '0 0 80px rgba(0,0,0,0.8) inset, 0 0 120px rgba(14, 165, 233, 0.1)'
      }}>
        <img src={src} style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          filter: 'contrast(1.05) brightness(1.02)' // 제품 선명도 향상
        }} alt="Product" />
      </div>
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: '50%', pointerEvents: 'none' }} 
      />
    </motion.div>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: 32, border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }}
       onMouseEnter={e => e.currentTarget.style.background = 'rgba(14, 165, 233, 0.05)'}
       onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
    <Icon color="#0ea5e9" size={40} style={{ marginBottom: 24 }} />
    <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16 }}>{title}</h3>
    <p style={{ color: '#64748b', lineHeight: 1.7 }}>{desc}</p>
  </div>
);

export default function FactoryHighbayPromotion() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div style={S.container}>
      
      {/* 1. HERO SHOT (NUKKI STYLE) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #0f172a 0%, #000 70%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1400, width: '100%', padding: '0 24px', alignItems: 'center', gap: 60 }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <span style={S.label}>Master Engineering v2.0</span>
            <h1 style={S.title}>UFO-AM6 <br/><span style={{ color: '#0ea5e9' }}>140lm/W</span> Highbay</h1>
            <p style={S.text}>
              단순한 전등을 넘어선 산업용 정밀 기계. <br/>
              서울반도체 SSC 엔진과 필립스 Xitanium의 완벽한 조화로 <br/>
              18m 최정상급 높이에서의 조도를 정복합니다.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
               <button style={{ padding: '20px 40px', background: '#0ea5e9', color: '#000', borderRadius: 100, fontWeight: 900, border: 'none', fontSize: 16, cursor: 'pointer' }}>지금 상담하기</button>
               <button style={{ padding: '20px 40px', background: 'transparent', color: '#fff', borderRadius: 100, fontWeight: 900, border: '1px solid rgba(255,255,255,0.2)', fontSize: 16, cursor: 'pointer' }}>데이터 시트</button>
            </div>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProductNukki src="/promotion_assets/gallery/gallery_005.jpeg" size={650} glowColor="rgba(14, 165, 233, 0.2)" />
          </div>
        </div>
      </section>

      {/* 2. BLACK SENSOR CAP DEEP DIVE */}
      <section style={{ ...S.section, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '-10%', width: 800, height: 800, background: 'rgba(14, 165, 233, 0.05)', borderRadius: '50%', filter: 'blur(150px)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 100, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
             <ProductNukki src="/promotion_assets/gallery/gallery_006.jpeg" size={600} glowColor="rgba(255,255,255,0.05)" delay={0.3} />
             <div style={{ position: 'absolute', bottom: 40, right: 40, ...S.glass, padding: '20px 32px' }}>
                <div style={{ fontSize: 14, color: '#0ea5e9', fontWeight: 900, marginBottom: 4 }}>K-EXCLUSIVE</div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>Premium Black Matte</div>
             </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={S.label}>Korea Design Identity</span>
            <h2 style={{ ...S.title, fontSize: 56 }}>한국 전용 블랙 캡,<br/>공간을 완성하는 디테일</h2>
            <p style={S.text}>
              글로벌 공용 화이트 캡의 단조로움을 탈피했습니다. <br/>
              한국 고천장 환경의 높은 조도 반사를 억제하고, <br/>
              산업 현장의 오염에도 처음 같은 청결함을 유지하는 <br/>
              **YNK 독점 매트 블랙 센서 엔진**을 탑재했습니다.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
               <div style={{ borderLeft: '4px solid #0ea5e9', paddingLeft: 20 }}>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>100%</div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>Design Satisfaction</div>
               </div>
               <div style={{ borderLeft: '4px solid #0ea5e9', paddingLeft: 20 }}>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>Anti-Pollution</div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>Matte Finish Tech</div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. 18M HEIGHT REALITY (BLEND MODE) */}
      <section style={{ background: '#000', padding: '160px 0' }}>
         <div style={S.section}>
            <div style={{ textAlign: 'center', marginBottom: 120 }}>
               <span style={S.label}>Unreachable performance</span>
               <h2 style={S.title}>현장에서 증명된<br/><span style={{ color: '#0ea5e9' }}>18M 감지의 혁신</span></h2>
            </div>
            
            <div style={{ position: 'relative', width: '100%', height: 600, borderRadius: 60, overflow: 'hidden' }}>
               <img src="/promotion_assets/gallery/gallery_016.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #000, transparent 40%, rgba(0,0,0,0.8))' }} />
               <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center', padding: 60, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', borderRadius: 1000, border: '1px solid rgba(255,255,255,0.1)' }}>
                     <div style={{ fontSize: 120, fontWeight: 950, color: '#0ea5e9', lineHeight: 1 }}>18M</div>
                     <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 10 }}>SENSING RANGE</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. CORE ENGINEERING TIERS */}
      <section style={S.section}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            <FeatureItem icon={Cpu} title="SSC Engine" desc="Seoul Semiconductor 2835 9V 팩토리 칩셋. 10만 시간 수명을 보장하는 LM-80 가속 테스트 완료." />
            <FeatureItem icon={Zap} title="Philips Logic" desc="Xitanium RHB 드라이버의 서지 보호 알고리즘. 불안정한 전압에서도 일정한 광속을 유지합니다." />
            <FeatureItem icon={Activity} title="Microwave 5.8GHz" desc="사람과 기계의 미세 움직임을 정밀 분석하는 디지털 필터링 기술로 오작동을 차단합니다." />
         </div>
         
         <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
            <div style={{ ...S.glass, position: 'relative', overflow: 'hidden' }}>
               <h3 style={{ fontSize: 32, fontWeight: 950, marginBottom: 24 }}>Thermal Management</h3>
               <p style={S.text}>ADC12 하우징을 통한 에어로다이나믹 패시브 쿨링. 상단 오기 배출구를 통해 뜨거운 공기를 즉각 배출하여 칩셋 부하를 최소화합니다.</p>
               <img src="/promotion_assets/gallery/gallery_001.jpeg" style={{ position: 'absolute', right: -100, top: -50, width: 400, opacity: 0.2, maskImage: 'linear-gradient(to left, black, transparent)' }} />
            </div>
            <div style={{ ...S.glass, background: '#0ea5e9', color: '#000' }}>
               <h3 style={{ fontSize: 32, fontWeight: 950, marginBottom: 24 }}>IP65 Sealed</h3>
               <p style={{ fontWeight: 600, fontSize: 18 }}>먼지, 수분, 고압 분사로부터 자유로운 완전 밀폐형 가스켓 시스템.</p>
               <div style={{ marginTop: 40, fontSize: 60, fontWeight: 950 }}>READY</div>
            </div>
         </div>
      </section>

      {/* 5. DYNAMIC DATA OVERLAY */}
      <section style={{ height: '80vh', position: 'relative', display: 'flex', alignItems: 'center' }}>
         <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <Player component={HighbaySequence} durationInFrames={300} compositionWidth={1920} compositionHeight={1080} fps={30} style={{ width: '100%', height: '100%' }} autoPlay muted loop />
         </div>
         <div style={{ ...S.section, zIndex: 10 }}>
            <div style={{ maxWidth: 600 }}>
               <span style={S.label}>Real-time Tech Scan</span>
               <h2 style={S.title}>데이터로<br/>증명되는 가치</h2>
               <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
                  {[
                     { label: 'System Luminous Efficacy', val: '145 lm/W' },
                     { label: 'Power Factor (PF)', val: '0.98' },
                     { label: 'Total Harmonic Distortion', val: '< 10%' }
                  ].map((d, i) => (
                     <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>
                        <span style={{ color: '#94a3b8' }}>{d.label}</span>
                        <span style={{ fontWeight: 900, color: '#0ea5e9' }}>{d.val}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 6. TECHNICAL ASSET GALLERY (NUKKI MASONRY) */}
      <section style={S.section}>
         <div style={{ textAlign: 'center', marginBottom: 100 }}>
            <span style={S.label}>Visual Verification</span>
            <h2 style={S.title}>정밀 현장 분석</h2>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[10, 11, 12, 13, 14, 15, 17].map(num => (
               <motion.div key={num} whileHover={{ y: -10 }} style={{ ...S.glass, padding: 0, overflow: 'hidden', maskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}>
                  <img src={`/promotion_assets/gallery/gallery_0${num}.jpeg`} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', opacity: 0.7 }} />
               </motion.div>
            ))}
            <div style={{ ...S.glass, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
               <Box size={48} color="#0ea5e9" />
               <div style={{ fontWeight: 900 }}>MORE ASSETS IN DOCS</div>
            </div>
         </div>
      </section>

      <footer style={{ padding: '120px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
         <h2 style={{ fontSize: 32, fontWeight: 950, marginBottom: 32 }}>YNK ENGINEERING LAB</h2>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 60 }}>
            <div style={{ textAlign: 'center' }}>
               <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>REVISION</div>
               <div style={{ fontWeight: 900 }}>V2.4_2026</div>
            </div>
            <div style={{ textAlign: 'center' }}>
               <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>COMPLIANCE</div>
               <div style={{ fontWeight: 900 }}>KC / CE / ROHS</div>
            </div>
         </div>
         <p style={{ color: '#475569', fontSize: 14, maxWidth: 800, margin: '0 auto', lineHeight: 2 }}>
            모든 기술 데이터는 시뮬레이션이 아닌 실제 18m 현장 테스트 결과를 기반으로 합니다. <br/>
            한국 전용 블랙 사양 모델은 오직 YNK 공식 파트너를 통해서만 공급됩니다. <br/>
            © 2026 YNK Engineering. All Rights Reserved.
         </p>
      </footer>

    </div>
  );
}
