import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Airplane } from './airplane';
import { MessageService } from './message.service';

@Injectable({ providedIn: "root" })
export class AirplaneService {
    private airplanesUrl = 'http://localhost:8080/airplanes';

    httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getAirplanes(): Observable<Airplane[]> {
        return this.http.get<Airplane[]>(this.airplanesUrl)
            .pipe(
                tap(_ => this.log('fetched airplanes')),
                catchError(this.handleError<Airplane[]>('getAirplanes', []))
            );
    }

    /** GET airplane by id. Return `undefined` when id not found */
    getAirplaneNo404<Data>(id: number): Observable<Airplane> {
        const url = `${this.airplanesUrl}/?id=${id}`;
        return this.http.get<Airplane[]>(url).pipe(
            map(airplanes => airplanes[0]), // returns a {0|1} element array
            tap(a => {
                const outcome = a ? `fetched` : `did not find`;
                this.log(`${outcome} airplane id=${id}`);
            }),
            catchError(this.handleError<Airplane>(`getAirplane id=${id}`))
        );
    }

    /** GET airplane by id. Will 404 if id not found */
    getAirplane(id: number): Observable<Airplane> {
        const url = `${this.airplanesUrl}/${id}`;
        return this.http.get<Airplane>(url).pipe(
            tap(_ => this.log(`fetched airplane id=${id}`)),
            catchError(this.handleError<Airplane>(`getAirplane id=${id}`))
        );
    }

    /* GET airplanes whose model contains search term */
    searchAirplanes(term: string): Observable<Airplane[]> {
        if (!term.trim()) {
            // if not search term, return empty airplane array.
            return of([]);
        }
        return this.http.get<Airplane[]>(`${this.airplanesUrl}/?model=${term}`).pipe(
            tap(x =>
                x.length
                    ? this.log(`found airplanes matching "${term}"${x}`)
                    : this.log(`no airplanes matching "${term}"`)
            ),
            catchError(this.handleError<Airplane[]>("searchAirplanes", []))
        );
    }

    addAirplane(airplane: Airplane): Observable<Airplane> {
        return this.http.post<Airplane>(this.airplanesUrl, airplane, this.httpOptions).pipe(
            tap((newAirplane: Airplane) => this.log(`added airplane with id=${newAirplane.id}`)),
            catchError(this.handleError<Airplane>("addAirplane"))
        );
    }

    deleteAirplane(id: number): Observable<Airplane> {
        const url = `${this.airplanesUrl}/${id}`;

        return this.http.delete<Airplane>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted airplane id=${id}`)),
            catchError(this.handleError<Airplane>("deleteAirplane"))
        );
    }

    /** PUT: update the airplane on the server */
    updateAirplane(airplane: Airplane): Observable<any> {
        return this.http.put(this.airplanesUrl, airplane, this.httpOptions).pipe(
            tap(_ => this.log(`updated airplane id=${airplane.id}`)),
            catchError(this.handleError<any>("updateAirplane"))
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

    /** Log a AirplaneService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`AirplaneService: ${message}`);
    }
}
