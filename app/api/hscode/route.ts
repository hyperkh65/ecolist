import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const CRKY_CN = 'r260g286i041p271c040p050q0';
const BASE = 'https://unipass.customs.go.kr/ext/rest';

// FTA 협정명
const FTA_NAMES: Record<string, string> = {
  'A': 'ASEAN (아세안)', 'AU': '한-호주', 'CA': '한-캐나다', 'CL': '한-칠레',
  'CN': '한-중국', 'CO': '한-콜롬비아', 'E': '한-EFTA', 'EU': '한-EU',
  'GB': '한-영국', 'IL': '한-이스라엘', 'IN': '한-인도 (CEPA)', 'KH': '한-캄보디아',
  'NZ': '한-뉴질랜드', 'PE': '한-페루', 'RC': 'RCEP', 'SG': '한-싱가포르',
  'TR': '한-터키', 'US': '한-미국 (KORUS)', 'VN': '한-베트남', 'MX': '한-멕시코',
};

const RATE_TYPE: Record<string, string> = {
  '1': '기본세율', '2': 'WTO 협정세율 (MFN)', '3': '잠정세율',
  '4': 'FTA 협정세율', '5': '특별긴급관세', '6': '편익관세', '8': '국제협력관세',
};

// ─── HS 코드 DB 로드 (관세청 data.go.kr 2026-01-01 기준, 11,327건) ───
interface HsEntry { nm: string; en: string; u: string; }
let hsDb: Record<string, HsEntry> | null = null;

function getHsDb(): Record<string, HsEntry> {
  if (!hsDb) {
    try {
      const path = join(process.cwd(), 'public', 'data', 'hs_codes.json');
      hsDb = JSON.parse(readFileSync(path, 'utf-8'));
    } catch {
      hsDb = {};
    }
  }
  return hsDb!;
}

function lookupHs(hsSgn: string): HsEntry | null {
  const db = getHsDb();
  // 정확 매칭
  if (db[hsSgn]) return db[hsSgn];
  // 짧은 코드 → 10자리로 패딩해서 검색
  if (hsSgn.length < 10) {
    const padded = hsSgn.padEnd(10, '0');
    if (db[padded]) return db[padded];
    // prefix 매칭 (첫 번째 hit)
    for (const [key, val] of Object.entries(db)) {
      if (key.startsWith(hsSgn)) return val;
    }
  }
  return null;
}

function searchHsKeyword(keyword: string, limit = 30): Array<{hsSgn: string} & HsEntry> {
  const db = getHsDb();
  const kw = keyword.toLowerCase();
  const results: Array<{hsSgn: string} & HsEntry> = [];
  for (const [hsSgn, v] of Object.entries(db)) {
    if (v.nm.includes(keyword) || v.en.toLowerCase().includes(kw)) {
      results.push({ hsSgn, ...v });
      if (results.length >= limit) break;
    }
  }
  return results;
}

