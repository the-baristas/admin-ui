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

import { Route } from '../entities/route';
import { MessageService } from './message.service';
import { LoginService } from './login.service';
import { Page } from '../entities/page';

// specifies that Angular should provide the service in the root injector
@Injectable({ providedIn: "root" })
export class RouteService {
    private routeServicePath: string = '/routes';

    httpOptions = {
        headers: this.loginService.getHeadersWithToken()
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private loginService: LoginService,
        httpErrorHandlerService: HttpErrorHandlerService
        ) {
            this.handleError = httpErrorHandlerService.createHandleError(
                'FlightService'
            );
        }

    public getAllRoutes() {
        return this.http.get<Route[]>(environment.apiUrl + this.routeServicePath, { headers: this.loginService.getHeadersWithToken() })
            .pipe(
                tap(_ => this.log('fetched routes')),
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to retrieve route data')}
                )
            );   
    }

    public getRoutesPage(pageIndex: number, pageSize: number): Observable<Page<Route>> {
        return this.http.get<Page<Route>>(
            `${environment.apiUrl}/routes?pageNo=${pageIndex}&pageSize=${pageSize}&sortBy=id`, { headers: this.loginService.getHeadersWithToken() }).pipe(
              tap(() =>
              this.messageService.add(
                'Successfully found routes page.'
              )
              ),
              catchError(
                this.handleError<Page<Route>>('getFlightsPage', {} as Page<Route>)
              )
            );
 }

    /** GET route by id. Return `undefined` when id not found */
    public getRouteNo404<Data>(id: number): Observable<Route> {
        const url = `${environment.apiUrl + this.routeServicePath}/?id=${id}`;
        return this.http.get<Route[]>(url, this.httpOptions).pipe(
            map(routes => routes[0]), // returns a {0|1} element array
            tap(a => {
                const outcome = a ? `fetched` : `did not find`;
                this.log(`${outcome} route id=${id}`);
            }),
            catchError(this.handleError<Route>(`getRoute id=${id}`))
        );
    }

    /** GET route by id. Will 404 if id not found */
    public getRoute(id: number): Observable<Route> {
        const url = `${environment.apiUrl + this.routeServicePath}/${id}`;
        return this.http.get<Route>(url, this.httpOptions).pipe(
            tap(_ => this.log(`fetched route id=${id}`)),
            catchError(this.handleError<Route>(`getRoute id=${id}`))
        );
    }

    public routeQuery(query: string, pageIndex: number, pageSize: number) {
        const url = environment.apiUrl + '/routes-query?query=' + query + `&pageNo=${pageIndex}&pageSize=${pageSize}&sortBy=id`;
        return this.http.get<Page<Route>>(url, { headers: this.loginService.getHeadersWithToken() })
            .pipe(
                tap(_ => this.log('fetched routes')),
                catchError((error: HttpErrorResponse) => {
                    return throwError('Unable to retrieve route data.')}
                )
            );   
    }

    public addRoute(route: Route): Observable<Route> {
        const url = environment.apiUrl + this.routeServicePath;
        return this.http.post<Route>(url, route, { headers: this.loginService.getHeadersWithToken() }).pipe(
            tap((newRoute: Route) => this.log(`added route with id=${newRoute.id}`)),
            catchError(this.handleError<Route>("addRoute"))
        );
    }

    public deleteRoute(id: number): Observable<Route> {
        const url = `${environment.apiUrl + this.routeServicePath}/${id}`;
        console.log(id);
        return this.http.delete<Route>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted route id=${id}`)),
            catchError(this.handleError<Route>("deleteRoute"))
        );
    }

    /** PUT: update the route on the server */
    public updateRoute(route: Route): Observable<any> {
        console.log(route);
        return this.http.put(environment.apiUrl + this.routeServicePath + `/${route.id}`, route, this.httpOptions).pipe(
            tap(_ => this.log(`updated route id=${route.id}`)),
            catchError(this.handleError<any>("updateRoute"))
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
        this.messageService.add(`RouteService: ${message}`);
    }
}