import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs/internal/observable/of';

import { UserModalComponent } from './user-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { createVoid } from 'typescript';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let usersServiceMock: jasmine.SpyObj<UsersService>;

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
    usersServiceMock = jasmine.createSpyObj('UsersService', ['updateUser', 'createUser']);
    usersServiceMock.createUser.and.returnValue(of(userAdmin));
    usersServiceMock.updateUser.and.returnValue(of());

    await TestBed.configureTestingModule({
      declarations: [ UserModalComponent ],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        NgbActiveModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close button should call close', () => {
    component.openModal(null);
    fixture.detectChanges();
    spyOn(component, 'closeModal').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector('#modalClose');
    button.click();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('when action is create, submit should call createUser mock', () => {
    component.openModal(null);

    expect(component.action).toEqual("Add");

    component.userModalPerformAction();

    expect(usersServiceMock.createUser).toHaveBeenCalled();
  });

  it('when action is edit, submit should call updateUser mock', () => {
    component.openModal(userAdmin);

    expect(component.user).toEqual(userAdmin);
    expect(component.action).toEqual("Edit");

    component.userModalPerformAction();

    expect(usersServiceMock.updateUser).toHaveBeenCalled();
  });
});
