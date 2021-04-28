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
        private airplaneService: AirplaneService,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {}

    /**
     * Adds an airplane given input values.
     */
    addAirplane(
        model: string,
        firstClassSeatsMax: string,
        businessClassSeatsMax: string,
        economyClassSeatsMax: string
    ): void {
        this.add(
            model,
            parseInt(firstClassSeatsMax),
            parseInt(businessClassSeatsMax),
            parseInt(economyClassSeatsMax)
        );
    }

    add(
        model: string,
        firstClassSeatsMax: number,
        businessClassSeatsMax: number,
        economyClassSeatsMax: number
    ): void {
        model = model.trim();
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
