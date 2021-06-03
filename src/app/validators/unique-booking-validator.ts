import { Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    AsyncValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Booking } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Injectable({ providedIn: 'root' })
export class UniqueBookingValidator implements AsyncValidator {
    constructor(private bookingService: BookingService) {}

    validate(
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.bookingService.findByConfirmationCode(control.value).pipe(
            map((booking: Booking) =>
                Object.keys(booking).length === 0
                    ? { uniqueBooking: true }
                    : null
            ),
            catchError(() => of(null))
        );
    }
}

export function getUniqueBookingValidator2(
    validator: UniqueBookingValidator
): AsyncValidatorFn {
    return (
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
        validator.validate(control);
}

/**
 * Returns an async validator function that determines whether a booking with a
 * confirmation code exists using the BookingService.
 * @param bookingService The service used by the validator function.
 * @return An async validator function.
 */
export function getUniqueBookingValidator(
    bookingService: BookingService
): AsyncValidatorFn {
    return (
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
        bookingService.findByConfirmationCode(control.value).pipe(
            map((booking: Booking) => {
                return Object.keys(booking).length === 0
                    ? { uniqueBooking: true }
                    : null;
            }),
            catchError(() => of(null))
        );
}
