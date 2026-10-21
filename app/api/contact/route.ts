import { NextResponse } from 'next/server';
import { createInquiry, getAllInquiries } from '@/lib/inquiry-service';
import { sendInquiryNotification } from '@/lib/email-service';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const subject = (body.subject || 'İcra Takibi ve Alacak Tahsili').trim();
    const message = (body.message || '').trim();

    if (!name || (!email && !phone) || !message) {
      return NextResponse.json(
        { error: 'Lütfen adınızı, iletişim bilginizi (telefon veya e-posta) ve mesajınızı doldurunuz.' },
        { status: 400 }
      );
    }

    // Save to database / local storage
    const newInquiry = await createInquiry({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send email notification in background
    let emailDelivered = true;
    try {
      const emailResult = await sendInquiryNotification(newInquiry);
      emailDelivered = emailResult.success;
    } catch (mailErr) {
      console.warn('Mail notification warning (inquiry was saved):', mailErr);
    }

    return NextResponse.json(
      {
        success: true,
        inquiryId: newInquiry.id,
        message: 'Talebiniz başarıyla alındı.',
        emailDelivered,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Talep iletilirken teknik bir hata oluştu. Lütfen tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz bulunmamaktadır.' },
        { status: 401 }
      );
    }

    const inquiries = await getAllInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error('Fetch inquiries error:', error);
    return NextResponse.json(
      { error: 'Talepler yüklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
