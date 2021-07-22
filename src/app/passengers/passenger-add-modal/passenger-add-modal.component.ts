import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';
import { getFutureDateValidator } from 'src/app/validators/date-of-birth-validator';
import { Booking } from '../../entities/booking';
import { BookingFlight } from '../../entities/booking-flight';
import { Passenger } from '../../entities/passenger';
import { BookingService } from '../../services/booking.service';
import { PassengerService } from '../../services/passenger.service';
import { getUniqueBookingValidator } from '../../validators/unique-booking-validator';

@Component({
    selector: 'app-passenger-add-modal',
    templateUrl: './passenger-add-modal.component.html',
    styleUrls: ['./passenger-add-modal.component.css']
})
export class PassengerAddModalComponent implements OnInit {
    addingForm!: FormGroup;
    bookingActive: boolean = false;
    bookingFlights: BookingFlight[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private passengerService: PassengerService,
        private bookingService: BookingService,
        formBuilder: FormBuilder
    ) {
        this.addingForm = formBuilder.group({
            bookingForm: formBuilder.group({
                bookingConfirmationCode: [
                    '',
                    {
                        validators: [Validators.required],
                        asyncValidators: getUniqueBookingValidator(
                            this.bookingService
                        ),
                        updateOn: 'change'
                    }
                ],
                layoverCount: [
                    { value: 0, disabled: true },
                    [Validators.min(0), Validators.required]
                ],
                bookingTotalPrice: new FormControl(
                    { value: 0, disabled: true },
                    [Validators.min(0), Validators.required]
                ),
                username: [{ value: '', disabled: true }],
                email: [{ value: '', disabled: true }],
                phone: [{ value: '', disabled: true }],
                flight: [{ value: null, disabled: true }]
            }),
            givenName: ['', Validators.required],
            familyName: ['', Validators.required],
            dateOfBirth: ['', [Validators.required, getFutureDateValidator()]],
            gender: ['', Validators.required],
            streetAddress: ['', Validators.required],
            city: ['', Validators.required],
            state: [
                '',
                {
                    validators: [
                        Validators.required,
                        Validators.pattern(
                            '(A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY])'
                        )
                    ]
                }
            ],
            zipCode: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')
                ]
            ],
            seatClass: ['', Validators.required],
            seatNumber: [0, [Validators.required, Validators.min(1)]],
            checkInGroup: [0, [Validators.required, Validators.min(1)]]
            // NOTE: No discounts because price isn't changed when admin adds a
            // passenger.
            // discountType: [''],
            // discountRate: [0],
        });
    }

    ngOnInit(): void {
        this.bookingConfirmationCode?.valueChanges
            .pipe(
                switchMap((confirmationCode: string) =>
                    this.bookingService.findByConfirmationCode(confirmationCode)
                )
            )
            .subscribe((booking: Booking) => {
                this.addingForm.get('bookingForm')?.patchValue({
                    layoverCount: booking.layoverCount,
                    bookingTotalPrice: booking.totalPrice,
                    username: booking.username,
                    email: booking.email,
                    phone: booking.phone
                });
                this.bookingActive = booking.active;
                this.bookingFlights = booking.flights;
                this.addingForm.get('bookingForm.flight')?.enable();
            });
    }

    add(): void {
        const passengerToCreate: Passenger = {
            bookingConfirmationCode: this.bookingConfirmationCode?.value,
            originAirportCode:
                this.addingForm.get('bookingForm.flight')?.value
                    .originAirportCode,
            destinationAirportCode:
                this.addingForm.get('bookingForm.flight')?.value
                    .destinationAirportCode,
            airplaneModel:
                this.addingForm.get('bookingForm.flight')?.value.airplaneModel,
            departureTime:
                this.addingForm.get('bookingForm.flight')?.value.departureTime,
            arrivalTime:
                this.addingForm.get('bookingForm.flight')?.value.arrivalTime,
            givenName: this.addingForm.get('givenName')?.value,
            familyName: this.addingForm.get('familyName')?.value,
            dateOfBirth: this.addingForm.get('dateOfBirth')?.value,
            gender: this.addingForm.get('gender')?.value,
            address:
                this.addingForm.get('streetAddress')?.value +
                ' ' +
                this.addingForm.get('city')?.value +
                ' ' +
                this.addingForm.get('state')?.value +
                ' ' +
                this.addingForm.get('zipCode')?.value,
            seatClass: this.addingForm.get('seatClass')?.value,
            seatNumber: this.addingForm.get('seatNumber')?.value,
            checkInGroup: this.addingForm.get('checkInGroup')?.value
        } as Passenger;
        this.passengerService
            .create(passengerToCreate)
            .subscribe((createdPassenger: Passenger) => {
                this.activeModal.close(createdPassenger);
            });
    }

    get bookingConfirmationCode(): AbstractControl | null {
        return this.addingForm.get('bookingForm.bookingConfirmationCode');
    }

    get layoverCount(): AbstractControl | null {
        return this.addingForm.get('bookingForm.layoverCount');
    }

    get state(): AbstractControl | null {
        return this.addingForm.get('state');
    }
}
