import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  username!: string;
  password!: string;
  private jwtToken!: string;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  public login() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (response: any) => {     
          this.jwtToken = response.headers.get("Authorization");
          if (!this.loginService.isAdmin(this.jwtToken)) {
            alert("Incorrect username and/or password.");
            return;
          }
          this.loginService.setSession(this.jwtToken);
          this.router.navigate([this.loginService.getPreviousPage()]);
        },
        (error: HttpErrorResponse) => {
          alert("Incorrect username and/or password.")
        }
      );
  }


  initializeForms() {
    this.loginForm = new FormGroup(
      {
        username: new FormControl(this.username, [Validators.required, Validators.maxLength(45)]),
        password: new FormControl(this.password, [Validators.required, Validators.maxLength(45)])

      });
  }


  public getJwtToken(): string {
    return this.jwtToken;
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

}
