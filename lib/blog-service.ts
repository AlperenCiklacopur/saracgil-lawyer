import { BlogPost, BlogPostInput } from '@/types/blog';
import { INITIAL_POSTS } from '@/lib/initial-posts';
import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const REDIS_KEY = 'saracgil_blog_posts';
const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'posts.json');

// In-memory cache for fast response and fallback
let inMemoryPosts: BlogPost[] | null = null;

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

function readLocalFile(): BlogPost[] | null {
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const data = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      return JSON.parse(data) as BlogPost[];
    }
  } catch (err) {
    console.warn('Error reading local posts file:', err);
  }
  return null;
}

function writeLocalFile(posts: BlogPost[]) {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error writing local posts file:', err);
  }
}

export async function getAllPosts(includeDrafts = false): Promise<BlogPost[]> {
  const redis = getRedisClient();

  if (redis) {
    try {
      const data = await redis.get<BlogPost[]>(REDIS_KEY);
      if (data && Array.isArray(data) && data.length > 0) {
        inMemoryPosts = data;
        return includeDrafts ? data : data.filter((p) => p.published);
      } else {
        // Initialize Redis with initial posts
        await redis.set(REDIS_KEY, INITIAL_POSTS);
        inMemoryPosts = INITIAL_POSTS;
        return includeDrafts ? INITIAL_POSTS : INITIAL_POSTS.filter((p) => p.published);
      }
    } catch (err) {
      console.error('Redis fetch error, falling back:', err);
    }
  }

  // Fallback to local file or memory
  if (!inMemoryPosts) {
    const fileData = readLocalFile();
    if (fileData && fileData.length > 0) {
      inMemoryPosts = fileData;
    } else {
      inMemoryPosts = [...INITIAL_POSTS];
      writeLocalFile(inMemoryPosts);
    }
  }

  return includeDrafts ? inMemoryPosts : inMemoryPosts.filter((p) => p.published);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts(true);
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts(true);
  return posts.find((p) => p.id === id) || null;
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const posts = await getAllPosts(true);
  const now = new Date().toISOString();
  
  const newPost: BlogPost = {
    ...input,
    id: `post-${Date.now()}`,
    slug: input.slug.trim() || input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    createdAt: now,
    updatedAt: now,
  };

  const updatedPosts = [newPost, ...posts];
  await savePosts(updatedPosts);
  return newPost;
}

export async function updatePost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> {
  const posts = await getAllPosts(true);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedPost: BlogPost = {
    ...posts[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  posts[index] = updatedPost;
  await savePosts(posts);
  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts(true);
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;

  await savePosts(filtered);
  return true;
}

async function savePosts(posts: BlogPost[]) {
  inMemoryPosts = posts;
  
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.set(REDIS_KEY, posts);
    } catch (err) {
      console.error('Failed to save posts to Redis:', err);
    }
  }

  writeLocalFile(posts);
}
