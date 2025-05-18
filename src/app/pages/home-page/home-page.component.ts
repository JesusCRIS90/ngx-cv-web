import { Component } from '@angular/core';

import { ScrollTrackerComponent, ScrollYEventInfo } from '../../components'

import {
  ContactSectionComponent,
  ExperienceSectionComponent,
  HomeSectionComponent,
  ProjectsSectionComponent,
  SkillsSectionComponent
} from "../../sections"

@Component({
  selector: 'app-home-page',
  imports: [
    ScrollTrackerComponent,
    ContactSectionComponent,
    ExperienceSectionComponent,
    HomeSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent
  ],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  // TODO: Get Data from StorageManager
  // TODO: Management Methods to pass info to differents sections

  getYScrollEvent( scrollEvent: ScrollYEventInfo ){
    console.log( scrollEvent );
  }
}
