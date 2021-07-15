import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';

import { UserDeleteModalComponent } from './user-delete-modal.component';

describe('UserDeleteModalComponent', () => {
  let component: UserDeleteModalComponent;
  let fixture: ComponentFixture<UserDeleteModalComponent>;

  let usersServiceMock: any;

  beforeEach(async () => {
    usersServiceMock = jasmine.createSpyObj('UsersService', ['deleteUser']);

    await TestBed.configureTestingModule({
      declarations: [UserDeleteModalComponent],
      imports: [
      ],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        NgbActiveModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Delete User"', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h5').textContent).toContain('Delete');
  });

  it('Delete button should call deleteUser', () => {
    component.userIdToDelete = 1;
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#deleteModalConfirm');

    button.click();

    expect(usersServiceMock.deleteUser).toHaveBeenCalled();
    
  });

});
