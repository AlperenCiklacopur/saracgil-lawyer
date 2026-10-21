export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    title: string;
  };
  coverImage?: string;
  published: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;
