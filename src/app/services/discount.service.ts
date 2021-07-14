import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Discount } from '../entities/discount';
import { Page } from '../entities/page';
import { LoginService } from './login.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private serverUrl = environment.bookingServiceUrl + "/discounts"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAllDiscounts(page: number, size: number) {
    return this.http
      .get<Page<Discount>>(`${this.serverUrl}?index=${page}&size=${size}`, {
        headers: this.loginService.getHeadersWithToken()
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError('Unable to retrieve discount data');
        })
      )
  }

  public updateDiscount(discount: Discount) {
    return this.http
      .put<Discount>(this.serverUrl, discount, {
        headers: this.loginService.getHeadersWithToken()
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            return throwError('One or more fields are invalid.');
          } else if (error.status === 409) {
            return throwError(error.error.message);
          } else if (error.status === 500) {
            return throwError('Database error');
          } else {
            return throwError('Something went wrong');
          }
        })
      )
  }

}
