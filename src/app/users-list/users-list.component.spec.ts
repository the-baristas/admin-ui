import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => {
  //  expect(component).tobetruthy();
  //});

  //describe('userslistcomponent', () => {
  //  it('do something', () => {
  //    //const usersservice: any = jasmine.createspyobj('usersservice', ["getallusers"]);
  //    //usersservice.getallusers.and.returnvalue();
  //  });
  //});
});
