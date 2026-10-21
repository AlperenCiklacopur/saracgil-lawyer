import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Kullanıcı adı ve şifre zorunludur.' },
        { status: 400 }
      );
    }

    if (
      username.trim() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      await setSessionCookie(username.trim());
      return NextResponse.json({ success: true, message: 'Giriş başarılı.' });
    }

    return NextResponse.json(
      { error: 'Kullanıcı adı veya şifre hatalı.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Giriş yapılırken sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
