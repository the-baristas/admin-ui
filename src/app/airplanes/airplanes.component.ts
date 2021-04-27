import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    selectedAirplane: Airplane = {} as Airplane;
    editingForm: FormGroup = new FormGroup(
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

        this.editingForm.valueChanges.subscribe((airplane: Airplane) => {
            this.selectedAirplane.firstClassSeatsMax =
                airplane.firstClassSeatsMax;
            this.selectedAirplane.businessClassSeatsMax =
                airplane.businessClassSeatsMax;
            this.selectedAirplane.economyClassSeatsMax =
                airplane.economyClassSeatsMax;
            this.selectedAirplane.model = airplane.model;
        });
    }

    save(): void {
        this.airplaneService
            .updateAirplane(this.selectedAirplane)
            .subscribe((updatedAirplane: Airplane) => {
                const updatedAirplaneIndex = this.foundAirplanes.findIndex(
                    (a: Airplane) => a.id === updatedAirplane.id
                );
                this.foundAirplanes[updatedAirplaneIndex] = updatedAirplane;
                this.modalService.dismissAll('Save click');
            });
    }

    updateEditingForm(airplane: Airplane): void {
        this.editingForm.setValue({
            firstClassSeatsMax: airplane.firstClassSeatsMax,
            businessClassSeatsMax: airplane.businessClassSeatsMax,
            economyClassSeatsMax: airplane.economyClassSeatsMax,
            model: airplane.model,
        });
        this.selectedAirplane.id = airplane.id;
    }

    addToFoundAirplanes(airplane: Airplane): void {
        this.foundAirplanes.push(airplane);
    }

    replaceFoundAirplanes(airplanes: Airplane[]): void {
        this.foundAirplanes = airplanes;
    }

    delete(airplane: Airplane): void {
        this.foundAirplanes = this.foundAirplanes.filter(
            (a: Airplane) => a !== airplane
        );
        this.airplaneService.deleteAirplane(airplane.id).subscribe();
    }

    openAddModal(): void {
        const modalRef = this.modalService.open(AirplaneAddModalComponent, {
            centered: true,
        });
        modalRef.result.then((airplane: Airplane) => {
            this.foundAirplanes.push(airplane);
        });
    }

    open(content: any): void {
        this.modalService.open(content, { centered: true });
    }
}
