import { Component, input, linkedSignal } from '@angular/core';

import {
  BeeHoverOnceDirective as HoverOnce,
  RelativeLayoutComponent as RelativeLay,
  FloatingLayoutComponent as FloatLay,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import {
  BeeHorizontalCarouselComponent as HoriCarousel,
} from '@beexy/ngx-navigation'

import { NoModalWindowService } from '@beexy/ngx-popups'

import { ClickableActionDirective } from '../../directives'
import { LongProjectCardComponent as LongProjectCard } from '../../components'
import { Project } from '../../interfaces';
import { AppDataMapper } from '../../mappers/AppDataMapper';
import { BeeTruncatePipe } from '../../pipes/text-truncate.pipe'

@Component({
  selector: 'short-hori-project-card',
  imports: [HoverOnce, RelativeLay, FloatLay, ClickableActionDirective, HoriCarousel, BeeTruncatePipe],
  templateUrl: './short-hori-project-card.component.html',
  styleUrl: './short-hori-project-card.component.css',
})
export class ShortHoriProjectCardComponent {
  POLICY = POLICY;

  projectInfo = input.required<Project>();
  imgurls = linkedSignal( () => this.getHoriImgUrls() );

  onHover: boolean = false;

  constructor(private noModalService: NoModalWindowService) { }

  onHoverChange(isHovered: boolean) {
    // console.log('Hovered:', isHovered);
    this.onHover = isHovered;
  }

  onClickAction( id: string ) {
    // console.log(`Clicked Project Card with id:${id}`);
    this.noModalService.open({
      component: LongProjectCard,
      data: {
        projectInfo: this.projectInfo()
      }
    })
  }

  getProjectInfo(): Project{
    return this.projectInfo();
  }

  getAutoplayTimer(): number {
    return 2000 * Number(this.projectInfo().id);
  }

  getId(): string {
    return this.projectInfo().id;
  }

  protected getHoriImgUrls(): string[]{
    return AppDataMapper.ImagesResponsiveness2HoriImgs( this.projectInfo().imageUrls )
  }
}


// "./assets/images/dog-test-3.jpg"
