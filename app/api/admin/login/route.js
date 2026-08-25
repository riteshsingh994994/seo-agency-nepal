import { NextResponse } from 'next/server';
import { getSiteData } from '@/lib/data';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { password } = await request.json();
  const site = getSiteData();

  if (password !== site.adminPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: 'lax',
  });
  return response;
}
