import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Booking } from '../entities/booking';
import {
    HandleError,
    HttpErrorHandlerService
} from './http-error-handler.service';
import { LoginService } from './login.service';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BookingService {
    public bookingServicePath: string = '/bookings';
    private httpOptions!: { headers: HttpHeaders };
    private handleError: HandleError;

    constructor(
        private httpClient: HttpClient,
        private messageService: MessageService,
        loginService: LoginService,
        httpErrorHandlerService: HttpErrorHandlerService
    ) {
        this.httpOptions = {
            headers: new HttpHeaders({
                Authorization: loginService.getToken()
            })
        };
        this.handleError =
            httpErrorHandlerService.createHandleError('BookingService');
    }

    getBookings(): Observable<Booking[]> {
        return this.httpClient
            .get<Booking[]>(environment.apiUrl + this.bookingServicePath, this.httpOptions)
            .pipe(
                tap(() =>
                    this.messageService.add('Successfully found bookings.')
                ),
                catchError(this.handleError<Booking[]>('getBookings', []))
            );
    }

    findByConfirmationCode(confirmationCode: string): Observable<Booking> {
        const url = `${
            environment.apiUrl + this.bookingServicePath
        }/${confirmationCode}`;
        return this.httpClient.get<Booking>(url, this.httpOptions).pipe(
            tap(() => this.messageService.add('Successfully found Booking.')),
            catchError(
                this.handleError<Booking>(
                    'findByConfirmationCode',
                    {} as Booking
                )
            )
        );
    }

    existsByConfirmationCode(confirmationCode: string): Observable<boolean> {
        const url = `${environment.apiUrl}${this.bookingServicePath}/${confirmationCode}`;
        return this.httpClient.get<boolean>(url, this.httpOptions).pipe(
            tap(() =>
                this.messageService.add(
                    'Successfully checked if Booking exists.'
                )
            ),
            catchError(
                this.handleError<boolean>('existsByConfirmationCode', false)
            )
        );
    }

    searchBookings(term: string): Observable<Booking[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.httpClient
            .get<Booking[]>(
                `${
                    environment.apiUrl + this.bookingServicePath
                }/?confirmation_code=${term}`
            )
            .pipe(
                tap((x) =>
                    x.length
                        ? this.messageService.add(
                              `Found bookings matching "${term}".`
                          )
                        : this.messageService.add(
                              `No bookings matching "${term}".`
                          )
                ),
                catchError(this.handleError<Booking[]>('searchBookings', []))
            );
    }

    addBooking(booking: Booking): Observable<Booking> {
        return this.httpClient
            .post<Booking>(
                environment.apiUrl + this.bookingServicePath,
                booking,
                httpOptions
            )
            .pipe(
                tap((newBooking: Booking) =>
                    this.messageService.add(
                        `Successfully added booking with id=${newBooking.id}`
                    )
                ),
                catchError(this.handleError<Booking>('addBooking', booking))
            );
    }

    deleteBooking(id: number): Observable<Booking> {
        const url = `${environment.apiUrl + this.bookingServicePath}/${id}`;

        return this.httpClient.delete<Booking>(url, httpOptions).pipe(
            tap(() =>
                this.messageService.add(
                    `Successfully deleted booking with id=${id}`
                )
            ),
            catchError(this.handleError<Booking>('deleteBooking'))
        );
    }

    updateBooking(booking: Booking): Observable<any> {
        return this.httpClient
            .put(
                environment.apiUrl + this.bookingServicePath + '/' + booking.id,
                booking,
                httpOptions
            )
            .pipe(
                tap(() =>
                    this.messageService.add(
                        `Successfully updated Booking with id=${booking.id}`
                    )
                ),
                catchError(this.handleError<any>('updateBooking', booking))
            );
    }
}
