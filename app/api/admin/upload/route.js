import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const targetPath = formData.get('targetPath');

    if (!file || !targetPath) {
      return NextResponse.json({ error: 'File and target path are required' }, { status: 400 });
    }

    // Security: ensure targetPath is within /public/uploads/ or /public/
    const cleanPath = targetPath.replace(/\.\./g, '').replace(/\/+/g, '/');
    if (!cleanPath.startsWith('/uploads/') && !cleanPath.startsWith('/og-image') && !cleanPath.startsWith('/logo')) {
      return NextResponse.json({ error: 'Invalid target path' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fullPath = path.join(process.cwd(), 'public', cleanPath);
    const dir = path.dirname(fullPath);

    // Create directory if it doesn't exist
    await mkdir(dir, { recursive: true });
    await writeFile(fullPath, buffer);

    return NextResponse.json({ success: true, path: cleanPath });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  }
}
