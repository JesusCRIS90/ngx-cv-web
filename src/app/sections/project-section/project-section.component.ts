import { Component, inject } from '@angular/core';


import {
  ResponsiveLayoutComponent as ResponsiveLayout,
  GridLayout2DComponent as Grid2D,
  ItemGridLayoutComponent as ItemGrid,
  FixedWidthLayoutComponent as FixWidthLay
} from '@beexy/ngx-layouts'

// TODO: Remove on a near Future
const horiUrls = [
  "./assets/images/hori-test-1.jpg",
  "./assets/images/hori-test-2.jpg",
  "./assets/images/hori-test-3.jpg"
]

const vertUrls = [
  "./assets/images/dog-test-1.jpg",
  "./assets/images/dog-test-2.jpg",
  "./assets/images/dog-test-3.jpg",
]




import {
  ShortVertProjectCardComponent as ShortVertCardProject,
  ShortHoriProjectCardComponent as ShortHoriCardProject,
} from '../../components'

import {
  BeeHorizontalCarouselComponent as HoriCarousel,
  BeeVerticalCarouselComponent as VertCarousel,
} from '@beexy/ngx-navigation'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';

@Component({
  selector: 'sec-projects',
  imports: [
    ResponsiveLayout, Grid2D, ItemGrid, FixWidthLay,
    ShortVertCardProject, ShortHoriCardProject,
    HoriCarousel, VertCarousel
  ],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectsSectionComponent {

  horiURLs = horiUrls;
  vertURLs = vertUrls;

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);


  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }
}
