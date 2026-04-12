import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  // 서버 전용 env 우선, 없으면 NEXT_PUBLIC_ 사용
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
           || process.env.SUPABASE_ANON_KEY
           || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(`환경변수 누락 — URL:${url ? 'OK' : 'MISSING'}, KEY:${key ? 'OK' : 'MISSING'}`);
  }
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const { type, name, email, phone, content, attachments, password } = await req.json();
    if (!name || !content || !password)
      return NextResponse.json({ error: '필수 항목을 입력하세요.' }, { status: 400 });

    const sb = getSupabase();
    const { data, error } = await sb.from('inquiries')
      .insert({ type, name, email, phone, content, attachments: attachments || [], password, status: 'pending' })
      .select('id')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ id: data.id });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const password = searchParams.get('password');
    const type = searchParams.get('type');
    if (!id || !password)
      return NextResponse.json({ error: '조회 정보 부족' }, { status: 400 });

    const sb = getSupabase();
    let q = sb.from('inquiries').select('*').eq('id', id).eq('password', password);
    if (type) q = q.eq('type', type);

    const { data, error } = await q.single();
    if (error || !data) return NextResponse.json({ error: '조회 결과 없음' }, { status: 404 });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, admin_reply, status } = await req.json();
    const update: Record<string, string> = { status: status || 'replied' };
    if (admin_reply) { update.admin_reply = admin_reply; update.replied_at = new Date().toISOString(); }

    const sb = getSupabase();
    const { error } = await sb.from('inquiries').update(update).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
