import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        }
    }

    private log(message: string) {
        this.messageService.add('AirplaneService: ${message}');
    }
}
