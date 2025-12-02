import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gif-lazy-load',
  imports: [],
  templateUrl: './gif-lazy-load.html',
})
export class GifLazyLoad implements AfterViewInit {
  @ViewChild('gifElement') gifElement!: ElementRef<HTMLImageElement>;
  gifLoaded = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.gifLoaded = true;
        observer.disconnect();
      }
    });

    observer.observe(this.gifElement.nativeElement);
  }

  getGIF(): string {
    return 'https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/main/jriz-cv/gifs/Building1.gif';
  }
}
