import { NextResponse } from 'next/server';
import { getAuditsData, updateAuditsData } from '@/lib/data';

export async function GET() {
  const data = getAuditsData();
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const updated = updateAuditsData(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
