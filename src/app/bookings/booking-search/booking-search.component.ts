import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
} from 'rxjs/operators';
import { Page } from 'src/app/entities/page';
import { Booking } from '../../entities/booking';
import { BookingService } from '../../services/booking.service';

@Component({
    selector: 'app-booking-search',
    templateUrl: './booking-search.component.html',
    styleUrls: ['./booking-search.component.css'],
})
export class BookingSearchComponent implements OnInit {
    bookings$!: Observable<Booking[]>;
    selectedBooking: Booking = {} as Booking;
    page: number = 1;
    pageSize: number = 10;
    @Output() resultsEvent: EventEmitter<Page<Booking>> = new EventEmitter();

    private searchTerms = new Subject<string>();

    constructor(private bookingService: BookingService) {}

    ngOnInit(): void {
        this.initializeBookings$();
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    updateSearchBox(searchBox: HTMLInputElement, booking: Booking): void {
        searchBox.value = booking.confirmationCode;
        this.selectedBooking.id = booking.id;
        this.selectedBooking.confirmationCode = booking.confirmationCode;
        this.initializeBookings$();
    }

    showResults(): void {
        this.bookingService
            .search(this.selectedBooking.confirmationCode, 0, 10)
            .subscribe((bookingsPage: Page<Booking>) => {
                this.resultsEvent.emit(bookingsPage);
            });
    }

    initializeBookings$(): void {
        this.bookings$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) =>
                this.bookingService.search(term, 0, 10)
            ),
            // Remove duplicates.
            map((bookingsPage: Page<Booking>) =>
                this.makeArrayUnique(bookingsPage.content, 'model')
            )
        );
    }

    /**
     * Remove all duplicate objects in a given array with the same property value.
     * @param array
     * @param property
     */
    private makeArrayUnique(array: Array<any>, property: any): Array<any> {
        return array.filter(
            (value: any, index: number) =>
                index ===
                array.findIndex(
                    (element: any) => element[property] === value[property]
                )
        );
    }
}
