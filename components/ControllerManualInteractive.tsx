'use client';
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Move, Settings, Zap, Eye, BarChart3, CloudRain } from 'lucide-react';

export default function ControllerManualInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const [panelVoltage, setPanelVoltage] = useState(20);
  const [motionDetected, setMotionDetected] = useState(false);
  const [isMppt, setIsMppt] = useState(true);
  
  // Logic
  const isNight = panelVoltage < 5;
  const lightBrightness = isNight ? (motionDetected ? 100 : 30) : 0;
  const currentEfficiency = isMppt ? 98 : 75;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      width: '100%',
      background: '#020617',
      borderRadius: isMobile ? '0' : '24px',
      padding: isMobile ? '24px 16px' : '48px',
      color: '#f8fafc',
      fontFamily: '"Pretendard", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '32px' : '64px',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.2 }}>
           🎛️ 스마트 지능형 컨트롤러 <br/>
           <span style={{ color: '#fbbf24' }}>MPPT의 비밀과 센서 기술</span>
        </h1>
        <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#94a3b8', maxWidth: '850px', margin: '0 auto', lineHeight: 1.6 }}>
          전기를 얼마나 똑똑하게 관리하느냐가 가로등의 수명을 결정합니다. 
          태양의 위치를 찾아내는 MPPT 기술과 사람이 다가올 때만 밝아지는 스마트 센서의 원리를 직접 체험해보세요.
        </p>
      </div>

      {/* MPPT vs PWM Comparison */}
      <section style={{ 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        padding: isMobile ? '20px' : '40px', 
        borderRadius: '24px' 
      }}>
        <h2 style={{ fontSize: isMobile ? '20px' : '30px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Zap size={32} /> 제 1장: MPPT vs PWM (누가 더 똑똑한가?)
        </h2>
        
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '24px' }}>
              <b>MPPT</b>는 태양광 패널이 가장 힘을 잘 쓰는 지점(Maximum Power Point)을 실시간으로 추적하는 기술이에요. 
              마치 기어를 변속해서 최고 속도를 내는 자전거와 같죠! <br/><br/>
              반면 <b>PWM</b>은 단순한 스위치라서 전력 손실이 큽니다. 비오는 날이나 겨울철에는 MPPT가 약 30% 더 많은 전기를 만들어냅니다.
            </p>
            <button 
              onClick={() => setIsMppt(!isMppt)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                background: isMppt ? '#fbbf24' : '#475569',
                color: isMppt ? '#000' : '#fff',
                fontWeight: 900,
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              모드 전환: {isMppt ? '🚀 지능형 MPPT 모드' : '🐢 일반 PWM 모드'}
            </button>
          </div>

          <div style={{ 
            flex: 1, 
            background: '#0f172a', 
            borderRadius: '20px', 
            padding: '32px', 
            border: '1px solid #1e293b',
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '16px' }}>에너지 변환 효율</div>
            <div style={{ position: 'relative', height: '150px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px' }}>
               <div style={{ width: '80px', height: `${currentEfficiency}%`, background: '#fbbf24', borderRadius: '12px 12px 0 0', transition: 'all 0.5s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#000', fontWeight: 'bold' }}>{currentEfficiency}%</span>
               </div>
               <div style={{ position: 'absolute', bottom: -30, color: '#94a3b8' }}>{isMppt ? 'MPPT 추적 중' : 'PWM 고정 방식'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Day/Night & Sensor Simulation */}
      <section style={{ 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        padding: isMobile ? '20px' : '40px', 
        borderRadius: '24px' 
      }}>
        <h2 style={{ fontSize: isMobile ? '20px' : '30px', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Eye size={32} /> 제 2장: 낮과 밤을 판단하는 로직
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: 1.8, marginBottom: '32px' }}>
          따로 센서가 없어도 패널의 전압을 보고 컨트롤러는 시간을 압니다. 
          패널에서 5V 이상의 전기가 들어오면 "아! 낮이구나!" 하고 불을 끕니다. 
          반대로 전압이 뚝 떨어지면 "밤이네!" 하고 불을 켜죠.
        </p>

        <div style={{ 
          background: isNight ? '#020617' : '#e0f2fe', 
          padding: '40px', 
          borderRadius: '24px', 
          transition: 'all 1s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          border: `2px solid ${isNight ? '#1e293b' : '#bae6fd'}`
        }}>
          {/* Sun/Moon Slider */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
               {isNight ? <Moon size={40} color="#fbbf24" /> : <Sun size={40} color="#f59e0b" />}
            </div>
            <input 
              type="range" min="0" max="40" value={panelVoltage} 
              onChange={(e) => setPanelVoltage(Number(e.target.value))}
              style={{ width: '80%', accentColor: isNight ? '#fbbf24' : '#0ea5e9', cursor: 'pointer' }}
            />
            <div style={{ marginTop: '10px', color: isNight ? '#fff' : '#0369a1', fontWeight: 'bold' }}>
              패널 입력 전압: {panelVoltage}V ({isNight ? '밤' : '낮'})
            </div>
          </div>

          {/* Interactive Street Light */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div 
              onMouseEnter={() => setMotionDetected(true)}
              onMouseLeave={() => setMotionDetected(false)}
              style={{
                width: '120px', height: '120px',
                background: `rgba(251, 191, 36, ${lightBrightness / 100})`,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 ${lightBrightness}px rgba(251, 191, 36, ${lightBrightness / 100})`,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <Zap size={60} color={lightBrightness > 0 ? '#000' : '#475569'} />
            </div>
            <div style={{ color: isNight ? '#fff' : '#0369a1', textAlign: 'center' }}>
               <div style={{ fontSize: '24px', fontWeight: 900 }}>밝기: {lightBrightness}%</div>
               <div style={{ fontSize: '14px', marginTop: '4px' }}>{isNight ? (motionDetected ? '움직임 감지! (Full Bright)' : '야간 절전 모드 (30%)') : '주간 소등 상태'}</div>
            </div>
            {isNight && (
              <div style={{ color: '#fbbf24', fontSize: '14px', animation: 'bounce 1s infinite' }}>
                🖱️ 마우스를 가로등 위에 올려보세요 (움직임 시뮬레이션)
              </div>
            )}
            <style>{`
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px' }}>
        <div style={{ background: '#0f172a', padding: '32px', borderRadius: '24px', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fbbf24', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={24} /> MPPT의 원리 (IV 곡선)
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.8 }}>
            태양광 패널은 전압(V)과 전류(I)를 곱한 것이 힘(W)이 됩니다. 그런데 구름이 끼거나 온도가 올라가면 이 힘이 나오는 '골든 포인트'가 계속 변해요. 
            MPPT는 1초에 수백 번씩 이 포인트를 찾아내어 배터리로 가장 많은 전기를 보냅니다.
          </p>
        </div>
        <div style={{ background: '#0f172a', padding: '32px', borderRadius: '24px', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fbbf24', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Move size={24} /> 마이크로웨이브 vs PIR 센서
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.8 }}>
            <b>PIR</b>은 열(적외선)을 감지합니다. 작고 싸지만 거리가 짧죠. <br/>
            <b>마이크로웨이브(Radar)</b>는 전파를 쏴서 튕겨 나오는 걸 감지합니다. 
            유리나 플라스틱 통 안에서도 감지가 가능하고 거리가 멀어 고급 가로등에 필수적입니다.
          </p>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '40px 0' }}>
         <p style={{ fontSize: '20px', fontWeight: 700, color: '#fbbf24' }}>지능형 컨트롤러가 가로등의 지능을 바꿉니다! 🚀</p>
      </footer>
    </div>
  );
}
