import { NextResponse } from 'next/server';
import { updatePost, deletePost, getPostById } from '@/lib/blog-service';
import { getSession } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Get post error:', error);
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

    const updated = await updatePost(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error('Update post error:', error);
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
    const deleted = await deletePost(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Yazı silindi.' });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ error: 'Silme hatası.' }, { status: 500 });
  }
}
