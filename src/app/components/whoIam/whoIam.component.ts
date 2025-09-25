import { Component, input } from '@angular/core';

import {
  HorizontalLayoutComponent as FlexHori,
} from '@beexy/ngx-layouts'
import {
  HighlightKeyWordsDirective as keywordDir,
  LinkIconComponent as LinkIcon,
  SVGIconComponent as SVGIcon
} from '@beexy/ngx-components'

import { ToastService } from '@beexy/ngx-popups'

import {
  ClickableActionDirective as ActionClickDir
} from '../../directives'
import { SampleToastComponent } from '../../components'
import { AppDataHome } from '../../interfaces';
import { copyToClipboard } from '../../utils'

@Component({
  selector: 'app-who-iam',
  imports: [FlexHori, LinkIcon, SVGIcon, ActionClickDir, keywordDir],
  templateUrl: './whoIam.component.html',
})
export class WhoIamComponent {
  data = input.required<AppDataHome>();

  constructor(
    private toastService: ToastService
  ) { }

  getData(): AppDataHome {
    return this.data();
  }

  getLink(): string {
    return this.data()!.url_downloadCV;
  }

  protected async copyEmailtToClipboard(datEmited: void) {
    let message = 'Email Copied to Clipboard';

    const success = await copyToClipboard(this.data().url_email);
    if (!success) {
      message = 'Error Copying email to clipboar. Try again'
    }

    this.toastService.open({
      component: SampleToastComponent,
      data: {
        message
      }
    })
  }

}
