import { Component, OnInit } from '@angular/core';
import { Airplane } from '../airplane';
import { AirplaneService } from '../airplane.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    airplanes: Airplane[] = [];

    constructor(private airplaneService: AirplaneService) { }

    ngOnInit() {
        this.getAirplanes();
    }

    getAirplanes(): void {
        this.airplaneService.getAirplanes()
            .subscribe(airplanes => this.airplanes = airplanes.slice(1, 5));
    }
}
