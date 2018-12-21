import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './error_handler';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        public errorHandler: ErrorHandler,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}