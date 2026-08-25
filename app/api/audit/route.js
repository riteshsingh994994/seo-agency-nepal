import { NextResponse } from 'next/server';
import { addAuditRequest } from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.website || !body.email) {
      return NextResponse.json({ error: 'Website URL and email address are required' }, { status: 400 });
    }
    const created = addAuditRequest(body);
    return NextResponse.json({ success: true, audit: created });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
