import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Passenger } from '../entities/passenger';
import { PassengerService } from '../services/passenger.service';

@Component({
    selector: 'app-passenger-add-modal',
    templateUrl: './passenger-add-modal.component.html',
    styleUrls: ['./passenger-add-modal.component.css']
})
export class PassengerAddModalComponent implements OnInit {
    addingForm: FormGroup = new FormGroup({
        bookingConfirmationCode: new FormControl('', [Validators.required]),
        bookingActive: new FormControl(true, [Validators.requiredTrue])
    });

    constructor(
        public activeModal: NgbActiveModal,
        private passengerService: PassengerService
    ) {}

    ngOnInit(): void {}

    add(): void {
        this.passengerService
            .create(this.addingForm.value as Passenger)
            .subscribe((passenger: Passenger) => {
                this.activeModal.close(passenger);
            });
    }
}
