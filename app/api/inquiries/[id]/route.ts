import { NextResponse } from 'next/server';
import { updateInquiry, deleteInquiry, getInquiryById } from '@/lib/inquiry-service';
import { getSession } from '@/lib/auth';

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteProps) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const { id } = await params;
    const inquiry = await getInquiryById(id);

    if (!inquiry) {
      return NextResponse.json({ error: 'Talep bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('Get inquiry error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await updateInquiry(id, {
      ...(body.status ? { status: body.status } : {}),
      ...(body.notes !== undefined ? { notes: body.notes } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: 'Talep güncellenemedi.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json({ error: 'Güncelleme hatası.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteProps) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteInquiry(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Talep silinemedi.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json({ error: 'Silme hatası.' }, { status: 500 });
  }
}
