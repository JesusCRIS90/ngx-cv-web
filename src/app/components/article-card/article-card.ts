import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";

import {
  GridLayout1DComponent as GridLay,
} from '@beexy/ngx-layouts'

import { ArticleCard } from '../../interfaces'


@Component({
  selector: 'article-card',
  imports: [GridLay, RouterLink],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
  encapsulation: ViewEncapsulation.None,
})
export class ArticleCardComponent {
  articleCardData = input.required<ArticleCard>();
}
