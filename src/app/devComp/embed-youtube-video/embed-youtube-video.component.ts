import { Component, input, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-embed-youtube-video',
  imports: [],
  templateUrl: './embed-youtube-video.component.html',
  styleUrl: './embed-youtube-video.component.css',
})
export class EmbedYoutubeVideoComponent implements OnInit {

  source = input.required<string>();
  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    let url: string = '';
    if( this.validateYTurl( this.source() ) ){
      url = this.prepareUrl( this.source() );
    }

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  protected validateYTurl(url: string): boolean {
    const pattern = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/;
    if (!pattern.test(url)) {
      return false;
    }
    return true;
  }

  protected prepareUrl( url: string ): string {
    return this.source() + '?autoplay=1&mute=1'
  }
}
