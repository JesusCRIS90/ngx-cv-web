import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  InjectionToken
} from '@angular/core';

import { ColorSchemaService } from './color-schema.service';

export interface ColorSchemaConfig {
  prefix: string;
  availableSchemas: string[];
  initialSchema: string;
}

export const COLOR_SCHEMA_CONFIG_TOKEN = new InjectionToken<ColorSchemaConfig>(
  'ColorSchemaConfig'
);

export function provideColorSchema(config: ColorSchemaConfig): EnvironmentProviders {

  return makeEnvironmentProviders([
    ColorSchemaService,

    provideEnvironmentInitializer(() => {
      const service = inject(ColorSchemaService);

      service.setPrefix(config.prefix);
      service.setAvailableSchemas(config.availableSchemas);


      const firstSchema = config.availableSchemas.includes(config.initialSchema) ?
        config.initialSchema : config.availableSchemas[0];

      service.setSchema(firstSchema);
    }),
  ]);
}
