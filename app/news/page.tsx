'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe2, Newspaper, Rss, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PortalHeader, PortalShell, SectionHeading } from '@/components/EcolistShell';
import { FALLBACK_NEWS, NewsBrief, excerpt, formatCompactDate } from '@/lib/ecolist';

export default function NewsPage() {
  const [news, setNews] = useState<NewsBrief[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('finance_news_items')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(24);
        if (data?.length) setNews(data as NewsBrief[]);
        else setNews(FALLBACK_NEWS);
      } catch {
        setNews(FALLBACK_NEWS);
      }
    }

    load();
  }, []);

  return (
    <PortalShell>
      <PortalHeader
        kicker="NEWS DESK"
        title="경제 뉴스 스크랩 · 요약룸"
        description="경제 뉴스를 자동으로 모으고 짧게 요약해, 아침에 빠르게 훑을 수 있게 정리한 뉴스룸입니다."
        actionHref="/podcast"
        actionLabel="팟캐스트"
      />

      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <SectionHeading
            kicker="TOP STORIES"
            title="최근 스크랩 뉴스"
            description="원문보다 빠르게 핵심을 확인하고, 필요한 기사만 다시 열람할 수 있습니다."
            action={<Link href="/" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>홈으로 <ArrowRight size={16} /></Link>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            {news.slice(0, 6).map((item) => (
              <div key={item.id} style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#7dd3fc', letterSpacing: 2.5, fontWeight: 800, marginBottom: 8 }}>{item.source}</div>
                    <div style={{ fontSize: 18, color: '#fff', fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.04em' }}>{item.title}</div>
                  </div>
                  <Newspaper size={18} color="#7dd3fc" />
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>{excerpt(item.summary, 120)}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', fontSize: 12, color: '#94a3b8' }}>
                  <span>{item.category}</span>
                  <span>{formatCompactDate(item.published_at)}</span>
                </div>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, color: '#7dd3fc', textDecoration: 'none', fontSize: 13, fontWeight: 800 }}>
                    원문 읽기 <ArrowRight size={14} />
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <Rss size={18} color="#7dd3fc" />
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginTop: 12, marginBottom: 8 }}>RSS 수집</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>허용된 공개 소스에서 기사를 모아 저장합니다.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <Sparkles size={18} color="#7dd3fc" />
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginTop: 12, marginBottom: 8 }}>핵심 요약</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>본문 전체 대신 핵심 문장을 추출해 빠르게 읽을 수 있게 합니다.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <Globe2 size={18} color="#7dd3fc" />
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginTop: 12, marginBottom: 8 }}>글로벌 시각</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>환율과 시장 데이터와 함께 맥락을 놓치지 않게 연결합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
