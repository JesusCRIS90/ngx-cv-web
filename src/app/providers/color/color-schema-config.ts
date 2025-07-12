import { InjectionToken } from '@angular/core';

export interface ColorSchemaConfig {
  prefix: string;
  availableSchemas: string[];
}

export const COLOR_SCHEMA_CONFIG_TOKEN = new InjectionToken<ColorSchemaConfig>(
  'ColorSchemaConfig'
);
