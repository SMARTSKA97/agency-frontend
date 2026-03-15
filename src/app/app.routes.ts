import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // PUBLIC ZONE
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '', // NEW HOME: Portfolio
        loadComponent: () => import('./pages/public/portfolio/portfolio').then(m => m.Portfolio)
      },
      {
        path: 'projects', // Projects List
        loadComponent: () => import('./pages/public/projects/projects').then(m => m.Projects)
      },
      {
        path: 'websites', // SERVICE PAGE: The cost calculator page we already built
        loadComponent: () => import('./pages/public/home/home').then(m => m.Home)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/public/contact/contact').then(m => m.Contact)
      }
    ]
  },

  // LOGIN (Standalone page, no layout headers)
  {
    path: 'login',
    loadComponent: () => import('./pages/admin/login/login').then(m => m.Login)
  },

  // PRIVATE ZONE (Admin)
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'clients',
        loadComponent: () => import('./pages/admin/clients/clients').then(m => m.Clients)
      },
      {
        path: 'invoices',
        loadComponent: () => import('./pages/admin/invoices/invoices').then(m => m.Invoices)
      }
    ]
  },

  // Wildcard Route for 404
  { path: '**', redirectTo: '' }
];
