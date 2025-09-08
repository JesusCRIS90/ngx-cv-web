import { Component, inject, input } from '@angular/core';

import {
  ResponsiveLayoutComponent as ResponsiveLayout,
} from '@beexy/ngx-layouts'

import {
  LayoutHoriShortProjectCardsComponent as ProjectsCardsHoriDistribution,
  LayoutVertShortProjectCardsComponent as ProjecsCardsVertDistributuib,
} from '../../components'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';
import { Project } from '../../interfaces';


@Component({
  selector: 'sec-projects',
  imports: [
    ResponsiveLayout,
    ProjectsCardsHoriDistribution,
    ProjecsCardsVertDistributuib,
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

}
