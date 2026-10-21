export type InquiryStatus = 'yeni' | 'arandi' | 'randevu_verildi' | 'tamamlandi';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export type InquiryInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
