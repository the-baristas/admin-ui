import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-row',
    templateUrl: './user-row.component.html',
    styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit {
    @Input() userData!: { username: string; email: string; phone: string };

    constructor() {}

    ngOnInit(): void {}
}
