import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], canActivateChild: [AuthGuardService], loadChildren: './pages/pages.module#PagesModule' },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
