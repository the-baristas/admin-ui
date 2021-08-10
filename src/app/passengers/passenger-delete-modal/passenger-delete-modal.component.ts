import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Passenger } from 'src/app/entities/passenger';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
    selector: 'app-passenger-delete-modal',
    templateUrl: './passenger-delete-modal.component.html',
    styleUrls: ['./passenger-delete-modal.component.css']
})
export class PassengerDeleteModalComponent implements OnInit {
    public selectedPassenger!: Passenger;
    public entityName!: string;

    constructor(
        public activeModal: NgbActiveModal,
        private passengerService: PassengerService
    ) {}

    ngOnInit(): void {}

    delete(): void {
        this.passengerService
            .delete(this.selectedPassenger.id)
            .subscribe(() => this.activeModal.close(this.selectedPassenger));
    }
}
