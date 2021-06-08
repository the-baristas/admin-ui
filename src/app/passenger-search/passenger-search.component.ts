import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap
} from 'rxjs/operators';
import { Page } from '../entities/page';
import { Passenger } from '../entities/passenger';
import { PassengerService } from '../services/passenger.service';
import { ArrayUtils } from '../utils/array-utils';

@Component({
    selector: 'app-passenger-search',
    templateUrl: './passenger-search.component.html',
    styleUrls: ['./passenger-search.component.css']
})
export class PassengerSearchComponent implements OnInit {
    passengers$!: Observable<Passenger[]>;
    selectedPassenger: Passenger = {} as Passenger;
    @Output() searchResultsDisplay: EventEmitter<string> = new EventEmitter();
    @Output() allPassengersDisplay: EventEmitter<void> = new EventEmitter();
    private searchTerms = new Subject<string>();

    constructor(private passengerService: PassengerService) {}

    ngOnInit(): void {
        this.initializePassengers$();

        // An empty search box should show all passengers.
        this.searchTerms.subscribe((term: string) => {
            if (term === '') {
                this.allPassengersDisplay.emit();
            }
        });
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    // onSuggestionClick(searchBox: HTMLInputElement, passenger: Passenger): void {
    //     this.updateSearchBox(searchBox, passenger);
    //     this.searchResultsDisplay.emit(this.selectedPassenger.bookingConfirmationCode);
    // }

    private initializePassengers$(): void {
        const pageSize = 5;
        this.passengers$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) =>
                this.passengerService.searchDistinct(term, 0, pageSize)
            ),
            // Map the page to an array.
            map((page: Page<Passenger>) => page.content),
            // Remove duplicates.
            map((passengers: Passenger[]) =>
                ArrayUtils.makeArrayUnique(
                    passengers,
                    'bookingConfirmationCode'
                )
            ),
            // Remove duplicates.
            map((passengers: Passenger[]) =>
                ArrayUtils.makeArrayUnique(passengers, 'username')
            )
        );
    }
}
