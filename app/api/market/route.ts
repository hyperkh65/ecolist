import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const METAL_DEFS = [
  { symbol: 'ALI=F', key: 'aluminum', name: '알루미늄', unit: 'USD/MT' },
  { symbol: 'HG=F',  key: 'copper',   name: '구리',    unit: 'USD/lb' },
  { symbol: 'NI=F',  key: 'nickel',   name: '니켈',    unit: 'USD/MT' },
  { symbol: 'ZNC=F', key: 'zinc',     name: '아연',    unit: 'USD/MT' },
  { symbol: 'PB=F',  key: 'lead',     name: '납',      unit: 'USD/MT' },
];

const YF_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://finance.yahoo.com/',
  'Origin': 'https://finance.yahoo.com',
};

async function fetchRates() {
  const res = await fetch(
    'https://api.manana.kr/exchange/rate/KRW/USD,CNY,JPY.json',
    { cache: 'no-store' }
  );
  const data = await res.json();
  const find = (key: string) => data.find((i: { name: string; rate: number }) => i.name.includes(key))?.rate ?? 0;
  return { usd: find('USD'), cny: find('CNY'), jpy: find('JPY') };
}

// Yahoo Finance v8 chart API - 심볼별 개별 조회 (v7 batch보다 안정적)
async function fetchSingleMetal(sym: string) {
  const encoded = encodeURIComponent(sym);

  // query1 먼저 시도, 실패 시 query2
  for (const host of ['query1', 'query2']) {
    try {
      const url = `https://${host}.finance.yahoo.com/v8/finance/chart/${encoded}?interval=1d&range=5d`;
      const res = await fetch(url, { headers: YF_HEADERS, cache: 'no-store' });
      if (!res.ok) continue;
      const json = await res.json();
      const result = json?.chart?.result?.[0];
      if (!result) continue;

      const meta = result.meta;
      const price: number = meta.regularMarketPrice ?? 0;
      const prev: number = meta.previousClose ?? meta.chartPreviousClose ?? 0;
      const change = price - prev;
      const changePct = prev ? (change / prev) * 100 : 0;
      const currency: string = meta.currency ?? 'USD';
      const name: string = meta.shortName ?? sym;

      return { price, prev, change, changePct, currency, name };
    } catch {
      // try next host
    }
  }
  return null;
}

async function fetchMetals() {
  const results = await Promise.allSettled(
    METAL_DEFS.map(async (def) => {
      const data = await fetchSingleMetal(def.symbol);
      return { key: def.key, data };
    })
  );

  const metals: Record<string, { price: number; prev: number; change: number; changePct: number; currency: string; name: string } | null> = {};
  for (const r of results) {
    if (r.status === 'fulfilled') {
      metals[r.value.key] = r.value.data;
    }
  }
  return metals;
}

async function saveTodaySnapshot(
  rates: { usd: number; cny: number; jpy: number },
  metals: Record<string, { price: number } | null>
) {
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabase.from('market_history').select('date').eq('date', today).single();
  if (data) return;

  await supabase.from('market_history').insert({
    date: today,
    usd: rates.usd,
    cny: rates.cny,
    jpy: rates.jpy,
    aluminum: metals.aluminum?.price ?? null,
    copper: metals.copper?.price ?? null,
    nickel: metals.nickel?.price ?? null,
    zinc: metals.zinc?.price ?? null,
    lead: metals.lead?.price ?? null,
  });
}

export async function GET() {
  try {
    const [rates, metals] = await Promise.all([fetchRates(), fetchMetals()]);
    saveTodaySnapshot(rates, metals).catch(console.error);

    const { data: history } = await supabase
      .from('market_history')
      .select('*')
      .order('date', { ascending: false })
      .limit(30);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      rates,
      metals,
      history: (history ?? []).reverse(),
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
