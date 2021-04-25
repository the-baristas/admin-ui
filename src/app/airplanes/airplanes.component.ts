import { Component, OnInit } from '@angular/core';
import { Airplane } from '../airplane';
import { AirplaneService } from '../airplane.service';

@Component({
    selector: 'app-airplanes',
    templateUrl: './airplanes.component.html',
    styleUrls: ['./airplanes.component.css'],
})
export class AirplanesComponent implements OnInit {
    foundAirplanes: Airplane[] = [];

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
                this.foundAirplanes.push(airplane);
            });
    }

    // delete(airplane: Airplane): void {
    //     this.foundAirplanes = this.foundAirplanes.filter((a) => a !== airplane);
    //     this.airplaneService.deleteAirplane(airplane.id).subscribe();
    // }
}
