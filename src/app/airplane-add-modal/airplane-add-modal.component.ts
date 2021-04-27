import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Airplane } from '../airplane';
import { AirplaneService } from '../airplane.service';

@Component({
    selector: 'app-airplane-add-modal',
    templateUrl: './airplane-add-modal.component.html',
    styleUrls: ['./airplane-add-modal.component.css']
})
export class AirplaneAddModalComponent implements OnInit {
    @Output() addEvent: EventEmitter<Airplane> = new EventEmitter();

    constructor(private airplaneService: AirplaneService) {}

    ngOnInit(): void {}

    addAirplane(
        model: HTMLInputElement,
        firstClassSeatsMax: HTMLInputElement,
        businessClassSeatsMax: HTMLInputElement,
        economyClassSeatsMax: HTMLInputElement
    ): void {
        this.add(
            model.value,
            firstClassSeatsMax.value,
            businessClassSeatsMax.value,
            economyClassSeatsMax.value
        );
        model.value = '';
        firstClassSeatsMax.value = '';
        businessClassSeatsMax.value = '';
        economyClassSeatsMax.value = '';
    }

    add(
        model: string,
        firstClassSeatsMax: string,
        businessClassSeatsMax: string,
        economyClassSeatsMax: string
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
        const airplane = {
            model,
            firstClassSeatsMax: parseInt(firstClassSeatsMax),
            businessClassSeatsMax: parseInt(businessClassSeatsMax),
            economyClassSeatsMax: parseInt(economyClassSeatsMax),
        };
        this.airplaneService
            .addAirplane(airplane as Airplane)
            .subscribe((airplane) => {
                this.addEvent.emit(airplane);
            });
    }
}
