'use client';
import React from 'react';
import FactoryHighbayPromotion from '@/components/FactoryHighbayPromotion';
import SolarManualRemotion from '@/components/SolarManualRemotion';
import SolarPanelManualInteractive from '@/components/SolarPanelManualInteractive';
import MaterialManualInteractive from '@/components/MaterialManualInteractive';
import MoldManualInteractive from '@/components/MoldManualInteractive';
import SmartSMPSManual from '@/components/SmartSMPSManual';
import LEDChipManualInteractive from '@/components/LEDChipManualInteractive';
import LEDCircuitInteractive from '@/components/LEDCircuitInteractive';
import ControllerManualInteractive from '@/components/ControllerManualInteractive';
import BatteryManualInteractive from '@/components/BatteryManualInteractive';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ShieldCheck, Database, HardHat, FileText } from 'lucide-react';

export default function TechArchivePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: '#fbbf24',
          transformOrigin: '0%',
          zIndex: 1000,
          scaleX
        }}
      />

      {/* 1. Main Promotion (Cinematic Intro) */}
      <section id="ufo-150w">
        <FactoryHighbayPromotion />
      </section>

      {/* 2. Visual Case Study (Remotion Video Manual) */}
      <section style={{ padding: '100px 40px', background: '#020617' }}>
         <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ fontSize: '3vw', fontWeight: 950, color: '#f8fafc' }}>TECHNICAL CASE STUDY</h2>
            <p style={{ color: '#64748b', fontSize: 20, marginTop: 16 }}>시각적 데이터 시뮬레이션을 통한 시스템 동작 메커니즘 분석</p>
         </div>
         <SolarManualRemotion />
      </section>

      {/* 3. Engineering Archive Header */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ borderTop: '1px solid #1e293b', margin: '200px 0 100px', textAlign: 'center' }}>
           <h2 style={{ fontSize: '4vw', fontWeight: 950, color: '#f8fafc', marginTop: 100, letterSpacing: '-0.02em' }}>
             FULL-STACK <span style={{ color: '#fbbf24' }}>ENGINEERING ARCHIVE</span>
           </h2>
           <p style={{ color: '#64748b', fontSize: 20, marginTop: 24, maxWidth: 900, margin: '24px auto 100px', lineHeight: 1.8 }}>
             제품의 원천 재질부터 반도체 광학, 전력 제어, 그리고 에너지 저장 시스템까지 <br/>
             모든 세부 공학 지표를 낱낱이 공개합니다. 각 모듈은 실무 설계 데이터를 기반으로 구축되었습니다.
           </p>
        </div>

        {/* Manual Stack - Long Scroll Content */}
        <section id="solar-physics" style={{ marginBottom: 150 }}><SolarPanelManualInteractive /></section>
        <section id="material-science" style={{ marginBottom: 150 }}><MaterialManualInteractive /></section>
        <section id="precision-mold" style={{ marginBottom: 150 }}><MoldManualInteractive /></section>
        <section id="power-control" style={{ marginBottom: 150 }}><SmartSMPSManual /></section>
        <section id="led-photonics" style={{ marginBottom: 150 }}><LEDChipManualInteractive /></section>
        <section id="circuit-thermal" style={{ marginBottom: 150 }}><LEDCircuitInteractive /></section>
        <section id="system-logic" style={{ marginBottom: 150 }}><ControllerManualInteractive /></section>
        <section id="energy-storage" style={{ marginBottom: 150 }}><BatteryManualInteractive /></section>
      </div>

      {/* 4. Commissioning & Final Summary */}
      <section style={{ padding: '200px 80px', background: '#020617', borderTop: '1px solid #1e293b' }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100 }}>
            <div>
               <h3 style={{ fontSize: 40, fontWeight: 950, color: '#fff', marginBottom: 40 }}>Project Commissioning</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  <StepItem num="01" title="Initial Structural Load Check" desc="설치 지점의 풍속 및 지반 지지력을 계산하여 지주(Pole)의 항복 강도를 검증합니다." />
                  <StepItem num="02" title="On-site Solar Simulation" desc="현장 위도/경도 기반의 1년 평균 일사량을 산출하여 배터리 자립 일수를 최종 확정합니다." />
                  <StepItem num="03" title="Digital Integration Test" desc="마이크로웨이브 센서의 감지 구역을 도플러 반사파 측정을 통해 정밀 튜닝합니다." />
               </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 64, borderRadius: 48, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
               <Database size={48} color="#fbbf24" style={{ marginBottom: 32 }} />
               <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 24 }}>Official Technical Support</h3>
               <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 40 }}>
                  본 아카이브의 데이터는 IESNA LM-80, ASTM B117, UL-94 등 국제 표준 규격에 따라 시험된 결과입니다. 
                  설계 공학적 자문이나 개별 프로젝트 시뮬레이션 리포트가 필요하신 파트너사께서는 
                  공식 기술 지원팀으로 문의하시기 바랍니다.
               </p>
               <div style={{ display: 'flex', gap: 16 }}>
                  <button style={{ padding: '16px 32px', borderRadius: 16, background: '#fbbf24', color: '#000', fontWeight: 900, border: 'none', cursor: 'pointer' }}>Download Full Data Sheet (PDF)</button>
                  <button style={{ padding: '16px 32px', borderRadius: 16, background: 'transparent', color: '#fbbf24', fontWeight: 900, border: '1px solid #fbbf24', cursor: 'pointer' }}>Request 3D CAD Files</button>
               </div>
            </div>
         </div>
      </section>

      <footer style={{ padding: '80px 40px', textAlign: 'center', borderTop: '1px solid #111' }}>
        <div style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.8em', fontWeight: 950 }}>INDUSTRIAL LIGHTING ENGINEERING MASTER SYSTEM V4.5</div>
      </footer>
    </main>
  );
}

function StepItem({ num, title, desc }: any) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
       <div style={{ fontSize: 32, fontWeight: 950, color: '#fbbf24', opacity: 0.5 }}>{num}</div>
       <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#f8fafc', marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
       </div>
    </div>
  );
}
