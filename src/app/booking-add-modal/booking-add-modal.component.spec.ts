import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { BookingAddModalComponent } from './booking-add-modal.component';

describe('BookingAddModalComponent', () => {
  let component: BookingAddModalComponent;
  let fixture: ComponentFixture<BookingAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingAddModalComponent],
      imports: [HttpClientModule],
      providers: [NgbActiveModal]
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
