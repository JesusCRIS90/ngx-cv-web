import { Component, input } from '@angular/core';

import { HorizontalLayoutComponent as FlexHori } from '@beexy/ngx-layouts';

import {
  LinkIconComponent as LinkIcon,
  SVGIconComponent as SVGIcon,
} from '@beexy/ngx-components';

import { ToastService } from '@beexy/ngx-popups';

import { SampleToastComponent } from '../../components';

import { ClickableActionDirective as ActionClickDir } from '../../directives';

import { copyToClipboard } from '../../utils';

@Component({
  selector: 'social-networks-links',
  imports: [FlexHori, LinkIcon, SVGIcon, ActionClickDir],
  templateUrl: './social-networks-links.html',
})
export class SocialNetworksLinks {
  linkedin_url = input.required<string>();
  github_url = input.required<string>();
  email_url = input.required<string>();
  pdf_url = input.required<string>();

  constructor(private toastService: ToastService) {}

  protected async copyEmailtToClipboard(datEmited: void) {
    let message = 'Email Copied to Clipboard';

    const success = await copyToClipboard(this.email_url());
    if (!success) {
      message = 'Error Copying email to clipboar. Try again';
    }

    this.toastService.open({
      component: SampleToastComponent,
      data: {
        message,
      },
    });
  }
}
