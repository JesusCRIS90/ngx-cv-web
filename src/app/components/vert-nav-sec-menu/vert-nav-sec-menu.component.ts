import { Component, HostListener, OnInit, signal, WritableSignal } from '@angular/core';

import { NavItem, NavItemComponent } from "../../components"

@Component({
  selector: 'app-vert-nav-sec-menu',
  imports: [NavItemComponent],
  templateUrl: './vert-nav-sec-menu.component.html',
  styleUrls: ['./vert-nav-sec-menu.component.css']
})
export class VertNavSecMenuComponent implements OnInit {

  close!: () => void;
  navItems: NavItem[] = [];

  receivedActiveSecId: WritableSignal<string> = signal('');

  // activeId = signal<string>( this.receivedActiveSecId );

  constructor() { }

  ngOnInit(): void {
    console.log(`VERT-NAV - ${this.receivedActiveSecId()}`)
  }

  getNavItems(): NavItem[] {
    return this.navItems;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: UIEvent) {
    this.close();
  }
}
