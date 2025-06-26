import { Routes } from '@angular/router';
import { publicGuard, authGuard } from './guards/auth.guard'; // Ajusta si están en otra carpeta

export const routes: Routes = [
  {
    path: 'consulta',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pagges/consultation/consultation.component').then(m => m.ConsultationComponent)
  },
  {
    path: 'data',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./pagges/datased/datased.component').then(m => m.DatasedComponent)
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];