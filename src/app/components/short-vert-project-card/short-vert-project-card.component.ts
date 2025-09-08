import { Component, input, linkedSignal } from '@angular/core';

import {
  BeeHoverOnceDirective as HoverOnce,
  RelativeLayoutComponent as RelativeLay,
  FloatingLayoutComponent as FloatLay,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import {
  BeeVerticalCarouselComponent as VertCarousel,
} from '@beexy/ngx-navigation'

import { NoModalWindowService } from '@beexy/ngx-popups'

import { BeeTruncatePipe } from '../../pipes/text-truncate.pipe'

import { ClickableActionDirective } from '../../directives'
import { LongProjectCardComponent as LongProjectCard } from '../../components'
import { Project } from '../../interfaces';
import { AppDataMapper } from '../../mappers/AppDataMapper';

@Component({
  selector: 'short-vert-project-card',
  imports: [HoverOnce, RelativeLay, FloatLay, ClickableActionDirective, VertCarousel, BeeTruncatePipe],
  templateUrl: './short-vert-project-card.component.html',
  styleUrl: './short-vert-project-card.component.css',
})
export class ShortVertProjectCardComponent {
  POLICY = POLICY;

  projectInfo = input.required<Project>();
  imgurls = linkedSignal(() => this.getVertImgUrls());

  onHover: boolean = false;

  constructor(private noModalService: NoModalWindowService) { }

  onHoverChange(isHovered: boolean) {
    // console.log('Hovered:', isHovered);
    this.onHover = isHovered;
  }

  onClickAction() {
    console.log('Clicked Project Card');
    this.noModalService.open({
      component: LongProjectCard,
      data: {
        projectInfo: this.projectInfo()
      }
    })
  }

  getProjectInfo(): Project {
    return this.projectInfo();
  }

  getAutoplayTimer(): number {
    return 2000 * Number(this.projectInfo().id);
  }

  protected getVertImgUrls(): string[] {
    return AppDataMapper.ImagesResponsiveness2VertImgs(this.projectInfo().imageUrls)
  }
}
