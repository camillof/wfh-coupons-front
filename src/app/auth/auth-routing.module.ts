import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'accept_invitation',
                component: AcceptInvitationComponent
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ],
        
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {
}