import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from './admins/users/user';
import { MediaMatcher } from '@angular/cdk/layout';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  currentUser: User;

  adminMenuItems: { name: string, route: string }[] = [
    {
      name: "Users", route: "/admin/users",
    },
    {
      name: "Manage coupons", route: "/admin/manage-coupons",
    }
  ];

  userMenuItems: { name: string, route: string }[] = [
    {
      name: "My coupons", route: "/coupons",
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
    private nbAuthService: NbAuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.currentUser = this.authService.User;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.nbAuthService.logout('email').subscribe(result => {

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, 500);
      }
    })
  }

  // get isAdmin() {
  //   debugger
  //   return this.currentUser ? this.currentUser.isAdmin : false;
  // }

}
