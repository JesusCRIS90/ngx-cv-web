import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';

import { BeeSearchBarComponent as BeeSearchBar } from '@beexy/ngx-components';
import {
  HorizontalLayoutComponent as HoriLay,
  VerticalLayoutComponent as FlexVertLay,
} from '@beexy/ngx-layouts';
import { SideBarPopupService } from '@beexy/ngx-popups';

import { BlogArticlesService, BlogSearchFilters } from '../../services';
import {
  ArticleCardComponent,
  ArticlesFilteringComponent as ArticlesFilter,
} from '../../components';
import { ArticleCard } from '../../interfaces';
import { AppInterfacesAdapter } from '../../mappers';
import { BeeVerticalCarouselComponent } from '@beexy/ngx-navigation';

const HERO_BLOG_IMAGE = "https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/main/blog/blog-test-img1.png"

@Component({
  selector: 'app-blog-list-page',
  imports: [
    RouterLink,
    ArticleCardComponent,
    BeeSearchBar,
    HoriLay,
    FlexVertLay,
    ArticlesFilter,
    BeeVerticalCarouselComponent,
],
  templateUrl: './blog-list-page.html',
  styleUrls: ['./blog-list-page.css'],
  standalone: true,
})
export default class BlogListPageComponent implements OnInit {
  articles = signal<any[]>([]);

  private blogService = inject(BlogArticlesService);
  private sidebarPopupService = inject(SideBarPopupService);

  ngOnInit() {
    this.onSearch({});
  }

  async onSearch(filters: BlogSearchFilters) {
    this.blogService.setFilters(filters);
    const { data } = await this.blogService.search();
    this.articles.set(data ?? []);

    // console.log('Search results:', this.articles());
  }

  onSearchChange(searchTerm: string) {
    const filters: BlogSearchFilters = {
      keywords: this.GetKeywordsList(searchTerm),
    };
    // console.log('Search term changed:', filters);
    // this.onSearch(filters);
  }

  protected onClickSidebar(): void {
    this.sidebarPopupService.open({
      component: ArticlesFilter,
      position: 'right',
      data: {},
    });
  }

  getArticlesNames(): string[] {
    return this.articles().map((article) => article.title);
  }

  protected GetArticleCard(articleComplete: any): ArticleCard {
    // console.log('Executing GetArticleCard Method');
    return AppInterfacesAdapter.articleToArticleCard(articleComplete);
  }

  protected GetKeywordsList(keywordsLine: string): string[] {
    return keywordsLine.split(/[,\s]+/).filter(Boolean);
  }

  protected getHeroBlogImageUrl() {
    return {
      'background-image': `url('${HERO_BLOG_IMAGE}')`,
    };
  }
}
