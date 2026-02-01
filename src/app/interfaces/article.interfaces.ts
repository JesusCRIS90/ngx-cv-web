export interface ArticleHeader {
  title_en: string;
  title_es: string;
  coverImageUrl: string;
  readingTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface ArticleCard {
  title_en: string;
  title_es: string;
  coverImageUrl: string;
  description: string;
  slug: string;
}

export interface Article {
  id: string;
  slug: string;
  title_en: string;
  title_es: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  markdownEsUrl: string;
  markdownEnUrl: string;
  cover_image_url: string;
  canonicalUrl: string;
  linkedinPostUrl: string;
  reading_time: number;
  publishedAt: string; // ISO date string
  updatedAt: string;   // ISO date string
  isPublished: boolean;
  tags: string[];
  keywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

