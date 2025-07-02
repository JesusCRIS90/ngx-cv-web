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
};
