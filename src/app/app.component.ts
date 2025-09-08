import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  StoragesManager,
} from "@beexy/tools"

import { ModalWindowHostComponent } from "@beexy/ngx-modals"
import {
  SideBarPopUpHostComponent,
  ToastHostComponent,
  NoModalWindowHostComponent,
  TooltipPopupHostComponent as ToolTipHost
} from '@beexy/ngx-popups'

import { BeeScrollTrackerComponent } from '@beexy/ngx-navigation'
import { BeeResponsiveSchemaService as ResponsiveService } from '@beexy/ngx-providers'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from './providers/config'

@Component({
  selector: 'app-root',
  imports: [NoModalWindowHostComponent, ModalWindowHostComponent, SideBarPopUpHostComponent, ToastHostComponent, RouterOutlet, BeeScrollTrackerComponent, ToolTipHost],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'ngx-cv-web';

  private resizeSubscription!: Subscription;

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);
  private storage = inject(StoragesManager);

  constructor(
    private router: Router,
    private responsiveService: ResponsiveService
  ) {
    // console.log('[AppComponent]', this.commonConfig);
    // console.log(this.storage);
  }

  ngOnInit(): void {
    if (this.commonConfig.initialLoadingFail === true) {
      this.router.navigate(['/error']);
      return;
    }

    this.configWindowResize();

    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.checkInvalidScreenSize()
  }

  private configWindowResize() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(120)) // delay in ms (adjust as needed)
      .subscribe(() => this.checkInvalidScreenSize());
  }

  private checkInvalidScreenSize() {
    if (this.responsiveService.getCurrentSchema() === 'tiny-screen') {
      this.router.navigate(['/invalidScreenSize']);
    }
  }

}
