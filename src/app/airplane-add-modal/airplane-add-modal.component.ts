import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplane-add-modal',
    templateUrl: './airplane-add-modal.component.html',
    styleUrls: ['./airplane-add-modal.component.css']
})
export class AirplaneAddModalComponent implements OnInit {
    addingForm: FormGroup = new FormGroup({
        firstClassSeatsMax: new FormControl(0, [
            Validators.min(0),
            Validators.required
        ]),
        businessClassSeatsMax: new FormControl(0, [
            Validators.min(0),
            Validators.required
        ]),
        economyClassSeatsMax: new FormControl(0, [
            Validators.min(0),
            Validators.required
        ]),
        model: new FormControl('', Validators.required)
    });

    constructor(
        public activeModal: NgbActiveModal,
        private airplaneService: AirplaneService
    ) {}

    ngOnInit(): void {}

    add(): void {
        this.airplaneService
            .addAirplane(this.addingForm.value as Airplane)
            .subscribe((airplane: Airplane) => {
                this.activeModal.close(airplane);
            });
    }

    get firstClassSeatsMax(): AbstractControl | null {
        return this.addingForm.get('firstClassSeatsMax');
    }

    get businessClassSeatsMax(): AbstractControl | null {
        return this.addingForm.get('businessClassSeatsMax');
    }

    get economyClassSeatsMax(): AbstractControl | null {
        return this.addingForm.get('economyClassSeatsMax');
    }

    get model(): AbstractControl | null {
        return this.addingForm.get('model');
    }
}
