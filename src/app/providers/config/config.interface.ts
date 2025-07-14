import { NavItem } from '@beexy/ngx-components'

export interface AppCommonConfig {
  jsonDataSrc: string;
  mimeTypeJSONData: 'json' | 'txt';
  svgSpriteSheetSrc: string;
  defaultLang: string;
  enableDebug: boolean;
  NavAppItems: NavItem[];
  initialLoadingFail: boolean;
  dataKey: string;
}
