import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../services/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let formBuilder: FormBuilder;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [LoginService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService);
    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render "sign in" in title', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('sign in');
  });

  it('should render "Username" near username field', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('Username');
  });

  xit('should render error message if user inputs too many characters into username field', () => {
    component.initializeForms();
    component.username = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    let compiled = fixture.debugElement.nativeElement;
    let field = compiled.querySelector('input')
  
    expect(compiled.querySelector('b').textContent).toContain('less than');
  });

  it('should render "sign in" in title', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('sign in');
  });

});
