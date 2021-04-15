import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime, distinctUntilChanged, switchMap
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
    selectedAirplaneId: number = 0;
    selectedAirplane!: Airplane;

    private searchTerms = new Subject<string>();

    constructor(private airplaneService: AirplaneService, private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    goToDetails(): void {
        if (this.selectedAirplaneId >= 1) {
            this.router.navigateByUrl("/detail/" + this.selectedAirplaneId);
        }
    }

    updateSearchBox(searchBox: HTMLInputElement, listItem: HTMLLIElement, airplane: Airplane): void {
        searchBox.value = airplane.model;
        this.selectedAirplaneId = airplane.id
        this.initializeAirplanes();
    }

    ngOnInit(): void {
        this.initializeAirplanes();
        this.selectedAirplane = {} as Airplane;
    }

    initializeAirplanes(): void {
        this.airplanes$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) => this.airplaneService.searchAirplanes(term)),
        );
    }
}
