import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './src/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createClient(request);

  console.log('middleware!');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated')
    return NextResponse.redirect(new URL('/admin', request.nextUrl));

  return response;
}

// write일때만 작동 -> 안됨.. .
export const config = {
  matcher: '/write',
};
