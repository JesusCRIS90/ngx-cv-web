import { Component, input } from '@angular/core';

import {
  GridLayout2DComponent as Grid2D,
  ItemGridLayoutComponent as ItemGrid,
} from '@beexy/ngx-layouts'

import {
  ShortHoriProjectCardComponent as ShortHoriCardProject,
} from '..'

import { Project } from '../../interfaces';

@Component({
  selector: 'layout-hori-short-project-cards',
  imports: [Grid2D, ItemGrid, ShortHoriCardProject],
  templateUrl: './layout-hori-short-project-cards.component.html',
  styleUrl: './layout-hori-short-project-cards.component.css',
})
export class LayoutHoriShortProjectCardsComponent {

  projects = input.required<Project[]>();

  protected get_y_PatternHori(i: number) {
    return Math.floor((2 * i) / 3) + 1;
  }

  protected get_x_PatternHori(i: number) {
    const pattern = [1, 3, 2];
    return pattern[i % 3];
  }

}
