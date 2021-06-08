import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingAddModalComponent } from '../booking-add-modal/booking-add-modal.component';
import { BookingEditModalComponent } from '../booking-edit-modal/booking-edit-modal.component';
import { AirplaneDeleteModalComponent } from '../airplane-delete-modal/airplane-delete-modal.component';
import { Booking } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
    foundBookings: Booking[] = [];
    page: number = 1;
    pageSize: number = 10;

    constructor(
        private bookingService: BookingService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        // Show some bookings at the start before a search is done.
        this.bookingService
            .getBookings()
            .subscribe(
                (bookings: Booking[]) =>
                    (this.foundBookings = bookings.slice(0, 10))
            );
    }

    replaceFoundBookings(bookings: Booking[]): void {
        this.foundBookings = bookings;
    }

    toggleActive(booking: Booking) {
        booking.active = !booking.active;
        this.bookingService.updateBooking(booking).subscribe();
    }

    openAddModal(): void {
        // TODO
        console.log(this.foundBookings);
        const modalRef = this.modalService.open(BookingAddModalComponent, {
            centered: true
        });
        modalRef.result.then((booking: Booking) => {
            this.foundBookings.push(booking);
        });
    }

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

    openDeleteModal(bookingToDelete: Booking): void {
        const modalRef = this.modalService.open(AirplaneDeleteModalComponent, {
            centered: true
        });
        modalRef.componentInstance.entityToDelete = bookingToDelete;
        modalRef.componentInstance.entityName = 'Booking';

        modalRef.result.then(this.delete.bind(this));
    }

    delete(booking: Booking): void {
        this.foundBookings = this.foundBookings.filter(
            (b: Booking) => b !== booking
        );
        this.bookingService.deleteBooking(booking.id).subscribe();
    }
}
