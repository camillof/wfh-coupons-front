import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCouponsComponent } from './my-coupons/my-coupons.component';
import { CouponsRoutingModule } from './coupons-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyCouponsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CouponsRoutingModule
  ]
})
export class CouponsModule { }
