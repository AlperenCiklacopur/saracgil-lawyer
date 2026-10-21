import { NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/blog-service';
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

    const posts = await getAllPosts(includeDrafts);
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Fetch posts error:', error);
    return NextResponse.json(
      { error: 'Yazılar yüklenirken bir hata oluştu.' },
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

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Başlık ve içerik alanları zorunludur.' },
        { status: 400 }
      );
    }

    const newPost = await createPost({
      title: body.title,
      slug: body.slug || '',
      excerpt: body.excerpt || '',
      content: body.content,
      category: body.category || 'İcra Hukuku',
      readTime: body.readTime || '4 dk okuma',
      date: body.date || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: body.author || {
        name: 'Av. Melda Saraçgil',
        title: 'Kurucu Avukat / İcra & İflas Departmanı',
      },
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      published: body.published !== false,
      featured: Boolean(body.featured),
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Yazı kaydedilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
