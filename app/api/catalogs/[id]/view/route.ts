import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function sb() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  await sb().rpc('increment_view', { catalog_id: params.id }).catch(() => {
    sb().from('catalogs').select('view_count').eq('id', params.id).single().then(({ data }) => {
      if (data) sb().from('catalogs').update({ view_count: (data.view_count || 0) + 1 }).eq('id', params.id);
    });
  });
  return NextResponse.json({ ok: true });
}
