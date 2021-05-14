// performs http requests + represents the header configuration options for an HTTP request
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// handles dependency injection
import { Injectable } from '@angular/core';
// handles AJAX requests and responses, listens for and responds to user-input events
import { Observable, of, throwError } from 'rxjs';
// allow complex asynchronous code to be easily composed in a declarative manner
import { catchError, map, tap } from 'rxjs/operators';
// environment config, sets api url
import { environment } from 'src/environments/environment';
import { HandleError,HttpErrorHandlerService } from './http-error-handler.service';

import { Flight } from '../entities/flight';
import { MessageService } from './message.service';
import { LoginService } from './login.service';
import { Page } from '../entities/page';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// specifies that Angular should provide the service in the root injector
@Injectable({ providedIn: "root" })
export class FlightService {
    private flightServicePath: string = '/flights';
    private pagedFlightServicePath: string = '/flights?pageNo=0&pageSize=10&sortBy=id';
    private handleError: HandleError;

    constructor(
        private httpClient: HttpClient,
        private messageService: MessageService,
        private loginService: LoginService,
        httpErrorHandlerService: HttpErrorHandlerService
        ) {
            this.handleError = httpErrorHandlerService.createHandleError(
                'FlightService'
            );
        }

    public getAllFlights(): Observable<Flight[]> {
        return this.httpClient.get<Flight[]>(environment.apiUrl + this.flightServicePath, { headers: this.loginService.getHeadersWithToken() })
            .pipe(
                tap(_ => this.messageService.add('fetched flights')),
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to retrieve flight data')}
                )
            );   
    }

    public getFlightsPage(pageIndex: number, pageSize: number): Observable<Page<Flight>> {
        return this.httpClient.get<Page<Flight>>(
            `${environment.apiUrl}/flights?pageNo=${pageIndex}&pageSize=${pageSize}&sortBy=id`, { headers: this.loginService.getHeadersWithToken() }).pipe(
              tap(() =>
              this.messageService.add(
                'Successfully found flights page.'
              )
              ),
              catchError(
                this.handleError<Page<Flight>>('getFlightsPage', {} as Page<Flight>)
              )
            );
 }

    public getFlightByLocation(originId: string, destinationId: string): Observable<Flight[]> {
        console.log("Origin ID:" + originId + "Destination ID:" + destinationId);
        const url = `${environment.apiUrl}/search/flightsbylocation?originId=${originId}&destinationId=${destinationId}`;
        console.log(url);
        return this.httpClient.get<Flight[]>(url, { headers: this.loginService.getHeadersWithToken() }).pipe(
            tap(_ => this.messageService.add(`fetched flight(s) traveling from ${originId} to ${destinationId}`)),
            catchError(this.handleError<Flight[]>(`getFlightByLocation originId=${originId} destinationId=${destinationId}`, []))
        );
    }

    /** GET airplane by id. Return `undefined` when id not found */
    public getFlightNo404<Data>(id: number): Observable<Flight> {
        const url = `${environment.apiUrl + this.flightServicePath}/?id=${id}`;
        return this.httpClient.get<Flight[]>(url, { headers: this.loginService.getHeadersWithToken() }).pipe(
            map(flights => flights[0]), // returns a {0|1} element array
            tap(a => {
                const outcome = a ? `fetched` : `did not find`;
                this.messageService.add(`${outcome} flight id=${id}`);
            }),
            catchError(this.handleError<Flight>(`getFlight id=${id}`))
        );
    }

    /** GET flight by id. Will 404 if id not found */
    public getFlight(id: number): Observable<Flight> {
        const url = `${environment.apiUrl + this.flightServicePath}/${id}`;
        return this.httpClient.get<Flight>(url, { headers: this.loginService.getHeadersWithToken() }).pipe(
            tap(_ => this.messageService.add(`fetched flight id=${id}`)),
            catchError(this.handleError<Flight>(`getFlight id=${id}`))
        );
    }

    public addFlight(flight: Flight): Observable<Flight> {
        console.log(flight);
        const url = `${environment.apiUrl}/flights`;
        return this.httpClient.post<Flight>(url, flight, { headers: this.loginService.getHeadersWithToken() }).pipe(
            tap((newFlight: Flight) => this.messageService.add(`added flight with id=${newFlight.id}`)),
            catchError(this.handleError<Flight>("addFlight"))
        );
    }

    public deleteFlight(id: number): Observable<Flight> {
        const url = `${environment.apiUrl + this.flightServicePath}/${id}`;
        console.log(id);
        return this.httpClient.delete<Flight>(url, { headers: this.loginService.getHeadersWithToken() }).pipe(
            tap(_ => this.messageService.add(`deleted flight id=${id}`)),
            catchError(this.handleError<Flight>("deleteFlight"))
        );
    }

    /** PUT: update the flight on the server */
    public updateFlight(flight: Flight): Observable<any> {
        return this.httpClient.put(environment.apiUrl + this.flightServicePath + `/${flight.id}`, flight, { headers: this.loginService.getHeadersWithToken() }).pipe(
            tap(_ => this.messageService.add(`updated flight id=${flight.id}`)),
            catchError(this.handleError<any>("updateFlight"))
        );
    }

}