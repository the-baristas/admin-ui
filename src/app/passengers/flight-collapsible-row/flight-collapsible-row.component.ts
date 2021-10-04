import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../entities/passenger';
import * as moment from 'moment';
import { TimezoneUtils } from '../../utils/timezone-utils';

@Component({
    selector: 'app-flight-collapsible-row',
    templateUrl: './flight-collapsible-row.component.html',
    styleUrls: ['./flight-collapsible-row.component.css']
})
export class FlightCollapsibleRowComponent implements OnInit {
    @Input() passenger!: Passenger;

    constructor() {}

    ngOnInit(): void { }

    convertToLocalTime(time: string, airportCode: string) {
      return TimezoneUtils.changeToLocalTime(time, airportCode).format('YY/MM/DD, h:mm A');
    }
}
