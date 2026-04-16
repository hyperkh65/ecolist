'use client';
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Flag, 
  Cpu, 
  FileText, 
  Download, 
  CheckCircle2,
  ArrowRight,
  Database,
  Search,
  Wrench,
  Camera,
  Activity,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@remotion/player';
import { HighbaySequence } from './HighbayRemotion';

const S = {
  container: { background: '#020617', color: '#f8fafc', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' as const },
  section: { maxWidth: 1400, margin: '0 auto', padding: '120px 24px' },
  glass: { background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 32, padding: 48 }
};

export default function FactoryHighbayPromotion() {
  return (
    <div style={S.container}>
      
      {/* 1. CINEMATIC VIDEO ANALYSIS (REMOTION) */}
      <section style={{ background: '#000', position: 'relative' }}>
        <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '85vh', overflow: 'hidden' }}>
          <Player
            component={HighbaySequence}
            durationInFrames={5400} // 3 minutes
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            style={{ width: '100%', height: '100%' }}
            controls
            autoPlay
            loop
          />
        </div>
        <div style={{ position: 'absolute', top: 20, right: 30, zIndex: 50, color: 'rgba(14, 165, 233, 0.6)', fontWeight: 900, fontSize: 12, letterSpacing: 2 }}>
           [ LIVE TECHNICAL STREAMING ACTIVE ]
        </div>
      </section>

      {/* 2. DYNAMIC HERO: PRODUCT IN ACTION */}
      <section style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
           <source src="/hero-bg-3.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,6,23,0.7), rgba(2,6,23,0.95))' }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 24px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.3)', borderRadius: 100, color: '#38bdf8', fontSize: 14, fontWeight: 900, marginBottom: 32, letterSpacing: 4 }}>
             BEYOND THE LIMITS
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 7vw, 90px)', fontWeight: 950, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 24 }}>
             지정된 높이를 넘어서는<br/><span style={{ color: '#0ea5e9' }}>18M 정밀 엔지니어링</span>
          </h2>
          <p style={{ fontSize: 24, color: '#94a3b8', maxWidth: 800, margin: '0 auto 48px', fontWeight: 500, lineHeight: 1.5 }}>
             수입산 센서가 도달할 수 없는 높이.<br/>
             국내 기술진의 독자적 알고리즘으로 완성된 K-SMART 센서를 만나보세요.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
             <button style={{ background: '#0ea5e9', color: '#fff', padding: '20px 48px', borderRadius: 20, fontWeight: 900, fontSize: 18, border: 'none', cursor: 'pointer', boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)' }}>
                기술 미팅 요청 <ArrowRight size={20} style={{ marginLeft: 10 }} />
             </button>
          </div>
        </motion.div>
      </section>

      {/* 3. TECHNICAL CAPTURES: EXTRACTED FROM DOCS & VIDEOS */}
      <main style={S.section}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
           <h3 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>Technical Analysis Gallery</h3>
           <p style={{ color: '#64748b' }}>현장 영상과 설계 도면에서 발췌한 세부 기술 지표입니다.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
           <div style={S.glass}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, color: '#0ea5e9' }}>
                 <Camera size={24} /> <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>THERMAL SCAN</span>
              </div>
              <h4 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>ADC12 하우징 방열 가이드</h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>공식 하우징 CAD 도면에 근거한 최적의 공기 흐름 패턴. 고온 환경에서도 칩셋 온도를 안정적으로 유지하여 수명을 극대화합니다.</p>
              <div style={{ fontSize: 12, color: '#475569', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                 Reference: Housing CAD.pdf (Thermal Calculation Section)
              </div>
           </div>

           <div style={S.glass}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, color: '#0ea5e9' }}>
                 <Layers size={24} /> <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>OPTICAL ENGINE</span>
              </div>
              <h4 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>LED 모듈 직/병렬 설계</h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>제공된 회로 도면상의 전압/전류 밸런싱 설계. 서울반도체 고효율 칩셋의 성능을 100% 이끌어내는 고부하 분산 알고리즘이 적용되었습니다.</p>
              <div style={{ fontSize: 12, color: '#475569', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                 Reference: LED Module Circuit Diagram.pdf
              </div>
           </div>

           <div style={S.glass}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, color: '#0ea5e9' }}>
                 <Activity size={24} /> <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>SENSOR LOGIC</span>
              </div>
              <h4 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>18M 마이크로웨이브 프로파일</h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>현장 테스트 영상에서 입증된 18m 직경의 완전 감지 영역. 국내 환경에 최적화된 필터링으로 오작동을 차단하고 즉각적인 피드백을 제공합니다.</p>
              <div style={{ fontSize: 12, color: '#475569', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                 Reference: Sensor Case CAD & Field Test Video (2026-04-16)
              </div>
           </div>
        </div>
      </main>

      {/* 4. OFFICIAL DOCUMENTS ARCHIVE (LINKED) */}
      <section style={{ ...S.section, borderTop: '1px solid #1e293b' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {[
            { name: 'Philips Xitanium Driver spec', file: 'Xi_RHB_150W_0.52-0.84A_1-10V_WL_AUX_132S_929003459080(1).pdf' },
            { name: 'SSC 2835 9V LM-80 Report', file: 'SZ2200910-55786E-10-10000 MTC MKXWM-CX LM-80.pdf' },
            { name: 'UFO-AM6 부품 리스트 & 회로도', file: '(부품리스트+회로도)요청 RQW2603-0224_05-센LED공장직부A 150W 000x0260 A57 (워드변환)(2).docx' },
            { name: '150lmW 실측 리포트', file: '130~150lmW LFZY6290-L-REV01(24C13B).pdf' }
          ].map((doc, i) => (
            <div key={i} style={{ ...S.glass, padding: 24, display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }}
                 onClick={() => window.open(`/promotion_assets/${doc.file}`)}>
               <FileText color="#0ea5e9" />
               <div style={{ fontSize: 14, fontWeight: 800 }}>{doc.name}</div>
               <Download size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 24px', textAlign: 'center', color: '#475569', borderTop: '1px solid #1e293b' }}>
         <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginBottom: 40 }}>
            <div style={{ textAlign: 'center' }}>
               <div style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc' }}>150W</div>
               <div style={{ fontSize: 12 }}>SYSTEM POWER</div>
            </div>
            <div style={{ textAlign: 'center' }}>
               <div style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc' }}>IP65</div>
               <div style={{ fontSize: 12 }}>PROTECTION</div>
            </div>
            <div style={{ textAlign: 'center' }}>
               <div style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc' }}>K-SMART</div>
               <div style={{ fontSize: 12 }}>ENGINE INSIDE</div>
            </div>
         </div>
         <p style={{ fontSize: 13 }}>본 프로모션 데이터는 실측 서류를 바탕으로 작성됨. (주)와이앤케이 기술연구소 지원.</p>
      </footer>

    </div>
  );
}
