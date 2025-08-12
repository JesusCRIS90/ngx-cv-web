import { Component, HostBinding, input, OnInit, ViewEncapsulation, } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { MarkdownTranslateService, MarkdownResult } from '../../services/markdown-translate.service'


@Component({
  selector: 'bee-markdown-viewer',
  imports: [],
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MarkdownViewerComponent implements OnInit {

  markdownPath = input.required<string>();
  // @HostBinding('innerHTML') content!: SafeHtml;
  content!: SafeHtml;

  constructor(private markdownService: MarkdownTranslateService) {}

  async ngOnInit(): Promise<void> {
    const result: MarkdownResult = await this.markdownService.loadMarkdown( this.markdownPath() );
    this.content = result.text;
  }

}
