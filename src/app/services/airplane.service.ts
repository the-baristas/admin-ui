import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Airplane } from '../entities/airplane';
import { Page } from '../entities/page';
import {
    HandleError,
    HttpErrorHandlerService
} from './http-error-handler.service';
import { LoginService } from './login.service';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class AirplaneService {
    private airplanesPath: string = '/airplanes';
    private httpOptions!: { headers: HttpHeaders };
    private handleError: HandleError;

    constructor(
        private httpClient: HttpClient,
        private messageService: MessageService,
        private loginService: LoginService,
        httpErrorHandlerService: HttpErrorHandlerService
    ) {
        this.handleError = httpErrorHandlerService.createHandleError(
            'AirplaneService'
        );
        this.httpOptions = {
            headers: new HttpHeaders({
                Authorization: this.loginService.getToken()
            })
        };
    }

    getAirplanes(): Observable<Airplane[]> {
        return this.httpClient
            .get<Airplane[]>(
                environment.apiUrl + this.airplanesPath,
                this.httpOptions
            )
            .pipe(
                tap(() =>
                    this.messageService.add('Successfully found airplanes.')
                ),
                catchError(this.handleError<Airplane[]>('getAirplanes', []))
            );
    }

    findAllAirplanes(
        pageIndex: number,
        pageSize: number
    ): Observable<Page<Airplane>> {
        return this.httpClient
            .get<Page<Airplane>>(
                `${
                    environment.apiUrl + this.airplanesPath
                }/page?index=${pageIndex}&size=${pageSize}`,
                this.httpOptions
            )
            .pipe(
                tap(() =>
                    this.messageService.add(
                        'Successfully found airplanes page.'
                    )
                ),
                catchError(
                    this.handleError<Page<Airplane>>('getAirplanesPage', {
                        content: [] as Airplane[],
                        number: 0,
                        totalElements: 0,
                        totalPages: 0
                    } as Page<Airplane>)
                )
            );
    }

    /** GET airplane by id. Return `undefined` when id not found */
    getAirplaneNo404<Data>(id: number): Observable<Airplane> {
        const url = `${environment.apiUrl + this.airplanesPath}/?id=${id}`;
        return this.httpClient.get<Airplane[]>(url, this.httpOptions).pipe(
            map((airplanes: Airplane[]) => airplanes[0]), // returns a {0|1} element array
            tap((a: Airplane) => {
                const outcome = a ? `Found` : `Did not find`;
                this.messageService.add(`${outcome} airplane with id=${id}`);
            }),
            catchError(this.handleError<Airplane>(`getAirplane id=${id}`))
        );
    }

    /** GET airplane by id. Will 404 if id not found */
    getAirplaneById(id: number): Observable<Airplane> {
        const url = `${environment.apiUrl + this.airplanesPath}/${id}`;
        return this.httpClient.get<Airplane>(url, this.httpOptions).pipe(
            tap(() => this.messageService.add(`fetched airplane id=${id}`)),
            catchError(this.handleError<Airplane>(`getAirplane id=${id}`))
        );
    }

    /* GET airplanes whose model contains search term */
    searchAirplanes(term: string): Observable<Airplane[]> {
        if (!term.trim()) {
            // if not search term, return empty airplane array.
            return of([]);
        }
        return this.httpClient
            .get<Airplane[]>(
                `${
                    environment.apiUrl + this.airplanesPath
                }/search?term=${term}`,
                this.httpOptions
            )
            .pipe(
                tap((x) =>
                    x.length
                        ? this.messageService.add(
                              `Found airplanes matching "${term}".`
                          )
                        : this.messageService.add(
                              `No airplanes matching "${term}".`
                          )
                ),
                catchError(this.handleError<Airplane[]>('searchAirplanes', []))
            );
    }

    findByModelContaining(
        searchTerm: string,
        pageIndex: number,
        pageSize: number
    ): Observable<Page<Airplane>> {
        if (searchTerm.trim() === '') {
            return of({ content: [] as Airplane[] } as Page<Airplane>);
        }
        return this.httpClient
            .get<Page<Airplane>>(
                `${
                    environment.apiUrl + this.airplanesPath
                }/search?term=${searchTerm}&index=${pageIndex}&size=${pageSize}`,
                this.httpOptions
            )
            .pipe(
                tap((page: Page<Airplane>) =>
                    page.totalPages
                        ? this.messageService.add(
                              `Found airplanes matching "${searchTerm}".`
                          )
                        : this.messageService.add(
                              `No airplanes matching "${searchTerm}".`
                          )
                ),
                catchError(
                    this.handleError<Page<Airplane>>('searchAirplanesPage', {
                        content: [] as Airplane[]
                    } as Page<Airplane>)
                )
            );
    }

    findDistinctAirplanesByModelContaining(
        searchTerm: string,
        pageIndex: number,
        pageSize: number
    ): Observable<Page<Airplane>> {
        if (searchTerm.trim() === '') {
            return of({ content: [] as Airplane[] } as Page<Airplane>);
        }
        return this.httpClient
            .get<Page<Airplane>>(
                `${
                    environment.apiUrl + this.airplanesPath
                }/distinct_search?term=${searchTerm}&index=${pageIndex}&size=${pageSize}`,
                this.httpOptions
            )
            .pipe(
                tap((page: Page<Airplane>) =>
                    page.totalPages
                        ? this.messageService.add(
                              `Found airplanes matching "${searchTerm}".`
                          )
                        : this.messageService.add(
                              `No airplanes matching "${searchTerm}".`
                          )
                ),
                catchError(
                    this.handleError<Page<Airplane>>(
                        'findDistinctAirplanesByModelContaining',
                        {
                            content: [] as Airplane[]
                        } as Page<Airplane>
                    )
                )
            );
    }

    addAirplane(airplane: Airplane): Observable<Airplane> {
        this.httpOptions.headers = this.httpOptions.headers.append(
            'Content-Type',
            'application/json'
        );
        return this.httpClient
            .post<Airplane>(
                environment.apiUrl + this.airplanesPath,
                airplane,
                this.httpOptions
            )
            .pipe(
                tap((newAirplane: Airplane) =>
                    this.messageService.add(
                        `Successfully added. Airplane id=${newAirplane.id}`
                    )
                ),
                catchError(this.handleError<Airplane>('addAirplane', airplane))
            );
    }

    deleteAirplane(id: number): Observable<Airplane> {
        const url = `${environment.apiUrl + this.airplanesPath}/${id}`;
        return this.httpClient.delete<Airplane>(url, this.httpOptions).pipe(
            tap(() =>
                this.messageService.add(
                    `Successfully deleted! Airplane id=${id}`
                )
            ),
            catchError(this.handleError<Airplane>('deleteAirplane'))
        );
    }

    /** PUT: update the airplane on the server */
    updateAirplane(airplane: Airplane): Observable<any> {
        this.httpOptions.headers = this.httpOptions.headers.append(
            'Content-Type',
            'application/json'
        );
        return this.httpClient
            .put(
                `${environment.apiUrl + this.airplanesPath}/${airplane.id}`,
                airplane,
                this.httpOptions
            )
            .pipe(
                tap(() =>
                    this.messageService.add(
                        `Successfully updated! Airplane id=${airplane.id}`
                    )
                ),
                catchError(this.handleError<any>('updateAirplane', airplane))
            );
    }
}