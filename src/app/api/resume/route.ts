import { NextResponse } from 'next/server';
import { SEO } from '@/data/seo.constants';

export async function GET() {
  return NextResponse.redirect(SEO.RESUME_URL, { status: 307 });
}
