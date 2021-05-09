import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEditModalComponent } from './booking-edit-modal.component';

xdescribe('BookingEditModalComponent', () => {
  let component: BookingEditModalComponent;
  let fixture: ComponentFixture<BookingEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
