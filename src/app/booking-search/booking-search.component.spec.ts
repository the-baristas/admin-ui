import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSearchComponent } from './booking-search.component';

xdescribe('BookingSearchComponent', () => {
  let component: BookingSearchComponent;
  let fixture: ComponentFixture<BookingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
