'use client';
import Navbar from '@/components/Navbar';
import { ScrollReveal } from '@/components/LuminaAnimation';

export default function TechPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ height: '70vh', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, #050505 70%)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 800, padding: '0 24px' }}>
          <ScrollReveal>
            <p className="section-label" style={{ marginBottom: 20 }}>Technology</p>
            <h1 className="section-title" style={{ marginBottom: 32 }}>경계를 허무는<br />빛의 혁신</h1>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontWeight: 300 }}>
              LUMINA는 가장 순수하고 완벽한 빛을 공간에 담아냅니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature 1: COB Technology */}
      <section style={{ padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <ScrollReveal direction="left">
              <span style={{ fontSize: 48, marginBottom: 24, display: 'block' }}>〰️</span>
              <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.03em' }}>COB(Chip on Board)<br />끊기지 않는 선명함</h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                기존 SMD 방식의 LED 스트립이 점(Dot)으로 빛을 발산했다면, LUMINA의 COB технологи는 수백 개의 미세한 칩을 형광 물질로 덮어 하나의 완벽한 선형 빛을 만들어냅니다. 점이 보이지 않는 균일하고 부드러운 빛으로 공간의 마감을 한 차원 높여줍니다.
              </p>
            </ScrollReveal>
          </div>
          <div style={{ flex: 1, minWidth: 300, minHeight: 400, background: 'rgba(255,255,255,0.02)', borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden' }}>
            <ScrollReveal delay={200}>
              <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: 4, background: '#fff', boxShadow: '0 0 40px 10px #fff', borderRadius: 4, transform: 'translateY(-50%)' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feature 2: High CRI */}
      <section style={{ padding: '120px 24px', backgroundColor: '#0a0a0a' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 300, minHeight: 400, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <ScrollReveal delay={100}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, height: '100%', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>일반 LED (CRI 70)</p>
                <div style={{ height: 100, borderRadius: 12, background: 'linear-gradient(90deg, #b34d4d, #4d80b3, #4db360)', filter: 'saturate(0.4)' }} />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
               <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, height: '100%', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: 14, color: '#fff', marginBottom: 8 }}>LUMINA (CRI &gt; 95)</p>
                <div style={{ height: 100, borderRadius: 12, background: 'linear-gradient(90deg, #ff4d4d, #4d94ff, #4dff6a)', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }} />
              </div>
            </ScrollReveal>
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <ScrollReveal direction="right">
              <span style={{ fontSize: 48, marginBottom: 24, display: 'block' }}>🌈</span>
              <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.03em' }}>자연의 색 그대로,<br />초고연색성 (CRI &gt; 95)</h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                LUMINA의 프리미엄 라인업은 태양광에 가장 가까운 빛을 구현합니다. CRI(연색평가지수) 95 이상의 특수 칩셋을 사용하여 인테리어 자재 본연의 색상, 음식의 신선함, 피부의 혈색을 가장 아름답고 생생하게 표현합니다.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feature 3: Anti-Glare */}
      <section style={{ padding: '120px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 800 }}>
          <ScrollReveal>
            <span style={{ fontSize: 48, marginBottom: 24, display: 'block' }}>👁️‍🗨️</span>
            <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.03em' }}>시력을 보호하는<br />UGR &lt; 19 플리커프리</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 40 }}>
              특수 마이크로 프리즘 커버와 정밀한 반사판 설계로 빛을 효과적으로 분산시킵니다. 작업 공간이나 학습 공간에 필수적인 낮고 편안한 눈부심 (UGR &lt; 19)을 실현하며, 미세한 떨림이 없는 플리커프리 회로로 눈의 피로를 혁신적으로 줄였습니다.
            </p>
            <div style={{ display: 'inline-flex', padding: '16px 32px', background: 'rgba(255,255,255,0.04)', borderRadius: 50, border: '1px solid rgba(255,255,255,0.1)', gap: 32 }}>
              <div><strong style={{ fontSize: 24, color: '#fff' }}>0%</strong><span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>플리커 현상</span></div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div><strong style={{ fontSize: 24, color: '#fff' }}>&lt;19</strong><span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>UGR 등급</span></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer minimal */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
        © 2024 LUMINA Technology
      </footer>
    </main>
  );
}
