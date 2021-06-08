import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDeleteModalComponent } from './passenger-delete-modal.component';

describe('PassengerDeleteModalComponent', () => {
  let component: PassengerDeleteModalComponent;
  let fixture: ComponentFixture<PassengerDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerDeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
