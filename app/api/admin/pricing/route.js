import { NextResponse } from 'next/server';
import { getPricingData, updatePricingData } from '@/lib/data';

export async function GET() {
  const data = getPricingData();
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const updated = updatePricingData(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
