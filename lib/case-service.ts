import { CaseStudy, CaseStudyInput } from '@/types/case';
import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const REDIS_KEY = 'saracgil_case_studies';
const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'cases.json');

let inMemoryCases: CaseStudy[] | null = null;

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

function readLocalFile(): CaseStudy[] | null {
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const data = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      return JSON.parse(data) as CaseStudy[];
    }
  } catch (err) {
    console.warn('Error reading local cases file:', err);
  }
  return null;
}

function writeLocalFile(cases: CaseStudy[]) {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(cases, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error writing local cases file:', err);
  }
}

export async function getAllCases(includeDrafts = false): Promise<CaseStudy[]> {
  const redis = getRedisClient();

  if (redis) {
    try {
      const data = await redis.get<CaseStudy[]>(REDIS_KEY);
      if (data && Array.isArray(data)) {
        inMemoryCases = data;
        return includeDrafts ? data : data.filter((c) => c.published);
      }
    } catch (err) {
      console.error('Redis fetch error for cases, falling back:', err);
    }
  }

  if (!inMemoryCases) {
    const fileData = readLocalFile();
    if (fileData && Array.isArray(fileData)) {
      inMemoryCases = fileData;
    } else {
      inMemoryCases = [];
      writeLocalFile(inMemoryCases);
    }
  }

  return includeDrafts ? inMemoryCases : inMemoryCases.filter((c) => c.published);
}

export async function getCaseById(id: string): Promise<CaseStudy | null> {
  const cases = await getAllCases(true);
  return cases.find((c) => c.id === id) || null;
}

export async function createCase(input: CaseStudyInput): Promise<CaseStudy> {
  const cases = await getAllCases(true);
  const now = new Date().toISOString();

  const newCase: CaseStudy = {
    ...input,
    id: `case-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };

  const updatedCases = [newCase, ...cases];
  await saveCases(updatedCases);
  return newCase;
}

export async function updateCase(id: string, input: Partial<CaseStudyInput>): Promise<CaseStudy | null> {
  const cases = await getAllCases(true);
  const index = cases.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updatedCase: CaseStudy = {
    ...cases[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  cases[index] = updatedCase;
  await saveCases(cases);
  return updatedCase;
}

export async function deleteCase(id: string): Promise<boolean> {
  const cases = await getAllCases(true);
  const filtered = cases.filter((c) => c.id !== id);
  if (filtered.length === cases.length) return false;

  await saveCases(filtered);
  return true;
}

async function saveCases(cases: CaseStudy[]) {
  inMemoryCases = cases;

  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.set(REDIS_KEY, cases);
    } catch (err) {
      console.error('Failed to save cases to Redis:', err);
    }
  }

  writeLocalFile(cases);
}
