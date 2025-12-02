import {
  Component,
  input,
  inject,
} from '@angular/core';

import {
  HorizontalLayoutComponent as FlexHori,
  ResponsiveLayoutComponent as ResponsiveLayout,
} from '@beexy/ngx-layouts';

import { AppDataHome } from '../../interfaces';

import { AppCommonConfig, APP_COMMON_CONFIG_TOKEN } from '../../providers/config'

import { 
  SocialNetworksLinks,
  GifLazyLoad as Gif
 } from '../../components'

@Component({
  selector: 'sec-contact',
  imports: [FlexHori, ResponsiveLayout, SocialNetworksLinks, Gif],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  data = input.required<AppDataHome | undefined>();

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  getData(): AppDataHome {
    return this.data()!;
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }
}
