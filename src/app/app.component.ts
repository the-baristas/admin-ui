import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Admin UI';

    constructor(
        private loginService: LoginService,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        if (
            this.location.path() !== '/login' &&
            !this.loginService.loggedIn()
        ) {
            this.loginService.setPreviousPage(this.location.path());
            this.router.navigate(['/login']);
        }
    }
}
