import { Routes } from '@angular/router';

/** Every page is lazy-loaded; the home page is the only one in the initial bundle's critical path. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.page'), title: 'Garima Jain | Traveller & Storyteller' },
  { path: 'about', loadComponent: () => import('./pages/about.page') },
  { path: 'qualifications', loadComponent: () => import('./pages/qualifications.page') },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog-list.page') },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog/blog-detail.page') },
  { path: 'contact', loadComponent: () => import('./pages/contact.page') },
  { path: '**', loadComponent: () => import('./pages/not-found.page') },
];
