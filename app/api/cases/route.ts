import { NextResponse } from 'next/server';
import { getAllCases, createCase } from '@/lib/case-service';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDraftsParam = searchParams.get('includeDrafts') === 'true';

    let includeDrafts = false;
    if (includeDraftsParam) {
      const session = await getSession();
      if (session) {
        includeDrafts = true;
      }
    }

    const cases = await getAllCases(includeDrafts);
    return NextResponse.json({ success: true, cases });
  } catch (error) {
    console.error('Fetch cases error:', error);
    return NextResponse.json(
      { error: 'Emsal kararlar yüklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz bulunmamaktadır.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.title || !body.summary) {
      return NextResponse.json(
        { error: 'Başlık ve özet alanları zorunludur.' },
        { status: 400 }
      );
    }

    const newCase = await createCase({
      title: body.title,
      category: body.category || 'İcra Hukuku',
      summary: body.summary,
      outcome: body.outcome || 'Hukuki Süreç Neticelendi',
      date: body.date || '2026',
      published: body.published !== false,
    });

    return NextResponse.json({ success: true, caseStudy: newCase }, { status: 201 });
  } catch (error) {
    console.error('Create case error:', error);
    return NextResponse.json(
      { error: 'Emsal karar kaydedilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
