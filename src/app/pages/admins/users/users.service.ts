import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, USERS_BASIC_URL, INVITATION_BASE_URL, Invitation } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(protected http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USERS_BASIC_URL);
  }

  sendInvitation(invitation: Invitation) {
    return this.http.post(INVITATION_BASE_URL, invitation);
  }
}
