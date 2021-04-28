import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../airplane';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnInit {
    public entityToDelete!: any;
    public entityName!: string;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {}
}
