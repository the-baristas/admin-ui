import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime, distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, map, switchMap
} from 'rxjs/operators';
import { Airplane } from '../airplane';
import { AirplaneService } from '../airplane.service';

@Component({
    selector: 'app-airplane-search',
    templateUrl: './airplane-search.component.html',
    styleUrls: ['./airplane-search.component.css']
})
export class AirplaneSearchComponent implements OnInit {
    airplanes$!: Observable<Airplane[]>;
    selectedAirplane!: Airplane;
    foundAirplanes: Airplane[] = [];
    page: number = 1;
    pageSize: number = 10;

    private searchTerms = new Subject<string>();

    constructor(private airplaneService: AirplaneService, private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    updateSearchBox(searchBox: HTMLInputElement, airplane: Airplane): void {
        searchBox.value = airplane.model;
        this.selectedAirplane.id = airplane.id
        this.selectedAirplane.model = airplane.model;
        this.initializeAirplanes$();
    }

    delete(airplane: Airplane): void {
        this.foundAirplanes = this.foundAirplanes.filter(a => a !== airplane);
        this.airplaneService.deleteAirplane(airplane.id).subscribe();
    }

    showResults(): void {
        this.airplaneService.searchAirplanes(this.selectedAirplane.model)
            .subscribe(airplanes => this.foundAirplanes = airplanes);
    }

    ngOnInit(): void {
        this.initializeAirplanes$();
        this.selectedAirplane = {} as Airplane;
        // Show some airplanes at the start before a search is done.
        this.airplaneService.getAirplanes()
            .subscribe(airplanes => this.foundAirplanes = airplanes.slice(0, 10));
    }

    initializeAirplanes$(): void {
        this.airplanes$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) => this.airplaneService.searchAirplanes(term)),
            // Remove duplicates.
            map((airplanes: Array<Airplane>) => this.makeArrayUnique(airplanes, 'model'))
        );
    }

    /**
     * Remove all duplicate objects in a given array with the same property value.
     * @param array
     * @param property
     */
    private makeArrayUnique(array: Array<any>, property: any): Array<any> {
        return array.filter(((value: any, index: number) =>
            index === array.findIndex((element: any) =>
                element[property] === value[property]
            )
        ));
    }
}
