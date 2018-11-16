import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss']
})
export class LoginComponent extends NbLoginComponent {

  // constructor() { }
  // strategy: string = '';
  // errors: string[] = [];
  // messages: string[] = [];

  ngOnInit() {
    this.service.getToken().subscribe(res => {
      res.getPayload
    })
  }


}
