import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

export interface MarkdownResult {
  text: SafeHtml
  fail: boolean
  error: string
}

@Injectable({
  providedIn: 'root'
})
export class MarkdownTranslateService {

  constructor(private sanitizer: DomSanitizer) { }

  async loadMarkdown(path: string): Promise<MarkdownResult> {
    try {
      const res = await fetch(path);
      const md = await res.text();
      const html = await marked.parse(md);
      return {
        fail: false,
        text: this.sanitizer.bypassSecurityTrustHtml(html),
        error: ''
      };
      // return this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (err) {
      return {
        fail: true,
        text: this.sanitizer.bypassSecurityTrustHtml('Error loading Markdown Content File'),
        error: err as string
      }
    }
  }
}
