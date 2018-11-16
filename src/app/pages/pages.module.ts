import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule
  ],
  providers: [
    // { provide: NB_AUTH_TOKENS, useClass: NbAuthJWTToken },
    // { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true }
    
  ]
})
export class PagesModule { }
