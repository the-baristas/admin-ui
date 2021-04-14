import { Component, OnInit } from '@angular/core';
import { Airplane } from '../airplane';
import { AirplaneService } from '../airplane.service';

@Component({
    selector: 'app-airplanes',
    templateUrl: './airplanes.component.html',
    styleUrls: ['./airplanes.component.css']
})
export class AirplanesComponent implements OnInit {
    airplanes!: Airplane[];

    constructor(private airplaneService: AirplaneService) { }

    ngOnInit(): void {
        this.getAirplanes();
    }

    getAirplanes(): void {
        this.airplaneService.getAirplanes()
            .subscribe(airplanes => this.airplanes = airplanes);
    }

    add(model: string, firstClassSeatsMax: string, businessClassSeatsMax: string, economyClassSeatsMax: string): void {
        model = model.trim();
        if (!(model && firstClassSeatsMax && businessClassSeatsMax && economyClassSeatsMax)) {
            return;
        }
        const airplane = {
            model,
            firstClassSeatsMax: parseInt(firstClassSeatsMax),
            businessClassSeatsMax: parseInt(businessClassSeatsMax),
            economyClassSeatsMax: parseInt(economyClassSeatsMax)
        };
        this.airplaneService.addAirplane(airplane as Airplane)
            .subscribe(airplane => {
                this.airplanes.push(airplane);
            });
    }

    delete(airplane: Airplane): void {
        this.airplanes = this.airplanes.filter(a => a !== airplane);
        this.airplaneService.deleteAirplane(airplane.id).subscribe();
    }
}
