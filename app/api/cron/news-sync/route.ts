import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { getServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const FEEDS = [
  { source: 'Reuters', category: 'macro', url: 'https://feeds.reuters.com/reuters/businessNews' },
  { source: 'CNBC', category: 'markets', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
  { source: 'Yahoo Finance', category: 'markets', url: 'https://finance.yahoo.com/news/rssindex' },
];

function summarize(text: string) {
  const cleaned = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = cleaned.split(/(?<=[.!?])\s+/);
  return parts.slice(0, 2).join(' ').slice(0, 220);
}

function relevanceScore(title: string, summary: string) {
  const text = `${title} ${summary}`.toLowerCase();
  let score = 0;
  for (const term of ['fed', 'rate', 'inflation', 'fx', 'dollar', 'krw', 'yuan', 'yen', 'oil', 'trade']) {
    if (text.includes(term)) score += 1;
  }
  return score;
}

function detectCategory(title: string, summary: string) {
  const text = `${title} ${summary}`.toLowerCase();
  if (text.includes('rate') || text.includes('inflation') || text.includes('fed')) return 'macro';
  if (text.includes('dollar') || text.includes('krw') || text.includes('yen') || text.includes('yuan')) return 'fx';
  if (text.includes('oil') || text.includes('copper') || text.includes('commodity')) return 'commodities';
  return 'markets';
}

export async function GET() {
  const supabase = getServerSupabase();
  const parser = new XMLParser({ ignoreAttributes: false, processEntities: true });

  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (feed) => {
        const res = await fetch(feed.url, { cache: 'no-store', headers: { 'User-Agent': 'EcolistBot/1.0' } });
        const xml = await res.text();
        const parsed = parser.parse(xml);
        const items = parsed?.rss?.channel?.item ?? parsed?.feed?.entry ?? [];
        const normalized = Array.isArray(items) ? items : [items];

        return normalized.slice(0, 6).map((item: any) => {
          const title = String(item.title ?? '').trim();
          const rawSummary = String(item.description ?? item.summary ?? item['content:encoded'] ?? '').trim();
          const summary = summarize(rawSummary || title);
          const link = String(item.link?.['@_href'] || item.link || '').trim();
          const pubDate = String(item.pubDate ?? item.published ?? item.updated ?? new Date().toISOString());

          return {
            source: feed.source,
            category: detectCategory(title, summary) || feed.category,
            title,
            summary,
            url: link,
            relevance_score: relevanceScore(title, summary),
            published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          };
        });
      })
    );

    const rows = results.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
    const uniqueRows = rows.filter((row, idx, arr) => row.url && arr.findIndex((r) => r.url === row.url) === idx);

    if (uniqueRows.length > 0) {
      const { data: existing } = await supabase
        .from('finance_news_items')
        .select('url')
        .in('url', uniqueRows.map((row) => row.url));
      const existingUrls = new Set((existing ?? []).map((item) => item.url));
      const freshRows = uniqueRows.filter((row) => !existingUrls.has(row.url));

      if (freshRows.length > 0) {
        await supabase.from('finance_news_items').insert(freshRows);
      }
    }

    return NextResponse.json({ success: true, inserted: uniqueRows.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
