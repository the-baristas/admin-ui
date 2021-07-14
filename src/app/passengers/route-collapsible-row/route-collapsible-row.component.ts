import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../entities/passenger';

@Component({
    selector: 'app-route-collapsible-row',
    templateUrl: './route-collapsible-row.component.html',
    styleUrls: ['./route-collapsible-row.component.css']
})
export class RouteCollapsibleRowComponent implements OnInit {
    @Input() passenger!: Passenger;

    constructor() {}

    ngOnInit(): void {}
}
