import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'coupons',
            loadChildren: './users/coupons/coupons.module#CouponsModule',
        },
        {
            path: 'admin',
            children: [
                {
                    path: 'users',
                    loadChildren: './admins/users/users.module#UsersModule',
                },
                {
                    path: 'manage-coupons',
                    loadChildren: './admins/manage-coupons/manage-coupons.module#ManageCouponsModule',
                },
                {
                    path: 'redirect-google',
                    loadChildren: './admins/redirect-google/redirect-google.module#RedirectGoogleModule',
                },
                { path: '', redirectTo: 'users', pathMatch: 'full' },
            ]
        },
        {
            path: '',
            redirectTo: 'coupons',
            pathMatch: 'full',
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
