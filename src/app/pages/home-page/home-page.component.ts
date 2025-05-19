import { Component, signal } from '@angular/core';

import { ScrollTrackerComponent, ScrollYEventInfo } from '../../components'
import { SectionTrackerDirective } from "../../directives"

import {
  ContactSectionComponent,
  ExperienceSectionComponent,
  HomeSectionComponent,
  ProjectsSectionComponent,
  SkillsSectionComponent
} from "../../sections"

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ScrollTrackerComponent,
    ContactSectionComponent,
    ExperienceSectionComponent,
    HomeSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    SectionTrackerDirective
  ],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  yScrollEventData = signal<ScrollYEventInfo>({ direction: 'up', yPosPercentage: 0, yPosPixel: 0, yMaxScrollSizePixel: 0 })

  getYScrollEvent(scrollEvent: ScrollYEventInfo) {
    // console.log(scrollEvent);
    this.yScrollEventData.set( scrollEvent );
  }

  onSectionActive( sectionID: string ){
    console.log( sectionID );
  }
}
