import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function fmtPct(change: number) {
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
}

function avg(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export async function GET() {
  const supabase = getServerSupabase();

  try {
    const { data: market } = await supabase
      .from('market_history')
      .select('*')
      .order('date', { ascending: false })
      .limit(8);

    const { data: news } = await supabase
      .from('finance_news_items')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(5);

    const latest = market?.[0];
    const oldest = market?.[market.length - 1];
    const usdChange = latest && oldest ? ((Number(latest.usd || 0) - Number(oldest.usd || 0)) / Number(oldest.usd || 1)) * 100 : 0;
    const cnyChange = latest && oldest ? ((Number(latest.cny || 0) - Number(oldest.cny || 0)) / Number(oldest.cny || 1)) * 100 : 0;
    const copperSeries = (market ?? []).map((row) => Number(row.copper || 0)).filter((v) => v > 0);
    const copperAvg = avg(copperSeries);

    const weekLabel = `Week of ${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}`;
    const summary = [
      `이번 주 금융 요약은 환율 변동성과 원자재 평균 흐름을 중심으로 정리했습니다.`,
      `USD/KRW는 ${fmtPct(usdChange)} 방향으로 움직였고, CNY/KRW는 ${fmtPct(cnyChange)}로 해석할 수 있습니다.`,
      copperAvg ? `구리 평균 시세는 ${Math.round(copperAvg).toLocaleString('ko-KR')} 수준에서 시장 체감에 영향을 줬습니다.` : '구리 데이터가 충분하지 않아 원자재 평균은 보류했습니다.',
      news?.length ? `뉴스에서는 ${news[0].title} 등 핵심 이슈가 주간 포인트로 잡혔습니다.` : '뉴스 스크랩이 아직 충분하지 않아 이번 주 핵심 이슈는 별도 입력이 필요합니다.',
    ].join(' ');

    const bullets = [
      `USD/KRW ${fmtPct(usdChange)}`,
      `CNY/KRW ${fmtPct(cnyChange)}`,
      copperAvg ? `구리 평균 ${Math.round(copperAvg).toLocaleString('ko-KR')}` : '원자재 평균 확인 필요',
      news?.length ? `뉴스 하이라이트 ${news[0].title}` : '뉴스 수집 대기',
    ];

    const report = {
      week_label: weekLabel,
      title: '주간 금융 브리핑',
      summary,
      highlight: news?.[0]?.summary || '시장 데이터와 경제 뉴스의 조합으로 자동 생성된 브리핑입니다.',
      bullets,
      market_snapshot: {
        latest,
        oldest,
        news_count: news?.length ?? 0,
      },
      slug: `weekly-${new Date().toISOString().slice(0, 10)}`,
      published_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('finance_weekly_reports').insert(report);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
