import { Inquiry, InquiryInput } from '@/types/inquiry';
import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const REDIS_KEY = 'saracgil_inquiries';
const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'inquiries.json');

let inMemoryInquiries: Inquiry[] | null = null;

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch (err) {
      console.warn('Failed to initialize Redis client, falling back to local storage:', err);
      return null;
    }
  }
  return null;
}

function readLocalFile(): Inquiry[] | null {
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const data = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      return JSON.parse(data) as Inquiry[];
    }
  } catch (err) {
    console.warn('Error reading local inquiries file:', err);
  }
  return null;
}

function writeLocalFile(inquiries: Inquiry[]) {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error writing local inquiries file:', err);
  }
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const redis = getRedisClient();

  if (redis) {
    try {
      const data = await redis.get<Inquiry[]>(REDIS_KEY);
      if (data && Array.isArray(data)) {
        inMemoryInquiries = data;
        return data;
      }
    } catch (err) {
      console.error('Redis fetch error for inquiries, falling back:', err);
    }
  }

  if (!inMemoryInquiries) {
    const fileData = readLocalFile();
    if (fileData && Array.isArray(fileData)) {
      inMemoryInquiries = fileData;
    } else {
      inMemoryInquiries = [];
      writeLocalFile(inMemoryInquiries);
    }
  }

  return inMemoryInquiries;
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const list = await getAllInquiries();
  return list.find((item) => item.id === id) || null;
}

export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  const list = await getAllInquiries();
  const now = new Date().toISOString();

  const newInquiry: Inquiry = {
    ...input,
    id: `talep-${Date.now()}`,
    status: 'yeni',
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newInquiry, ...list];
  await saveInquiries(updatedList);
  return newInquiry;
}

export async function updateInquiry(
  id: string,
  updates: Partial<Omit<Inquiry, 'id' | 'createdAt'>>
): Promise<Inquiry | null> {
  const list = await getAllInquiries();
  const index = list.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updated: Inquiry = {
    ...list[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updated;
  await saveInquiries(list);
  return updated;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const list = await getAllInquiries();
  const filtered = list.filter((item) => item.id !== id);

  if (filtered.length === list.length) {
    return false;
  }

  await saveInquiries(filtered);
  return true;
}

async function saveInquiries(inquiries: Inquiry[]): Promise<void> {
  inMemoryInquiries = inquiries;
  writeLocalFile(inquiries);

  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.set(REDIS_KEY, inquiries);
    } catch (err) {
      console.error('Failed to save inquiries to Redis:', err);
    }
  }
}
