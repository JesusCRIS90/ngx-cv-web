import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  StoragesManager
} from "@beexy/tools"

import { provideBeeColorSchema } from '@beexy/ngx-providers'

import { routes } from './app.routes';

import { USER_CONFIG_APP_PROVIDER  } from './providers/config'
import { SPRITE_SHEET_PROVIDER, JSON_DATA_PROVIDER } from './providers/pre-loaders'


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideBeeColorSchema({
      availableSchemas: ['violet', 'blue'],
      prefix: 'color-schema-',
      initialSchema: 'violet'
    }),
    StoragesManager,
    USER_CONFIG_APP_PROVIDER,
    SPRITE_SHEET_PROVIDER,
    JSON_DATA_PROVIDER,
  ]
};
