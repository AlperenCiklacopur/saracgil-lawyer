import { NextResponse } from 'next/server';
import { updateCase, deleteCase, getCaseById } from '@/lib/case-service';
import { getSession } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const caseItem = await getCaseById(id);
    if (!caseItem) {
      return NextResponse.json({ error: 'Kayıt bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, caseStudy: caseItem });
  } catch (error) {
    console.error('Get case error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz bulunmamaktadır.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const updated = await updateCase(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Kayıt bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error) {
    console.error('Update case error:', error);
    return NextResponse.json({ error: 'Güncelleme hatası.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz bulunmamaktadır.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const deleted = await deleteCase(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Kayıt bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Kayıt silindi.' });
  } catch (error) {
    console.error('Delete case error:', error);
    return NextResponse.json({ error: 'Silme hatası.' }, { status: 500 });
  }
}
