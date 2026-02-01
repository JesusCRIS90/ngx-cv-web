import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

import { BlogArticlesService } from '../../services';

import { POLICY_POSITION as ANCHOR_POLICY_POSITION } from '@beexy/ngx-layouts';

import {
  MarkdownViewerComponent as MarkdownViewer,
  MarkdownNavigatorComponent as MarkdownNavigator,
  MarkdownHeading,
} from '@beexy/ngx-components';

import { HeaderArticle } from '../../components';
import { ArticleHeader } from '../../interfaces';
import { AppInterfacesAdapter } from '../../mappers';

type ArticleLanguage = 'en' | 'es';

@Component({
  selector: 'app-article-page',
  imports: [JsonPipe, MarkdownViewer, MarkdownNavigator, HeaderArticle],
  standalone: true,
  templateUrl: './article-page.html',
  styleUrls: ['./article-page.css'],
  encapsulation: ViewEncapsulation.None,
})
export default class ArticlePageComponent implements OnInit {
  ANCHOR_POLICY_POSITION = ANCHOR_POLICY_POSITION;

  slug: string | null = null;

  // Store the whole article object
  article = signal<Record<string, any> | null>(null);
  headingsDocs = signal<MarkdownHeading[]>([]);
  language = signal<'en' | 'es'>('en');

  markdownPath = computed(() => {
    const article = this.article();

    if (!article) {
      return '';
    }

    const url_markdown =
      this.language() === 'en'
        ? (article['markdown_en_url'] ?? '')
        : (article['markdown_es_url'] ?? '');

    console.log('Markdown URL:', url_markdown);
    return url_markdown;
  });

  private blogService = inject(BlogArticlesService);

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.slug = this.route.snapshot.paramMap.get('slug');
    // console.log('Article slug:', this.slug);
  }

  ngOnInit(): void {
    this.onSlugSeach(this.slug ?? '');
  }

  onHeadingsChange(headings: MarkdownHeading[]): void {
    // console.log('Headings changed:', headings);
    this.headingsDocs.set(headings);
  }

  async onSlugSeach(slug: string) {
    const { data } = await this.blogService.getBySlug(slug);
    this.article.set(data ?? null);

    // console.log('Article Data:', this.article());
  }

  // protected markdownPath(lang: ArticleLanguage = 'en'): string {
  //   const langKey = lang === 'en' ? 'markdown_en_url' : 'markdown_es_url';
  //   return this.article()?.[langKey] ?? '';
  // }

  protected get articleHeader(): ArticleHeader {
    let articleData = this.article();

    if (!articleData) {
      articleData = {};
    }

    return AppInterfacesAdapter.articleToHeader(articleData);
  }

  protected backToArticlesList(): void {
    this.router.navigate(['/blog']);
  }

  protected onClickChangeLanguage(): void {
    if (this.language() === 'en') {
      this.language.set('es');
    } else {
      this.language.set('en');
    }
  }

  get currentLanguageLabel(): string {
    return this.language() === 'en' ? 'Change to Spanish' : 'Cambiar a Inglés';
  }
}
