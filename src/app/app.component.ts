import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './entities/user';
import { LoginService } from './services/login.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adminportal';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (!this.loginService.loggedIn()) {
      this.router.navigate(['/login']);
    }
  }

}
