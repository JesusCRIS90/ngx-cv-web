import { NavItem } from '@beexy/ngx-components'

import { NavMenuItems } from './config.navigation'

export const getJSONDataSrc = (): string => {
  return 'https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/refs/heads/main/jriz-cv/cv-data.json';
}

export const getSVGSpritesSheetSrc = (): string => {
  // return '/assets/sprite-sheet/icons-sheet.svg';
  return 'https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/refs/heads/main/jriz-cv/icons-sheet.txt';
}

export const getNavAppItems = (): NavItem[] => {
  return NavMenuItems;
}

