// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const enum ServiceName {
    USER_SERVICE = 'USER_SERVICE',
    FLIGHT_SERVICE = 'FLIGHT_SERVICE',
    BOOKING_SERVICE = 'BOOKING_SERVICE'
}
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080',
    getApiUrl: (serviceName: ServiceName) => {
        let apiUrl;
        switch (serviceName) {
            case ServiceName.USER_SERVICE:
                apiUrl = 'http://localhost:8081';
                break;
            case ServiceName.FLIGHT_SERVICE:
                apiUrl = 'http://localhost:8090';
                break;
            case ServiceName.BOOKING_SERVICE:
                apiUrl = 'http://localhost:8091';
                break;
        }
        return apiUrl;
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
