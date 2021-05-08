import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap
} from 'rxjs/operators';
import { Airplane } from '../entities/airplane';
import { Page } from '../entities/page';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplane-search',
    templateUrl: './airplane-search.component.html',
    styleUrls: ['./airplane-search.component.css']
})
export class AirplaneSearchComponent implements OnInit {
    airplanes$!: Observable<Airplane[]>;
    selectedAirplane: Airplane = {} as Airplane;
    @Output() searchResultsDisplay: EventEmitter<string> = new EventEmitter();
    @Output() allDisplay: EventEmitter<void> = new EventEmitter();
    private searchTerms = new Subject<string>();

    constructor(private airplaneService: AirplaneService) {}

    ngOnInit(): void {
        this.initializeAirplanes$();

        // An empty search box should show all airplanes.
        this.searchTerms.subscribe((term: string) => {
            if (term === '') {
                this.allDisplay.emit();
            }
        });
    }

    updateSearchBox(searchBox: HTMLInputElement, airplane: Airplane): void {
        searchBox.value = airplane.model;
        this.selectedAirplane.id = airplane.id;
        this.selectedAirplane.model = airplane.model;
        this.initializeAirplanes$();
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    onSuggestionClick(searchBox: HTMLInputElement, airplane: Airplane): void {
        this.updateSearchBox(searchBox, airplane);
        this.searchResultsDisplay.emit(this.selectedAirplane.model);
    }

    private initializeAirplanes$(): void {
        const suggestionsPageSize = 5;
        this.airplanes$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) =>
                this.airplaneService.searchAirplanesPage(
                    term,
                    0,
                    suggestionsPageSize
                )
            ),
            // Map the page to an array.
            map((airplanesPage: Page<Airplane>) => airplanesPage.content),
            // Remove duplicates.
            map((airplanes: Airplane[]) =>
                this.makeArrayUnique(airplanes, 'model')
            )
        );
    }

    /**
     * Remove all duplicate objects in a given array with the same property value.
     * @param array
     * @param property
     */
    private makeArrayUnique(array: any[], property: any): any[] {
        return array.filter(
            (value: any, index: number) =>
                index ===
                array.findIndex(
                    (element: any) => element[property] === value[property]
                )
        );
    }
}
