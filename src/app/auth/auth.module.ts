import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { environment } from 'src/environments/environment';
import { AuthComponent } from './auth.component';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    AcceptInvitationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
