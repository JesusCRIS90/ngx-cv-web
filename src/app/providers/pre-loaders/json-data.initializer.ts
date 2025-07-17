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
import { AppData } from '../../interfaces'
import { AppDataMapper } from '../../mappers/AppDataMapper'

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

  const data2Storage: AppData = AppDataMapper.normalizeData(response.adaptedData);
  if (!addValue2Storage<AppData>(storage, config.dataKey, data2Storage)) {
    console.error(`Failed to inject Data towards Global Storage`);
    config.initialLoadingFail = true;
    return;
  }
}

/* APP_INITIALIZER Version */
// export const JSON_DATA_PROVIDER: Provider = {
//   provide: APP_INITIALIZER,
//   useFactory: () => initializeLoadJSONData,
//   deps: [],
//   multi: true,
// };

export const JSON_DATA_PROVIDER: EnvironmentProviders = provideAppInitializer(initializeLoadJSONData);
