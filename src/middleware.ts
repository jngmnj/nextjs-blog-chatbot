import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated')
    // console.log("You're not authenticated, redirecting to /admin");
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
}

// write일때만 작동 -> 안됨.. .
export const config = {
  matcher: '/write',
};
