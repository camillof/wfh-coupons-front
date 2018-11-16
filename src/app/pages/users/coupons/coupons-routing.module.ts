import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyCouponsComponent } from './my-coupons/my-coupons.component';



const routes: Routes = [
    {
        path: '',
        component: MyCouponsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CouponsRoutingModule {
}
