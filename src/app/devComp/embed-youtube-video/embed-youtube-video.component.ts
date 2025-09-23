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

    // if( this.validateYTurl( this.source() ) ){
    //   url = this.prepareUrl( this.source() );
    // }

    // url = this.source();
    url = this.prepareUrl( this.source() );
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    // console.log( "YT-URL:", this.safeUrl );
  }

  protected validateYTurl(url: string): boolean {
    const pattern = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{32}$/;
    if (!pattern.test(url)) {
      return false;
    }
    return true;
  }

  protected prepareUrl( url: string ): string {
    return url + '?mute=0&autoplay=1'
  }
}
