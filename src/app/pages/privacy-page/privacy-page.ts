import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-page',
  imports: [],
  templateUrl: './privacy-page.html',
  styleUrls: ['./privacy-page.css']
})
export default class PrivacyPageComponent {

  onCLickGoBack(): void {
    window.history.back();
  }
}
