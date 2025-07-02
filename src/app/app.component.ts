import { Component, Inject, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  loadSVGIcons,
  StoragesManager,
  addValue2Storage
} from "@beexy/tools"

import { ModalWindowHostComponent } from "@beexy/ngx-modals"
import { SideBarPopUpHostComponent } from '@beexy/ngx-popups'

import { AppViewComponent, LoadingViewComponent } from "./views"

import { getRightPath } from '../environments'

import {
  loadData
} from "./utils/loadJSONData"

import {
  DATA_KEY,
  DATA_GITHUB_CDN
} from "./utils/common-data"

import { DataLoadingState } from './enums'

import { APP_COMMON_CONFIG_TOKEN, AppCommonConfig } from './config'



@Component({
  selector: 'app-root',
  imports: [ModalWindowHostComponent, SideBarPopUpHostComponent, AppViewComponent, LoadingViewComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-cv-web';
  DataLoadingState = DataLoadingState;

  private storage = inject(StoragesManager);
  private commonConfig:AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  loadingDataState = signal<DataLoadingState>(DataLoadingState.LOADING);

  constructor(
    private router: Router,
  ) {
    console.log( '[AppComponent]', this.commonConfig );
  }

  ngOnInit(): void {

    this.loadingDataState.set(DataLoadingState.LOADING);

    // loadSVGIcons(getRightPath(this.commonConfig.svgSpriteSheetSrc));
    // this.loadData(getRightPath(DATA_GITHUB_CDN));
    this.loadData(this.commonConfig.jsonDataSrc);
  }

  protected async loadData(path: string) {

    const response = await loadData(path);
    console.log(`Data Loaded`, response);

    if (response.fail) {
      this.loadingDataState.set(DataLoadingState.FAIL);
      this.router.navigate(['/error']);
      return;
    }

    if (this.StorageDataApp(response.originalData)) {
      this.loadingDataState.set(DataLoadingState.SUCCES);
      this.router.navigate(['/']);
      return;
    }

    this.loadingDataState.set(DataLoadingState.FAIL);
    this.router.navigate(['/error']);
  }

  protected StorageDataApp(data: Object): boolean {

    // TODO: On this process an checker/adaptor function must be applied to assure
    // data injected on App has the Interface that App is expecting
    // const data2Storage: AppData = data as AppData;
    const data2Storage: any = data as any;

    // addValue2Storage<AppData>(this.storage, DATA_KEY, data2Storage);
    addValue2Storage<any>(this.storage, DATA_KEY, data2Storage);

    return true;
  }
}
