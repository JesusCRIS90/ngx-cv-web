import { Component, OnInit, signal } from '@angular/core';

import { NavItem, NavItemComponent } from "../../components"

@Component({
  selector: 'app-vert-nav-sec-menu',
  imports: [NavItemComponent],
  templateUrl: './vert-nav-sec-menu.component.html',
  styleUrls: ['./vert-nav-sec-menu.component.css']
})
export class VertNavSecMenuComponent implements OnInit {

  navItems: NavItem[] = [];
  receivedActiveSecId: string = '';
  close!: () => void;

  activeId = signal<string>( this.receivedActiveSecId );

  constructor(){}

  ngOnInit(): void {
    this.activeId.set( this.receivedActiveSecId );
  }

  getNavItems(): NavItem[]{
    return this.navItems;
  }

  onClickNav(navItem: NavItem){
    this.close();
  }
}
