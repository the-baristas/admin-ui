import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../entities/passenger';

@Component({
    selector: 'app-booking-collapsible-row',
    templateUrl: './booking-collapsible-row.component.html',
    styleUrls: ['./booking-collapsible-row.component.css']
})
export class BookingCollapsibleRowComponent implements OnInit {
    @Input() passenger!: Passenger;

    constructor() {}

    ngOnInit(): void {}
}
