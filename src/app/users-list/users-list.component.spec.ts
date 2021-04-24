import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs/internal/observable/of';
import { UsersService } from '../services/users.service';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersServiceMock: any;

  let userData: any = {
    userId: 1,
    givenName: "First",
    familyName: "Last",
    username: "username2",
    email: "email@gmail.com",
    phone: "1112227878",
    role: "ROLE_USER",
    isActive: 1
  };

  beforeEach(async () => {
    usersServiceMock = jasmine.createSpyObj('UsersService', ['getAllUsers']);
    usersServiceMock.getAllUsers.and.returnValue(of([userData]))
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: usersServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "List of Users"', () => {
    let compiled = fixture.debugElement.nativeElement;
    
    expect(compiled.querySelector('thead').textContent).toContain('List of Users');
  });

  it('List of users should contain mock userData', () => {
    expect(component.totalUsers).toEqual(1);
    expect(component.users[0].userId).toEqual(1);
    expect(component.users[0].username).toBe("username2");
  });

  it('should be at least one "Edit" button', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button').textContent).toBe('Edit');
  });

  it('Should be at least one button because there is one mock user', () => {
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length >= 1).toBeTruthy();
  });

});
