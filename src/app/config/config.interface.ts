import { NavItem } from '@beexy/ngx-components'

export interface AppCommonConfig {
  jsonDataSrc: string;
  svgSpriteSheetSrc: string;
  defaultLang: string;
  enableDebug: boolean;
  NavAppItems: NavItem[];
}
