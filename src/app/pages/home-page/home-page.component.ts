import { AfterViewInit, Component, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { BeeSectionTrackerDirective } from '@beexy/ngx-navigation'

import {
  NavMenuComponent
} from '../../navMenu/components'

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
    ContactSectionComponent,
    ExperienceSectionComponent,
    HomeSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    BeeSectionTrackerDirective,
    NavMenuComponent,
  ],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent implements AfterViewInit {

  @ViewChildren(BeeSectionTrackerDirective) sections!: QueryList<BeeSectionTrackerDirective>;
  @ViewChild(NavMenuComponent) navMenu!: NavMenuComponent;

  activeSecId = signal<string>('home');

  ngAfterViewInit(): void {
    this.navMenu.setSections(this.sections);
  }

  getSections(): QueryList<BeeSectionTrackerDirective> {
    return this.sections;
  }

  onSectionActive(sectionID: string) {
    this.activeSecId.set(sectionID);
  }

}
