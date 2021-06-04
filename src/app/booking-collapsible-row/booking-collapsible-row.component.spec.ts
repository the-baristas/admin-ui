import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCollapsibleRowComponent } from './booking-collapsible-row.component';

describe('BookingCollapsibleRowComponent', () => {
  let component: BookingCollapsibleRowComponent;
  let fixture: ComponentFixture<BookingCollapsibleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingCollapsibleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCollapsibleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
