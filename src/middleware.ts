import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  console.log('middleware!');
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated')
    return NextResponse.redirect(new URL('/admin', request.nextUrl));

  console.log('User data:', user);
  return response;
}

// write일때만 작동 -> 안됨.. .
export const config = {
  matcher: '/write',
};
