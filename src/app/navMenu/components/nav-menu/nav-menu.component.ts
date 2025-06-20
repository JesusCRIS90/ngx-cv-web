import { AfterViewInit, Component, input, QueryList, ViewChildren } from '@angular/core';

import { ResponsiveLayoutComponent as ResponsiveLayout } from '@beexy/ngx-layouts'
import { ClickableIconComponent } from '@beexy/ngx-components'
import { SideBarPopupService } from '@beexy/ngx-popups'

import { SectionTrackerDirective } from "../../../directives"

import {
  ScrollYEventInfo,
  HoriNavSecMenuComponent,
  VertNavSecMenuComponent
} from '../../components'

import { NavCaller, NavItem } from '../../interfaces'

// TODO: Refatorize this?
import { NavMenuItems, VertNavMenuItems } from "../../../data/temporal.data"

@Component({
  selector: 'nav-menu',
  standalone: true,
  imports: [
    ResponsiveLayout,
    ClickableIconComponent,
    HoriNavSecMenuComponent,
  ],
  templateUrl: './nav-menu.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class NavMenuComponent implements AfterViewInit {

  // @ViewChildren(SectionTrackerDirective) sections!: QueryList<SectionTrackerDirective>;

  activeSecId = input.required<string>();
  sections = input.required<QueryList<SectionTrackerDirective>>();

  constructor(
    protected sidebarPopupService: SideBarPopupService,
  ) { }

  ngAfterViewInit(): void {
    console.log( this.sections() );
    this.injectNavActions(this.getHoriNavItems());
  }

  getHoriNavItems(): NavItem[] {
    // NavMenuItems are Imported
    return NavMenuItems;
  }

  protected getRefIconBaseOnSectionId(): string {
    return getRefIconId(this.activeSecId());
  }

  protected onClickSidebarNavMenu(): void {
    this.sidebarPopupService.close();
    this.sidebarPopupService.open({
      component: VertNavSecMenuComponent,
      position: 'right',
      data: {
        receivedActiveSecId: this.activeSecId,
        navItems: this.prepareVertNavItems(VertNavMenuItems)
      }
    });
  }

  protected injectNavActions(navItems: NavItem[]) {

    this.sections().forEach((section, index) => {
      const secId = section.getSectionId();

      navItems.forEach((value: NavItem, index) => {
        if (value.id === secId) {
          const newNavAction: NavCaller = {
            action: () => section.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }),
            link: ''
          }
          value.navAction = newNavAction;
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

    case 'home': return 'icon-home';
    case 'projects': return 'icon-trending-up';
    case 'experience': return 'icon-credit-card';
    case 'skills': return 'icon-upload';
    case 'contact': return 'icon-monitor';

    default:
      return 'default-icon'
  }
}
