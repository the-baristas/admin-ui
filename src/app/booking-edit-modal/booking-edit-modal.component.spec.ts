import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BookingEditModalComponent } from './booking-edit-modal.component';

describe('BookingEditModalComponent', () => {
  let component: BookingEditModalComponent;
  let fixture: ComponentFixture<BookingEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingEditModalComponent],
      providers: [NgbActiveModal, HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
