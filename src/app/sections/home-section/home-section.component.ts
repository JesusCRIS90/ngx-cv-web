import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoragesManager } from '@beexy/tools';
import {
  ResponsiveLayoutComponent as ResponsiveLayout,
  PairLayoutComponent as PairLayout,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  ScreenOrientation as BeeScreenOrientation,
  RelativeLayoutComponent as RelatativeLayout,
  FloatingLayoutComponent as FloatLayout,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import { AppData, AppDataHome } from '../../interfaces';
import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';

import { WhoIamComponent } from '../../components'

@Component({
  selector: 'sec-home',
  imports: [ResponsiveLayout, PairLayout, RelatativeLayout, FloatLayout, WhoIamComponent],
  templateUrl: './home-section.component.html',
})
export class HomeSectionComponent implements OnInit {

  POLICY = POLICY;
  PAIR_POLICY = PAIR_POLICY;

  private storage = inject(StoragesManager);
  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  private data!: AppDataHome;
  private orientation: BeeScreenOrientation = 'landscape';

  constructor(
    private router: Router,
   ) {
    const dataStorage = this.storage.getStorageFromKey<AppData>(this.commonConfig.dataKey);

    // TODO: Think a better way to proceed here
    if (dataStorage === null) {
      this.router.navigate(['/error']);
    }

    if (dataStorage !== null) {
      this.data = dataStorage.getData().home;
    }
  }

  ngOnInit(): void {
    console.log('[HOME-SECTION]', this.data);
  }

  getProfileUrl(): string {
    if( this.orientation === 'landscape' )
      return this.data.profileImg.hori;

    return this.data.profileImg.vert;
  }

  getData(): AppDataHome {
    return this.data
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }

  protected updateOrientation(orientation: BeeScreenOrientation){
    this.orientation = orientation
    // console.log( orientation );
  }
}
