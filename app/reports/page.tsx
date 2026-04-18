'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarRange, FileText, LockKeyhole } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ContentCard, PortalHeader, PortalShell, SectionHeading } from '@/components/EcolistShell';
import { FALLBACK_WEEKLY_REPORTS, WeeklyReport, formatCompactDate } from '@/lib/ecolist';

export default function ReportsPage() {
  const [reports, setReports] = useState<WeeklyReport[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('finance_weekly_reports')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(20);
        if (data?.length) setReports(data as WeeklyReport[]);
        else setReports(FALLBACK_WEEKLY_REPORTS);
      } catch {
        setReports(FALLBACK_WEEKLY_REPORTS);
      }
    }

    load();
  }, []);

  return (
    <PortalShell>
      <PortalHeader
        kicker="WEEKLY REPORT"
        title="주간 리포트 아카이브"
        description="환율과 금리, 시장 체감과 뉴스 흐름을 묶어 자동 작성되는 주간 금융 리포트 저장소입니다."
        actionHref="/news"
        actionLabel="뉴스룸"
      />

      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <SectionHeading
            kicker="ARCHIVE"
            title="최근 리포트"
            description="저장된 리포트를 빠르게 훑고, 필요한 보고서만 다시 열람할 수 있게 구성했습니다."
            action={<Link href="/" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(148,163,184,0.18)' }}>홈으로 <ArrowRight size={16} /></Link>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            {reports.map((report) => (
              <ContentCard
                key={report.id}
                meta={`${report.week_label} · ${formatCompactDate(report.published_at)}`}
                title={report.title}
                description={`${report.summary} ${report.highlight ? `\n${report.highlight}` : ''}`}
                tone="dark"
              />
            ))}
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <CalendarRange size={18} color="#7dd3fc" />
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginTop: 12, marginBottom: 8 }}>주간 자동 작성</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>매주 정해진 시간에 시장 데이터를 모아 리포트를 생성합니다.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <FileText size={18} color="#7dd3fc" />
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginTop: 12, marginBottom: 8 }}>PDF / HTML</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>웹 브리핑과 문서형 보고서를 같이 운영할 수 있습니다.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.14)' }}>
              <LockKeyhole size={18} color="#7dd3fc" />
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginTop: 12, marginBottom: 8 }}>내부 전용</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: 14 }}>잠금 리포트도 계정 기반으로 공개 범위를 나눌 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
