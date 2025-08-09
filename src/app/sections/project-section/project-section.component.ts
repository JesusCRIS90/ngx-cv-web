import { Component } from '@angular/core';

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

@Component({
  selector: 'sec-projects',
  imports: [ShortVertCardProject, ShortHoriCardProject, HoriCarousel, VertCarousel],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectsSectionComponent {

  horiURLs = horiUrls;
  vertURLs = vertUrls;

}
