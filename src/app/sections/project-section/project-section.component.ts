import { Component, inject, input } from '@angular/core';

import {
  ResponsiveLayoutComponent as ResponsiveLayout,
  GridLayout2DComponent as Grid2D,
  ItemGridLayoutComponent as ItemGrid,
  FixedWidthLayoutComponent as FixWidthLay
} from '@beexy/ngx-layouts'

import {
  ShortVertProjectCardComponent as ShortVertCardProject,
  ShortHoriProjectCardComponent as ShortHoriCardProject,
} from '../../components'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';
import { Project, ShortProjectCard } from '../../interfaces';
import { AppDataMapper } from '../../mappers/AppDataMapper';


@Component({
  selector: 'sec-projects',
  imports: [
    ResponsiveLayout, Grid2D, ItemGrid, FixWidthLay,
    ShortVertCardProject, ShortHoriCardProject,
  ],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectsSectionComponent {

  projects = input.required<Project[]>();

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }

  getShortProjectCardInfo(): ShortProjectCard[] {
    return AppDataMapper.ProjectsArray2ShortProjectCards(this.projects())
  }

  getProjectWithIndex(index: number): Project {
    return this.projects()[index];
  }

  protected get_y_PatternHori(i: number) {
    return Math.floor((2 * i) / 3) + 1;
  }

  protected get_x_PatternHori(i: number) {
    const pattern = [1, 3, 2];
    return pattern[i % 3];
  }

  protected get_y_PatternVert(i: number) {
    return i + 1;
  }

  protected get_x_PatternVert(i: number) {
    return (i % 2) + 1;
  }
}
