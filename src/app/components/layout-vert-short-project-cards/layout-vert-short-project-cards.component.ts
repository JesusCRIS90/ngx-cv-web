import { Component, input } from '@angular/core';

import {
  GridLayout2DComponent as Grid2D,
  ItemGridLayoutComponent as ItemGrid,
} from '@beexy/ngx-layouts'

import {
  ShortVertProjectCardComponent as ShortVertCardProject,
} from '../../components'


import { Project } from '../../interfaces';

@Component({
  selector: 'layout-vert-short-project-cards',
  imports: [Grid2D, ItemGrid, ShortVertCardProject],
  templateUrl: './layout-vert-short-project-cards.component.html',
  styleUrl: './layout-vert-short-project-cards.component.css',
})
export class LayoutVertShortProjectCardsComponent {

  projects = input.required<Project[]>();

  protected get_y_PatternVert(i: number) {
    return i + 1;
  }

  protected get_x_PatternVert(i: number) {
    return (i % 2) + 1;
  }
}
