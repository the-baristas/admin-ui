import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AirplaneAddModalComponent } from '../airplane-add-modal/airplane-add-modal.component';
import { AirplaneDeleteModalComponent } from '../airplane-delete-modal/airplane-delete-modal.component';
import { AirplaneEditModalComponent } from '../airplane-edit-modal/airplane-edit-modal.component';
import { Airplane } from '../entities/airplane';
import { Page } from '../entities/page';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplanes',
    templateUrl: './airplanes.component.html',
    styleUrls: ['./airplanes.component.css']
})
export class AirplanesComponent implements OnInit {
    foundAirplanes: Airplane[] = [];
    pageNumber: number = 1;
    pageSizeControl: FormControl = new FormControl(10);
    totalElements!: number;

    constructor(
        private airplaneService: AirplaneService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.initializeAirplanesPage();

        this.pageSizeControl.valueChanges.subscribe(() => {
            this.initializeAirplanesPage();
        });
    }

    initializeAirplanesPage(): void {
        const pageIndex = this.pageNumber - 1;
        this.airplaneService
            .searchAirplanesPage("", pageIndex, this.pageSizeControl.value)
            .subscribe((airplanesPage: Page<Airplane>) => {
                this.foundAirplanes = airplanesPage.content;
                this.totalElements = airplanesPage.totalElements;
            });
    }

    replaceFoundAirplanes(airplanesPage: Page<Airplane>): void {
        this.foundAirplanes = airplanesPage.content;
        this.pageSizeControl.setValue(airplanesPage.totalPages);
    }

    openAddModal(): void {
        const modalRef: NgbModalRef = this.modalService.open(
            AirplaneAddModalComponent,
            {
                centered: true
            }
        );
        modalRef.result.then((airplanes: Airplane[]) => {
            this.foundAirplanes = airplanes;
        });
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
        const modalRef = this.modalService.open(AirplaneDeleteModalComponent, {
            centered: true
        });
        modalRef.componentInstance.airplaneToDelete = airplaneToDelete;
        modalRef.componentInstance.entityName = 'Airplane';

        modalRef.result.then((airplane: Airplane) => {
            this.foundAirplanes = this.foundAirplanes.filter(
                (a: Airplane) => a !== airplane
            );
        });
    }
}
