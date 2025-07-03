import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  StoragesManager
} from "@beexy/tools"

import { routes } from './app.routes';

import { COMMON_APP_CONFIG_PROVIDER } from './config'
import { SPRITE_SHEET_PROVIDER, JSON_DATA_PROVIDER } from './pre-loaders'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    StoragesManager,
    COMMON_APP_CONFIG_PROVIDER,
    SPRITE_SHEET_PROVIDER,
    JSON_DATA_PROVIDER
  ]
};
