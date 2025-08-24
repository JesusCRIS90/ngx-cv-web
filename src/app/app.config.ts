import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  StoragesManager
} from "@beexy/tools"

import { provideBeeColorSchema, provideBeeResponsiveSchema, defaultResponsivenessTaxonomy2DMap } from '@beexy/ngx-providers'

import { routes } from './app.routes';

import { USER_CONFIG_APP_PROVIDER } from './providers/config'
import { SPRITE_SHEET_PROVIDER, JSON_DATA_PROVIDER } from './providers/pre-loaders'

const responsiveAvailablesSchemmas = [
  'small-screen',
  'medium-screen',
  'big-screen',
  'extra-wide-screen',
  'ultra-wide-screen',
  'smartphone-vertical',
  'big-smartphone-vertical',
  'small-tablet-vertical',
  'tablet-vertical',
  'big-tablet-vertical'
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideBeeColorSchema({
      availableSchemas: ['violet', 'blue'],
      prefix: 'color-schema-',
      initialSchema: 'violet'
    }),
    provideBeeResponsiveSchema({
      availableSchemas: responsiveAvailablesSchemmas,
      prefix: 'responsive-schema-',
      debouncingDelayMS: 100,
      responsiveTaxonomyMap: defaultResponsivenessTaxonomy2DMap
    }),
    StoragesManager,
    USER_CONFIG_APP_PROVIDER,
    SPRITE_SHEET_PROVIDER,
    JSON_DATA_PROVIDER,
  ]
};
