import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'sec-contact',
  imports: [],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {

  @ViewChild('gifElement') gifElement!: ElementRef<HTMLImageElement>;
  gifLoaded = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.gifLoaded = true;
        observer.disconnect();
      }
    });

    observer.observe(this.gifElement.nativeElement);
  }

  getGIF(): string {
    return "https://raw.githubusercontent.com/JesusCRIS90/jc-risquez-cdn/main/jriz-cv/gifs/Building1.gif"
  }

}
