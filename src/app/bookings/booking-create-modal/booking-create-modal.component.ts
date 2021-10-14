import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    AbstractControlOptions,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { getNotFoundUserValidatorFn } from 'src/app/validators/not-found-user';
import { Booking } from '../../entities/booking';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-booking-create-modal',
    templateUrl: './booking-create-modal.component.html',
    styleUrls: ['./booking-create-modal.component.css']
})
export class BookingCreateModalComponent implements OnInit {
    creatingForm!: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private bookingService: BookingService,
        formBuilder: FormBuilder,
        usersService: UsersService
    ) {
        this.creatingForm = formBuilder.group(
            {
                confirmationCode: ['', Validators.required],
                layoverCount: ['', Validators.required],
                username: [
                    '',
                    {
                        validators: Validators.required,
                        asyncValidators:
                            getNotFoundUserValidatorFn(usersService),
                        updateOn: 'change'
                    } as AbstractControlOptions
                ]
            },
            { validators: Validators.required }
        );
    }

    ngOnInit(): void {}

    add(): void {
        const booking: Booking = {
            confirmationCode: this.creatingForm
                .get('confirmationCode')
                ?.value.trim(),
            layoverCount: this.creatingForm.get('layoverCount')?.value,
            username: this.creatingForm.get('username')?.value
        } as Booking;
        this.bookingService
            .addBooking(booking)
            .subscribe((booking: Booking) => {
                this.activeModal.close(booking);
            });
    }

    get confirmationCode(): AbstractControl | null {
        return this.creatingForm.get('confirmationCode');
    }

    get layoverCount(): AbstractControl | null {
        return this.creatingForm.get('layoverCount');
    }

    get username(): AbstractControl | null {
        return this.creatingForm.get('username');
    }
}
