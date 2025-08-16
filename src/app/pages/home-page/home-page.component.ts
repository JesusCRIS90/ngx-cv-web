import { AfterViewInit, Component, inject, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';

import { BeeSectionTrackerDirective } from '@beexy/ngx-navigation'
import { StoragesManager, } from "@beexy/tools"

import { AppData, Experience, Skill, SkillChip } from '../../interfaces';
import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config'
import { AppDataMapper } from '../../mappers/AppDataMapper'

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

  adapter = AppDataMapper;

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);
  private storage = inject(StoragesManager);

  @ViewChildren(BeeSectionTrackerDirective) sections!: QueryList<BeeSectionTrackerDirective>;
  @ViewChild(NavMenuComponent) navMenu!: NavMenuComponent;

  activeSecId = signal<string>('home');

  private dataApp: AppData | null = null;

  constructor() {
    console.log('[HOME-PAGE] - Showing Values Inside Storage:', this.storage);

    const data = this.storage.getStorageDataFromKey<AppData>(this.commonConfig.dataKey);

    if (data !== null) {
      this.dataApp = data;
    }
  }

  ngAfterViewInit(): void {
    this.navMenu.setSections(this.sections);
  }

  getSections(): QueryList<BeeSectionTrackerDirective> {
    return this.sections;
  }

  onSectionActive(sectionID: string) {
    this.activeSecId.set(sectionID);
  }

  getDataApp(): AppData | null {
    return this.dataApp;
  }

  getSkills(): Skill[] {
    return AppDataMapper.AppData2Skills(this.dataApp);
  }

  getSkillChips(): SkillChip[] {
    return AppDataMapper.AppData2SkillChips(this.dataApp);
  }

  getExperience(): Experience[] {
    return AppDataMapper.AppData2Experience( this.dataApp );
  }
}
