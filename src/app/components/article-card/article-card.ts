import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";

import {
  GridLayout1DComponent as GridLay,
  HorizontalLayoutComponent as HoriLay,
  POLICY_POSITION as policyPos
} from '@beexy/ngx-layouts'

import { ArticleCard } from '../../interfaces'


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
}
