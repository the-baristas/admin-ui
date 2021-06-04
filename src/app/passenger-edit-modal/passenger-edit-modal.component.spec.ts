import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerEditModalComponent } from './passenger-edit-modal.component';

describe('PassengerEditModalComponent', () => {
  let component: PassengerEditModalComponent;
  let fixture: ComponentFixture<PassengerEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