// ─── 주요 LED/조명 HS 코드 내장 세율 (2026년 개정 기준, 참고용) ───
interface StaticRate {
  basic: string; wto: string;
  fta: { ftaCd: string; rate: string; note?: string; }[];
}
const STATIC_RATES: Record<string, StaticRate> = {
  // LED 모듈 (구 8541.40 → 신 8539.51)
  '8539510000': {
    basic: '8', wto: '0',  // ITA(정보기술협정) 적용
    fta: [
      { ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' },
      { ftaCd: 'CN', rate: '0' }, { ftaCd: 'A',  rate: '0' },
      { ftaCd: 'RC', rate: '0' }, { ftaCd: 'AU', rate: '0' },
      { ftaCd: 'VN', rate: '0' }, { ftaCd: 'SG', rate: '0' },
    ],
  },
  // LED 램프 (구 8539.50 → 신 8539.52)
  '8539520000': {
    basic: '8', wto: '8',
    fta: [
      { ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' },
      { ftaCd: 'CN', rate: '0', note: '단계적 인하' },
      { ftaCd: 'A',  rate: '0' }, { ftaCd: 'RC', rate: '0' },
      { ftaCd: 'VN', rate: '0' }, { ftaCd: 'AU', rate: '0' },
    ],
  },
  // LED 광원 전용 조명기구 - 천장/벽 (신 9405.11)
  '9405110000': {
    basic: '8', wto: '8',
    fta: [
      { ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' },
      { ftaCd: 'CN', rate: '4.8', note: '2024년 기준' },
      { ftaCd: 'A',  rate: '0' }, { ftaCd: 'RC', rate: '5.6', note: '단계적 인하' },
      { ftaCd: 'VN', rate: '0' }, { ftaCd: 'AU', rate: '0' },
    ],
  },
  // LED 광원 전용 조명기구 - 스탠드/데스크 (신 9405.21)
  '9405210000': {
    basic: '8', wto: '8',
    fta: [
      { ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' },
      { ftaCd: 'CN', rate: '4.8', note: '2024년 기준' },
      { ftaCd: 'A',  rate: '0' }, { ftaCd: 'RC', rate: '5.6', note: '단계적 인하' },
    ],
  },
  // LED 광원 전용 조명기구 - 간판/광고 (신 9405.31)
  '9405310000': {
    basic: '8', wto: '8',
    fta: [
      { ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' },
      { ftaCd: 'CN', rate: '4.8', note: '2024년 기준' },
      { ftaCd: 'A',  rate: '0' },
    ],
  },
  // 기타 LED 광원 전용 조명기구 (신 9405.42)
  '9405420000': {
    basic: '8', wto: '8',
    fta: [
      { ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' },
      { ftaCd: 'CN', rate: '4.8', note: '2024년 기준' },
      { ftaCd: 'A',  rate: '0' }, { ftaCd: 'RC', rate: '5.6', note: '단계적 인하' },
    ],
  },
  // LED 방폭/투광/가로등 (신 9405.49x)
  '9405491000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '4.8' }] },
  '9405492000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '4.8' }] },
  '9405493000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '4.8' }] },
  '9405499000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '4.8' }] },
  // 조명기구 부품
  '9405910000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '0', note: '단계적 인하' }] },
  '9405920000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '0', note: '단계적 인하' }] },
  '9405990000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '0', note: '단계적 인하' }] },
  // 전선류
  '8544421000': { basic: '8', wto: '8', fta: [{ ftaCd: 'US', rate: '0' }, { ftaCd: 'EU', rate: '0' }, { ftaCd: 'CN', rate: '0', note: '단계적 인하' }] },
};

function findStaticRate(hsSgn: string): StaticRate | null {
  if (STATIC_RATES[hsSgn]) return STATIC_RATES[hsSgn];
  if (hsSgn.length < 10) {
    const padded = hsSgn.padEnd(10, '0');
    if (STATIC_RATES[padded]) return STATIC_RATES[padded];
    for (const [key, val] of Object.entries(STATIC_RATES)) {
      if (key.startsWith(hsSgn)) return val;
    }
  }
  return null;
}

function cleanHs(raw: string) {
  return raw.replace(/[\.\-\s]/g, '').slice(0, 10);
}

async function fetchTariffBook(hsSgn: string) {
  const url = `${BASE}/tariffBook/retrieveTariffBook?crkyCn=${CRKY_CN}&hsSgn=${hsSgn}&_type=json`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const text = await res.text();
  if (!text || text.length < 5) return [];
  const data = JSON.parse(text);
  const items = data?.response?.body?.items?.item;
  return items ? (Array.isArray(items) ? items : [items]) : [];
}

async function fetchFtaTariff(hsSgn: string) {
  const url = `${BASE}/ftaTariffQry/retrieveFtaTariffQryList?crkyCn=${CRKY_CN}&hsSgn=${hsSgn}&_type=json`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const text = await res.text();
  if (!text || text.length < 5) return [];
  const data = JSON.parse(text);
  const items = data?.response?.body?.items?.item;
  return items ? (Array.isArray(items) ? items : [items]) : [];
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('q')?.trim() || '';
  const mode  = searchParams.get('mode') || 'code';

  if (!query) return NextResponse.json({ error: '검색어를 입력하세요' }, { status: 400 });

  try {
    // ─── 키워드 검색 ───
    if (mode === 'keyword') {
      // data.go.kr DB에서 검색
      const dbResults = searchHsKeyword(query, 30);
      if (dbResults.length > 0) {
        return NextResponse.json({
          type: 'list',
          items: dbResults.map(r => ({ hsSgn: r.hsSgn, hsNm: r.nm, hsNmEn: r.en, unit: r.u })),
          total: dbResults.length,
        });
      }
      return NextResponse.json({ type: 'list', items: [], total: 0 });
    }

    // ─── HS 코드 직접 조회 ───
    const hsSgn = cleanHs(query);
    if (hsSgn.length < 4) {
      return NextResponse.json({ error: 'HS 코드는 최소 4자리 이상 입력하세요' }, { status: 400 });
    }

    // DB에서 HS 코드 이름 조회
    const hsEntry = lookupHs(hsSgn);

    // Unipass API 시도 (tariff 키 등록 시 자동 활성화)
    const [tariffItems, ftaItems] = await Promise.allSettled([
      fetchTariffBook(hsSgn),
      fetchFtaTariff(hsSgn),
    ]);
    const tariffs = tariffItems.status === 'fulfilled' ? tariffItems.value : [];
    const ftas    = ftaItems.status === 'fulfilled'    ? ftaItems.value    : [];

    // API 데이터 없으면 내장 세율 사용
    if (tariffs.length === 0 && ftas.length === 0) {
      const staticRate = findStaticRate(hsSgn);
      const hsInfo = {
        hsSgn,
        hsNm:   hsEntry?.nm  || '',
        hsNmEn: hsEntry?.en  || '',
        unit:   hsEntry?.u   || '',
        chapter: hsSgn.slice(0, 2),
        heading: hsSgn.slice(0, 4),
      };

      if (staticRate) {
        return NextResponse.json({
          type: 'detail', dataSource: 'static',
          hsInfo,
          basicRates: [
            { type: '기본세율',            rate: staticRate.basic, unit: '', note: '' },
            { type: 'WTO 협정세율 (MFN)', rate: staticRate.wto,   unit: '', note: staticRate.wto === '0' ? 'ITA(정보기술협정) 적용' : '' },
          ],
          ftaRates: [],
          ftaDetail: staticRate.fta.map(f => ({
            country: FTA_NAMES[f.ftaCd] || f.ftaCd,
            ftaCd: f.ftaCd, rate: f.rate, unit: '', stage: '', origin: '', note: f.note || '',
          })),
          otherRates: [],
          rawCount: 0, ftaCount: staticRate.fta.length,
        });
      }

      // 세율 없어도 HS 코드 이름은 표시
      return NextResponse.json({
        type: 'detail', dataSource: hsEntry ? 'db_only' : 'none', apiKeyRequired: true,
        hsInfo,
        basicRates: [], ftaRates: [], ftaDetail: [], otherRates: [],
        rawCount: 0, ftaCount: 0,
      });
    }

    // API 데이터 있을 때 처리 (Unipass tariff API 활성화 시)
    const basicRates: any[] = [];
    const ftaRates: any[]   = [];
    const otherRates: any[] = [];

    for (const t of tariffs) {
      const rtCd = String(t.rtCd || t.rateTypeCd || '');
      const item = {
        type:  RATE_TYPE[rtCd] || rtCd,
        rate:  String(t.dtyRt  || t.dutyRate || t.rt    || '-'),
        unit:  String(t.dtyRtUt || t.rateUnit || ''),
        note:  String(t.applBgnDt ? `적용: ${t.applBgnDt}~` : ''),
        raw:   t,
      };
      if (rtCd === '2')      basicRates.push(item);
      else if (rtCd === '1') basicRates.unshift(item);
      else if (rtCd === '4') ftaRates.push(item);
      else                   otherRates.push(item);
    }

    const ftaDetail = ftas.map((f: any) => ({
      country: FTA_NAMES[String(f.ftaCd || f.cntrCd || '')] || String(f.ftaNm || f.ftaCd || ''),
      ftaCd:   String(f.ftaCd || f.cntrCd || ''),
      rate:    String(f.dtyRt || f.ftaRate || f.rate || '-'),
      unit:    String(f.dtyRtUt || ''),
      stage:   String(f.stgCd  || ''),
      origin:  String(f.orgRulCn || ''),
      note:    String(f.rmk || ''),
    }));

    const first = tariffs[0] || {};
    return NextResponse.json({
      type: 'detail', dataSource: 'unipass',
      hsInfo: {
        hsSgn:   String(first.hsSgn  || first.hsCd  || hsSgn),
        hsNm:    String(first.hsNm   || first.itemNm || hsEntry?.nm || ''),
        hsNmEn:  String(first.hsNmEn || first.itemNmEn || hsEntry?.en || ''),
        unit:    String(first.statUt || first.unit   || hsEntry?.u || ''),
        chapter: hsSgn.slice(0, 2),
        heading: hsSgn.slice(0, 4),
      },
      basicRates, ftaRates, ftaDetail, otherRates,
      rawCount: tariffs.length, ftaCount: ftas.length,
    });

  } catch (e) {
    return NextResponse.json({ error: '조회 중 오류: ' + String(e) }, { status: 500 });
  }
}
