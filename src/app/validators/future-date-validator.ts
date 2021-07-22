import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Returns a validator function that determines whether the person with a date
 * of birth is at least the given age.
 */
export function getFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const inputDate = Date.parse(control.value);
        return inputDate > Date.now() ? { futureDate: true } : null;
    };
}
