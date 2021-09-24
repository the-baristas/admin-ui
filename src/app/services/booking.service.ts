import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Booking } from '../entities/booking';
import { Page } from '../entities/page';
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
    private static readonly BOOKINGs_PATH: string =
        environment.bookingServiceUrl + '/bookings';

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

    findAll(pageIndex: number, pageSize: number): Observable<Page<Booking>> {
        const url = `${BookingService.BOOKINGs_PATH}?index=${pageIndex}&size=${pageSize}`;
        return this.httpClient.get<Page<Booking>>(url, this.httpOptions).pipe(
            tap(() => this.messageService.add('Successfully found bookings.')),
            catchError(
                this.handleError<Page<Booking>>('findAll', {} as Page<Booking>)
            )
        );
    }

    findByConfirmationCode(confirmationCode: string): Observable<Booking> {
        const url = `${BookingService.BOOKINGs_PATH}/${confirmationCode}`;
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
        const url = `${BookingService.BOOKINGs_PATH}/${confirmationCode}`;
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

    search(
        searchTerm: string,
        pageIndex: number,
        pageSize: number
    ): Observable<Page<Booking>> {
        if (searchTerm.trim() === '') {
            return of({ content: [] as Booking[] } as Page<Booking>);
        }
        const url = `${BookingService.BOOKINGs_PATH}/search?term=${searchTerm}&index=${pageIndex}&size=${pageSize}`;
        return this.httpClient.get<Page<Booking>>(url, httpOptions).pipe(
            tap((page: Page<Booking>) =>
                page.totalPages
                    ? this.messageService.add(
                          `Found bookings matching "${searchTerm}".`
                      )
                    : this.messageService.add(
                          `No bookings matching "${searchTerm}".`
                      )
            ),
            catchError(
                this.handleError<Page<Booking>>('search', {
                    content: [] as Booking[]
                } as Page<Booking>)
            )
        );
    }

    addBooking(booking: Booking): Observable<Booking> {
        const url = `${BookingService.BOOKINGs_PATH}`;
        return this.httpClient.post<Booking>(url, booking, httpOptions).pipe(
            tap((newBooking: Booking) =>
                this.messageService.add(
                    `Successfully added booking with id=${newBooking.id}`
                )
            ),
            catchError(this.handleError<Booking>('addBooking', booking))
        );
    }

    update(booking: Booking): Observable<Booking> {
        const url = `${BookingService.BOOKINGs_PATH}/${booking.id}`;
        return this.httpClient.put<Booking>(url, booking, httpOptions).pipe(
            tap(() =>
                this.messageService.add(
                    `Successfully updated Booking with id=${booking.id}`
                )
            ),
            catchError(this.handleError<any>('update', booking))
        );
    }

    delete(id: number): Observable<unknown> {
        const url = `${BookingService.BOOKINGs_PATH}/${id}`;
        return this.httpClient.delete<Booking>(url, httpOptions).pipe(
            tap(() =>
                this.messageService.add(
                    `Successfully deleted booking with id=${id}`
                )
            ),
            catchError(this.handleError<Booking>('delete'))
        );
    }
}
