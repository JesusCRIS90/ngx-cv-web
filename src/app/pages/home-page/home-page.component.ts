import { AfterViewInit, Component, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';

import {
  ScrollTrackerComponent,
  ScrollYEventInfo,
  NavMenuComponent
} from '../../navMenu/components'


import { SectionTrackerDirective } from "../../directives"


import {
  ContactSectionComponent,
  ExperienceSectionComponent,
  HomeSectionComponent,
  ProjectsSectionComponent,
  SkillsSectionComponent,
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
    SectionTrackerDirective,
    NavMenuComponent,
  ],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent implements AfterViewInit {

  @ViewChildren(SectionTrackerDirective) sections!: QueryList<SectionTrackerDirective>;
  @ViewChild(NavMenuComponent) navMenu!: NavMenuComponent;

  activeSecId = signal<string>('home');
  yScrollEventData = signal<ScrollYEventInfo>({ direction: 'up', yPosPercentage: 0, yPosPixel: 0, yMaxScrollSizePixel: 0 })

  ngAfterViewInit(): void {
    this.navMenu.setSections(this.sections);
  }

  getSections(): QueryList<SectionTrackerDirective> {
    return this.sections;
  }

  getYScrollEvent(scrollEvent: ScrollYEventInfo) {
    this.yScrollEventData.set(scrollEvent);
  }

  onSectionActive(sectionID: string) {
    this.activeSecId.set(sectionID);
  }

}
