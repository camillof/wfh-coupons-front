import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageCouponsComponent } from './manage-coupons/manage-coupons.component';



const routes: Routes = [
    {
        path: '',
        component: ManageCouponsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageCouponsRoutingModule {
}
