import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  StoragesManager,
} from "@beexy/tools"

import { ModalWindowHostComponent } from "@beexy/ngx-modals"
import { SideBarPopUpHostComponent } from '@beexy/ngx-popups'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from './providers/config'

@Component({
  selector: 'app-root',
  imports: [ModalWindowHostComponent, SideBarPopUpHostComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-cv-web';
  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);
  private storage = inject(StoragesManager);

  constructor(
    private router: Router,
  ) {
    console.log('[AppComponent]', this.commonConfig);
    console.log(this.storage);
  }

  ngOnInit(): void {
    if (this.commonConfig.initialLoadingFail === true) {
      this.router.navigate(['/error']);
      return;
    }

    this.router.navigate(['/']);
  }

}
