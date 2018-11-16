import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult, NbTokenService } from '@nebular/auth';
import { User, INVITATION_BASE_URL } from '../pages/admins/users/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: User;

    constructor(private tokenService: NbTokenService, private http: HttpClient) {
        this.tokenService.tokenChange().subscribe(res => {
            if (res.getPayload()) {
                const user_aux: User = res.getPayload().user;
                this.user = new User(user_aux);
            } else {
                this.user = null;
            }
            
        })
    }

    get User(): User {
        return this.user;
    }

    public acceptInvitation(invitation_token_string: string, password_string: string, password_confirmation_string: string): Observable<NbAuthResult> {
        const data = {
            password: password_string,
            password_confirmation: password_confirmation_string
        }
        return this.http.put(`${INVITATION_BASE_URL}${invitation_token_string}`, { invitation: data }).pipe(
            map(res => {
                return new NbAuthResult(
                    true,
                    res,
                    '/auth/login',
                    false,
                    `Cuenta confirmada correctamente!`,
                );
            }),
            catchError(res => {
                const errors = [];
                errors.push('Ocurrio un error');
                return of(
                    new NbAuthResult(
                        false,
                        res,
                        null,
                        errors,
                    ));
            })
        );
    }

}
