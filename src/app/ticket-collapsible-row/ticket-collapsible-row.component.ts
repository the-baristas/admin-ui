import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../entities/passenger';

@Component({
    selector: 'app-ticket-collapsible-row',
    templateUrl: './ticket-collapsible-row.component.html',
    styleUrls: ['./ticket-collapsible-row.component.css']
})
export class TicketCollapsibleRowComponent implements OnInit {
    @Input() passenger!: Passenger;

    constructor() {}

    ngOnInit(): void {}
}
