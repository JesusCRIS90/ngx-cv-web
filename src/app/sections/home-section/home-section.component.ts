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
  LinkIconComponent as LinkComp,
  SVGIconComponent as SVGIcon
} from '@beexy/ngx-components'

import { ToastService } from '@beexy/ngx-popups'

import { AppData, AppDataHome } from '../../interfaces';
import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from '../../providers/config';
import {
  ClickableActionDirective as ActionClickDir
} from '../../directives'

import { SampleToastComponent } from '../../components'
import { copyToClipboard } from '../../utils'

@Component({
  selector: 'sec-home',
  imports: [ResponsiveLayout, PairLayout, SVGIcon, ActionClickDir, HighlightKeyWordsDirective, LinkComp, FlexHori],
  templateUrl: './home-section.component.html',
})
export class HomeSectionComponent implements OnInit {

  PAIR_POLICY = PAIR_POLICY;

  private storage = inject(StoragesManager);
  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  private data!: AppDataHome;

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {
    const dataStorage = this.storage.getStorageFromKey<AppData>(this.commonConfig.dataKey);

    // TODO: Think a better way to proceed here
    if (dataStorage === null) {
      this.router.navigate(['/error']);
    }

    if (dataStorage !== null) {
      this.data = dataStorage.getData().home;
    }

    // this.toastService.setLimit( 10 )
  }

  ngOnInit(): void {
    console.log('[HOME-SECTION]', this.data);
  }

  getProfileUrl(): string {
    return this.data.profileImg.hori;
  }

  getData(): AppDataHome {
    return this.data
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }

  protected async copyEmailtToClipboard(datEmited: void) {
    let message = 'Email Copied to Clipboard';

    const success = await copyToClipboard(this.data.url_email);
    if (!success) {
      message = 'Error Copying email to clipboar. Try again'
    }

    this.toastService.open({
      component: SampleToastComponent,
      data: {
        message
      }
    })
  }
}
