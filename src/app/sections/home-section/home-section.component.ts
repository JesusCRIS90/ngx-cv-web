import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoragesManager } from '@beexy/tools';
import {
  ResponsiveLayoutComponent as ResponsiveLayout,
  PairLayoutComponent as PairLayout,
  HorizontalLayoutComponent as FlexHori,
  PAIR_DISTRIBUTION as PAIR_POLICY,
} from '@beexy/ngx-layouts'
import {
  HighlightKeyWordsDirective,
  LinkIconComponent as LinkComp
} from '@beexy/ngx-components'

import { AppData, AppDataHome } from '../../interfaces';
import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';

@Component({
  selector: 'sec-home',
  imports: [ResponsiveLayout, PairLayout, HighlightKeyWordsDirective, LinkComp, FlexHori],
  templateUrl: './home-section.component.html',
})
export class HomeSectionComponent implements OnInit {

  PAIR_POLICY = PAIR_POLICY;

  private storage = inject(StoragesManager);
  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  private data!: AppDataHome;

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
    return this.data.profileImg.hori;
  }

  getData(): AppDataHome{
    return this.data
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }
}
