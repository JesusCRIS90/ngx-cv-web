import { Component, OnInit } from '@angular/core';

import {
  PairLayoutComponent as PairLay,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  HorizontalLayoutComponent as HoriFlex,
  VerticalLayoutComponent as VertFlex,
  POLICY_POSITION as POLICY,
} from '@beexy/ngx-layouts'

import {
  SVGIconComponent as SVG,
  LinkIconComponent as LinkIcon
} from '@beexy/ngx-components'

import {
  BeeHorizontalCarouselComponent as HoriCarousel,
} from '@beexy/ngx-navigation'

import { Project, ProjectMedia } from '../../interfaces'

import { MarkdownViewerComponent as MDViewer } from '../../devComp/markdown-viewer/markdown-viewer.component'
import { EmbedYoutubeVideoComponent } from '../../devComp/embed-youtube-video/embed-youtube-video.component'
import { ImageFrameComponent } from '../../devComp/image-frame/image-frame.component'
import { AppDataMapper } from '../../mappers/AppDataMapper';


const horiUrls = [
  "./assets/images/hori-test-1.jpg",
  "./assets/images/hori-test-2.jpg",
  "./assets/images/hori-test-3.jpg"
]

@Component({
  selector: 'long-project-card',
  imports: [
    PairLay, HoriFlex, VertFlex, MDViewer,
    SVG, LinkIcon, HoriCarousel,
    EmbedYoutubeVideoComponent, ImageFrameComponent
  ],
  templateUrl: './long-project-card.component.html',
  styleUrl: './long-project-card.component.css',
})
export class LongProjectCardComponent implements OnInit {
  PAIR_POLICY = PAIR_POLICY;
  POLICY = POLICY;

  projectInfo!: Project;

  testUrls = horiUrls;

  ngOnInit(): void {
    console.log("LongProjectCard", this.projectInfo);
  }

  getType(): ProjectMedia {
    return this.projectInfo.type;
  }

  getProjectInfo(): Project {
    return this.projectInfo;
  }

  getImgUrls(): string[] {
    return AppDataMapper.ImagesResponsiveness2HoriImgs( this.projectInfo.imageUrls );
  }

}
