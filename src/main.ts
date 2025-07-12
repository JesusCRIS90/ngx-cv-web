import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Only for Development
document.body.classList.add("color-scale-violet");


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
