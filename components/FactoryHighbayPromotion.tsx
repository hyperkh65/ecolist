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
  Ruler,
  Terminal,
  Box
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
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
    backdropFilter: 'blur(40px)',
    border: '1px solid rgba(14, 165, 233, 0.1)',
    borderRadius: 32,
    padding: 60
  },
  title: {
    fontSize: 'clamp(50px, 10vw, 160px)',
    fontWeight: 950,
    letterSpacing: '-0.07em',
    lineHeight: 0.8,
    margin: 0,
    color: '#f8fafc'
  },
  accentTitle: {
    fontSize: 'clamp(32px, 5vw, 80px)',
    fontWeight: 900,
    letterSpacing: '-0.04em',
    color: '#0ea5e9',
    marginBottom: 20
  }
};

const AnimatedSpec = ({ label, value, unit, delay = 0 }: { label: string, value: string, unit: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      style={{ padding: '40px 0', borderBottom: '1px solid rgba(14, 165, 233, 0.2)' }}
    >
      <div style={{ fontSize: 14, color: '#0ea5e9', fontWeight: 900, letterSpacing: '0.2em', marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 64, fontWeight: 950, color: '#f8fafc', letterSpacing: '-0.03em' }}>
        {value} <span style={{ fontSize: 24, fontWeight: 300, color: '#64748b' }}>{unit}</span>
      </div>
    </motion.div>
  );
};

