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

import { Flight } from '../entities/flight';
import { MessageService } from './message.service';
import { LoginService } from './login.service';

// specifies that Angular should provide the service in the root injector
@Injectable({ providedIn: "root" })
export class FlightService {
    private flightServicePath: string = '/flights';

    httpOptions = {
        headers: this.loginService.getHeadersWithToken()
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private loginService: LoginService
    ) { }

    public getAllFlights() {
        return this.http.get<Flight[]>(environment.apiUrl + this.flightServicePath, this.httpOptions)
            .pipe(
                tap(_ => this.log('fetched flights')),
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to retrieve flight data')}
                )
            );   
    }

    public getFlightByLocation(originId: string, destinationId: string): Observable<Flight[]> {
        console.log("Origin ID:" + originId + "Destination ID:" + destinationId);
        const url = `${environment.apiUrl}/search/flightsbylocation?originId=${originId}&destinationId=${destinationId}`;
        console.log(url);
        return this.http.get<Flight[]>(url, this.httpOptions).pipe(
            tap(_ => this.log(`fetched flight(s) traveling from ${originId} to ${destinationId}`)),
            catchError(this.handleError<Flight[]>(`getFlightByLocation originId=${originId} destinationId=${destinationId}`, []))
        );
    }

    /** GET airplane by id. Return `undefined` when id not found */
    public getFlightNo404<Data>(id: number): Observable<Flight> {
        const url = `${environment.apiUrl + this.flightServicePath}/?id=${id}`;
        return this.http.get<Flight[]>(url, this.httpOptions).pipe(
            map(flights => flights[0]), // returns a {0|1} element array
            tap(a => {
                const outcome = a ? `fetched` : `did not find`;
                this.log(`${outcome} flight id=${id}`);
            }),
            catchError(this.handleError<Flight>(`getFlight id=${id}`))
        );
    }

    /** GET airplane by id. Will 404 if id not found */
    public getFlight(id: number): Observable<Flight> {
        const url = `${environment.apiUrl + this.flightServicePath}/${id}`;
        return this.http.get<Flight>(url, this.httpOptions).pipe(
            tap(_ => this.log(`fetched flight id=${id}`)),
            catchError(this.handleError<Flight>(`getFlight id=${id}`))
        );
    }

    public addFlight(flight: Flight): Observable<Flight> {
        console.log(flight);
        const url = `${environment.apiUrl}/routes/${flight.routeId}/flights`;
        return this.http.post<Flight>(url, flight, this.httpOptions).pipe(
            tap((newFlight: Flight) => this.log(`added flight with id=${newFlight.id}`)),
            catchError(this.handleError<Flight>("addFlight"))
        );
    }

    public deleteFlight(id: number): Observable<Flight> {
        const url = `${environment.apiUrl + this.flightServicePath}/${id}`;
        console.log(id);
        return this.http.delete<Flight>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted flight id=${id}`)),
            catchError(this.handleError<Flight>("deleteFlight"))
        );
    }

    /** PUT: update the airplane on the server */
    public updateFlight(flight: Flight): Observable<any> {
        return this.http.put(environment.apiUrl + this.flightServicePath + `/${flight.id}`, flight, this.httpOptions).pipe(
            tap(_ => this.log(`updated flight id=${flight.id}`)),
            catchError(this.handleError<any>("updateFlight"))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        }
    }

    /** Log a FlightService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`FlightService: ${message}`);
    }
}