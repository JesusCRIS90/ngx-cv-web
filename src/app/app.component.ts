import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  loadSVGIcons,
  StoragesManager,
  addValue2Storage
} from "@beexy/tools"

import { ModalWindowHostComponent } from "@beexy/ngx-modals"

import { AppViewComponent, LoadingViewComponent } from "./views"

import { getRightPath } from '../environments'

import {
  loadData
} from "./utils/loadJSONData"

import {
  SVGs_PATH,
  DATA_PATH,
  DATA_KEY
} from "./utils/common-data"

import { DataLoadingState } from './enums'
import { AppData } from './interfaces'

@Component({
  selector: 'app-root',
  imports: [ModalWindowHostComponent, AppViewComponent, LoadingViewComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-cv-web';
  DataLoadingState = DataLoadingState;

  private storage = inject(StoragesManager);

  loadingDataState = signal<DataLoadingState>(DataLoadingState.LOADING);

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.loadingDataState.set(DataLoadingState.LOADING);

    loadSVGIcons(getRightPath(SVGs_PATH));
    this.loadData(getRightPath(DATA_PATH));

    // console.log(this.storage);
  }

  protected async loadData(path: string) {

    const response = await loadData(path);

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
