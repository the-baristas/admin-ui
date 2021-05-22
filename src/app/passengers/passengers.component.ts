import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { iif, Observable, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
    tap
} from 'rxjs/operators';
import { Page } from '../entities/page';
import { Passenger } from '../entities/passenger';
import { PassengerAddModalComponent } from '../passenger-add-modal/passenger-add-modal.component';
import { PassengerDeleteModalComponent } from '../passenger-delete-modal/passenger-delete-modal.component';
import { PassengerEditModalComponent } from '../passenger-edit-modal/passenger-edit-modal.component';
import { PassengerService } from '../services/passenger.service';

@Component({
    selector: 'app-passengers',
    templateUrl: './passengers.component.html',
    styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
    foundPassengers: Passenger[] = [];
    pageNumber: number = 1;
    pageSizeControl: FormControl = new FormControl(10);
    totalElements!: number;
    searchTerm: string = '';
    passengers$!: Observable<Passenger[]>;
    private searchTerms = new Subject<string>();
    isCollapsed1: boolean = true;
    isCollapsed2: boolean = true;
    isCollapsed3: boolean = true;
    seatInfoCollapsed: boolean = true;
    userDetailsCollapsed: boolean = true;
    selectedTable: string = '';
    passengerIndex: number = 0;
    rowExpanded: boolean = false;

    constructor(
        private passengerService: PassengerService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.initializePassengers$();
        this.passengers$.subscribe((passengers: Passenger[]) => {
            this.foundPassengers = passengers;
        });
        this.findAll();

        this.pageSizeControl.valueChanges.subscribe((pageSize: number) => {
            const pagesMax: number = Math.ceil(this.totalElements / pageSize);
            // The page number may be set to be greater than the max number of
            // pages when pageSize is changed.
            this.pageNumber = Math.min(this.pageNumber, pagesMax);
            if (this.searchTerm === '') {
                this.findAll();
            } else {
                this.search(this.searchTerm);
            }
        });
    }

    toggleCollapsibleRow(selectedTable: string, passengerIndex: number): void {
        if (
            this.selectedTable === selectedTable &&
            this.passengerIndex === passengerIndex &&
            this.rowExpanded
        ) {
            this.rowExpanded = false;
        } else {
            this.rowExpanded = true;
        }
        this.selectedTable = selectedTable;
        this.passengerIndex = passengerIndex;
    }

    private initializePassengers$(): void {
        const pageIndex = this.pageNumber - 1;
        this.passengers$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) =>
                iif(
                    () => term === '',
                    this.passengerService.findAll(
                        pageIndex,
                        this.pageSizeControl.value
                    ),
                    this.passengerService.search(
                        term,
                        pageIndex,
                        this.pageSizeControl.value
                    )
                )
            ),
            tap((page: Page<Passenger>) => {
                this.totalElements = page.totalElements;
            }),
            // Map the page to an array.
            map((page: Page<Passenger>) => page.content)
        );
    }

    findAll(): void {
        this.search('');
    }

    openAddModal(): void {
        const modalRef: NgbModalRef = this.modalService.open(
            PassengerAddModalComponent,
            {
                centered: true
            }
        );
        modalRef.result.then((passenger: Passenger) => {
            this.foundPassengers.push(passenger);
        });
    }

    openEditModal(selectedPassenger: Passenger): void {
        const modalRef = this.modalService.open(PassengerEditModalComponent, {
            centered: true
        });
        // The selected airplane in the foundAirplanes array is cloned and
        // passed it to the modal component so that changes made in the modal
        // won't affect the airplanes list.
        modalRef.componentInstance.selectedAirplane = Object.assign(
            {},
            selectedPassenger
        );

        modalRef.result.then((updatedPassenger: Passenger) => {
            const updatedPassengerIndex = this.foundPassengers.findIndex(
                (passenger: Passenger) => passenger.id === updatedPassenger.id
            );
            this.foundPassengers[updatedPassengerIndex] = updatedPassenger;
        });
    }

    openDeleteModal(passengerToDelete: Passenger): void {
        const modalRef = this.modalService.open(PassengerDeleteModalComponent, {
            centered: true
        });
        modalRef.componentInstance.selectedAirplane = passengerToDelete;
        modalRef.componentInstance.entityName = 'Passenger';

        modalRef.result.then((deletedAirplane: Passenger) => {
            this.foundPassengers = this.foundPassengers.filter(
                (passenger: Passenger) => passenger !== deletedAirplane
            );
        });
    }

    onPageChange(): void {
        this.findAll();
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerm = term;
        this.searchTerms.next(term);
    }
}
