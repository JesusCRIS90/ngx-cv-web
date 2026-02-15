import { Component, input, ViewEncapsulation } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION,
  HorizontalLayoutComponent as HFlex,
  VerticalLayoutComponent as VFlex,
  ResponsiveLayoutComponent as ResponseLay,
} from '@beexy/ngx-layouts';

import { BeeChipComponent as Chip } from '@beexy/ngx-components';

import { ArticleHeader } from '../../interfaces';

// https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/main/blog/blog-test-img1.png

@Component({
  selector: 'header-article',
  imports: [PairLay, HFlex, VFlex, ResponseLay, Chip],
  templateUrl: './header-article.html',
  styleUrl: './header-article.css',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderArticle {
  PAIR_DISTRIBUTION = PAIR_DISTRIBUTION;

  articleHeader = input.required<ArticleHeader>();
  articleLanguage = input<'en' | 'es'>('en');

  get readingTimeText(): string {
    const minutes = this.articleHeader().readingTime;
    return `${minutes} min`;
  }

  protected get title(): string {
    return this.articleLanguage() === 'es'
      ? this.articleHeader().title_es
      : this.articleHeader().title_en;
  }
}
