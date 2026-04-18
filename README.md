# Ecolist

금융 인텔리전스 포털입니다. 환율, 원자재, 경제 뉴스, 주간 리포트, 팟캐스트를 한곳에서 보고 자동으로 축적하는 사이트를 목표로 합니다.

## 포함 기능

- 실시간 환율 및 원자재 대시보드
- 주간 금융 보고서 아카이브
- 경제 뉴스 스크랩 및 요약
- 팟캐스트 브리핑
- Supabase 기반 저장 구조
- 자동 수집용 크론 API

## 개발

```bash
npm install
npm run dev
```

## 데이터 구조

- `finance_weekly_reports`
- `finance_news_items`
- `finance_podcast_episodes`
- `finance_jobs`
- `finance_market_snapshots`

## 배포

Vercel에 배포 후 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`를 연결해서 사용합니다.
