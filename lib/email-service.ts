import { Resend } from 'resend';
import { Inquiry } from '@/types/inquiry';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatPhoneForWhatsapp(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('90')) return digits;
  if (digits.startsWith('0')) return '9' + digits;
  if (digits.length === 10) return '90' + digits;
  return digits;
}

export async function sendInquiryNotification(
  inquiry: Inquiry
): Promise<{ success: boolean; messageId?: string; simulated?: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL || 'saracgilhukuk@gmail.com';

  if (!apiKey) {
    console.log('ℹ️ [Email Service] RESEND_API_KEY tanımlanmamış. E-posta simüle edildi:');
    console.log(`   Kime: ${toEmail}`);
    console.log(`   Konu: [Yeni Başvuru] ${inquiry.name} - ${inquiry.subject}`);
    console.log(`   Telefon: ${inquiry.phone}`);
    return { success: true, simulated: true };
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'Melda Saraçgil Hukuk <onboarding@resend.dev>';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4ddd1; border-radius: 12px; background-color: #fcfbfa;">
        <div style="background-color: #071324; padding: 20px; border-radius: 8px; text-align: center; color: white;">
          <h2 style="margin: 0; color: #c5a059; font-family: serif; font-size: 22px;">Melda Saraçgil Hukuk &amp; Danışmanlık</h2>
          <p style="margin: 6px 0 0; font-size: 13px; color: #d1d5db;">Yeni Ön Değerlendirme &amp; Randevu Talebi</p>
        </div>

        <div style="padding: 20px 10px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 140px; font-weight: bold;">Başvuran Kişi:</td>
              <td style="padding: 10px 0; color: #111827; font-weight: bold; font-size: 15px;">${escapeHtml(inquiry.name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Telefon:</td>
              <td style="padding: 10px 0; color: #0b1a30; font-weight: bold;">
                <a href="tel:${escapeHtml(inquiry.phone)}" style="color: #0b1a30; text-decoration: underline;">${escapeHtml(inquiry.phone)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">E-posta:</td>
              <td style="padding: 10px 0; color: #111827;">
                <a href="mailto:${escapeHtml(inquiry.email)}" style="color: #0b1a30;">${escapeHtml(inquiry.email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Uyuşmazlık Konusu:</td>
              <td style="padding: 10px 0; color: #c5a059; font-weight: bold;">${escapeHtml(inquiry.subject)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Talep Tarihi:</td>
              <td style="padding: 10px 0; color: #374151;">${new Date(inquiry.createdAt).toLocaleString('tr-TR')}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Müvekkil Mesajı / Dosya Özeti:</p>
            <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(inquiry.message)}</p>
          </div>

          <div style="margin-top: 25px; text-align: center;">
            <a href="tel:${escapeHtml(inquiry.phone)}" style="display: inline-block; padding: 12px 24px; background-color: #0b1a30; color: #c5a059; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; margin: 4px;">
              📞 Müvekkili Ara
            </a>
            <a href="https://wa.me/${formatPhoneForWhatsapp(inquiry.phone)}" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; margin: 4px;">
              💬 WhatsApp'tan Yaz
            </a>
          </div>
        </div>

        <div style="border-top: 1px solid #e5e7eb; margin-top: 15px; padding-top: 15px; font-size: 11px; color: #9ca3af; text-align: center;">
          Bu e-posta Melda Saraçgil Hukuk &amp; Danışmanlık web sitesi iletişim formundan otomatik olarak gönderilmiştir.
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Yeni Ön Değerlendirme Talebi] ${inquiry.name} - ${inquiry.subject}`,
      html: htmlContent,
      replyTo: inquiry.email,
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error('Email dispatch failure:', err);
    return { success: false };
  }
}
