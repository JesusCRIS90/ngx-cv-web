import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';

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
  selector: 'sec-contact',
  imports: [FlexHori, LinkIcon, SVGIcon, ActionClickDir, keywordDir],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent implements AfterViewInit {

  data = input.required<AppDataHome|undefined>();

  @ViewChild('gifElement') gifElement!: ElementRef<HTMLImageElement>;
  gifLoaded = false;

  constructor(
    private toastService: ToastService
  ) { }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.gifLoaded = true;
        observer.disconnect();
      }
    });

    observer.observe(this.gifElement.nativeElement);
  }

  getData(): AppDataHome {
    return this.data()!;
  }

  getGIF(): string {
    return "https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/main/jriz-cv/gifs/Building1.gif"
  }

  protected async copyEmailtToClipboard(datEmited: void) {
    let message = 'Email Copied to Clipboard';

    const success = await copyToClipboard(this.data()!.url_email);
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
