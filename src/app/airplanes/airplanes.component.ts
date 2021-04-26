import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../airplane';
import { AirplaneAddModalComponent } from '../airplane-add-modal/airplane-add-modal.component';
import { AirplaneService } from '../airplane.service';

@Component({
    selector: 'app-airplanes',
    templateUrl: './airplanes.component.html',
    styleUrls: ['./airplanes.component.css'],
})
export class AirplanesComponent implements OnInit {
    foundAirplanes: Airplane[] = [];
    page: number = 1;
    pageSize: number = 10;
    addingForm: FormGroup = new FormGroup(
        {
            firstClassSeatsMax: new FormControl(''),
            businessClassSeatsMax: new FormControl(''),
            economyClassSeatsMax: new FormControl(''),
            model: new FormControl(''),
        },
        [Validators.required]
    );

    constructor(
        private airplaneService: AirplaneService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        // Show some airplanes at the start before a search is done.
        this.airplaneService
            .getAirplanes()
            .subscribe(
                (airplanes) => (this.foundAirplanes = airplanes.slice(0, 10))
            );
    }

    addToFoundAirplanes(airplane: Airplane): void {
        this.foundAirplanes.push(airplane);
    }

    updateFoundAirplanes(airplanes: Airplane[]): void {
        this.foundAirplanes = airplanes;
    }

    delete(airplane: Airplane): void {
        this.foundAirplanes = this.foundAirplanes.filter((a) => a !== airplane);
        this.airplaneService.deleteAirplane(airplane.id).subscribe();
    }

    openModal(): void {
        this.modalService.open(AirplaneAddModalComponent, { centered: true });
    }

    open(content: any): void {
        this.modalService.open(content, { centered: true });
    }

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
}
