import { Article, ArticleHeader, ArticleCard } from '../interfaces';

export class AppInterfacesAdapter {
  static articleToHeader(article: Partial<Article>): ArticleHeader {
    return {
      title: article.title ?? 'Untitled article',
      coverImageUrl:
        article.cover_image_url ?? 'https://cdn.tusitio.com/covers/default.png',
      readingTime: article.reading_time ?? 0,
      difficulty: article.difficulty ?? 'intermediate',
      tags: article.tags ?? [],
    };
  }

    static articleToArticleCard(article: Partial<Article>): ArticleCard {
    
    console.log('Mapping article to Article Card:', article);

    return {
      title: article.title ?? 'Untitled article',
      coverImageUrl:
        article.cover_image_url ?? 'https://cdn.tusitio.com/covers/default.png',
      description: article.description ?? 'No description available.',
      slug: article.slug ?? 'no-article',
    };
  }
}
