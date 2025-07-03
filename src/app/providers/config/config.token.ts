import { InjectionToken } from '@angular/core';
import { AppCommonConfig } from './config.interface'

export const APP_COMMON_CONFIG_TOKEN = new InjectionToken<AppCommonConfig>('AppCommonConfig');

