import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iif, Observable, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
    tap
} from 'rxjs/operators';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Booking } from '../entities/booking';
import { Page } from '../entities/page';
import { BookingService } from '../services/booking.service';
import { BookingCreateModalComponent } from './booking-create-modal/booking-create-modal.component';
import { BookingEditModalComponent } from './booking-edit-modal/booking-edit-modal.component';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
    foundBookings: Booking[] = [];
    pageNumber: number = 1;
    pageSizeControl: FormControl = new FormControl(10);
    totalElements: number = 0;
    bookings$!: Observable<Booking[]>;
    searchTerm: string = '';
    selectedTable: string = '';
    passengerIndex: number = 0;
    rowExpanded: boolean = false;

    private searchTerms = new Subject<string>();

    constructor(
        private bookingService: BookingService,
        private modalService: NgbModal,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initializeBookings$();
        this.bookings$.subscribe();
        // Show some bookings at the start before a search is done.
        this.findAll();
    }

    private initializeBookings$(): void {
        this.bookings$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) => {
                const pageIndex = this.pageNumber - 1;
                return iif(
                    () => term === '',
                    this.bookingService.findAll(
                        pageIndex,
                        this.pageSizeControl.value
                    ),
                    this.bookingService.search(
                        term,
                        pageIndex,
                        this.pageSizeControl.value
                    )
                );
            }),
            tap(this.updateFoundBookings.bind(this)),
            // Map the page to an array.
            map((page: Page<Booking>) => page.content)
        );
    }

    findAll(): void {
        const pageIndex = this.pageNumber - 1;
        this.bookingService
            .findAll(pageIndex, this.pageSizeControl.value)
            .subscribe(this.updateFoundBookings.bind(this));
    }

    private updateFoundBookings(page: Page<Booking>): void {
        this.foundBookings = page.content;
        this.totalElements = page.totalElements;
    }

    toggleActive(booking: Booking): void {
        booking.active = !booking.active;
        this.bookingService.update(booking).subscribe();
    }

    openAddModal(): void {
        const modalRef = this.modalService.open(BookingCreateModalComponent, {
            centered: true
        });
        modalRef.result.then((booking: Booking) => {
            this.foundBookings.push(booking);
        });
    }

    // TODO: Remove.
    /**
     * Open the Edit Modal for the given booking.
     */
    openEditModal(selectedBooking: Booking): void {
        const modalRef = this.modalService.open(BookingEditModalComponent, {
            centered: true
        });
        // The selected booking in the foundBookings array is cloned and
        // passed it to the modal component so that changes made in the modal
        // won't affect the bookings list.
        modalRef.componentInstance.selectedBooking = Object.assign(
            {},
            selectedBooking
        );

        modalRef.result.then((updatedBooking: Booking) => {
            const updatedBookingIndex = this.foundBookings.findIndex(
                (a: Booking) => a.id === updatedBooking.id
            );
            this.foundBookings[updatedBookingIndex] = updatedBooking;
        });
    }

    // TODO: Remove.
    openDeleteModal(bookingToDelete: Booking): void {
        const modalRef = this.modalService.open(DeleteModalComponent, {
            centered: true
        });
        modalRef.componentInstance.selectedEntity = bookingToDelete;
        modalRef.componentInstance.entityName = 'Booking';

        modalRef.closed
            .pipe(
                switchMap(() => this.bookingService.delete(bookingToDelete.id))
            )
            .subscribe(() => {
                this.foundBookings = this.foundBookings.filter(
                    (booking: Booking) => booking !== bookingToDelete
                );
            });
    }

    /**
     * Push a search term into the observable stream.
     */
    onInput(term: string): void {
        this.searchTerm = term;
        this.searchTerms.next(term);
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

    /**
     * Navigate to the passengers page passing the confirmation code to the
     * passengers component.
     */
    showPassengers(confirmationCode: string): void {
        this.router.navigate(['/passengers'], { state: { confirmationCode } });
    }

    /**
     * Navigate to the flights page passing the confirmation code to the
     * passengers component.
     */
    showFlights(confirmationCode: string): void {
        this.router.navigate(['/flights'], { state: { confirmationCode } });
    }
}
