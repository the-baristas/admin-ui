import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAddModalComponent } from './passenger-add-modal.component';

describe('PassengerAddModalComponent', () => {
  let component: PassengerAddModalComponent;
  let fixture: ComponentFixture<PassengerAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
