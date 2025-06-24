import { Component, EventEmitter, input, Output } from '@angular/core';

import {
  NavItem,
  NavItemComponent,
  SVGIconComponent as SVGIcon,
} from '@beexy/ngx-components'


@Component({
  selector: 'hori-nav-item',
  imports: [
    NavItemComponent,
    SVGIcon,
  ],
  templateUrl: './hori-nav-item.component.html',
})
export class HoriNavItemComponent<T = unknown> {
  navItem = input.required<NavItem<T>>();
  activeId = input.required<string>();

  @Output()
  navItemClicked = new EventEmitter<string>();

  public getIcon(): string | undefined {
    return this.navItem().icon;
  }

  protected navItemOnClick(NavItem: NavItem<T>) {
    this.navItemClicked.emit(NavItem.id);
  }
}
