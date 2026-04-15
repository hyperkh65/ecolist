import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// stooq.com 심볼 + 단위 변환 계수
// al.f: USD/MT (×1), hg/ni/zn.f: cents/lb → USD/MT (×22.04623)
const METAL_DEFS = [
  { sym: 'al.f', key: 'aluminum', name: '알루미늄', factor: 1 },
  { sym: 'hg.f', key: 'copper',   name: '구리',    factor: 22.04623 },
  { sym: 'ni.f', key: 'nickel',   name: '니켈',    factor: 22.04623 },
  { sym: 'zn.f', key: 'zinc',     name: '아연',    factor: 22.04623 },
];

async function fetchRates() {
  const res = await fetch(
    'https://api.manana.kr/exchange/rate/KRW/USD,CNY,JPY.json',
    { cache: 'no-store' }
  );
  const data = await res.json();
  const find = (key: string) => data.find((i: { name: string; rate: number }) => i.name.includes(key))?.rate ?? 0;
  return { usd: find('USD'), cny: find('CNY'), jpy: find('JPY') };
}

// stooq CSV: Symbol,Date,Time,Open,High,Low,Close,Volume
async function fetchStooqMetal(sym: string, factor: number) {
  const res = await fetch(
    `https://stooq.com/q/l/?s=${sym}&f=sd2t2ohlcv&h&e=csv`,
    { headers: { 'User-Agent': 'Mozilla/5.0' }, cache: 'no-store' }
  );
  const text = await res.text();
  const lines = text.trim().split('\n');
  if (lines.length < 2) return null;

  const cols = lines[1].split(',');
  const open  = parseFloat(cols[3]);
  const close = parseFloat(cols[6]);
  if (isNaN(close) || close === 0 || cols[1] === 'N/D') return null;

  const price    = Math.round(close * factor);
  const prev     = Math.round(open  * factor);
  const change   = price - prev;
  const changePct = prev ? (change / prev) * 100 : 0;

  return { price, prev, change, changePct, currency: 'USD', unit: 'USD/MT' };
}

async function fetchMetals() {
  const results = await Promise.allSettled(
    METAL_DEFS.map(async ({ sym, key, factor }) => ({
      key,
      data: await fetchStooqMetal(sym, factor),
    }))
  );

  const metals: Record<string, ReturnType<typeof fetchStooqMetal> extends Promise<infer T> ? T : never> = {};
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value.data) {
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
    copper:   metals.copper?.price ?? null,
    nickel:   metals.nickel?.price ?? null,
    zinc:     metals.zinc?.price ?? null,
    lead:     null,
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
