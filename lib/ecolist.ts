export type MarketSnapshot = {
  timestamp?: string;
  rates?: { usd: number; cny: number; jpy: number };
  metals?: Record<string, { price: number; prev: number; change: number; changePct: number }>;
  history?: Array<Record<string, number | string>>;
};

export type WeeklyReport = {
  id: string;
  week_label: string;
  title: string;
  summary: string;
  highlight: string;
  published_at: string;
  bullets: string[];
};

export type NewsBrief = {
  id: string;
  source: string;
  title: string;
  summary: string;
  url?: string;
  published_at: string;
  category: string;
};

export type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  audio_url?: string;
  cover_url?: string;
  duration: string;
  published_at: string;
  host: string;
};

export const FALLBACK_WEEKLY_REPORTS: WeeklyReport[] = [
  {
    id: 'wk-1',
    week_label: '이번 주 리포트',
    title: '환율 변동과 금리 기대를 함께 읽는 체크포인트',
    summary: '달러 강세와 위험자산 선호가 교차하면서 수입 단가와 헤지 전략의 중요도가 높아졌습니다.',
    highlight: 'USD/KRW, 원자재, 정책 발언을 함께 보는 주간 프레임',
    published_at: new Date().toISOString(),
    bullets: ['환율 방향성 점검', '원자재 가격 방어력 체크', '수출입 납기 리스크 메모'],
  },
  {
    id: 'wk-2',
    week_label: '아카이브',
    title: '주간 시장 요약: 물가, 고용, 정책이 만든 체감 온도',
    summary: '주요 경제지표 발표가 시장의 기대와 실제를 조금씩 조정하는 과정이 이어졌습니다.',
    highlight: '지표 발표 이후 단기 변동성 확대 구간 확인',
    published_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    bullets: ['지표 발표 일정', '섹터별 반응', '다음 주 일정'],
  },
];

export const FALLBACK_NEWS: NewsBrief[] = [
  {
    id: 'news-1',
    source: 'Reuters',
    title: '글로벌 달러 흐름이 아시아 수입 단가에 미치는 영향',
    summary: '달러 강세가 이어지면 원자재와 부품 수입 단가가 단계적으로 반영될 가능성이 큽니다.',
    url: 'https://www.reuters.com',
    published_at: new Date().toISOString(),
    category: 'FX',
  },
  {
    id: 'news-2',
    source: 'CNBC',
    title: '금리 기대 변화로 바뀌는 투자자 포지셔닝',
    summary: '연준 발언과 물가 데이터에 따라 채권과 주식의 상대 매력도가 재조정되고 있습니다.',
    url: 'https://www.cnbc.com',
    published_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    category: 'Macro',
  },
  {
    id: 'news-3',
    source: 'Ecolist Desk',
    title: '이번 주 주목할 경제 뉴스 3가지',
    summary: '환율, 정책, 산업지표를 묶어 보면 다음 한 주의 방향이 좀 더 선명해집니다.',
    published_at: new Date(Date.now() - 86400000).toISOString(),
    category: 'Weekly',
  },
];

export const FALLBACK_PODCASTS: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: '이번 주 금융 브리핑',
    description: '환율과 금리, 원자재 가격을 한 번에 듣는 8분짜리 요약 에피소드.',
    duration: '08:14',
    published_at: new Date().toISOString(),
    host: 'Ecolist Desk',
  },
  {
    id: 'pod-2',
    title: '수입 단가와 헤지 전략',
    description: '실무에서 바로 쓰는 환율 대응 체크리스트를 짧게 정리한 에피소드.',
    duration: '11:26',
    published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    host: 'Ecolist Lab',
  },
];

export function formatCompactDate(input?: string) {
  if (!input) return '-';
  try {
    return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(input));
  } catch {
    return input;
  }
}

export function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function excerpt(input: string, max = 110) {
  const text = stripHtml(input);
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function toKRW(value: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(value));
}
