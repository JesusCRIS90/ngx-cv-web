import { Provider } from '@angular/core'

import { APP_CONFIG } from './config'
import { APP_COMMON_CONFIG_TOKEN } from './config.token'

export const COMMON_APP_CONFIG_PROVIDER: Provider = {
  provide: APP_COMMON_CONFIG_TOKEN,
  useFactory: () => APP_CONFIG
}
