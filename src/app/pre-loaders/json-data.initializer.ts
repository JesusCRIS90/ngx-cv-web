// import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { inject, provideAppInitializer, EnvironmentProviders } from '@angular/core';

import {
  StoragesManager,
  addValue2Storage,
  BeePlainTextFileClient,
  BeeJSONFileClient,
  Adapt_TXTPlain2Json,
  RequestResponse,
} from "@beexy/tools"

import { APP_COMMON_CONFIG_TOKEN } from '../config';

export async function initializeLoadJSONData(): Promise<void> {

  const config = inject(APP_COMMON_CONFIG_TOKEN);   // Inject config
  const storage = inject(StoragesManager);          // Inject Global Storage

  let response: RequestResponse;

  if (config.mimeTypeJSONData === 'txt') {
    response = await new BeePlainTextFileClient().requestData(config.jsonDataSrc, Adapt_TXTPlain2Json);
  } else {
    response = await new BeeJSONFileClient().requestData(config.jsonDataSrc);
  }


  if (response.fail) {
    console.error(`Failed to load json data: ${response.errorMsg}`);
    config.initialLoadingFail = true;
    return;
  }

  // TODO: On this process an checker/adaptor function must be applied to assure
  // data injected on App has the Interface that App is expecting
  // const data2Storage: AppData = data as AppData;
  const data2Storage: any = response.adaptedData as any;

  // addValue2Storage<AppData>(this.storage, DATA_KEY, data2Storage);
  addValue2Storage<any>(storage, config.dataKey, data2Storage);
}

/* APP_INITIALIZER Version */
// export const JSON_DATA_PROVIDER: Provider = {
//   provide: APP_INITIALIZER,
//   useFactory: () => initializeLoadJSONData,
//   deps: [],
//   multi: true,
// };

export const JSON_DATA_PROVIDER: EnvironmentProviders = provideAppInitializer(initializeLoadJSONData);
