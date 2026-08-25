import { NextResponse } from 'next/server';
import { getServicesData, updateServiceData } from '@/lib/data';

export async function GET() {
  const data = getServicesData();
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const { serviceKey, updates } = await request.json();
    if (!serviceKey) {
      return NextResponse.json({ error: 'serviceKey is required' }, { status: 400 });
    }
    const updated = updateServiceData(serviceKey, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
