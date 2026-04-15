import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function sb() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
  return createClient(url, key);
}

// GET: 전체 목록 (is_public=true 만)
export async function GET() {
  const { data, error } = await sb().from('catalogs').select('id,title,description,thumbnail,category,password,is_public,page_count,view_count,created_at').eq('is_public', true).order('order_num').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // 비밀번호 마스킹 (있는지 여부만)
  const masked = (data || []).map(c => ({ ...c, password: c.password ? '****' : '' }));
  return NextResponse.json(masked);
}

// POST: 새 카탈로그 등록 (관리자)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await sb().from('catalogs').insert(body).select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
