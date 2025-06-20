import { AfterViewInit, Component, ElementRef, QueryList, signal, ViewChildren } from '@angular/core';

import { ResponsiveLayoutComponent as ResponsiveLayout } from '@beexy/ngx-layouts'
import { ClickableIconComponent } from '@beexy/ngx-components'
import { SideBarPopupService } from '@beexy/ngx-popups'

import {
  ScrollTrackerComponent,
  ScrollYEventInfo,
  HoriNavSecMenuComponent,
  VertNavSecMenuComponent,
  NavMenuComponent
} from '../../navMenu/components'

import { NavCaller, NavItem } from '../../navMenu/interfaces'

import { SectionTrackerDirective } from "../../directives"


import {
  ContactSectionComponent,
  ExperienceSectionComponent,
  HomeSectionComponent,
  ProjectsSectionComponent,
  SkillsSectionComponent,
} from "../../sections"

// TODO: Refatorize this?
import { NavMenuItems, VertNavMenuItems } from "../../data/temporal.data"

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
    HoriNavSecMenuComponent,
    ResponsiveLayout,
    ClickableIconComponent,
    NavMenuComponent,
  ],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {

  // temNavItems: NavItem[] = NavMenuItems;
  activeSecId = signal<string>('home');

  @ViewChildren(SectionTrackerDirective) sections!: QueryList<SectionTrackerDirective>;

  yScrollEventData = signal<ScrollYEventInfo>({ direction: 'up', yPosPercentage: 0, yPosPixel: 0, yMaxScrollSizePixel: 0 })

  // constructor(
  //   protected sidebarPopupService: SideBarPopupService,
  // ) { }

  // ngAfterViewInit(): void {
  //   this.injectNavActions( this.temNavItems );
  // }

  getSections(): QueryList<SectionTrackerDirective> {
    return this.sections;
  }

  getYScrollEvent(scrollEvent: ScrollYEventInfo) {
    this.yScrollEventData.set(scrollEvent);
  }

  onSectionActive(sectionID: string) {
    this.activeSecId.set(sectionID);
  }

  // protected onClickNavMenu(secId: string) {

  //   // this.sections.forEach((section, index) => {
  //   //   console.log(`Section ${index}:`, section.getSectionId());
  //   //   if (section.getSectionId() === secId) {
  //   //     section.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   //   }
  //   // });
  // }

  // protected getRefIconBaseOnSectionId(): string {
  //   return getRefIconId(this.activeSecId());
  // }

  // protected onClickSidebarNavMenu(): void {
  //   this.sidebarPopupService.close();
  //   this.sidebarPopupService.open({
  //     component: VertNavSecMenuComponent,
  //     position: 'right',
  //     data: {
  //       receivedActiveSecId: this.activeSecId,
  //       navItems: this.prepareVertNavItems( VertNavMenuItems )
  //     }
  //   });
  // }

  // protected injectNavActions( navItems: NavItem[] ) {

  //   this.sections.forEach((section, index) => {
  //     const secId = section.getSectionId();

  //     navItems.forEach((value: NavItem, index) => {
  //       if (value.id === secId) {
  //         const newNavAction: NavCaller = {
  //           action: () => section.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  //           link: ''
  //         }
  //         value.navAction = newNavAction;
  //       }
  //     })

  //   });
  // }

  // private prepareVertNavItems( navItems: NavItem[] ): NavItem[]{
  //   this.injectNavActions( navItems );
  //   return navItems;
  // }
}


function getRefIconId(secId: string): string {
  switch (secId) {

    case 'home': return 'icon-home';
    case 'projects': return 'icon-trending-up';
    case 'experience': return 'icon-credit-card';
    case 'skills': return 'icon-upload';
    case 'contact': return 'icon-monitor';

    default:
      return 'default-icon'
  }
}
