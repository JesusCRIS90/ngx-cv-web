import { Component, EventEmitter, HostBinding, HostListener, input, InputSignal, OnInit, Output } from '@angular/core';

import {
  NavItem,
} from '@beexy/ngx-components'

import { VertNavItemComponent } from '../vert-nav-item/vert-nav-item.component'

@Component({
  selector: 'vert-nav-sec-menu',
  imports: [VertNavItemComponent],
  templateUrl: './vert-nav-sec-menu.component.html',
  styleUrls: ['./vert-nav-sec-menu.component.css']
})
export class VertNavSecMenuComponent implements OnInit {

  close!: () => void;
  navItems: NavItem[] = [];

  receivedActiveSecId: InputSignal<string> = input('');

  @Output()
  navItemClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log(`VERT-NAV - ${this.receivedActiveSecId()}`)
  }

  getNavItems(): NavItem[] {
    return this.navItems;
  }

  @HostListener('window:resize')
  onResize() {
    this.close();
  }

 @HostBinding('class.ver-nav-menu') addClass = true;

  protected navItemOnClick(id: string) {
    // emitted but not need it
    this.navItemClicked.emit(id);
  }
}
