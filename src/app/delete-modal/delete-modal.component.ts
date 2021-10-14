import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../entities/airplane';
import { Booking } from '../entities/booking';
import { Passenger } from '../entities/passenger';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
    selectedEntity!: Airplane | Booking | Passenger;
    entityName!: string;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {}

    onCloseClick(): void {
        this.activeModal.dismiss('X click');
    }

    onCancelClick(): void {
        this.activeModal.dismiss('Cancel click');
    }

    onOkClick(): void {
        this.activeModal.close();
    }
}
