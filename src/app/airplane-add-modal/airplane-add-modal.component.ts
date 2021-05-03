import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-airplane-add-modal',
    templateUrl: './airplane-add-modal.component.html',
    styleUrls: ['./airplane-add-modal.component.css']
})
export class AirplaneAddModalComponent implements OnInit {
    // addingForm: FormGroup = new FormGroup(
    //     {
    //         firstClassSeatsMax: new FormControl(''),
    //         businessClassSeatsMax: new FormControl(''),
    //         economyClassSeatsMax: new FormControl(''),
    //         model: new FormControl('')
    //     },
    //     [Validators.required]
    // );
    addingForm!: FormGroup;
    add!: Function;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {}

    // add(): void {
    //     const model = this.addingForm.controls.model.value.trim();
    //     const firstClassSeatsMax = this.addingForm.controls.firstClassSeatsMax
    //         .value;
    //     const businessClassSeatsMax = this.addingForm.controls
    //         .businessClassSeatsMax.value;
    //     const economyClassSeatsMax = this.addingForm.controls
    //         .economyClassSeatsMax.value;
    //     if (
    //         !(
    //             model &&
    //             firstClassSeatsMax &&
    //             businessClassSeatsMax &&
    //             economyClassSeatsMax
    //         )
    //     ) {
    //         return;
    //     }
    //     const airplane: Airplane = {
    //         model,
    //         firstClassSeatsMax,
    //         businessClassSeatsMax,
    //         economyClassSeatsMax
    //     } as Airplane;
    //     this.airplaneService
    //         .addAirplane(airplane)
    //         .subscribe((airplane: Airplane) => {
    //             this.activeModal.close(airplane);
    //         });
    // }
}
