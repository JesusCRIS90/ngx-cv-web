import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ResponsiveLayoutComponent as ResponsiveLayout,
  PairLayoutComponent as PairLayout,
  VerticalLayoutComponent as VFlex,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  VERTICAL_POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { AppDataHome } from '../../interfaces';
import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';

import { WhoIamComponent } from '../../components'
import { BackgroundDirectiveDirective as bgDir } from '../../devComp/background-directive.directive'

@Component({
  selector: 'sec-home',
  imports: [ResponsiveLayout, PairLayout, VFlex, WhoIamComponent, bgDir],
  templateUrl: './home-section.component.html',
})
export class HomeSectionComponent implements OnInit {

  POLICY = POLICY;
  PAIR_POLICY = PAIR_POLICY;

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  homeData = input.required<AppDataHome | undefined>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.homeData() === undefined) {
      this.router.navigate(['/error']);
    }

    console.log(this.homeData());
  }

  getProfileUrl(): string {
    return this.homeData()!.profileImg.hori;
  }

  getBackgroundImage(): string {
    return this.homeData()!.background.hori;
  }

  getData(): AppDataHome {
    return this.homeData()!
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }
}
