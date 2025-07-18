import { beeCreateUserConfigAppProvider } from '@beexy/ngx-providers';

import { AppCommonConfig } from './config.interface'


import {
  getJSONDataSrc,
  getNavAppItems,
  getSVGSpritesSheetSrc
} from './config.utils'

export const APP_CONFIG: AppCommonConfig = {
  jsonDataSrc: getJSONDataSrc(),
  svgSpriteSheetSrc: getSVGSpritesSheetSrc(),
  defaultLang: 'en',
  enableDebug: true,
  NavAppItems: getNavAppItems(),
  initialLoadingFail: false,
  dataKey: 'AppKey',
  mimeTypeJSONData: 'txt',
  factorVert2Hori: 0.85
};

export const { token: APP_COMMON_CONFIG_TOKEN, provider: USER_CONFIG_APP_PROVIDER } =
  beeCreateUserConfigAppProvider<AppCommonConfig>(APP_CONFIG, 'AppCommonConfigToken');
