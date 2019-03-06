import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { RedirectGoogleRoutingModule } from './redirect-google-routing.module';
import { RedirectGoogleComponent } from './redirect-google/redirect-google.component';

@NgModule({
  declarations: [    
    RedirectGoogleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RedirectGoogleRoutingModule  
  ]
})
export class RedirectGoogleModule { }
