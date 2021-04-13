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

    add(model: string): void {
        model = model.trim();
        if (!model) {
            return;
        }
        this.airplaneService.addAirplane({ model } as Airplane)
            .subscribe(airplane => {
                this.airplanes.push(airplane);
            });
    }

    delete(airplane: Airplane): void {
        this.airplanes = this.airplanes.filter(h => h !== airplane);
        this.airplaneService.deleteAirplane(airplane.id).subscribe();
    }
}
