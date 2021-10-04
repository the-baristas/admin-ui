import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from '../app-routing.module';
import { Page } from '../entities/page';
import { User } from '../entities/user';
import { HeaderComponent } from '../layout/header/header.component';
import { PhonePipe } from '../pipes/phone.pipe';
import { UsersService } from '../services/users.service';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersServiceMock: jasmine.SpyObj<UsersService>;

  let userData: User[] = [{
    userId: 1,
    givenName: "First",
    familyName: "Last",
    username: "username2",
    password: "pass",
    email: "email@gmail.com",
    phone: "1112227878",
    role: "ROLE_USER",
    active: true,
    dob: new Date(Date.now()),
    streetAddress: "1111 Street Rd",
    city: "City",
    state: "CA",
    zip: "21233"
  },
  {
    userId: 2,
    givenName: "First",
    familyName: "Last",
    username: "username5",
    password: "pass",
    email: "email@yahoo.com",
    phone: "1114447878",
    role: "ROLE_USER",
    active: true,
    dob: new Date(Date.now()),
    streetAddress: "1111 Street Rd",
    city: "City",
    state: "CA",
    zip: "21233"
  }];

  let userPage: Page<User> = {
    content: userData,
    size: 2,
    totalPages: 1,
    number: 0,
    numberOfElements: 2,
    totalElements: 2,
    first: true,
    last: true,
    empty: false
  };

  let userAdmin: User = {
    userId: 3,
    givenName: "First",
    familyName: "Last",
    username: "admin",
    password: "pass",
    email: "email@smoothstack.com",
    phone: "1112221111",
    role: "ROLE_ADMIN",
    active: true,
    dob: new Date(Date.now()),
    streetAddress: "1111 Street Rd",
    city: "City",
    state: "CA",
    zip: "21233"
  };

  beforeEach(async () => {
    usersServiceMock = jasmine.createSpyObj('UsersService', ['getAllUsers', 'getUserByEmail',
                                            'getUserByUsername', 'getUserByPhoneNumber',
                                            'createUser', 'findUsersBySearchTerm']);
    usersServiceMock.getAllUsers.and.returnValue(of(userPage));
    usersServiceMock.getUserByEmail.and.returnValue(of(userData[0]));
    usersServiceMock.getUserByUsername.and.returnValue(of(userData[1]));
    usersServiceMock.getUserByPhoneNumber.and.returnValue(of(userData[0]));
    usersServiceMock.createUser.and.returnValue(of(userAdmin));
    usersServiceMock.findUsersBySearchTerm.and.returnValue(of(userPage));

    await TestBed.configureTestingModule({
      declarations: [UsersListComponent, HeaderComponent, PhonePipe],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AppRoutingModule
      ],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        NgbModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterAll(() => {

  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test getUsers', () => {
    expect(component.totalUsers).toEqual(2);
    expect(component.users[0]).toEqual(userData[0]);
    expect(component.currentPage.totalElements).toEqual(userPage.totalElements);

  });

  it('Test ngb-pagination bar exists', () => {
    let paginator: NgbPagination = fixture.debugElement.nativeElement.querySelector('ngb-pagination');
    expect(paginator).toBeDefined();
    spyOn(component, 'setPage').and.callThrough();
  });

  it('Test setPage', () => {
    spyOn(component, 'getUsers').and.callThrough();

    //set page should not call getUsers since there is not a second page
    expect(component.setPage(2)).toBeUndefined();

    component.setPage(2);
    expect(component.getUsers).toHaveBeenCalledTimes(0);
  });


  it('should be Clear and Create buttons', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#clearButton').textContent).toContain('Clear');
    expect(compiled.querySelector('#createButton').textContent).toContain('Create');
  });

  it('Create button should open modal', () => {
    spyOn(component, 'openModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#createButton');
    button.click();
    expect(component.openModal).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });

  it('Edit button should open modal', () => {
    spyOn(component, 'openModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#editButton');
    button.click();
    expect(component.openModal).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });

  it('Delete button should open modal', () => {
    spyOn(component, 'openDeleteModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#deleteButton');
    button.click();
    expect(component.openDeleteModal).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });

  it('Test items per page dropdown', () => {
    let select: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('select');

    select.selectedIndex = 0;
    expect(select.value).toEqual('0: 10');

    select.selectedIndex = 1;
    expect(select.value).toEqual('1: 25');

    select.selectedIndex = 2;
    expect(select.value).toEqual('2: 50');
  });

  it('Clear button should clear search form', () => {
    let button = fixture.debugElement.nativeElement.querySelector('#clearButton');
    component.searchUsersForm.value.searchString = userData[0].email;
    component.searchUsersForm.controls.searchString.markAsDirty();

    component.clearSearchForm();
    expect(component.searchUsersForm.controls.searchString.dirty).toBeFalsy();
  });

  it('test searchUsers()', () => {
    component.searchUsersForm.value.searchString = "user";
    component.searchUsersForm.controls.searchString.markAsDirty();

    component.searchUsers();

    expect(usersServiceMock.findUsersBySearchTerm).toHaveBeenCalled();
  })

  it('test clearSearchForm()', () => {
    component.searchUsersForm.value.searchString = "";
    component.searchUsersForm.controls.searchString.markAsDirty();

    component.clearSearchForm();

    expect(usersServiceMock.getAllUsers).toHaveBeenCalled();
  })

});
