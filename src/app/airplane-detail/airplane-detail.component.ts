import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplane-detail',
    templateUrl: './airplane-detail.component.html',
    styleUrls: ['./airplane-detail.component.css']
})
export class AirplaneDetailComponent implements OnInit {
    airplane!: Airplane;

    constructor(
        private route: ActivatedRoute,
        private airplaneService: AirplaneService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.getAirplane();
    }

    getAirplane(): void {
        const id = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.airplaneService.getAirplane(id)
            .subscribe(airplane => this.airplane = airplane);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.airplaneService.updateAirplane(this.airplane)
            .subscribe(() => this.goBack());
    }
}
