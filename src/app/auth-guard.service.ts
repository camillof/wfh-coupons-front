import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.User) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.authService.User) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
