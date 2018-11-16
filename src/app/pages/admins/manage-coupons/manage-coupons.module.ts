import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManageCouponsRoutingModule } from './manage-coupons-routing.module';
import { ManageCouponsComponent } from './manage-coupons/manage-coupons.component';

@NgModule({
  declarations: [
    ManageCouponsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManageCouponsRoutingModule
  ]
})
export class ManageCouponsModule { }