const ContentBlock = ({ subtitle, title, text, icon: Icon }: { subtitle: string, title: string, text: string, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    style={{ marginBottom: 200 }}
  >
    <div style={{ color: '#0ea5e9', marginBottom: 24 }}><Icon size={48} /></div>
    <div style={{ fontSize: 14, color: '#64748b', fontWeight: 900, letterSpacing: '0.4em', marginBottom: 16 }}>{subtitle}</div>
    <h3 style={{ fontSize: 64, fontWeight: 900, marginBottom: 32, letterSpacing: '-0.04em' }}>{title}</h3>
    <p style={{ fontSize: 24, color: '#94a3b8', lineHeight: 1.6, maxWidth: 800, fontWeight: 300 }}>{text}</p>
  </motion.div>
);

export default function FactoryHighbayPromotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <div style={S.container} ref={containerRef}>
      
      {/* 1. KINETIC HERO: 텍스트 애니메이션 중심 */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          style={{ position: 'absolute', opacity: 0.05, top: '20%' }}
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <h1 style={{ fontSize: '40vw', fontWeight: 950, whiteSpace: 'nowrap' }}>NEXT-GEN SYSTEM</h1>
        </motion.div>

        <div style={{ zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <h1 style={S.title}>UFO-AM6</h1>
            <h2 style={S.accentTitle}>INTELLIGENT FLUX</h2>
            <div style={{ width: 200, height: 2, background: '#0ea5e9', margin: '40px auto' }} />
            <p style={{ fontSize: 20, color: '#94a3b8', letterSpacing: '0.5em', fontWeight: 200 }}>MOTION DRIVEN ARCHITECTURE</p>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: 60, color: '#0ea5e9' }}
        >
          <ArrowDownCircle size={40} />
        </motion.div>
      </section>

      {/* 2. CORE VIDEO: 리모션 브리핑 (고정된 느낌으로 임팩트) */}
      <section style={{ padding: '100px 0', background: '#000' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: 100, textAlign: 'center' }}>
            <h2 style={{ fontSize: 18, color: '#0ea5e9', fontWeight: 900, letterSpacing: '0.8em', marginBottom: 20 }}>REAL-TIME ANALYSIS</h2>
            <h3 style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.02em' }}>데이터가 증명하는 최상의 조도</h3>
          </div>
          <div style={{ 
            borderRadius: 60, 
            overflow: 'hidden', 
            border: '2px solid rgba(14, 165, 233, 0.2)',
            boxShadow: '0 0 100px rgba(14, 165, 233, 0.1)',
            background: '#000'
          }}>
            <HighbayRemotion />
          </div>
        </div>
      </section>

      {/* 3. SCROLL ACTION REVEAL: 데이터가 쏟아지는 기술 사양 */}
      <section style={{ padding: '200px 0', position: 'relative' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 160 }}>
            
            {/* 왼쪽: 설명 텍스트 블록들 */}
            <div>
              <ContentBlock 
                icon={Cpu}
                subtitle="PROCESSING UNIT"
                title="SSC Optical Engine"
                text="서울반도체 2835 프리미엄 9V 티어 칩셋 적용. lm/W 효율 극대화를 통해 전력 소모 대비 압도적인 광량을 산출합니다. LM-80 리포트에 기반한 10만 시간 이상의 긴 수명을 보장합니다."
              />
              <ContentBlock 
                icon={Settings}
                subtitle="POWER LOGIC"
                title="Philips Xitanium™"
                text="필립스의 하이엔드 드라이버 'Xitanium' 탑재. 6kV/10kV 이상의 서지 보호 회로와 95.2%의 고효율 전력 변환으로 어떠한 전기적 악조건에서도 안정적인 구동을 유지합니다."
              />
              <ContentBlock 
                icon={Activity}
                subtitle="THERMAL CONTROL"
                title="ADC12 Passive Cooling"
                text="불순물을 최소화한 고순도 ADC12 알루미늄 다이캐스팅 하우징. 공기역학적 에어플로우 설계를 통해 LED 칩셋의 열을 수동적으로 최단 시간에 분산시켜 광감쇠 현상을 원천 차단합니다."
              />
              <ContentBlock 
                icon={Terminal}
                subtitle="SENSING ALGORITHM"
                title="K-Smart 18M Logic"
                text="5.8GHz 마이크로웨이브 도플러 센서와 YNK 독자 필터링 알고리즘의 결합. 18m 이상의 극한 높이에서도 정밀한 모션 감지가 가능하며, 0-100% 심리스 디밍으로 최대 80%의 에너지를 절감합니다."
              />
            </div>

            {/* 오른쪽: 액션 스펙 데이터 (스크롤에 따라 반응) */}
            <div style={{ position: 'sticky', top: 100, height: 'fit-content' }}>
              <div style={S.glass}>
                <h4 style={{ fontSize: 24, fontWeight: 900, color: '#0ea5e9', marginBottom: 60, letterSpacing: '0.2em' }}>SYSTEM PARAMETERS</h4>
                <AnimatedSpec label="MAX LUMINOUS FLUX" value="21,500" unit="lm" delay={0.1} />
                <AnimatedSpec label="SYSTEM EFFICACY" value="142" unit="lm/W" delay={0.2} />
                <AnimatedSpec label="SURGE PROTECTION" value="10,000" unit="V" delay={0.3} />
                <AnimatedSpec label="THERMAL STABILITY" value="65" unit="°C Avg" delay={0.4} />
                <AnimatedSpec label="BEAM DISTRIBUTION" value="120" unit="Deg" delay={0.5} />
                <AnimatedSpec label="INGRESS PROTECTION" value="IP65" unit="Rating" delay={0.6} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BLACK SIGNATURE (TEXT ONLY DEEP FOCUS) */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, #0a0a0a 0%, #000 100%)' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          style={{ textAlign: 'center', padding: '0 40px' }}
        >
          <span style={{ color: '#0ea5e9', fontSize: 16, fontWeight: 900, letterSpacing: '0.6em' }}>THE BLACK SIGNATURE</span>
          <h2 style={{ fontSize: '10vw', fontWeight: 950, marginTop: 40, letterSpacing: '-0.05em' }}>MATTE FINISH</h2>
          <p style={{ fontSize: 32, color: '#475569', maxWidth: 1000, margin: '40px auto', lineHeight: 1.5, fontWeight: 300 }}>
            화이트 캡의 평범함을 넘어, 산업 공간의 품격을 완성하는 단 하나의 블랙 액셀러레이터. 
            완벽한 일체형 디자인으로 엔지니어링의 미학을 완성합니다.
          </p>
        </motion.div>
      </section>

      {/* 5. DYNAMIC CALL TO ACTION: ENGINEERING DATA ACCESS */}
      <section style={{ padding: '200px 0', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '0 40px' }}>
          <Box size={80} color="#0ea5e9" style={{ margin: '0 auto 40px' }} />
          <h3 style={{ fontSize: 56, fontWeight: 900, marginBottom: 32 }}>Build Your Architecture</h3>
          <p style={{ fontSize: 20, color: '#64748b', marginBottom: 80, lineHeight: 1.8 }}>
            서울반도체, 필립스, YNK가 합작한 최강의 하이베이 솔루션. <br/>
            모든 기술 문서와 CAD 데이터는 파트너십을 통해 제공됩니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
             <button style={{ padding: '24px 60px', borderRadius: 100, border: 'none', background: '#0ea5e9', color: '#000', fontSize: 18, fontWeight: 900, cursor: 'pointer' }}>데이터 시트 다운로드</button>
             <button style={{ padding: '24px 60px', borderRadius: 100, border: '1px solid #1e293b', background: 'transparent', color: '#fff', fontSize: 18, fontWeight: 900, cursor: 'pointer' }}>기술 상담 신청</button>
          </div>
        </div>
      </section>

      <footer style={{ padding: '120px 24px', textAlign: 'center', borderTop: '1px solid #111' }}>
         <h2 style={{ fontSize: 24, fontWeight: 950, color: '#1e293b', letterSpacing: '0.4em' }}>YNK ENGINEERING LAB</h2>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { background: #000; margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; }
      `}</style>
    </div>
  );
}
