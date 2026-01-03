import { Component, input, inject, signal } from '@angular/core';

import {
  HorizontalLayoutComponent as FlexHori,
  VerticalLayoutComponent as FlexVert,
  ResponsiveLayoutComponent as ResponsiveLayout,
} from '@beexy/ngx-layouts';

import {
  AppDataHome,
  AppDataContact,
  FormStateFeedback,
} from '../../interfaces';

import {
  AppCommonConfig,
  APP_COMMON_CONFIG_TOKEN,
} from '../../providers/config';

import {
  SocialNetworksLinks,
  GifLazyLoad as Gif,
  ContactForm as CvContactForm,
  ContactFormState,
} from '../../components';

@Component({
  selector: 'sec-contact',
  imports: [
    FlexHori,
    FlexVert,
    ResponsiveLayout,
    SocialNetworksLinks,
    Gif,
    CvContactForm,
  ],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  homeData = input.required<AppDataHome | undefined>();
  contactFormData = input.required<FormStateFeedback | undefined>();

  private commonConfig: AppCommonConfig = inject(APP_COMMON_CONFIG_TOKEN);

  mediaGifUrl = signal<string>('');

  getHomeData(): AppDataHome {
    return this.homeData()!;
  }

  protected getFactorVert2Hori(): number {
    return this.commonConfig.factorVert2Hori;
  }

  protected updatingContactFormState(state: ContactFormState): void {
    switch (state) {
      case 'idle':
        this.mediaGifUrl.set(this.contactFormData()?.idle || '');
        break;
      case 'sending':
        this.mediaGifUrl.set(this.contactFormData()?.sending || '');
        break;
      case 'error':
        this.mediaGifUrl.set(this.contactFormData()?.error || '');
        break;
      case 'success':
        this.mediaGifUrl.set(this.contactFormData()?.success || '');
        break;
    }
  }
}
