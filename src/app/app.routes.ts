import { Routes } from '@angular/router';

/**
 * Default Routes Configuration. Modify as you want
*/

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/error-page/error-page.component'),
  },
  {
    path: 'invalidScreenSize',
    loadComponent: () => import('./pages/too-small-screen-page/too-small-screen-page.component'),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
