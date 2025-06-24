import { Component, EventEmitter, input, Output } from '@angular/core';

import {
  NavItem,
} from '@beexy/ngx-components'

import { HoriNavItemComponent } from '../hori-nav-item/hori-nav-item.component'

@Component({
  selector: 'hori-nav-sec-menu',
  imports: [HoriNavItemComponent],
  templateUrl: './hori-nav-sec-menu.component.html',
})
export class HoriNavSecMenuComponent {

  navItems = input.required<NavItem[]>();
  activeId = input.required<string>();

  @Output()
  navItemClicked = new EventEmitter<string>();

  protected navItemOnClick(id: string) {
    // emitted but not need it
    this.navItemClicked.emit(id);
  }
}
