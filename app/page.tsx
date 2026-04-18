'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ContentCard, MetricCard, PortalHeader, PortalShell, SectionHeading, NewsletterBadge } from '@/components/EcolistShell';
import { FALLBACK_NEWS, FALLBACK_PODCASTS, FALLBACK_WEEKLY_REPORTS, NewsBrief, PodcastEpisode, WeeklyReport, excerpt, formatCompactDate, toKRW } from '@/lib/ecolist';

type MarketData = {
  success: boolean;
  timestamp: string;
  rates: { usd: number; cny: number; jpy: number };
  metals: Record<string, { price: number; prev: number; change: number; changePct: number }>;
  history: Array<Record<string, number | string>>;
};

function pct(value?: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '-';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatCurrency(value?: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '-';
  return toKRW(value);
}

function MetricSkeleton() {
  return (
    <div style={{ padding: 18, borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(148,163,184,0.14)', minHeight: 118, animation: 'pulse 1.6s ease-in-out infinite' }} />
  );
}

export default function HomePage() {
  const [market, setMarket] = useState<MarketData | null>(null);
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [news, setNews] = useState<NewsBrief[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const [marketRes, reportRes, newsRes, podcastRes] = await Promise.all([
          fetch('/api/market', { cache: 'no-store' }).then((r) => r.json()),
          supabase.from('finance_weekly_reports').select('*').order('published_at', { ascending: false }).limit(3),
          supabase.from('finance_news_items').select('*').order('published_at', { ascending: false }).limit(4),
          supabase.from('finance_podcast_episodes').select('*').order('published_at', { ascending: false }).limit(3),
        ]);

        if (!alive) return;
        setMarket(marketRes);

        if (reportRes.data?.length) {
          setReports(reportRes.data as WeeklyReport[]);
        } else {
          setReports(FALLBACK_WEEKLY_REPORTS);
        }

        if (newsRes.data?.length) {
          setNews(newsRes.data as NewsBrief[]);
        } else {
          setNews(FALLBACK_NEWS);
        }

        if (podcastRes.data?.length) {
          setPodcasts(podcastRes.data as PodcastEpisode[]);
        } else {
          setPodcasts(FALLBACK_PODCASTS);
        }
      } catch {
        if (!alive) return;
        setMarket(null);
        setReports(FALLBACK_WEEKLY_REPORTS);
        setNews(FALLBACK_NEWS);
        setPodcasts(FALLBACK_PODCASTS);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const metrics = useMemo(() => {
    if (!market?.rates) return null;
    return [
      { label: 'USD / KRW', value: market.rates.usd.toFixed(2), sublabel: '원', change: '환율' },
      { label: 'CNY / KRW', value: market.rates.cny.toFixed(2), sublabel: '원', change: '교역' },
      { label: 'JPY / KRW', value: (market.rates.jpy * 100).toFixed(2), sublabel: '원 / 100엔', change: '관심' },
      { label: '구리', value: formatCurrency(market.metals?.copper?.price), sublabel: 'USD / ton', change: pct(market.metals?.copper?.changePct) },
    ];
  }, [market]);

  const marketUpdated = market?.timestamp ? new Date(market.timestamp).toLocaleString('ko-KR') : '실시간 데이터 로딩 중';
  const heroRates = market?.rates;
  const heroChange = market?.metals?.copper?.changePct ?? 0;

  return (
    <PortalShell>
      <style>{`@keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}`}</style>
      <PortalHeader
        title="환율, 뉴스, 리포트, 팟캐스트를 한 화면에"
        description="Ecolist는 금융 뉴스를 스크랩해 요약하고, 주간 리포트를 자동 작성하며, 팟캐스트까지 함께 제공하는 금융 인텔리전스 포털입니다."
        actionHref="/dashboard"
        actionLabel="대시보드"
      />

      <section style={{ padding: '0 24px 24px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
            <NewsletterBadge label="매주 자동 리포트" />
            <NewsletterBadge label="경제 뉴스 요약" />
            <NewsletterBadge label="오디오 브리핑" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14 }}>
            {metrics ? metrics.map((item) => <MetricCard key={item.label} {...item} />) : [...Array(4)].map((_, i) => <MetricSkeleton key={i} />)}
          </div>
          <div style={{ marginTop: 10, color: '#94a3b8', fontSize: 12 }}>
            업데이트: {marketUpdated}
          </div>
        </div>
      </section>

      <section style={{ padding: '22px 24px 12px' }}>
        <div className="container">
          <SectionHeading
            kicker="WEEKLY REPORT"
            title="주간 금융 보고서"
            description="환율, 금리 기대, 원자재 흐름을 묶어서 매주 정리하는 자동 리포트 아카이브입니다."
            action={<Link href="/reports" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>전체 보기 <ArrowRight size={16} /></Link>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            {reports.map((report) => (
              <ContentCard
                key={report.id}
                href="/reports"
                meta={`${report.week_label} · ${formatCompactDate(report.published_at)}`}
                title={report.title}
                description={`${report.summary} ${report.highlight ? `\n${report.highlight}` : ''}`}
                tone="dark"
              />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '42px 24px 12px' }}>
        <div className="container">
          <SectionHeading
            kicker="NEWS DESK"
            title="경제 뉴스 스크랩 · 요약"
            description="매일 쌓이는 경제 뉴스를 빠르게 훑고 핵심만 남기는 뉴스 데스크입니다."
            action={<Link href="/news" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>뉴스룸 <ArrowRight size={16} /></Link>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 14 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              {news.slice(0, 3).map((item) => (
                <div key={item.id} style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2.5, color: '#7dd3fc', marginBottom: 8 }}>{item.source} · {item.category}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1.35, letterSpacing: '-0.04em', marginBottom: 10 }}>{item.title}</div>
                      <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>{excerpt(item.summary, 140)}</p>
                    </div>
                    <Newspaper size={18} color="#7dd3fc" />
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', fontSize: 12, color: '#94a3b8' }}>
                    <span>{formatCompactDate(item.published_at)}</span>
                    {item.url ? <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#7dd3fc', textDecoration: 'none', fontWeight: 800 }}>원문 보기</a> : null}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ padding: 22, borderRadius: 22, background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,64,175,0.92))', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 3, color: '#7dd3fc', marginBottom: 12 }}>MARKET SNAPSHOT</div>
                <div style={{ fontSize: 30, fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.05em', marginBottom: 12 }}>
                  {heroRates ? `${heroRates.usd.toFixed(2)} 원` : '환율 로딩 중'}
                </div>
                <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                  달러, 위안, 엔화와 원자재 시세를 함께 보고 리포트와 뉴스의 문맥을 연결합니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                  <div style={{ padding: 14, borderRadius: 18, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>USD 변동</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{heroRates?.usd?.toFixed(2) ?? '-'}</div>
                  </div>
                  <div style={{ padding: 14, borderRadius: 18, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>구리 변화</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{pct(heroChange)}</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ fontSize: 12, color: '#7dd3fc', fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>자동화 구조</div>
                <div style={{ display: 'grid', gap: 10, color: '#e2e8f0', lineHeight: 1.7, fontSize: 14 }}>
                  <div>1. 뉴스 수집기: RSS/허용 소스에서 기사 수집</div>
                  <div>2. 요약기: 핵심 문장만 남겨 짧게 정리</div>
                  <div>3. 리포트 작성기: 환율·지표·뉴스를 묶어 주간 보고서 작성</div>
                  <div>4. 팟캐스트: 리포트 요약을 오디오 스크립트로 변환</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '42px 24px 12px' }}>
        <div className="container">
          <SectionHeading
            kicker="PODCAST STUDIO"
            title="팟캐스트 브리핑"
            description="주간 리포트와 경제 뉴스를 오디오로 풀어내는 브리핑 존입니다."
            action={<Link href="/podcast" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>에피소드 <ArrowRight size={16} /></Link>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            {podcasts.map((episode) => (
              <div key={episode.id} style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ fontSize: 11, color: '#7dd3fc', fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>{episode.host}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 10 }}>{episode.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#cbd5e1', marginBottom: 16 }}>{episode.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, color: '#94a3b8', fontSize: 12 }}>
                  <span>{formatCompactDate(episode.published_at)}</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 24px 88px' }}>
        <div className="container">
          <div style={{ padding: 26, borderRadius: 28, background: 'linear-gradient(135deg, rgba(8,13,22,0.98), rgba(15,118,110,0.9))', border: '1px solid rgba(148,163,184,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 700 }}>
              <div style={{ fontSize: 12, color: '#7dd3fc', fontWeight: 800, letterSpacing: 3, marginBottom: 12 }}>NEXT STEP</div>
              <div style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 950, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.06em', marginBottom: 12 }}>
                자동 생성, 자동 요약, 자동 저장까지 이어지는 금융 포털로 확장합니다.
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: 15 }}>
                Supabase에 리포트·뉴스·팟캐스트를 쌓아 두고, 크론 작업이 매주 데이터를 갱신하면 운영형 금융사이트가 됩니다.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/reports" className="btn-primary">
                리포트 아카이브 <ArrowRight size={16} />
              </Link>
              <Link href="/news" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>
                뉴스룸
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
