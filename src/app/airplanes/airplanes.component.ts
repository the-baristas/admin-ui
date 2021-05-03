import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirplaneAddModalComponent } from '../airplane-add-modal/airplane-add-modal.component';
import { AirplaneEditModalComponent } from '../airplane-edit-modal/airplane-edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplanes',
    templateUrl: './airplanes.component.html',
    styleUrls: ['./airplanes.component.css']
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
            model: new FormControl('')
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
                (airplanes: Airplane[]) =>
                    (this.foundAirplanes = airplanes.slice(0, 10))
            );
    }

    replaceFoundAirplanes(airplanes: Airplane[]): void {
        this.foundAirplanes = airplanes;
    }

    openAddModal(): void {
        const modalRef = this.modalService.open(AirplaneAddModalComponent, {
            centered: true
        });
        modalRef.componentInstance.addingForm = this.addingForm;
        modalRef.componentInstance.add = () => {
            const model = this.addingForm.controls.model.value.trim();
            const firstClassSeatsMax = this.addingForm.controls
                .firstClassSeatsMax.value;
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
                economyClassSeatsMax
            } as Airplane;

            this.airplaneService.addAirplane(airplane).subscribe(() => {
                this.airplaneService
                    .getAirplanes()
                    .subscribe((airplanes: Airplane[]) => {
                        this.foundAirplanes = airplanes;
                        modalRef.close();
                    });
            });
        };
    }

    /**
     * Open the Edit Modal for the given airplane.
     */
    openEditModal(selectedAirplane: Airplane): void {
        const modalRef = this.modalService.open(AirplaneEditModalComponent, {
            centered: true
        });
        // The selected airplane in the foundAirplanes array is cloned and
        // passed it to the modal component so that changes made in the modal
        // won't affect the airplanes list.
        modalRef.componentInstance.selectedAirplane = Object.assign(
            {},
            selectedAirplane
        );

        modalRef.result.then((updatedAirplane: Airplane) => {
            const updatedAirplaneIndex = this.foundAirplanes.findIndex(
                (a: Airplane) => a.id === updatedAirplane.id
            );
            this.foundAirplanes[updatedAirplaneIndex] = updatedAirplane;
        });
    }

    openDeleteModal(airplaneToDelete: Airplane): void {
        const modalRef = this.modalService.open(DeleteModalComponent, {
            centered: true
        });
        modalRef.componentInstance.entityToDelete = airplaneToDelete;
        modalRef.componentInstance.entityName = 'Airplane';

        modalRef.result.then(this.delete.bind(this));
    }

    // NOTE: This doesn't need to be public.
    delete(airplane: Airplane): void {
        this.foundAirplanes = this.foundAirplanes.filter(
            (a: Airplane) => a !== airplane
        );
        this.airplaneService.deleteAirplane(airplane.id).subscribe();
    }
}
