import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollapsibleRowComponent } from './user-collapsible-row.component';

describe('UserCollapsibleRowComponent', () => {
  let component: UserCollapsibleRowComponent;
  let fixture: ComponentFixture<UserCollapsibleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCollapsibleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCollapsibleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
