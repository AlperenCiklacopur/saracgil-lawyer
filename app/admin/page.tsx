import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getAllPosts } from '@/lib/blog-service';
import { getAllCases } from '@/lib/case-service';
import { getAllInquiries } from '@/lib/inquiry-service';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Yönetim Paneli | Melda Saraçgil Hukuk & Danışmanlık',
  robots: {
    index: false,
    follow: false,
  },
};

export const instant = false;

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const [posts, cases, inquiries] = await Promise.all([
    getAllPosts(true),
    getAllCases(true),
    getAllInquiries(),
  ]);

  return (
    <AdminDashboardClient
      initialPosts={posts}
      initialCases={cases}
      initialInquiries={inquiries}
      username={session.username}
    />
  );
}
