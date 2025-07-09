import { Component, inject, input, QueryList } from '@angular/core';

import { ResponsiveLayoutComponent as ResponsiveLayout } from '@beexy/ngx-layouts'
import { SideBarPopupService } from '@beexy/ngx-popups'
import { ClickableIconComponent, NavItem } from '@beexy/ngx-components'
import { BeeSectionTrackerDirective } from '@beexy/ngx-navigation'

import {
  HoriNavSecMenuComponent,
  VertNavSecMenuComponent
} from '../../components'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../../providers/config'

@Component({
  selector: 'nav-menu',
  standalone: true,
  imports: [
    ResponsiveLayout,
    ClickableIconComponent,
    HoriNavSecMenuComponent,
  ],
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent {

  private sections!: QueryList<BeeSectionTrackerDirective>;

  activeSecId = input.required<string>();

  private commonConfig:AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  constructor(
    protected sidebarPopupService: SideBarPopupService,
  ) { }

  getNavItems(): NavItem[] {
    return this.commonConfig.NavAppItems;
  }

  setSections(sections: QueryList<BeeSectionTrackerDirective>) {
    this.sections = sections;
    this.injectNavActions(this.getNavItems());
  }

  protected getRefIconBaseOnSectionId(): string {
    return getRefIconId(this.activeSecId());
  }

  protected onClickSidebarNavMenu(): void {
    this.sidebarPopupService.open({
      component: VertNavSecMenuComponent,
      position: 'right',
      data: {
        receivedActiveSecId: this.activeSecId,
        navItems: this.prepareVertNavItems(this.getNavItems())
      }
    });
  }

  protected injectNavActions(navItems: NavItem[]) {

    this.sections.forEach((section, index) => {
      const secId = section.getSectionId();

      navItems.forEach((value: NavItem, index) => {
        if (value.id === secId) {
          value.navAction = () => section.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      })

    });
  }

  private prepareVertNavItems(navItems: NavItem[]): NavItem[] {
    this.injectNavActions(navItems);
    return navItems;
  }

}


function getRefIconId(secId: string): string {
  switch (secId) {

    case 'home': return 'bicon-common-home';
    case 'projects': return 'bicon-common-projects';
    case 'experience': return 'bicon-common-experience';
    case 'skills': return 'bicon-common-skills';
    case 'contact': return 'bicon-common-contact';

    default:
      return 'default-icon'
  }
}
