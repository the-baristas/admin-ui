import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplane-add-modal',
    templateUrl: './airplane-add-modal.component.html',
    styleUrls: ['./airplane-add-modal.component.css']
})
export class AirplaneAddModalComponent implements OnInit {
    addingForm: FormGroup = new FormGroup(
        {
            firstClassSeatsMax: new FormControl(''),
            businessClassSeatsMax: new FormControl(''),
            economyClassSeatsMax: new FormControl(''),
            model: new FormControl('')
        },
        [Validators.required]
    );

    constructor(
        public activeModal: NgbActiveModal,
        private airplaneService: AirplaneService
    ) {}

    ngOnInit(): void {}

    add(): void {
        const firstClassSeatsMax: number = this.addingForm.get(
            'firstClassSeatsMax'
        )?.value;
        const businessClassSeatsMax: number = this.addingForm.get(
            'businessClassSeatsMax'
        )?.value;
        const economyClassSeatsMax: number = this.addingForm.get(
            'economyClassSeatsMax'
        )?.value;
        const model: string = this.addingForm.get('model')?.value.trim();
        // TODO: Check fields in a better way.
        if (
            firstClassSeatsMax < 0 ||
            businessClassSeatsMax < 0 ||
            economyClassSeatsMax < 0 ||
            !model
        ) {
            return;
        }
        const airplane: Airplane = {
            firstClassSeatsMax,
            businessClassSeatsMax,
            economyClassSeatsMax,
            model
        } as Airplane;

        this.airplaneService
            .addAirplane(airplane)
            .subscribe((airplane: Airplane) => {
                this.activeModal.close(airplane);
            });
    }
}
