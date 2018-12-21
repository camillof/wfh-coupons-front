import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthModule, NbAuthSimpleInterceptor } from '@nebular/auth';
import { AUTH_STRATEGY } from './auth/auth-strategy.class';
import { ErrorHandler } from './shared/interceptor/error_handler';
import { RequestInterceptor } from './shared/interceptor/http_interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    NbAuthModule.forRoot({
      strategies: 
        AUTH_STRATEGY,
    }),
  ],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthSimpleInterceptor, multi: true },
    ErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
