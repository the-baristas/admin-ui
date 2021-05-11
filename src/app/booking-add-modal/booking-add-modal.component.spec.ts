import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAddModalComponent } from './booking-add-modal.component';

xdescribe('BookingAddModalComponent', () => {
  let component: BookingAddModalComponent;
  let fixture: ComponentFixture<BookingAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
