import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coupon, COUPONS_BASIC_URL,COUPONS_API_URL, CouponFilteringParams } from './coupon';
import { Observable } from 'rxjs';

let paramsal = null;

@Injectable({
  providedIn: 'root'
})

export class CouponsService {

  constructor(protected http: HttpClient) { paramsal =  new HttpParams().set('Content-Type', "application/json").append("charset","UTF-8");}
  

  getAllCoupons(parameters: CouponFilteringParams): Observable<Coupon[]> {
    let Params = new HttpParams();

    if (parameters) {
      for (let prop of Object.keys(parameters)) {
        Params = parameters[prop] || parameters[prop] === false ? Params.append(prop, String(parameters[prop])) : Params;
      }
    }
    return this.http.get<Coupon[]>(COUPONS_BASIC_URL, { params: Params });
  }

  saveCoupon(coupon: Coupon) {
    return this.http.post(COUPONS_BASIC_URL, coupon);
  }

  deleteCoupon(id: Number) {
    return this.http.delete(COUPONS_BASIC_URL + id);
  }

  approveCoupon(id: Number) {
    return this.http.put(`${COUPONS_BASIC_URL}${id}/approve`, null);
  }

  
  

  redirectCoupon(){
    return this.http.get(`${COUPONS_API_URL}redirect`,paramsal);
  }

  private handleError(error: any) { 
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }
  
  rejectCoupon(id: Number) {
    return this.http.put(`${COUPONS_BASIC_URL}${id}/reject`, null);
  }
}
