import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Passenger } from '../../entities/passenger';

@Component({
    selector: 'app-passenger-edit-modal',
    templateUrl: './passenger-edit-modal.component.html',
    styleUrls: ['./passenger-edit-modal.component.css']
})
export class PassengerEditModalComponent implements OnInit {
    selectedPassenger: Passenger = {} as Passenger;
    editingForm!: FormGroup;

    constructor(public activeModal: NgbActiveModal, formBuilder: FormBuilder) {
        this.editingForm = formBuilder.group({
            firstClassSeatsMax: [''],
            businessClassSeatsMax: [''],
            economyClassSeatsMax: [''],
            model: ['']
        });
    }

    ngOnInit(): void {}

    save(): void {}
}
