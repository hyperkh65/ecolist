'use client';
import Navbar from '@/components/Navbar';
import { ScrollReveal } from '@/components/LuminaAnimation';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      <section style={{ paddingTop: 160, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <ScrollReveal>
             <h1 style={{ fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 32, lineHeight: 1.1 }}>
               세상의 모든 공간을<br />
               <span className="text-gradient">새롭게 정의하다</span>
             </h1>
             <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
               LUMINA는 글로벌 최고 수준의 프리미엄 LED 조명을 직수입하여 고객의 공간을 가장 완벽하게 밝혀주는 조명 전문 기업입니다.
             </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: '80px 24px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          <ScrollReveal delay={0}>
             <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 48, borderRadius: 24, height: '100%' }}>
               <div style={{ fontSize: 48, marginBottom: 24 }}>🌍</div>
               <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>글로벌 직수입</h3>
               <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                 해외 우수 LED 제조사와 직접 파트너십을 맺어, 중간 유통 과정 없이 고품질의 조명을 합리적인 가격에 직수입하여 고객에게 제공합니다.
               </p>
             </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
             <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 48, borderRadius: 24, height: '100%' }}>
               <div style={{ fontSize: 48, marginBottom: 24 }}>🛡️</div>
               <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>철저한 품질 및 인증제도</h3>
               <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                 KC 인증, KS 인증 및 국제 전기안전규격을 모두 통과한 제품만을 취급합니다. 투명한 경영철학 아래 모든 인증서를 사이트에 공개합니다.
               </p>
             </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
             <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 48, borderRadius: 24, height: '100%' }}>
               <div style={{ fontSize: 48, marginBottom: 24 }}>🤝</div>
               <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>고객 맞춤 컨설팅</h3>
               <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                 단순한 판매를 넘어, 공간의 용도, 조도, 색온도에 맞는 최적의 조명 솔루션을 제안합니다. 사무실, 상업시설, 주거공간의 완벽한 빛을 약속합니다.
               </p>
             </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: '120px 24px', textAlign: 'center' }}>
        <ScrollReveal>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 40 }}>인증 및 규격 현황</h2>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['KC 전기안전', 'KS 인증', 'ISO 9001', '고효율에너지기자재', '환경표지지증'].map((cert) => (
              <div key={cert} style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.05)', borderRadius: 50, color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 500 }}>
                ✓ {cert}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60 }}>
            <Link href="/shop" className="btn-primary" style={{ padding: '16px 40px', fontSize: 16 }}>제품 보러가기</Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
