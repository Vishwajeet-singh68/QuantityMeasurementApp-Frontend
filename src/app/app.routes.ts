import { Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth';
import { QuantityApp } from './main/quantity-app/quantity-app';
import { authGuard } from './guards/auth-guard';
import { HistorySidebarComponent } from './Components/history-sidebar/history-sidebar';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'history', component: HistorySidebarComponent, canActivate: [authGuard] },
  { path: 'home', component: QuantityApp, canActivate: [authGuard] }
];