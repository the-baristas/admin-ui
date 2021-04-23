import { HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs/internal/observable/of';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceMock: any;
  let formBuilder: FormBuilder;
  let router: Router
  let mockToken: string = "Bearer mockjwttoken";
  let header: HttpHeaders = new HttpHeaders;
  header = header.set('Authorization', mockToken);
  let loginResponse = new HttpResponse({ body: '', headers: header });

  beforeEach(async () => {
    

    loginServiceMock = jasmine.createSpyObj('LoginService', ['login']);
    loginServiceMock.login.and.returnValue(of(loginResponse));

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: LoginService, useValue: loginServiceMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should login successfully', () => {
    component.login();

    //after calling login(), the mockToken should be stored
    expect(component.getJwtToken()).toEqual(mockToken);
  });

  it('should render "sign in" in title', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('sign in');
  });

  it('should render "Username" near username field', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('Username');
  });

  it('should render "sign in" in title', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('sign in');
  });

  xit('should render error message if user inputs too many characters into username field', () => {
    component.initializeForms();
    component.loginForm.value.username = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    let compiled = fixture.debugElement.nativeElement;
    let field = compiled.querySelector('input')

    expect(compiled.querySelector('b').textContent).toContain('less than');
  });
});
