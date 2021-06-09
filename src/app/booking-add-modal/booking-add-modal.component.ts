import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Component({
    selector: 'app-booking-add-modal',
    templateUrl: './booking-add-modal.component.html',
    styleUrls: ['./booking-add-modal.component.css']
})
export class BookingAddModalComponent implements OnInit {
    addingForm: FormGroup = new FormGroup(
        {
            confirmationCode: new FormControl(''),
            layoverCount: new FormControl(''),
            totalPrice: new FormControl(''),
            active: new FormControl('')
        },
        [Validators.required]
    );
    @Output() addEvent: EventEmitter<Booking> = new EventEmitter();

    constructor(
        public activeModal: NgbActiveModal,
        private bookingService: BookingService
    ) {}

    ngOnInit(): void {}

    add(): void {
        const confirmationCode =
            this.addingForm.controls.confirmationCode.value.trim();
        const layoverCount = this.addingForm.controls.layoverCount.value;
        const totalPrice = this.addingForm.controls.totalPrice.value;
        const active = this.addingForm.controls.active.value;
        if (
            !confirmationCode ||
            layoverCount < 0 ||
            totalPrice < 0 ||
            active === null
        ) {
            return;
        }
        const booking: Booking = {
            confirmationCode,
            layoverCount,
            totalPrice,
            active
        } as Booking;
        this.bookingService
            .addBooking(booking)
            .subscribe((booking: Booking) => {
                this.activeModal.close(booking);
            });
    }
}
