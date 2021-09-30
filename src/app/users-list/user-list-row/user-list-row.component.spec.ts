import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListRowComponent } from './user-list-row.component';

describe('UserListRowComponent', () => {
  let component: UserListRowComponent;
  let fixture: ComponentFixture<UserListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
