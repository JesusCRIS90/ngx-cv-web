import { AfterViewInit, Component, ElementRef, QueryList, signal, ViewChildren } from '@angular/core';

import { ScrollTrackerComponent, ScrollYEventInfo, NavSecMenuComponent, NavItem } from '../../components'
import { SectionTrackerDirective } from "../../directives"

import {
  ContactSectionComponent,
  ExperienceSectionComponent,
  HomeSectionComponent,
  ProjectsSectionComponent,
  SkillsSectionComponent
} from "../../sections"

// Delete after
import { NavMenuItems } from "../../data/temporal.data"

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
    NavSecMenuComponent,
  ],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent implements AfterViewInit {

  temNavItems: NavItem[] = NavMenuItems;
  activeSecId = signal<string>('home');

  @ViewChildren(SectionTrackerDirective) sections!: QueryList<SectionTrackerDirective>;

  yScrollEventData = signal<ScrollYEventInfo>({ direction: 'up', yPosPercentage: 0, yPosPixel: 0, yMaxScrollSizePixel: 0 })

  ngAfterViewInit(): void {}

  getYScrollEvent(scrollEvent: ScrollYEventInfo) {
    this.yScrollEventData.set(scrollEvent);
  }

  onSectionActive(sectionID: string) {
    console.log(sectionID);
    this.activeSecId.set(sectionID);
  }

  protected onClickNavMenu(secId: string) {

    console.log(secId);

    this.sections.forEach((section, index) => {
      console.log(`Section ${index}:`, section.getSectionId());
      if (section.getSectionId() === secId ) {
        section.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

}
