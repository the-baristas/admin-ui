import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PassengerService } from 'src/app/services/passenger.service';
import { getFutureDateValidator } from 'src/app/validators/date-of-birth-validator';
import { Passenger } from '../../entities/passenger';

@Component({
    selector: 'app-passenger-edit-modal',
    templateUrl: './passenger-edit-modal.component.html',
    styleUrls: ['./passenger-edit-modal.component.css']
})
export class PassengerEditModalComponent implements OnInit {
    selectedPassenger: Passenger = {} as Passenger;
    editingForm!: FormGroup;
    genders: string[];
    seatClasses: string[];

    constructor(
        public activeModal: NgbActiveModal,
        private passengerService: PassengerService,
        formBuilder: FormBuilder
    ) {
        this.editingForm = formBuilder.group({
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
        });
        this.genders = ['male', 'female', 'nonbinary'];
        this.seatClasses = ['first', 'business', 'economy'];
    }

    ngOnInit(): void {
        this.updateForm();
    }

    private updateForm(): void {
        const addressArray = this.selectedPassenger.address.split(' ');
        const cityIndex = addressArray.length - 3;
        const stateIndex = addressArray.length - 2;
        const zipCodeIndex = addressArray.length - 1;
        this.editingForm.patchValue(this.selectedPassenger);
        this.editingForm.patchValue({
            streetAddress: addressArray.slice(0, cityIndex).join(' '),
            city: addressArray[cityIndex],
            state: addressArray[stateIndex],
            zipCode: addressArray[zipCodeIndex]
        });
    }

    save(): void {
        const targetPassenger: Passenger = Object.assign(
            this.selectedPassenger,
            {
                givenName: this.editingForm.get('givenName')?.value,
                familyName: this.editingForm.get('familyName')?.value,
                dateOfBirth: this.editingForm.get('dateOfBirth')?.value,
                gender: this.editingForm.get('gender')?.value,
                address:
                    this.editingForm.get('streetAddress')?.value +
                    ' ' +
                    this.editingForm.get('city')?.value +
                    ' ' +
                    this.editingForm.get('state')?.value +
                    ' ' +
                    this.editingForm.get('zipCode')?.value,
                seatClass: this.editingForm.get('seatClass')?.value,
                seatNumber: this.editingForm.get('seatNumber')?.value,
                checkInGroup: this.editingForm.get('checkInGroup')?.value
            }
        );
        this.passengerService
            .update(targetPassenger)
            .subscribe((updatedPassenger: Passenger) =>
                this.activeModal.close(updatedPassenger)
            );
    }

    get givenName(): AbstractControl | null {
        return this.editingForm.get('givenName');
    }

    get dateOfBirth(): AbstractControl | null {
        return this.editingForm.get('dateOfBirth');
    }

    get state(): AbstractControl | null {
        return this.editingForm.get('state');
    }

    get zipCode(): AbstractControl | null {
        return this.editingForm.get('zipCode');
    }
}
