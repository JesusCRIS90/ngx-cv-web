import { Component, EventEmitter, input, Output } from '@angular/core';

import { NavItemComponent } from "../../components"
import { NavItem } from '../../interfaces'

@Component({
  selector: 'hori-nav-sec-menu',
  imports: [NavItemComponent],
  templateUrl: './hori-nav-sec-menu.component.html',
})
export class HoriNavSecMenuComponent {

  navItems = input.required<NavItem[]>();
  activeId = input.required<string>();

  @Output()
  navItemClicked = new EventEmitter<string>();

  protected navItemOnClick(navItem: NavItem) {
    // emitted but not need it
    this.navItemClicked.emit(navItem.id);
  }
}
