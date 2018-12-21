import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandler {

    constructor(
        public snackbar: MatSnackBar,
        private nbAuthService: NbTokenService,
        private router: Router
    ) { }

    public handleError(err: HttpErrorResponse) {
        if (err.status === 401) {
            this.nbAuthService.clear();
            this.snackbar.open("Session invalid, please log in again", "Accept", { duration: 3000 });
            this.router.navigate(['/']);
        }
    }
}