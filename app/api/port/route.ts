import { NextResponse } from 'next/server';

// PORT-MIS 오픈API (data.go.kr 서비스키 필요)
// env: PORTMIS_API_KEY
// 인천항 코드: INC

const PORT_CODE = 'INC';

function getLevel(waiting: number, berthRate: number): 'smooth' | 'normal' | 'busy' | 'very_busy' {
  if (waiting >= 15 || berthRate >= 90) return 'very_busy';
  if (waiting >= 8  || berthRate >= 75) return 'busy';
  if (waiting >= 3  || berthRate >= 50) return 'normal';
  return 'smooth';
}

function mockData() {
  const now = new Date();
  const hh = now.getHours();
  // 시간대별 혼잡도 시뮬레이션 (09~18시 혼잡)
  const waiting   = hh >= 9 && hh <= 18 ? Math.floor(Math.random() * 8 + 5) : Math.floor(Math.random() * 4 + 1);
  const berthed   = Math.floor(Math.random() * 12 + 18);
  const berthRate = Math.round(berthed / 30 * 100);
  const departed  = Math.floor(Math.random() * 6 + 3);

  return {
    level: getLevel(waiting, berthRate),
    waiting, berthed, berthRate, departed,
    updatedAt: now.toLocaleString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    demo: true,
    vessels: [
      { name: 'EVER BRIGHT', flag: '🇵🇦', status: '접안', etd: now.getHours() + 2 + ':00' },
      { name: 'MSC VICTORIA', flag: '🇨🇭', status: '대기', eta: now.getHours() + 1 + ':30' },
      { name: 'COSCO PACIFIC', flag: '🇨🇳', status: '접안', etd: now.getHours() + 4 + ':00' },
      { name: 'HMM OSLO',     flag: '🇰🇷', status: '출항', etd: now.getHours() + ':' + String(now.getMinutes() + 10).padStart(2,'0') },
      { name: 'ONE HAWK',     flag: '🇯🇵', status: '대기', eta: now.getHours() + 3 + ':00' },
    ],
  };
}

async function fetchPortMis(apiKey: string) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm   = String(today.getMonth() + 1).padStart(2, '0');
  const dd   = String(today.getDate()).padStart(2, '0');
  const date = `${yyyy}${mm}${dd}`;

  // 선석점유현황 조회
  const berthUrl = `https://apis.data.go.kr/B553145/PORTMIS/portBerthOccupancyService/getBerthOccupancyList?serviceKey=${apiKey}&pageNo=1&numOfRows=50&portCode=${PORT_CODE}&searchDate=${date}&_type=json`;

  // 입항 예정 선박 조회
  const scheduleUrl = `https://apis.data.go.kr/B553145/PORTMIS/portScheduleService/getScheduledList?serviceKey=${apiKey}&pageNo=1&numOfRows=20&portCode=${PORT_CODE}&startDate=${date}&endDate=${date}&_type=json`;

  const [berthRes, schedRes] = await Promise.allSettled([
    fetch(berthUrl, { next: { revalidate: 300 } }),
    fetch(scheduleUrl, { next: { revalidate: 300 } }),
  ]);

  let berthed = 0, berthRate = 0, vessels: any[] = [];

  if (berthRes.status === 'fulfilled' && berthRes.value.ok) {
    const bd = await berthRes.value.json();
    const items = bd?.response?.body?.items?.item;
    if (Array.isArray(items)) {
      berthed = items.filter((it: any) => it.ocupYn === 'Y').length;
      berthRate = items.length ? Math.round(berthed / items.length * 100) : 0;
    }
  }

  if (schedRes.status === 'fulfilled' && schedRes.value.ok) {
    const sd = await schedRes.value.json();
    const items = sd?.response?.body?.items?.item;
    if (Array.isArray(items)) {
      vessels = items.slice(0, 6).map((it: any) => ({
        name: it.shipNm || it.shipEngNm || 'UNKNOWN',
        flag: '🚢',
        status: it.inoutTp === 'I' ? '입항' : '출항',
        eta: it.schArvDt ? it.schArvDt.slice(8, 12) : undefined,
        etd: it.schDepDt ? it.schDepDt.slice(8, 12) : undefined,
      }));
    }
  }

  const waiting = Math.max(0, Math.floor(vessels.filter(v => v.status === '입항').length * 0.4));
  const departed = vessels.filter(v => v.status === '출항').length;

  return {
    level: getLevel(waiting, berthRate),
    waiting, berthed, berthRate, departed,
    updatedAt: new Date().toLocaleString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    demo: false,
    vessels,
  };
}

export async function GET() {
  try {
    const apiKey = process.env.PORTMIS_API_KEY;
    const data = apiKey ? await fetchPortMis(apiKey) : mockData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(mockData());
  }
}
