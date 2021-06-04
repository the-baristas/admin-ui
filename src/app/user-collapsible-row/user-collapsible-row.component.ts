import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../entities/passenger';

@Component({
    selector: 'app-user-collapsible-row',
    templateUrl: './user-collapsible-row.component.html',
    styleUrls: ['./user-collapsible-row.component.css']
})
export class UserCollapsibleRowComponent implements OnInit {
    @Input() passenger!: Passenger;

    constructor() {}

    ngOnInit(): void {}
}
