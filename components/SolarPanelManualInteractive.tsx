'use client';
import React, { useState, useRef, useMemo } from 'react';
import { 
  Sun, ShieldCheck, Zap, Activity, Compass, ThermometerSun, 
  Wind, Ruler, Layers, Search, AlertTriangle, CheckCircle2, 
  ArrowRight, Play, RefreshCcw, Info, Settings, Move, 
  Maximize, Minimize, Cloud, BarChart3, Database, Calculator as CalcIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const S = {
  glass: {
    background: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(40px)',
    border: '1px solid rgba(251, 191, 36, 0.1)',
    borderRadius: 32,
    padding: 40
  }
};

export default function SolarPanelManualInteractive() {
  const [activeTab, setActiveTab] = useState('physics');
  const [temp, setTemp] = useState(25);
  const [irradiance, setIrradiance] = useState(1000);
  const [shading, setShading] = useState(0);

  const metrics = useMemo(() => {
    const basePmax = 450;
    const tempCoef = -0.0035; 
    const tempLoss = (temp - 25) * tempCoef;
    const irrFactor = irradiance / 1000;
    const shadowFactor = (100 - shading) / 100;
    const currentPmax = basePmax * (1 + tempLoss) * irrFactor * shadowFactor;
    const efficiency = (currentPmax / (irradiance * 2.22) * 100).toFixed(2);
    return { pmax: currentPmax.toFixed(1), eff: efficiency };
  }, [temp, irradiance, shading]);

  return (
    <div style={{ background: '#000', color: '#fff', padding: '100px 40px', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 120 }}
      >
        <div style={{ display: 'inline-block', padding: '8px 24px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', fontSize: 13, fontWeight: 900, borderRadius: 100, marginBottom: 32, letterSpacing: '0.4em' }}>
          PHOTOVOLTAIC ENGINEERING
        </div>
        <h1 style={{ fontSize: '7vw', fontWeight: 950, letterSpacing: '-0.05em', color: '#f8fafc', lineHeight: 0.9 }}>
          SOLAR ENERGY <br/> <span style={{ color: '#fbbf24' }}>ARCHITECTURE</span>
        </h1>
        <p style={{ fontSize: 22, color: '#64748b', marginTop: 40, maxWidth: 900, margin: '40px auto', lineHeight: 1.8 }}>
          본 매뉴얼은 단결정 PERC 셀의 물리적 특성부터 현장 풍하중 EPA 설계까지, 
          태양광 시스템의 에너지 수득률을 극대화하기 위한 정밀 공학 데이터를 제공합니다.
        </p>
      </motion.div>

      {/* 2. INTERACTIVE SIMULATOR (Calculators) */}
      <section style={{ marginBottom: 200 }}>
        <div style={{ ...S.glass, padding: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 100 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
                <CalcIcon size={40} color="#fbbf24" />
                <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Efficiency Real-time Analyzer</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                <div>
                   <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, color: '#94a3b8' }}>
                      <span>Irradiance (일사량)</span>
                      <span style={{ color: '#fbbf24', fontWeight: 900 }}>{irradiance} W/m²</span>
                   </label>
                   <input type="range" min="100" max="1300" step="50" value={irradiance} onChange={(e)=>setIrradiance(Number(e.target.value))} style={{ width: '100%' }} />
                </div>
                <div>
                   <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, color: '#94a3b8' }}>
                      <span>Cell Temp (셀 온도)</span>
                      <span style={{ color: temp > 50 ? '#f43f5e' : '#fbbf24', fontWeight: 900 }}>{temp} °C</span>
                   </label>
                   <input type="range" min="-10" max="85" value={temp} onChange={(e)=>setTemp(Number(e.target.value))} style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 24, padding: 48, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
               <div style={{ marginBottom: 48 }}>
                  <div style={{ fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Current Peak Power</div>
                  <div style={{ fontSize: 64, fontWeight: 950, color: '#fff' }}>{metrics.pmax}W</div>
               </div>
               <div>
                  <div style={{ fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Module Efficiency</div>
                  <div style={{ fontSize: 64, fontWeight: 950, color: '#10b981' }}>{metrics.eff}%</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPANDED TECHNICAL DATA (Deep Content) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, marginBottom: 200 }}>
         <div style={S.glass}>
            <Layers size={32} color="#fbbf24" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>1. 셀 구조 및 반도체 공정</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: 16 }}>
              <b>PERC (Passivated Emitter and Rear Cell)</b> 기술을 적용한 단결정 웨이퍼는 후면에 유전체 층을 증착하여 
              빛을 셀 내부로 튕겨 올려 보냅니다. 이는 장파장 빛의 흡수율을 높여 특히 일출/일몰 시 발전량을 3-5% 추가 개선합니다.
              N-Type 모듈의 경우 LID(초기 광열화) 현상이 0%에 근접하여 25년 후에도 90% 이상의 출력을 유지합니다.
            </p>
         </div>
         <div style={S.glass}>
            <ShieldCheck size={32} color="#fbbf24" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>2. 유리 자정 작용 및 투과율</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: 16 }}>
              3.2mm 두께의 <b>저철분 고투과율 강화유리</b>는 ARC(Anti-Reflective Coating) 처리를 통해 입사각에 따른 빛 반사를 최소화합니다.
              또한 친수성 코팅이 적용되어 자정 작용(Self-Cleaning)을 지원하며, 2,400Pa의 풍압과 5,400Pa의 적설 하중을 
              견디는 구조적 강성을 제공합니다.
            </p>
         </div>
         <div style={S.glass}>
            <Activity size={32} color="#fbbf24" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>3. 바이패스 다이오드 보호 로직</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: 16 }}>
              부분 음영 발생 시 역전류로 인한 <b>Hot-spot 화재</b>를 방지하기 위해 정션 박스 내부에 3개의 쇼트키 다이오드를 배치합니다.
              특수 실리콘 충진 마감을 통해 IP68 방수 등급을 확보하여 습기에 의한 부식을 근본적으로 차단합니다.
            </p>
         </div>
         <div style={S.glass}>
            <Wind size={32} color="#fbbf24" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>4. 풍하중 안전 계수 (EPA)</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: 16 }}>
              지상 10m 높이의 가로등은 최대 순간 풍속 45m/s 이상의 환경에 노출됩니다. 
              유효 수압 면적(EPA) 계산 시 모듈의 경사각에 따른 압력 계수(Cd)를 적용하여 
              지주 연결부의 최대 전단 응력을 산출하고 항복 강도 1.5배의 안전율을 확보합니다.
            </p>
         </div>
      </section>

      {/* 4. TECHNICAL SPEC TABLE (Professional) */}
      <section style={{ marginBottom: 200 }}>
        <h2 style={{ fontSize: 40, fontWeight: 950, marginBottom: 60 }}>Module Engineering Specs</h2>
        <div style={{ borderTop: '2px solid #fbbf24' }}>
          {[
            { label: 'Cell Technology', value: 'Mono-PERC / TopCon' },
            { label: 'Standard STC Flux', value: '1000 W/m² @ 25°C' },
            { label: 'NOCT (Nominal Op. Cell Temp)', value: '45°C (±2)' },
            { label: 'Power Temperature Coef.', value: '-0.35 % / °C' },
            { label: 'Max System Voltage', value: '1500 V DC' },
            { label: 'Static Load (Snow/Wind)', value: '5400/2400 Pa' }
          ].map((spec, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
               <span style={{ color: '#64748b', fontSize: 18 }}>{spec.label}</span>
               <span style={{ color: '#f8fafc', fontSize: 20, fontWeight: 800 }}>{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '80px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#1e293b', fontSize: 13, letterSpacing: '0.6em', fontWeight: 900 }}>SYNCHRONIZED SOLAR ENGINEERING SYSTEM</p>
      </footer>

      <style jsx global>{`
        input[type="range"] { -webkit-appearance: none; background: #111; height: 8px; border-radius: 4px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; background: #fbbf24; border-radius: 50%; cursor: pointer; }
      `}</style>
    </div>
  );
}
