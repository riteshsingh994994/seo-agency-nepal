import { NextResponse } from 'next/server';
import { getFAQsData, updateFAQsData } from '@/lib/data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const data = getFAQsData(page);
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const { page, faqs } = await request.json();
    if (!page) {
      return NextResponse.json({ error: 'Page key is required' }, { status: 400 });
    }
    const updated = updateFAQsData(page, faqs);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
