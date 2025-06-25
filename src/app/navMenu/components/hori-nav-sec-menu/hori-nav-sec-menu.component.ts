import { Component, EventEmitter, input, Output } from '@angular/core';

import {
  VerticalLayoutComponent as VFlex,
  VERTICAL_POLICY_POSITION as POLICY
} from '@beexy/ngx-layouts'

import {
  NavItem,
} from '@beexy/ngx-components'

import { HoriNavItemComponent } from '../hori-nav-item/hori-nav-item.component'

@Component({
  selector: 'hori-nav-sec-menu',
  imports: [HoriNavItemComponent, VFlex],
  templateUrl: './hori-nav-sec-menu.component.html',
})
export class HoriNavSecMenuComponent {
  POLICY = POLICY;

  navItems = input.required<NavItem[]>();
  activeId = input.required<string>();

  @Output()
  navItemClicked = new EventEmitter<string>();

  // @HostBinding('class.ver-nav-menu') addClass = true;

  protected navItemOnClick(id: string) {
    // emitted but not need it
    this.navItemClicked.emit(id);
  }
}
