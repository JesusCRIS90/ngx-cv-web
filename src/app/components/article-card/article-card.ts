import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";

import {
  GridLayout1DComponent as GridLay,
  HorizontalLayoutComponent as HoriLay,
  POLICY_POSITION as policyPos
} from '@beexy/ngx-layouts'

import { ArticleCard } from '../../interfaces'

const CARD_TEST_IMAGE = 'https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/main/blog/test-card-image-3.png'

@Component({
  selector: 'article-card',
  imports: [GridLay, HoriLay, RouterLink],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArticleCardComponent {
  policyPos = policyPos;
  articleCardData = input.required<ArticleCard>();

  get articleCardImage() {
    return this.articleCardData().cardImageUrl || CARD_TEST_IMAGE;
  }
}
