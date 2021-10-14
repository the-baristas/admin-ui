import { Component, OnInit } from '@angular/core';
import {
    AbstractControl, FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { Booking } from '../../entities/booking';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-booking-edit-modal',
    templateUrl: './booking-edit-modal.component.html',
    styleUrls: ['./booking-edit-modal.component.css']
})
export class BookingEditModalComponent implements OnInit {
    editingForm!: FormGroup;
    selectedBooking: Booking = {} as Booking;

    constructor(
        public activeModal: NgbActiveModal,
        private bookingService: BookingService,
        formBuilder: FormBuilder,
    ) {
        this.editingForm = formBuilder.group({
            confirmationCode: ['', Validators.required],
            layoverCount: [{ value: 0, disabled: true }],
            totalPrice: [{ value: 0, disabled: true }],
        });
    }

    ngOnInit(): void {
        this.updateForm();

        this.editingForm.valueChanges.subscribe((booking: Booking) => {
            // Changed properties are copied to selectedBookings.
            Object.assign(this.selectedBooking, booking);
        });
    }

    updateForm(): void {
        this.editingForm.patchValue(this.selectedBooking);
    }

    save(): void {
        this.bookingService
            .update(this.selectedBooking)
            .subscribe((updatedBooking: Booking) => {
                this.activeModal.close(updatedBooking);
            });
    }

    get confirmationCode(): AbstractControl | null {
        return this.editingForm.get('confirmationCode');
    }
}
