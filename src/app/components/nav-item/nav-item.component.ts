import { Component, ElementRef, EventEmitter, HostListener, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PairLayoutComponent as PairLayout,
  PAIR_DISTRIBUTION as PAIR_POLICY,
} from "@beexy/ngx-layouts"

import {
  SVGIconComponent as SVGIcon,
} from "@beexy/ngx-components"

import { NavItem } from "./nav-item.interface"

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
      const link = this.navItem().navAction!.link;
      this.navItem().navAction!.action(link);
    }

    // console.log( this.navItem().id )
    this.clicked.emit(this.navItem());
  }

  constructor(
    public elementRef: ElementRef
  ) { }

  protected getIconRef(): string {
    const iconref = this.navItem().icon;
    if ( iconref === null ) {
      return 'default-icon'
    }
    return iconref;
  }

  protected getRefId(): string {
    return this.navItem().id;
  }

  protected isActive(): boolean{
    if ( this.activeId() === this.getRefId() ) return true;
    return false;
  }
}
