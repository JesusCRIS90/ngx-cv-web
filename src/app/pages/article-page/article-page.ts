import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogArticlesService } from '../../services';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-article-page',
  imports: [JsonPipe],
  templateUrl: './article-page.html',
  styleUrls: ['./article-page.css'],
})
export default class ArticlePageComponent implements OnInit {
  slug: string | null = null;
  
  // Store the whole article object
  article = signal<Record<string, any> | null>(null);

  private blogService = inject(BlogArticlesService);

  constructor(private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log('Article slug:', this.slug);
  }

  ngOnInit(): void {
    this.onSlugSeach(this.slug ?? '');
  }

  async onSlugSeach(slug: string) {
    const { data } = await this.blogService.getBySlug(slug);
    this.article.set(data ?? null);

    console.log('Article Data:', this.article());
  }
}
