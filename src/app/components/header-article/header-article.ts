import { Component, input } from '@angular/core';

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
  styleUrl: './header-article.css'
})
export class HeaderArticle {

  PAIR_DISTRIBUTION = PAIR_DISTRIBUTION;

  articleHeader = input.required<ArticleHeader>();

  get readingTimeText(): string {
    const minutes = this.articleHeader().readingTime;
    return `${minutes} min`;
  }

}
