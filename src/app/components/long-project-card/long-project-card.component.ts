import { Component } from '@angular/core';

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

import { Projects, ProjectMedia } from '../../interfaces'

import { MarkdownViewerComponent as MDViewer } from '../../devComp/markdown-viewer/markdown-viewer.component'

@Component({
  selector: 'long-project-card',
  imports: [PairLay, HoriFlex, VertFlex, MDViewer, SVG, LinkIcon],
  templateUrl: './long-project-card.component.html',
  styleUrl: './long-project-card.component.css',
})
export class LongProjectCardComponent {
  PAIR_POLICY = PAIR_POLICY;
  POLICY = POLICY;

  getType(): ProjectMedia{
    return 'video';
  }
}
