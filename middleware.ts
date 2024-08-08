import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './src/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.api.getUser(request);

  if (user.role !== 'authenticated')
    return NextResponse.redirect(new URL('/admin', request.nextUrl));

  return response;
}

// write일때만 작동
export const config = {
  matcher: '/write',
};
