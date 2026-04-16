'use client';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring, Sequence, Series } from 'remotion';
import React from 'react';

const S = {
  title: { fontSize: 80, fontWeight: 900, color: 'white', marginBottom: 20 },
  subset: { fontSize: 32, color: '#0ea5e9', fontWeight: 700, letterSpacing: 2 },
  docRef: { position: 'absolute' as const, bottom: 60, left: 60, fontSize: 18, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }
};

const SectionFrame: React.FC<{ title: string; subtitle: string; content: string[]; doc: string }> = ({ title, subtitle, content, doc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 15, 85, 100], [0, 1, 1, 0]);
  const slide = spring({ frame, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ background: '#020617', padding: 100, opacity }}>
       <div style={{ transform: `translateX(${interpolate(slide, [0, 1], [-50, 0])}px)` }}>
         <div style={S.subset}>{subtitle}</div>
         <h2 style={S.title}>{title}</h2>
         <div style={{ width: 100, height: 8, background: '#0ea5e9', marginBottom: 40 }} />
         
         <div style={{ fontSize: 28, lineHeight: 1.8, color: '#cbd5e1' }}>
           {content.map((line, i) => (
             <div key={i} style={{ marginBottom: 15, display: 'flex', alignItems: 'center', gap: 15 }}>
               <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0ea5e9' }} />
               {line}
             </div>
           ))}
         </div>
       </div>

       <div style={S.docRef}>SOURCE: {doc}</div>
    </AbsoluteFill>
  );
};

export const HighbaySequence: React.FC = () => {
  const { fps } = useVideoConfig();
  
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Series>
        {/* 0-10s: Intro */}
        <Series.Sequence durationInFrames={300}>
           <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={S.subset}>OFFICIAL TECHNICAL BRIEFING</div>
              <h1 style={{ fontSize: 100, fontWeight: 950, color: 'white' }}>UFO-AM6 <span style={{ color: '#0ea5e9' }}>150W</span></h1>
              <p style={{ fontSize: 24, color: '#64748b', marginTop: 20 }}>High-Performance Industrial Lighting Solution</p>
           </AbsoluteFill>
        </Series.Sequence>

        {/* 10-30s: Mechanical & Housing */}
        <Series.Sequence durationInFrames={600}>
           <SectionFrame 
             subtitle="ENGINEERING PART 01"
             title="Housing & Structure"
             content={[
               "ADC12 Grade Die-Cast Aluminum Housing",
               "High-Efficiency Thermal Dissipation Fins",
               "IP65 / IK08 Protection Ratings",
               "Mechanical Stress Tested Design"
             ]}
             doc="Ref: Housing CAD.pdf"
           />
        </Series.Sequence>

        {/* 30-60s: Optical Engine */}
        <Series.Sequence durationInFrames={900}>
           <SectionFrame 
             subtitle="ENGINEERING PART 02"
             title="Optical Technology"
             content={[
               "Seoul Semiconductor 2835 9V Premium Chips",
               "System Efficacy: 130~150 lm/W Certified",
               "LM-80 Quality & Reliability Report compliant",
               "IESNA-2002 Standard Photometric Data"
             ]}
             doc="Ref: SZ2200910-55786E-10-10000 LM-80.pdf"
           />
        </Series.Sequence>

        {/* 60-90s: Driver & Power */}
        <Series.Sequence durationInFrames={900}>
           <SectionFrame 
             subtitle="ENGINEERING PART 03"
             title="Power Reliability"
             content={[
               "Philips Xitanium™ 150W Driver Inside",
               "1-10V Dimming & Aux Power (12V) Support",
               "6kV/10kV Surge Protection for Industrial Safety",
               "100,000 Hours Long-life Design"
             ]}
             doc="Ref: Xi_RHB_150W_0.52-0.84A_1-10V_WL_AUX.pdf"
           />
        </Series.Sequence>

        {/* 90-130s: Sensor Intelligence */}
        <Series.Sequence durationInFrames={1200}>
           <SectionFrame 
             subtitle="ENGINEERING PART 04"
             title="K-Smart Sensor Logic"
             content={[
               "5.8GHz Microwave Motion Sensing Engine",
               "Maximum Detection Height: 18~20 Meters",
               "Dual-Mode Control: Step-Dimming & On/Off",
               "Environmentally Optimized Sensitivity Algorithms"
             ]}
             doc="Ref: Sensor case CAD.pdf"
           />
        </Series.Sequence>

        {/* 130-180s: Summary & Quality */}
        <Series.Sequence durationInFrames={1500}>
           <SectionFrame 
             subtitle="FINAL VERIFICATION"
             title="Certified Standards"
             content={[
               "Complete Component BOM Consistency",
               "Thermal Stress Evaluation Pass",
               "Electromagnetic Compatibility Verified",
               "Manufacturer: (주)와이앤케이 / YNK CO., LTD."
             ]}
             doc="Ref: (부품리스트+회로도)요청 RQW2603-0224.docx"
           />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
