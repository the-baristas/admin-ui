import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page } from '../entities/page';
import { Passenger } from '../entities/passenger';
import { PassengerService } from '../services/passenger.service';
import { Observable, of } from 'rxjs';

import { PassengersComponent } from './passengers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('PassengersComponent', () => {
    let component: PassengersComponent;
    let fixture: ComponentFixture<PassengersComponent>;
    let passengerServiceSpy: jasmine.SpyObj<PassengerService>;
    let passenger: Passenger = {
        id: 1,
        bookingId: 1,
        bookingConfirmationCode: 'code',
        bookingActive: true,
        layoverCount: 1,
        bookingTotalPrice: 100,
        flightId: 1,
        flightActive: true,
        departureTime: '01-01-9999 00:00:00',
        arrivalTime: '01-01-9999 05:00:00',
        routeId: 1,
        routeActive: true,
        originAirportCode: 'LAX',
        originAirportActive: true,
        originAirportCity: 'Los Angeles',
        destinationAirportCode: 'LAS',
        destinationAirportActive: true,
        destinationAirportCity: 'Las Vegas',
        discountType: 'none',
        discountRate: 1,
        givenName: 'First',
        familyName: 'Last',
        dateOfBirth: '01-01-2000',
        gender: 'nonbinary',
        address: 'address road',
        seatClass: 'economy',
        seatNumber: 1,
        checkInGroup: 1,
        username: 'username',
        airplaneModel: 'modelname'
    };
    let passengerPage: Page<Passenger> = {
        content: [passenger],
        size: 1,
        totalPages: 1,
        number: 0,
        numberOfElements: 1,
        totalElements: 1,
        first: true,
        last: true,
        empty: false
    };

    beforeEach(async () => {
        passengerServiceSpy = jasmine.createSpyObj('PassengerService', [
            'findAll',
            'search'
        ]);
        passengerServiceSpy.findAll.and.returnValue(of(passengerPage));
        passengerServiceSpy.search.and.returnValue(of(passengerPage));

        await TestBed.configureTestingModule({
            declarations: [PassengersComponent],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: PassengerService, useValue: passengerServiceSpy },
                NgbModal
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PassengersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('search', () => {
        component.search('term');
        expect(component.searchTerm).toEqual('term');
    });

    it('onPageChange calls findAll', () => {
        component.search('term');
        component.onPageChange(1);
        expect(component.searchTerm).toEqual('');
    });

    it('Create button should open modal', () => {
        spyOn(component, 'openAddModal').and.callThrough();
        let button =
            fixture.debugElement.nativeElement.querySelector(
                '#create-new-button'
            );
        button.click();
        expect(component.openAddModal).toHaveBeenCalled();
        expect(
            fixture.debugElement.nativeElement.querySelector('modal-body')
        ).toBeDefined();
    });

    it('test openEditModal()', () => {
        component.openEditModal(passenger);
        expect(
            fixture.debugElement.nativeElement.querySelector('modal-body')
        ).toBeDefined();
    });
});
