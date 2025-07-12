import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';

import { ColorSchemaService } from '../../color/color-schema.service';
import { APP_COMMON_CONFIG_TOKEN } from '../config';

export async function initializeColorSchema(): Promise<void> {

  const config = inject(APP_COMMON_CONFIG_TOKEN);
  const service = inject(ColorSchemaService);

  service.setPrefix(config.colorConfig.prefix);
  service.setAvailableSchemas(config.colorConfig.availableSchemas);

  const firstSchema = config.colorConfig.availableSchemas?.[0] ?? 'default';
  service.setSchema(firstSchema);
}


export const COLOR_SCHEMA_CONFIG_PROVIDER: EnvironmentProviders = provideAppInitializer(initializeColorSchema);



