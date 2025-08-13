import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bee-image-frame',
  imports: [],
  standalone: true,
  templateUrl: './image-frame.component.html',
  styleUrl: './image-frame.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ImageFrameComponent {
  imgSrc = input.required<string>();
  alt = input<string>("");
  active = input<boolean>(false);
  mode = input<"img" | "background">("background");
}
