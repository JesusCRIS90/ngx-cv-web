import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  // HorizontalLayoutComponent as HoriFlex,
  // VerticalLayoutComponent as VertFlex,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import {
  SVGIconComponent as SVG,
  LinkIconComponent as LinkIcon
} from '@beexy/ngx-components'

import { BeeTooltipPopupDirective as DBeeToolTip } from '@beexy/ngx-popups'

import {
  BeeHorizontalCarouselComponent as HoriCarousel,
} from '@beexy/ngx-navigation'

import { Project, ProjectMedia } from '../../interfaces'

import { MarkdownViewerComponent as MDViewer } from '../../devComp/markdown-viewer/markdown-viewer.component'
import { EmbedYoutubeVideoComponent } from '../../devComp/embed-youtube-video/embed-youtube-video.component'
import { ImageFrameComponent } from '../../devComp/image-frame/image-frame.component'
import { AppDataMapper } from '../../mappers/AppDataMapper';


@Component({
  selector: 'long-project-card',
  imports: [
    PairLay, MDViewer,
    SVG, LinkIcon, HoriCarousel,
    EmbedYoutubeVideoComponent, ImageFrameComponent,
    DBeeToolTip
  ],
  templateUrl: './long-project-card.component.html',
  styleUrl: './long-project-card.component.css',
})
export class LongProjectCardComponent implements OnInit, OnDestroy {

  PAIR_POLICY = PAIR_POLICY;
  POLICY = POLICY;

  projectInfo!: Project;

 // Collect all tooltip directives inside this component
  @ViewChildren(DBeeToolTip) tooltips!: QueryList<DBeeToolTip>;

  ngOnInit(): void {
    // console.log("LongProjectCard", this.projectInfo);
  }

  ngOnDestroy(): void {
    // Ensure all tooltips are closed before component is destroyed
    if (this.tooltips) {
      this.tooltips.forEach(t => {
        try {
          t.closeTooltip();
        } catch (e) {
          console.warn('Error closing tooltip:', e);
        }
      });
    }
  }

  getType(): ProjectMedia {
    return this.projectInfo.type;
  }

  getProjectInfo(): Project {
    return this.projectInfo;
  }

  getImgUrls(): string[] {
    return AppDataMapper.ImagesResponsiveness2HoriImgs(this.projectInfo.imageUrls);
  }

}
