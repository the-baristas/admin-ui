import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../airplane';
import { AirplaneAddModalComponent } from '../airplane-add-modal/airplane-add-modal.component';
import { AirplaneEditModalComponent } from '../airplane-edit-modal/airplane-edit-modal.component';
import { AirplaneService } from '../airplane.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
    selector: 'app-airplanes',
    templateUrl: './airplanes.component.html',
    styleUrls: ['./airplanes.component.css'],
})
export class AirplanesComponent implements OnInit {
    foundAirplanes: Airplane[] = [];
    page: number = 1;
    pageSize: number = 10;

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

    /**
     * Open the Edit Modal for the given airplane.
     */
    openEditModal(selectedAirplane: Airplane): void {
        const modalRef = this.modalService.open(AirplaneEditModalComponent, {
            centered: true,
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
            centered: true,
        });
        modalRef.componentInstance.entityToDelete = airplaneToDelete;
        modalRef.componentInstance.entityName = 'Airplane';

        modalRef.result.then((airplane: Airplane) => {
            this.delete(airplane);
        });
    }
}
