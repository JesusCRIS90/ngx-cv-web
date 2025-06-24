import { Component, ElementRef, EventEmitter, HostListener, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PairLayoutComponent as PairLayout,
  PAIR_DISTRIBUTION as PAIR_POLICY,
} from "@beexy/ngx-layouts"

import {
  SVGIconComponent as SVGIcon,
} from "@beexy/ngx-components"

import { NavItem } from "../../interfaces"

@Component({
  selector: 'nav-item',
  imports: [PairLayout, SVGIcon, CommonModule],
  templateUrl: './nav-item.component.html',
})
export class NavItemComponent {
  PAIR_POLICY = PAIR_POLICY;

  navItem = input.required<NavItem>();
  activeId = input.required<string>();

  @Output()
  clicked = new EventEmitter<NavItem>();

  @HostListener('click')
  onClick(): void {

    if (this.navItem().navAction !== null) {
      this.navItem().navAction!.action(null);
    }

    // Emitted but not need it
    this.clicked.emit(this.navItem());
  }

  constructor(
    public elementRef: ElementRef
  ) { }

  public getRefId(): string {
    return this.navItem().id;
  }

  public getIconRef(): string {
    const iconref = this.navItem().icon;
    if (iconref === null) {
      return 'default-icon'
    }
    return iconref;
  }

  public getTitle(): string | null {
    return this.navItem().title;
  }

  public getSubtitle(): string | null {
    return this.navItem().subtitle;
  }

  public isActive(): boolean {
    if (this.activeId() === this.getRefId()) return true;
    return false;
  }
}
