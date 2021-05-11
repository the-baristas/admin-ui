import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../entities/airplane';
import { AirplaneService } from '../services/airplane.service';

@Component({
    selector: 'app-airplane-delete-modal',
    templateUrl: './airplane-delete-modal.component.html',
    styleUrls: ['./airplane-delete-modal.component.css']
})
export class AirplaneDeleteModalComponent implements OnInit {
    public selectedAirplane!: Airplane;
    public entityName!: string;

    constructor(
        public activeModal: NgbActiveModal,
        private airplaneService: AirplaneService
    ) {}

    ngOnInit(): void {}

    delete(): void {
        this.airplaneService
            .deleteAirplane(this.selectedAirplane.id)
            .subscribe(() => {
                this.activeModal.close(this.selectedAirplane);
            });
    }
}
