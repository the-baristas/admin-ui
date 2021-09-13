import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page } from '../entities/page';
import { Passenger } from '../entities/passenger';
import {
    HandleError,
    HttpErrorHandlerService
} from './http-error-handler.service';
import { LoginService } from './login.service';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class PassengerService {
    private static readonly PASSENGERS_PATH: string =
        environment.bookingServiceUrl + '/passengers';

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
            httpErrorHandlerService.createHandleError('PassengerService');
    }

    findAll(pageIndex: number, pageSize: number): Observable<Page<Passenger>> {
        const url = `${PassengerService.PASSENGERS_PATH}?index=${pageIndex}&size=${pageSize}`;
        return this.httpClient.get<Page<Passenger>>(url, this.httpOptions).pipe(
            tap(() =>
                this.messageService.add('Successfully found Passengers page.')
            ),
            catchError(
                this.handleError<Page<Passenger>>('findAll', {
                    content: [] as Passenger[],
                    number: 0,
                    totalElements: 0,
                    totalPages: 0
                } as Page<Passenger>)
            )
        );
    }

    findById(id: number): Observable<Passenger> {
        const url = `${PassengerService.PASSENGERS_PATH}/${id}`;
        return this.httpClient.get<Passenger>(url, this.httpOptions).pipe(
            tap(() => this.messageService.add('Successfully found Passenger.')),
            catchError(this.handleError<Passenger>('findById', {} as Passenger))
        );
    }

    search(
        searchTerm: string,
        pageIndex: number,
        pageSize: number
    ): Observable<Page<Passenger>> {
        if (searchTerm.trim() === '') {
            return of({ content: [] as Passenger[] } as Page<Passenger>);
        }
        const url = `${PassengerService.PASSENGERS_PATH}/search?term=${searchTerm}&index=${pageIndex}&size=${pageSize}`;
        return this.httpClient.get<Page<Passenger>>(url, this.httpOptions).pipe(
            tap((page: Page<Passenger>) =>
                page.totalPages
                    ? this.messageService.add(
                          `Found passengers matching "${searchTerm}".`
                      )
                    : this.messageService.add(
                          `No passengers matching "${searchTerm}".`
                      )
            ),
            catchError(
                this.handleError<Page<Passenger>>('search', {
                    content: [] as Passenger[]
                } as Page<Passenger>)
            )
        );
    }

    searchDistinct(
        searchTerm: string,
        pageIndex: number,
        pageSize: number
    ): Observable<Page<Passenger>> {
        if (searchTerm.trim() === '') {
            return of({ content: [] as Passenger[] } as Page<Passenger>);
        }
        const url = `${PassengerService.PASSENGERS_PATH}/distinct_search?term=${searchTerm}&index=${pageIndex}&size=${pageSize}`;
        return this.httpClient.get<Page<Passenger>>(url, this.httpOptions).pipe(
            tap((page: Page<Passenger>) =>
                page.totalPages
                    ? this.messageService.add(
                          `Found passengers matching "${searchTerm}".`
                      )
                    : this.messageService.add(
                          `No passengers matching "${searchTerm}".`
                      )
            ),
            catchError(
                this.handleError<Page<Passenger>>('searchDistinct', {
                    content: [] as Passenger[]
                } as Page<Passenger>)
            )
        );
    }

    create(passenger: Passenger): Observable<Passenger> {
        this.httpOptions.headers = this.httpOptions.headers.append(
            'Content-Type',
            'application/json'
        );
        return this.httpClient
            .post<Passenger>(
                PassengerService.PASSENGERS_PATH,
                passenger,
                this.httpOptions
            )
            .pipe(
                tap((newPassenger: Passenger) =>
                    this.messageService.add(
                        `Successfully added. Passenger id=${newPassenger.id}`
                    )
                ),
                catchError(this.handleError<Passenger>('add', passenger))
            );
    }

    update(passenger: Passenger): Observable<Passenger> {
        const url = `${PassengerService.PASSENGERS_PATH}/${passenger.id}`;
        return this.httpClient
            .put<Passenger>(url, passenger, this.httpOptions)
            .pipe(
                tap((updatedPassenger: Passenger) =>
                    this.messageService.add(
                        `Successfully updated. Passenger id: ${updatedPassenger.id}`
                    )
                ),
                catchError(this.handleError<Passenger>('update', passenger))
            );
    }

    delete(id: number): Observable<unknown> {
        const url = `${PassengerService.PASSENGERS_PATH}/${id}`;
        return this.httpClient.delete<unknown>(url, this.httpOptions).pipe(
            tap(() =>
                this.messageService.add(
                    `Deleted passenger (id: ${id}) successfully.`
                )
            ),
            catchError(this.handleError<unknown>('delete'))
        );
    }
}
