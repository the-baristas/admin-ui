import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplane-add-modal',
    templateUrl: './airplane-add-modal.component.html',
    styleUrls: ['./airplane-add-modal.component.css'],
})
export class AirplaneAddModalComponent implements OnInit {
    addingForm: FormGroup = new FormGroup(
        {
            firstClassSeatsMax: new FormControl(''),
            businessClassSeatsMax: new FormControl(''),
            economyClassSeatsMax: new FormControl(''),
            model: new FormControl(''),
        },
        [Validators.required]
    );
    @Output() addEvent: EventEmitter<Airplane> = new EventEmitter();

    constructor(
        public activeModal: NgbActiveModal,
        private airplaneService: AirplaneService
    ) {}

    ngOnInit(): void {}

    add(): void {
        const model = this.addingForm.controls.model.value.trim();
        const firstClassSeatsMax = this.addingForm.controls.firstClassSeatsMax
            .value;
        const businessClassSeatsMax = this.addingForm.controls
            .businessClassSeatsMax.value;
        const economyClassSeatsMax = this.addingForm.controls
            .economyClassSeatsMax.value;
        if (
            !(
                model &&
                firstClassSeatsMax &&
                businessClassSeatsMax &&
                economyClassSeatsMax
            )
        ) {
            return;
        }
        const airplane: Airplane = {
            model,
            firstClassSeatsMax,
            businessClassSeatsMax,
            economyClassSeatsMax,
        } as Airplane;
        this.airplaneService
            .addAirplane(airplane)
            .subscribe((airplane: Airplane) => {
                this.activeModal.close(airplane);
            });
    }
}
