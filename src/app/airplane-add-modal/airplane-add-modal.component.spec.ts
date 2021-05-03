import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AirplaneService } from '../services/airplane.service';
import { AirplaneAddModalComponent } from './airplane-add-modal.component';

describe('AirplaneAddModalComponent', () => {
    let component: AirplaneAddModalComponent;
    let fixture: ComponentFixture<AirplaneAddModalComponent>;
    let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>;

    beforeEach(async () => {
        airplaneServiceSpy = jasmine.createSpyObj('AirplaneService', [
            'addAirplane'
        ]);

        await TestBed.configureTestingModule({
            declarations: [AirplaneAddModalComponent],
            providers: [
                NgbActiveModal,
                { provide: AirplaneService, useValue: airplaneServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AirplaneAddModalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
