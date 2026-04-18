import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET() {
  const supabase = getServerSupabase();

  try {
    const { data: latestReport } = await supabase
      .from('finance_weekly_reports')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(1);

    const report = latestReport?.[0];
    const episode = {
      host: 'Ecolist Desk',
      title: report ? `${report.title} 오디오 브리핑` : '이번 주 금융 브리핑',
      description: report
        ? `주간 리포트 "${report.title}"를 10분 내외로 정리한 오디오 에피소드입니다.`
        : '환율과 뉴스 흐름을 짧게 듣는 금융 브리핑입니다.',
      script_summary: report?.summary || '주간 데이터가 없어서 기본 브리핑 스크립트로 채웁니다.',
      audio_url: null,
      cover_url: null,
      duration: '08:30',
      published_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('finance_podcast_episodes').insert(episode);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, episode });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
