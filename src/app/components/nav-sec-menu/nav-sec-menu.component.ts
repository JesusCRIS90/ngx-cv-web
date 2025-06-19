import { Component, EventEmitter, input, Output } from '@angular/core';

import { NavItem, NavItemComponent } from "../../components"

@Component({
  selector: 'nav-sec-menu',
  imports: [NavItemComponent],
  templateUrl: './nav-sec-menu.component.html',
})
export class NavSecMenuComponent {

  navItems = input.required<NavItem[]>();
  activeId = input.required<string>();

  @Output()
  navItemClicked = new EventEmitter<string>();

  protected navItemOnClick(navItem: NavItem) {
    // emitted but not need it
    this.navItemClicked.emit(navItem.id);
  }
}
