import { Component, input, ViewEncapsulation } from '@angular/core';

import { 
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION,
  HorizontalLayoutComponent as HorizontalLay
} from '@beexy/ngx-layouts'

import {
  BeeChipComponent as Chip
} from '@beexy/ngx-components'


import { ArticleHeader } from '../../interfaces';


@Component({
  selector: 'header-article',
  imports: [PairLay, HorizontalLay, Chip],
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
