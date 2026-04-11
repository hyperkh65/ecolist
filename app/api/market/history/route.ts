import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const YF_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://finance.yahoo.com/',
};

// Yahoo Finance 환율 심볼 (KRW 기준)
const CURRENCY_SYMBOLS: Record<string, string> = {
  usd: 'USDKRW=X',
  cny: 'CNYKRW=X',
  jpy: 'JPYKRW=X',
};

// stooq 비철금속 심볼 + 단위변환 (cents/lb → USD/MT: ×22.04623, USD/MT: ×1)
const METAL_CONFIG: Record<string, { sym: string; factor: number }> = {
  aluminum: { sym: 'al.f', factor: 1 },
  copper:   { sym: 'hg.f', factor: 22.04623 },
  nickel:   { sym: 'ni.f', factor: 22.04623 },
  zinc:     { sym: 'zn.f', factor: 22.04623 },
};

function buildParams(range: string): { yfRange: string; yfInterval: string; stooqInterval: string; d1: string } {
  const now = new Date();
  const past = new Date(now);
  if (range === '5y')  past.setFullYear(now.getFullYear() - 5);
  else if (range === '10y') past.setFullYear(now.getFullYear() - 10);
  else past.setFullYear(now.getFullYear() - 1); // default 1y

  const d1 = past.toISOString().slice(0, 10).replace(/-/g, '');
  const yfRange = range === '10y' ? '10y' : range === '5y' ? '5y' : '1y';
  // 1y→주봉, 5y→주봉, 10y→월봉
  const yfInterval    = range === '10y' ? '1mo' : '1wk';
  const stooqInterval = range === '10y' ? 'm'   : 'w';

  return { yfRange, yfInterval, stooqInterval, d1 };
}

async function fetchCurrencyHistory(sym: string, range: string, isJpy: boolean) {
  const { yfRange, yfInterval } = buildParams(range);

  for (const host of ['query1', 'query2']) {
    try {
      const url = `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=${yfInterval}&range=${yfRange}`;
      const res = await fetch(url, { headers: YF_HEADERS, cache: 'no-store' });
      if (!res.ok) continue;
      const json = await res.json();
      const result = json?.chart?.result?.[0];
      if (!result) continue;

      const timestamps: number[] = result.timestamp ?? [];
      const closes: (number | null)[] = result.indicators?.quote?.[0]?.close ?? [];

      const points = timestamps
        .map((ts, i) => ({
          date: new Date(ts * 1000).toISOString().slice(0, 10),
          price: closes[i],
        }))
        .filter((p): p is { date: string; price: number } => p.price !== null && !isNaN(p.price))
        .map(p => ({ ...p, price: isJpy ? +(p.price * 100).toFixed(2) : +p.price.toFixed(2) }));

      return points;
    } catch { /* try next */ }
  }
  return [];
}

async function fetchMetalHistory(sym: string, factor: number, range: string) {
  const { stooqInterval, d1, yfRange } = buildParams(range);
  const d2 = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  try {
    const url = `https://stooq.com/q/d/l/?s=${sym}&i=${stooqInterval}&d1=${d1}&d2=${d2}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, cache: 'no-store' });
    const text = await res.text();
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    // stooq d/l format: Date,Open,High,Low,Close,Volume
    return lines.slice(1)
      .map(line => {
        const cols = line.split(',');
        const date  = cols[0];
        const close = parseFloat(cols[4]);
        if (!date || isNaN(close) || close === 0 || date === 'N/D') return null;
        return { date, price: Math.round(close * factor) };
      })
      .filter(Boolean) as { date: string; price: number }[];
  } catch {
    return [];
  }
  void yfRange; // suppress unused warning
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key   = searchParams.get('key')   ?? 'usd';
  const range = searchParams.get('range') ?? '1y';

  try {
    let points: { date: string; price: number }[] = [];

    if (CURRENCY_SYMBOLS[key]) {
      points = await fetchCurrencyHistory(CURRENCY_SYMBOLS[key], range, key === 'jpy');
    } else if (METAL_CONFIG[key]) {
      const { sym, factor } = METAL_CONFIG[key];
      points = await fetchMetalHistory(sym, factor, range);
    }

    return NextResponse.json({ key, range, points });
  } catch (e) {
    return NextResponse.json({ key, range, points: [], error: String(e) });
  }
}
