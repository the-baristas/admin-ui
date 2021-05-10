import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking-edit-modal',
  templateUrl: './booking-edit-modal.component.html',
  styleUrls: ['./booking-edit-modal.component.css']
})
export class BookingEditModalComponent implements OnInit {
    selectedBooking: Booking = {} as Booking;
    editingForm: FormGroup = new FormGroup(
        {
            confirmationCode: new FormControl(''),
            layoverCount: new FormControl(''),
            totalPrice: new FormControl(''),
        },
        [Validators.required]
    );

    constructor(
        public activeModal: NgbActiveModal,
        private bookingService: BookingService
    ) {}

    ngOnInit(): void {
        this.updateForm();

        this.editingForm.valueChanges.subscribe((booking: Booking) => {
            // Changed properties are copied to selectedBookings.
            Object.assign(this.selectedBooking, booking);
        });
    }

    updateForm(): void {
        this.editingForm.setValue({
            confirmationCode: this.selectedBooking.confirmationCode,
            layOverCount: this.selectedBooking.layoverCount,
            totalPrice: this.selectedBooking.totalPrice
        });
    }

    save(): void {
        this.bookingService
            .updateBooking(this.selectedBooking)
            .subscribe((updatedBooking: Booking) => {
                this.activeModal.close(updatedBooking);
            });
    }
}

