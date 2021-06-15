# Adminportal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Packages Added

### prettier  
Used to maintain a consistent code style.

### jwt-decode

### sonar-scanner

## Changelog

Anthony Sirimarco - 4/22/2021 - Added user authentication with JWT tokens along with a login page, a stock homepage, and an (unfinished) users page for testing purposes.

Anthony Sirimarco - 4/27/2021 - Login page will now reject valid credentials if the user does not have the admin role.

Anthony Sirimarco - 5/5/2021 - Added ability to create users and to search for users by email, username and phone number. Incorporated back-end pagination to users.

Anthony Sirimarco - 5/7/2021 - Added ability to update and delete users