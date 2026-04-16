'use client';
import React, { useState, useRef } from 'react';
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
  Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@remotion/player';
import { HighbaySequence } from './HighbayRemotion';

const S = {
  container: { background: '#020617', color: '#f8fafc', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' as const },
  section: { maxWidth: 1200, margin: '0 auto', padding: '100px 24px' },
  glass: { background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 40 }
};

export default function FactoryHighbayPromotion() {
  const [activeTab, setActiveTab] = useState<'docs' | 'video' | 'specs'>('video');

  return (
    <div style={S.container}>
      
      {/* 1. TOP TECHNICAL BRIEFING (REMOTION) - 3 MINUTES */}
      <section style={{ background: '#000', borderBottom: '1px solid #1e293b' }}>
        <div style={{ height: '70vh', width: '100%' }}>
          <Player
            component={HighbaySequence}
            durationInFrames={5400} // 3 minutes at 30fps
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            style={{ width: '100%', height: '100%' }}
            controls
            autoPlay
            loop
          />
        </div>
        <div style={{ padding: '20px', textAlign: 'center', background: '#0f172a' }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#0ea5e9', fontWeight: 900, fontSize: 13, letterSpacing: 2 }}>
             <Search size={14} /> 180-SECONDS TECHNICAL DEEP-DIVE
           </div>
        </div>
      </section>

      {/* 2. REAL ASSET HERO */}
      <section style={S.section}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
             <div style={{ color: '#0ea5e9', fontWeight: 900, fontSize: 14, marginBottom: 16 }}>AUTHENTIC TECHNOLOGY</div>
             <h2 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 32 }}>공식 데이터로 증명하는<br/>압도적 센서 엔진</h2>
             <p style={{ fontSize: 20, color: '#94a3b8', lineHeight: 1.6, marginBottom: 40 }}>
                UFO-AM6은 모방할 수 없는 국내 기술진의 5.8GHz 고정밀 알고리즘을 사용합니다. 
                제공된 12종의 공식 시험성적서와 설계 도면이 이를 뒷받침합니다.
             </p>
             <div style={{ display: 'flex', gap: 16 }}>
               <div style={{ ...S.glass, padding: '20px 24px', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>151.2 lm/W</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>실측 검토 보고서 데이터</div>
               </div>
               <div style={{ ...S.glass, padding: '20px 24px', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>Max 20m</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>초고천장 감지 설계</div>
               </div>
             </div>
          </motion.div>
          
          <div style={{ position: 'relative', borderRadius: 32, overflow: 'hidden', height: 500, border: '1px solid rgba(255,255,255,0.1)' }}>
             <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src="/promotion_assets/KakaoTalk_Video_2026-04-16-09-17-15.mp4" type="video/mp4" />
             </video>
             <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: 8, fontSize: 12, color: '#fff', backdropFilter: 'blur(4px)' }}>
                Field Test: Logistic Center 18M
             </div>
          </div>
        </div>
      </section>

      {/* 3. DOCUMENT ARCHIVE: USE REAL FILENAMES */}
      <section style={{ ...S.section, borderTop: '1px solid #1e293b' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h3 style={{ fontSize: 32, fontWeight: 900 }}>공식 기술 문서 아카이브</h3>
          <p style={{ color: '#64748b' }}>모든 사양은 아래의 실제 증빙 서류를 바탕으로 작성되었습니다.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
          {[
            { name: 'Philips Xitanium Driver spec (152S)', file: 'Xi_RHB_150W_0.52-0.84A_1-10V_WL_AUX_132S_929003459080(1).pdf' },
            { name: 'UFO-AM6 150W 공식 검토보고서', file: 'UFO-AM6-150W 140LM(1).pdf' },
            { name: 'SSC 2835 9V LED LM-80 Report', file: 'SZ2200910-55786E-10-10000 MTC MKXWM-CX LM-80.pdf' },
            { name: 'Housing & Sensor Case CAD', file: 'Housing CAD.pdf' },
            { name: 'LED Module Circuit Diagram', file: '140lmW-LFZY6290-L-REV01(24C13B)-LED module circuit diagram.pdf' },
            { name: '부품 리스트 및 회로 상세 (BOM)', file: '(부품리스트+회로도)요청 RQW2603-0224_05.docx' }
          ].map((doc, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }}
              style={{ ...S.glass, padding: '24px', display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }}
              onClick={() => window.open(`/promotion_assets/${doc.file}`)}
            >
               <div style={{ background: '#1e293b', padding: 16, borderRadius: 12 }}><FileText color="#0ea5e9" /></div>
               <div>
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>
                    {doc.file}
                  </div>
               </div>
               <Download size={18} style={{ marginLeft: 'auto', color: '#334155' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CORE ENGINEERING HIGHLIGHTS */}
      <section style={{ ...S.section, background: '#020617' }}>
         <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', borderRadius: 40, padding: 80, textAlign: 'center' }}>
            <h2 style={{ fontSize: 44, fontWeight: 950, color: '#fff', marginBottom: 24 }}>진짜를 선택하는 단 하나의 이유.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 60 }}>
               <div>
                  <ShieldCheck size={48} style={{ margin: '0 auto 20px' }} color="#fff" />
                  <h4 style={{ fontSize: 20, fontWeight: 900 }}>Reliability</h4>
                  <p style={{ opacity: 0.8, fontSize: 15, marginTop: 10 }}>필립스 정품 드라이버 탑재로 10만 시간 이상의 안정적 구동 보장.</p>
               </div>
               <div>
                  <Flag size={48} style={{ margin: '0 auto 20px' }} color="#fff" />
                  <h4 style={{ fontSize: 20, fontWeight: 900 }}>K-Technology</h4>
                  <p style={{ opacity: 0.8, fontSize: 15, marginTop: 10 }}>수입산 센서와 비교할 수 없는 국내 기술 센서 알고리즘 적용.</p>
               </div>
               <div>
                  <Database size={48} style={{ margin: '0 auto 20px' }} color="#fff" />
                  <h4 style={{ fontSize: 20, fontWeight: 900 }}>Certified</h4>
                  <p style={{ opacity: 0.8, fontSize: 15, marginTop: 10 }}>BOM 리스트부터 LM-80 리포트까지 모든 부품의 정규 규격 확인.</p>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 24px', textAlign: 'center', borderTop: '1px solid #1e293b', color: '#475569' }}>
         <div style={{ fontWeight: 900, color: '#94a3b8', marginBottom: 20 }}>YNK CO., LTD. ENGINEERING SUITE</div>
         <p style={{ fontSize: 13 }}>본 페이지에 사용된 문서와 영상은 (주)와이앤케이의 지적 자산이며, 모든 데이터는 실측 보고서를 근거로 합니다.</p>
      </footer>

    </div>
  );
}
