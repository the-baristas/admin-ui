import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/app/entities/booking';

@Component({
    selector: 'app-payment-row',
    templateUrl: './payment-row.component.html',
    styleUrls: ['./payment-row.component.css']
})
export class PaymentRowComponent implements OnInit {
    @Input() booking!: Booking;

    constructor() {}

    ngOnInit(): void {}
}
