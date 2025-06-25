import { Component, EventEmitter, input, Output } from '@angular/core';

import {
  NavItem,
  NavItemComponent,
  SVGIconComponent as SVGIcon,
} from '@beexy/ngx-components'

import {
  HoverLayoutComponent as HoverLayout,
  PairLayoutComponent as PairLayout,
  PAIR_DISTRIBUTION as PAIR_POLICY
} from '@beexy/ngx-layouts'

@Component({
  selector: 'hori-nav-item',
  imports: [
    NavItemComponent,
    SVGIcon,
    HoverLayout,
    PairLayout
  ],
  templateUrl: './hori-nav-item.component.html',
})
export class HoriNavItemComponent<T = unknown> {
  PAIR_POLICY = PAIR_POLICY;

  navItem = input.required<NavItem<T>>();
  activeId = input.required<string>();

  @Output()
  navItemClicked = new EventEmitter<string>();

  public getIcon(): string | undefined {
    return this.navItem().icon;
  }

  protected getTitle(): string | undefined {
    return this.navItem().title;
  }

  protected navItemOnClick(NavItem: NavItem<T>) {
    this.navItemClicked.emit(NavItem.id);
  }
}
