import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../entities/passenger';

@Component({
    selector: 'app-flight-collapsible-row',
    templateUrl: './flight-collapsible-row.component.html',
    styleUrls: ['./flight-collapsible-row.component.css']
})
export class FlightCollapsibleRowComponent implements OnInit {
    @Input() passenger!: Passenger;

    constructor() {}

    ngOnInit(): void {}
}
