import { Article, ArticleHeader } from '../interfaces';

export class AppInterfacesAdapter {
  static articleToHeader(article: Partial<Article>): ArticleHeader {
    
    console.log('Mapping article to header:', article);

    return {
      title: article.title ?? 'Untitled article',
      coverImageUrl:
        article.cover_image_url ?? 'https://cdn.tusitio.com/covers/default.png',
      readingTime: article.reading_time ?? 0,
      difficulty: article.difficulty ?? 'intermediate',
      tags: article.tags ?? [],
    };
  }
}
