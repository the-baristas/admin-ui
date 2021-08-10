import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Airplane } from '../../entities/airplane';
import { AirplaneService } from '../../services/airplane.service';

@Component({
    selector: 'app-airplane-edit-modal',
    templateUrl: './airplane-edit-modal.component.html',
    styleUrls: ['./airplane-edit-modal.component.css'],
})
export class AirplaneEditModalComponent implements OnInit {
    selectedAirplane: Airplane = {} as Airplane;
    editingForm: FormGroup = new FormGroup(
        {
            firstClassSeatsMax: new FormControl(''),
            businessClassSeatsMax: new FormControl(''),
            economyClassSeatsMax: new FormControl(''),
            model: new FormControl(''),
        },
        [Validators.required]
    );

    constructor(
        public activeModal: NgbActiveModal,
        private airplaneService: AirplaneService
    ) {}

    ngOnInit(): void {
        this.updateForm();

        this.editingForm.valueChanges.subscribe((airplane: Airplane) => {
            // Changed properties are copied to selectedAirplanes.
            Object.assign(this.selectedAirplane, airplane);
        });
    }

    private updateForm(): void {
        this.editingForm.setValue({
            firstClassSeatsMax: this.selectedAirplane.firstClassSeatsMax,
            businessClassSeatsMax: this.selectedAirplane.businessClassSeatsMax,
            economyClassSeatsMax: this.selectedAirplane.economyClassSeatsMax,
            model: this.selectedAirplane.model,
        });
    }

    save(): void {
        this.airplaneService
            .update(this.selectedAirplane)
            .subscribe((updatedAirplane: Airplane) => {
                this.activeModal.close(updatedAirplane);
            });
    }
}
