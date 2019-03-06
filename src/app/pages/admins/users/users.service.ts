import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, USERS_BASIC_URL, INVITATION_BASE_URL, BASE_URL, Invitation } from './user';
import { HttpClient, HttpParams } from '@angular/common/http';

let paramsal = null;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(protected http: HttpClient) {paramsal =  new HttpParams().set('Content-Type', "application/json").append("charset","UTF-8"); }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USERS_BASIC_URL);
  }

  sendInvitation(invitation: Invitation) {
    return this.http.post(INVITATION_BASE_URL, invitation);
  }

  callback(code: String){
    return this.http.get(BASE_URL+"callback/"+code.replace("/","%2F"), paramsal);
  }
}
