export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CaseStudyInput = Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>;
