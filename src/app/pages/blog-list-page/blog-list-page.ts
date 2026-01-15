import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

import { BlogArticlesService, BlogSearchFilters } from '../../services';

@Component({
  selector: 'app-blog-list-page',
  imports: [RouterLink],
  templateUrl: './blog-list-page.html',
  styleUrls: ['./blog-list-page.css'],
})
export default class BlogListPageComponent implements OnInit {
  articles = signal<any[]>([]);

  private blogService = inject(BlogArticlesService);

  ngOnInit(): void {
    this.onSearch({});
  }

  async onSearch(filters: BlogSearchFilters) {
    const { data } = await this.blogService.search(filters);
    this.articles.set(data ?? []);

    console.log('Search results:', this.articles());
  }

  getArticlesNames(): string[] {
    return this.articles().map(article => article.title);
  }

}
