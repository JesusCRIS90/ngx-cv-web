import { NavItem } from '@beexy/ngx-components'

import { ColorSchemaConfig } from '../color'

export interface AppCommonConfig {
  jsonDataSrc: string;
  mimeTypeJSONData: 'json' | 'txt';
  svgSpriteSheetSrc: string;
  defaultLang: string;
  enableDebug: boolean;
  NavAppItems: NavItem[];
  initialLoadingFail: boolean;
  dataKey: string;
  colorConfig: ColorSchemaConfig,
}
