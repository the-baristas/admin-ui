import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';

export function getNotFoundUserValidatorFn(
    usersService: UsersService
): AsyncValidatorFn {
    return (
        control: AbstractControl
    ):
        | Promise<ValidationErrors | null>
        | Observable<ValidationErrors | null> => {
        return usersService.getUserByUsername(control.value).pipe(
            map((user: User) => {
                return null;
            }),
            catchError(() => of({ notFoundUser: true }))
        );
    };
}
