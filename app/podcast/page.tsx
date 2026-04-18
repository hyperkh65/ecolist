'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Headphones, Radio } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PodcastCard, PortalHeader, PortalShell, SectionHeading } from '@/components/EcolistShell';
import { FALLBACK_PODCASTS, PodcastEpisode, formatCompactDate } from '@/lib/ecolist';

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('finance_podcast_episodes')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(12);
        if (data?.length) setEpisodes(data as PodcastEpisode[]);
        else setEpisodes(FALLBACK_PODCASTS);
      } catch {
        setEpisodes(FALLBACK_PODCASTS);
      }
    }

    load();
  }, []);

  return (
    <PortalShell>
      <PortalHeader
        kicker="PODCAST STUDIO"
        title="금융 브리핑 팟캐스트"
        description="주간 리포트와 경제 뉴스를 짧은 오디오로 바꿔, 출퇴근 중에도 금융 흐름을 들을 수 있게 만든 브리핑 스튜디오입니다."
        actionHref="/dashboard"
        actionLabel="대시보드"
      />

      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <SectionHeading
            kicker="EPISODES"
            title="에피소드 아카이브"
            description="스트리밍 플레이어와 요약 스크립트를 함께 붙일 수 있는 팟캐스트 섹션입니다."
            action={<Link href="/" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>홈으로 <ArrowRight size={16} /></Link>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: 14, alignItems: 'start' }}>
            <div style={{ display: 'grid', gap: 14 }}>
              {episodes.map((episode) => (
                <PodcastCard
                  key={episode.id}
                  title={episode.title}
                  description={episode.description}
                  duration={episode.duration}
                  published={formatCompactDate(episode.published_at)}
                  audioUrl={episode.audio_url}
                />
              ))}
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ padding: 22, borderRadius: 22, background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(14,116,144,0.92))', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ fontSize: 12, color: '#7dd3fc', fontWeight: 800, letterSpacing: 3, marginBottom: 12 }}>AUDIO FLOW</div>
                <div style={{ fontSize: 26, fontWeight: 950, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.05em', marginBottom: 12 }}>
                  리포트를 듣는 습관으로 바꾸는 오디오 브리핑
                </div>
                <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: 14 }}>
                  자동 작성된 주간 보고서를 스크립트로 바꾸고, 핵심만 5~10분짜리 오디오로 제공할 수 있습니다.
                </p>
              </div>

              <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, color: '#7dd3fc', fontSize: 12, fontWeight: 800, letterSpacing: 2 }}>
                  <Headphones size={16} /> AUDIO NOTES
                </div>
                <div style={{ display: 'grid', gap: 10, color: '#e2e8f0', lineHeight: 1.75, fontSize: 14 }}>
                  <div>• 환율 브리핑</div>
                  <div>• 뉴스 핵심 요약</div>
                  <div>• 금리/원자재 체크포인트</div>
                  <div>• 투자자 메모용 스크립트</div>
                </div>
              </div>

              <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, color: '#7dd3fc', fontSize: 12, fontWeight: 800, letterSpacing: 2 }}>
                  <Radio size={16} /> LIVE PLAN
                </div>
                <div style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>
                  AI 내레이션, 배경 음악, 자동 분량 조절까지 붙이면 정규 편성도 가능해집니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
